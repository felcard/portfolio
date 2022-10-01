function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const pads = [
{
  id: "Cymbals",
  loc: "samples/cymbals.mp3",
  locRev: "samples/cymbals-rev.mp3",
  txt: "Q",
  key: 81 },

{
  id: "Tom3",
  loc: "samples/tom3.mp3",
  locRev: "samples/tom3-rev.mp3",
  txt: "W",
  key: 87 },

{
  id: "Tom2",
  loc: "samples/tom2.mp3",
  locRev: "samples/tom2-rev.mp3",
  txt: "E",
  key: 69 },

{
  id: "Tom",
  loc: "samples/tom.mp3",
  locRev: "samples/tom-rev.mp3",
  txt: "A",
  key: 65 },

{
  id: "Snares3",
  loc: "samples/snares3.mp3",
  locRev: "samples/snares3-rev.mp3",
  txt: "S",
  key: 83 },

{
  id: "Snares",
  loc: "samples/snares.mp3",
  locRev: "samples/snares-rev.mp3",
  txt: "D",
  key: 68 },

{
  id: "kick",
  loc: "samples/kick.mp3",
  locRev: "samples/kick-rev.mp3",
  txt: "Z",
  key: 90 },

{
  id: "Hi-Hat",
  loc: "samples/hi-hat.mp3",
  locRev: "samples/hi-hat-rev.mp3",
  txt: "X",
  key: 88 },

{
  id: "Snares2",
  loc: "samples/snares2.mp3",
  locRev: "samples/snares2-rev.mp3",
  txt: "C",
  key: 67 }];


class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { display: "B-VOX", rev: true });_defineProperty(this, "whatKey",






    e => {
      const keyPad = pads.find(pad => pad.key === e.keyCode);
      if (keyPad) {
        this.setState({ display: keyPad.id });
        document.getElementById(String.fromCharCode(keyPad.key)).currentTime = 0;
        document.getElementById(String.fromCharCode(keyPad.key)).play();
      }
    });_defineProperty(this, "onRevSwitch",
    () => {
      this.setState({ rev: !this.state.rev });
    });}componentDidMount() {document.addEventListener("keydown", this.whatKey);}componentWillUnmount() {document.removeEventListener("keydown", this.whatkey);}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("div", { className: "outter" }, /*#__PURE__*/
      React.createElement(DrumPad, {
        dSounds: pads,
        display: pad => this.setState({ display: pad }),
        revState: this.state.rev })), /*#__PURE__*/


      React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement(Display, { display: this.state.display })), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("p", { id: "effectTxt" }, "EFFECT"), /*#__PURE__*/
      React.createElement(RevSwitch, { revSwitch: this.onRevSwitch })));


  }}


const DrumPad = ({ dSounds, display, revState }) => {
  const clicked = pad => {
    display(pad.id);
    document.getElementById(pad.txt).currentTime = 0; //starts playing from 0 sec
    document.getElementById(pad.txt).play();
  };
  return dSounds.map(pad => {
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-pad btn", id: pad.id, onClick: () => clicked(pad) }, /*#__PURE__*/
      React.createElement("audio", {
        id: pad.txt,
        src: revState === true ? pad.loc : pad.locRev,
        className: "clip" }),

      pad.txt));


  });
};

const Display = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "displayCont" }, /*#__PURE__*/
    React.createElement("div", { id: "screen", className: "disable-select" }), /*#__PURE__*/
    React.createElement("div", { id: "screen2", className: "disable-select" },
    props.display)));



};

class RevSwitch extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { switch: "rev-switch", toggle: true });_defineProperty(this, "onSwitchChange",
    () => {
      if (this.state.toggle) {
        this.setState({ switch: "rev-switch-right" });
      } else {
        this.setState({ switch: "rev-switch" });
      }
      this.setState({ toggle: !this.state.toggle });
      this.props.revSwitch();
    });}
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: this.state.switch }, /*#__PURE__*/
      React.createElement("div", { id: "inner-rev", className: "btn", onClick: this.onSwitchChange })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));
