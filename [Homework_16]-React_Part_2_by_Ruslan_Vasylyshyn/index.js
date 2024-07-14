const { useState, useEffect } = React;

const fetchAvatar = async () => {
  try {
    const response = await fetch(
      "https://tinyfac.es/api/data?limit=1&quality=0"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error(
      "The server is temporarily unavailable. Try again later."
    );
  }
};

const Avatar = ({ avatar, onUpdate, isLoading }) => (
  <div className="avatar">
    {isLoading ? (
      <div className="loader"></div>
    ) : (
      <img src={avatar.url} alt={`${avatar.first_name} ${avatar.last_name}`} />
    )}
    <button className="update-button" onClick={onUpdate}>
      <img src="./img/refresh.svg" />
    </button>
  </div>
);

const App = () => {
  const [avatars, setAvatars] = useState([]);
  const [loadingIndexes, setLoadingIndexes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);
  const [error, setError] = useState(null);

  const addAvatar = async () => {
    setIsAdding(true);
    try {
      const newAvatar = await fetchAvatar();
      setAvatars([...avatars, newAvatar]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const updateAvatar = async (index) => {
    setLoadingIndexes([...loadingIndexes, index]);
    try {
      const newAvatar = await fetchAvatar();
      const newAvatars = avatars.slice();
      newAvatars[index] = newAvatar;
      setAvatars(newAvatars);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingIndexes(loadingIndexes.filter((i) => i !== index));
    }
  };

  const updateAllAvatars = async () => {
    setIsUpdatingAll(true);
    try {
      const newAvatars = await Promise.all(avatars.map(() => fetchAvatar()));
      setAvatars(newAvatars);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUpdatingAll(false);
    }
  };

  const deleteAllAvatars = () => {
    setAvatars([]);
  };

  return (
    <div className="app-wrapper">
      {error && <div className="error-message">{error}</div>}
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            avatar={avatar}
            onUpdate={() => updateAvatar(index)}
            isLoading={loadingIndexes.includes(index) || isUpdatingAll}
          />
        ))}
        {isAdding && (
          <div className="avatar">
            <div className="loader"></div>
          </div>
        )}

        <button className="add-button" onClick={addAvatar}>
          <img src="./img/tiles.svg" />
        </button>
      </div>

      <div className="button-container">
        <button className="update-all-button" onClick={updateAllAvatars}>
          Update All
        </button>
        <button className="delete-all-button" onClick={deleteAllAvatars}>
          Delete All
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
