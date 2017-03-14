import React, { Component, PropTypes } from "react";
import { ChromePicker } from "react-color";

const colorTypeList = ["hex", "rgb", "hsl"];

class ColorRow extends React.Component {
  static props = {
    name: PropTypes.string,
    color: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(colorTypeList),
    updateOnSave: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      localColor: this.props.color,
      colorStack: [this.props.color],
      stackPosition: 0
    };
  }
  handleChange = newColor => {
    this.setState({ localColor: newColor[this.props.type] });
    if (!this.props.updateOnSave) {
      this.props.onChange(newColor[this.props.type]);
    }
  };
  goBack = () => {
    const atStart = this.state.stackPosition === 0;
    const appliedPosition = atStart ? 0 : this.state.stackPosition - 1;
    this.setState({
      stackPosition: appliedPosition,
      localColor: this.state.colorStack[appliedPosition]
    });
    this.props.onChange(this.state.colorStack[appliedPosition]);
  };
  goForward = () => {
    const canGoForward = this.state.stackPosition + 1 !==
      this.state.colorStack.length;
    const appliedPosition = canGoForward
      ? this.state.stackPosition + 1
      : this.state.stackPosition;
    this.setState({
      stackPosition: appliedPosition,
      localColor: this.state.colorStack[appliedPosition]
    });
    this.props.onChange(this.state.colorStack[appliedPosition]);
  };
  saveColor = () => {
    if (
      this.state.localColor !== this.state.colorStack[this.state.stackPosition]
    ) {
      this.setState({
        colorStack: [
          ...this.state.colorStack.slice(0, this.state.stackPosition + 1),
          this.state.localColor
        ],
        stackPosition: this.state.stackPosition + 1
      });
    }
    this.props.onChange(this.state.localColor);
  };
  onLabelClick = () => {
    if (this.state.showing) {
      this.setState({ showing: false });
      this.saveColor();
    } else {
      this.setState({ showing: true });
    }
  };
  handleThumbnailClick = index => {
    this.setState({
      stackPosition: index,
      localColor: this.state.colorStack[index]
    });
    this.props.onChange(this.state.colorStack[index]);
  };
  render() {
    const result = (
      <div>
        <div
          onClick={this.onLabelClick}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: this.state.localColor,
            height: 40
          }}
        >
          <div style={{ color: "white", paddingLeft: 5, paddingRight: 5 }}>
            {this.props.name}
          </div>
          <div style={{ color: "black", paddingLeft: 5, paddingRight: 5 }}>
            {this.props.name}
          </div>
        </div>
        {this.state.showing &&
          <div >
            <ChromePicker
              color={this.state.localColor}
              onChange={this.handleChange}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll"
              }}
            >
              {this.state.colorStack.map((color, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => this.handleThumbnailClick(index)}
                    style={{
                      borderStyle: "solid",
                      borderWidth: 2,
                      borderRadius: 4,
                      borderColor: (
                        this.state.stackPosition === index ? "black" : "white"
                      ),
                      margin: 2
                    }}
                  >
                    <div
                      style={{
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "white",
                        height: 16,
                        width: 16,
                        backgroundColor: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <div onClick={this.goBack}>
                Back
              </div>
              <div onClick={this.goForward}>
                Forward
              </div>
              <div onClick={this.saveColor}>
                Save
              </div>
            </div>
          </div>}
      </div>
    );
    return result;
  }
}

const WIDTH_OF_COLOR_PICKER = 225;
const A_REASONABLE_HEIGHT = 640;
const shadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'

const ColorList = (
  {
    colors,
    onChange,
    type,
    updateOnSave,
    showing
  }
) => {
  const result = (
    <div
      style={{
        marginRight: 10,
        boxShadow: shadow,
        borderRadius: 6,
        display: showing ? "none" : "block",
        backgroundColor: "white",
        width: WIDTH_OF_COLOR_PICKER,
        maxHeight: A_REASONABLE_HEIGHT,
        overflowY: "scroll"
      }}
    >
      <div
        style={{
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={() => console.log(colors)}
      >Log colors</div>
      {Object.keys(colors).map((colorName, index) => {
        return (
          <ColorRow
            updateOnSave={updateOnSave}
            type={type}
            key={colorName}
            name={colorName}
            color={colors[colorName]}
            onChange={color => onChange(color, colorName)}
          />
        );
      })}
    </div>
  );
  return result;
};

const BORDER_INFINITY = 999;

const Button = (
  {
    onClick
  }
) => {
  const result = (
    <div
      onClick={onClick}
      style={{
        boxShadow: shadow,
        width: 120,
        height: 30,
        borderRadius: BORDER_INFINITY,
        margin: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "#265a74"
      }}
    >
      {"Color Pad"}
    </div>
  );
  return result;
};

const noop = () => {};

class ColorPad extends Component {
  static props = {
    colors: PropTypes.object,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(colorTypeList),
    updateOnSave: PropTypes.bool
  };
  static defaultProps = {
    colors: {},
    onChange: noop,
    type: "hex",
    updateOnSave: false
  };
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
  }
  switchShowing = () => {
    this.setState({ showing: !this.state.showing });
  };
  render() {
    const result = (
      <div
        style={{
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          userSelect: "none"
        }}
      >
        <Button onClick={this.switchShowing} />
        <ColorList
          showing={this.state.showing}
          updateOnSave={this.props.updateOnSave}
          type={this.props.type}
          colors={this.props.colors}
          onChange={this.props.onChange}
          updateOnSave={this.props.updateOnSave}
        />
      </div>
    );
    return result;
  }
}

export default ColorPad;
