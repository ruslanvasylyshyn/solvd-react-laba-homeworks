const TrafficLight = (colors) => {
  const { redClass, yellowClass, greenClass } = colors;
  return (
    <div className="traffic-light-wrapper">
      <div className="traffic-light">
        <div className={`light ${redClass}`} />
        <div className={`light ${yellowClass}`} />
        <div className={`light ${greenClass}`} />
      </div>
      <div className="traffic-light-shadow"></div>
      <div className="traffic-light-hat"></div>
    </div>
  );
};

const RedLight = () => {
  return <TrafficLight redClass="red" />;
};

const YellowLight = () => {
  return <TrafficLight yellowClass="yellow" />;
};

const GreenLight = () => {
  return <TrafficLight greenClass="green" />;
};

const states = [RedLight, YellowLight, GreenLight];
let currentState = 0;

function renderTrafficLight() {
  const Component = states[currentState];
  ReactDOM.render(<Component />, document.getElementById("root"));
  currentState = (currentState + 1) % states.length;
}

renderTrafficLight();
setInterval(renderTrafficLight, 1000);
