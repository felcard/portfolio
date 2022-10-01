function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}console.clear();
class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      break: 5,
      session: 25,
      display: [25, ":", 0, 0],
      label: "Session",
      intID: 0,
      count: 60,
      flag: true,
      temp: 25,
      zero: "" });_defineProperty(this, "onClick",


    (e, b) => {
      if (!this.state.flag) {
        return;
      }
      if (e.title === "Break") {
        if (b === "break-increment" && this.state.break < 60) {
          this.setState(stat => {
            if (this.state.label === "Break") {
              return {
                break: stat.break + 1,
                display: [stat.break + 1, ":", 0, 0],
                count: 60 };

            } else {
              return {
                break: stat.break + 1
                //count: 60
              };
            }
          });
        } else if (b === "break-decrement" && this.state.break > 1) {
          this.setState(stat => {
            if (this.state.label === "Break") {
              return {
                break: stat.break - 1,
                display: [stat.break - 1, ":", 0, 0],
                count: 60 };

            } else {
              return {
                break: stat.break - 1
                //count: 60
              };
            }
          });
        }
      } else if (e.title === "Session") {
        if (b === "session-increment" && this.state.session < 60) {
          this.setState(stat => {
            if (this.state.label === "Session") {
              return {
                session: stat.session + 1,
                display: [stat.session + 1, ":", 0, 0],
                count: 60 };

            } else {
              return {
                session: stat.session + 1
                //count: 60
              };
            }
          });
        } else if (b === "session-decrement" && this.state.session > 1) {
          this.setState(stat => {
            if (this.state.label === "Session") {
              return {
                session: stat.session - 1,
                display: [stat.session - 1, ":", 0, 0],
                count: 60 };

            } else {
              return {
                session: stat.session - 1
                //count: 60
              };
            }
          });
        }
      }
      /////////////////////below use of setState and the current updated version of state
      //////////////////////Is worth noting
      this.setState(stat => {
        if (stat.display[0] < 10) {
          //here we access current value of display
          return { zero: 0 };
        } else {
          return { zero: "" };
        }
      });
      //////////////////////////////////////////////////////
    });_defineProperty(this, "onTimeStart",

    () => {
      //let surro = this.state.label.toLowerCase();
      this.setState({ temp: this.state.display[0] });
      ////if (this.state[surro] === 1) this.setState({ temp: 0 });
      clearInterval(this.state.intID);
      if (this.state.flag) {
        this.setState(stat => {
          return { flag: !stat.flag };
        });

        let count = this.state.count;
        let intClr = setInterval(() => {
          if (count === 0) {
            count = 60;
          }
          if (count === 60) {
            this.setState(stat => {
              return { temp: stat.temp - 1 };
            });
          }

          count !== -1 && count--;

          if (count < 10 && count !== -1) {
            this.setState({ display: [this.state.temp, ":", 0, count] });
          } else if (count === -1) {
            this.setState({ display: [this.state.temp, ":", 0, 0] });
          } else {
            this.setState({ display: [this.state.temp, ":", count] });
          }

          if (count === -1) {
            if (this.state.label === "Session") {
              this.setState({ label: "Break" });
            } else {
              this.setState({ label: "Session" });
            }
            count = 60;
          }

          this.setState({ count: count });
          if (count === 0 && this.state.display[0] === 0) {
            document.getElementById("beep").currentTime = 0;
            document.getElementById("beep").play();
            if (this.state.label === "Session") {
              this.setState({ temp: this.state.break });
            } else {
              this.setState({ temp: this.state.session });
            }
            count = -1;
          }
          this.setState(stat => {
            if (stat.display[0] < 10) {
              //here we access current value of display
              return { zero: 0 };
            } else {
              return { zero: "" };
            }
          });
        }, 1000);
        this.setState({ intID: intClr });
      } else {
        this.setState(stat => {
          return { flag: !stat.flag };
        });
      }
    });_defineProperty(this, "onReset",

    () => {
      clearInterval(this.state.intID);
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
      this.setState({
        break: 5,
        session: 25,
        display: [25, ":", 0, 0],
        label: "Session",
        intID: 0,
        count: 60,
        flag: true,
        temp: 25,
        zero: "" });

    });}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "cont" }, /*#__PURE__*/
      React.createElement("p", { id: "title" }, "25+5 CLOCK"), /*#__PURE__*/
      React.createElement("div", { id: "board-wide" }, /*#__PURE__*/
      React.createElement(Config, {
        type: "break-label",
        title: "Break",
        set: this.state.break,
        btnUp: "break-increment",
        btnDown: "break-decrement",
        lengthDisp: "break-length",
        onClick: this.onClick }), /*#__PURE__*/

      React.createElement(Config, {
        type: "session-label",
        title: "Session",
        set: this.state.session,
        btnUp: "session-increment",
        btnDown: "session-decrement",
        lengthDisp: "session-length",
        onClick: this.onClick })), /*#__PURE__*/


      React.createElement(Disp, {
        label: this.state.label,
        counter: this.state.display,
        zero: this.state.zero }), /*#__PURE__*/

      React.createElement(Switch, { onTimeStart: this.onTimeStart }), /*#__PURE__*/
      React.createElement(Reset, { onReset: this.onReset }), /*#__PURE__*/
      React.createElement("br", null), "by f c Neme"));



  }}


const Disp = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "disp" }, /*#__PURE__*/
    React.createElement("div", { id: "timer-label" }, props.label), /*#__PURE__*/
    React.createElement("div", { id: "time-left" },
    props.zero,
    props.counter)));



};

const Config = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "board" }, /*#__PURE__*/
    React.createElement("div", { id: props.type }, props.title), /*#__PURE__*/
    React.createElement("div", { id: "key-pad" }, /*#__PURE__*/
    React.createElement("div", { id: props.lengthDisp, className: "pad" },
    props.set), /*#__PURE__*/

    React.createElement("div", { className: "pad" }, /*#__PURE__*/
    React.createElement("div", {
      id: props.btnUp,
      className: "btn-up btn",
      onClick: () => props.onClick(props, props.btnUp) }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-caret-up" })), /*#__PURE__*/

    React.createElement("div", {
      id: props.btnDown,
      className: "btn-down btn",
      onClick: () => props.onClick(props, props.btnDown) }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-caret-down" }))))));





};

const Switch = ({ onTimeStart }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "start_stop", onClick: onTimeStart, className: "btn" }, /*#__PURE__*/
    React.createElement("i", { class: "fa-solid fa-play" }), /*#__PURE__*/
    React.createElement("i", { class: "fa-solid fa-pause" }), /*#__PURE__*/
    React.createElement("audio", { id: "beep", src: "sound/beep.mp3" })));


};

const Reset = ({ onReset }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "reset", onClick: onReset, className: "btn" }, /*#__PURE__*/
    React.createElement("i", { class: "fa-solid fa-arrows-spin" })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));
