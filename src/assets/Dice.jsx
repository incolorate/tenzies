function Dice(props) {
  let styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };

  return (
    <div
      className="dice"
      style={styles}
      onClick={() => props.handleClick(props.id)}
    >
      <p>{props.value}</p>
    </div>
  );
}

export default Dice;
