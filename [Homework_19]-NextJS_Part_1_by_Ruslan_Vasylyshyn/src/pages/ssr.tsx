import { FC, useState } from "react";
import Image from "next/image";
import refreshImg from "../../public/img/refresh.svg";
import tilesImg from "../../public/img/tiles.svg";
import styles from "../styles/App.module.css";

interface Avatar {
  url: string;
  first_name: string;
  last_name: string;
}

interface SSGPageProps {
  initialAvatars: Avatar[];
  error: string | null;
}

interface AvatarProps {
  avatar: Avatar;
  onUpdate: () => void;
  isLoading: boolean;
}

const fetchAvatar = async ():Promise<Avatar> => {
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
    throw new Error("The server is temporarily unavailable. Too many requests. Try again later.");
  }
};

const Avatar:FC<AvatarProps> = ({ avatar, onUpdate, isLoading }) => (
  <div className={styles.avatar}>
    {isLoading ? (
      <div className={styles.loader}></div>
    ) : (
      <img src={avatar.url} alt={`${avatar.first_name} ${avatar.last_name}`} />
    )}
    <button className={styles.updateButton} onClick={onUpdate}>
      <Image src={refreshImg} alt="Refresh" />
    </button>
  </div>
);

const SSRPage:FC<SSGPageProps> = ({ initialAvatars, error }) => {
  const [avatars, setAvatars] = useState(initialAvatars);
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  const addAvatar = async () => {
    setIsAdding(true);
    try {
      const newAvatar = await fetchAvatar();
      setAvatars([...avatars, newAvatar]);
      setClientError(null);
    } catch (error) {
      if(error instanceof Error){
        setClientError(error.message);
      } else {
        setClientError("An unknown error occurred.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const updateAvatar = async (index:number) => {
    setLoadingIndexes([...loadingIndexes, index]);
    try {
      const newAvatar = await fetchAvatar();
      const newAvatars = avatars.slice();
      newAvatars[index] = newAvatar;
      setAvatars(newAvatars);
    } catch (error) {
      if(error instanceof Error){
        setClientError(error.message);
      } else {
        setClientError("An unknown error occurred.");
      }
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
      if(error instanceof Error){
        setClientError(error.message);
      } else {
        setClientError("An unknown error occurred.");
      }
    } finally {
      setIsUpdatingAll(false);
    }
  };

  const deleteAllAvatars = () => {
    setAvatars([]);
  };

  return (
    <div className={styles.appWrapper}>
      {error !== null ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <></>
      )}
      {clientError !== null ? (
        <div className={styles.errorMessage}>{clientError}</div>
      ) : (
        <></>
      )}
      <div className={styles.avatars}>
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            avatar={avatar}
            onUpdate={() => updateAvatar(index)}
            isLoading={loadingIndexes.includes(index) || isUpdatingAll}
          />
        ))}
        {isAdding && (
          <div className={styles.avatar}>
            <div className={styles.loader}></div>
          </div>
        )}

        <button className={styles.addButton} onClick={addAvatar}>
          <Image src={tilesImg} alt="Add" />
        </button>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.updateAllButton} onClick={updateAllAvatars}>
          Update All
        </button>
        <button className={styles.deleteAllButton} onClick={deleteAllAvatars}>
          Delete All
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialAvatars = await Promise.all(
      Array.from({ length: 5 }).map(() => fetchAvatar())
    );

    return {
      props: {
        initialAvatars,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        initialAvatars: [],
        error: "The server is temporarily unavailable. Too many requests. Try again later.",
      },
    };
  }
}

export default SSRPage;
