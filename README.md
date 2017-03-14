# color-pad

<!-- [![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls] -->

Check out the [demo](http://color-pad.surge.sh/). **color-pad** is a React component to help test out colors in development. Easier, faster, and more efficient than testing colors via browser dev-tools. 

## Install

```js
npm i color-pad
```

## Use
```js

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

class TopComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: initialColors,
    };
  }
  onColorChange = (color, colorName) => {
    // send action off to color store, etc.
    const newColors = this.state.colors;
    newColors[colorName] = color;
    this.setState({ colors: newColors });
  };
  render () {
    return (
      <div>
        <div style={{ position: "fixed", right: 0 }}>
          <ColorPad
            type={"hex"} // one of 'hex', 'rgb', or 'hsl'
            colors={colors} // object with colorName: colorValue pairs
            onChange={onColorChange} // (newColorValue, colorName) => {...}
          />
        </div>
        // ... rest of app
      </div>
    )

  }
}

```

<!-- [build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo -->
