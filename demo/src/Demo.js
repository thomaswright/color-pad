import React, { Component, PropTypes } from "react";
import ColorPad from "../../src";

const Block = (
  {
    color,
    text,
    inverse = false,
    style
  }
) => {
  const result = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        height: 200,
        width: 200,
        backgroundColor: inverse ? color : "white",
        color: inverse ? "white" : color,
        ...style
      }}
    >
      {text}
    </div>
  );
  return result;
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const initialColors = {
  Primary: "#0046a2",
  Secondary: "#2c3a63",
  Accent: "#ffaf00",
  Default: "#7f8286",
  Disabled: "#bbbbbb",
  Error: "#ff0000",
  Info: "#1BA6B5",
  Success: "#09611e",
  Warning: "#ff9400"
};

class Demo extends Component {
  constructor(props) {
    super(props);
    const initialColorKeys = Object.keys(initialColors);
    this.state = {
      colors: initialColors,
      shuffledArray: shuffle([
        ...initialColorKeys,
        ...initialColorKeys,
        ...initialColorKeys,
        ...initialColorKeys,
      ])
    };
  }
  onColorChange = (color, colorName) => {
    const newColors = this.state.colors;
    newColors[colorName] = color;
    this.setState({ colors: newColors });
  };
  render() {
    const colors = this.state.colors;
    return (
      <div>
        <div style={{ position: "fixed", right: 0 }}>
          <ColorPad
            type={"hex"}
            colors={colors}
            onChange={this.onColorChange}
          />
        </div>
        <div style={{ fontSize: 48, paddingLeft: 16 }}>
            {"color-pad demo"}
          </div>
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
          {this.state.shuffledArray.map((colorName, index) => {
            return (
              <Block
                color={colors[colorName]}
                text={colorName}
                inverse={index % 2 === 0}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Demo;
