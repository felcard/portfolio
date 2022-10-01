function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const keypad = [
{ id: "seven", d: "7", txt: "7", class: "boton" },
{ id: "eight", d: "8", txt: "8", class: "boton" },
{ id: "nine", d: "9", txt: "9", class: "boton" },
{ id: "del", d: "del", txt: "DEL", class: "op" },
{ id: "clear", d: "ac", txt: "AC", class: "op" },
{ id: "four", d: "4", txt: "4", class: "boton" },
{ id: "five", d: "5", txt: "5", class: "boton" },
{ id: "six", d: "6", txt: "6", class: "boton" },
{ id: "multiply", d: "*", txt: "x", class: "op", type: true },
{ id: "divide", d: "/", txt: "/", class: "op", type: true },
{ id: "one", d: "1", txt: "1", class: "boton" },
{ id: "two", d: "2", txt: "2", class: "boton" },
{ id: "three", d: "3", txt: "3", class: "boton" },
{ id: "add", d: "+", txt: "+", class: "op", type: true },
{ id: "subtract", d: "-", txt: "-", class: "op", type: true, take: true },
{ id: "zero", d: "0", txt: "0", class: "zero" },
{ id: "decimal", d: ".", txt: ".", class: "boton" },
{ id: "equals", d: "=", txt: "=", class: "eq" }];

console.clear();
class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { disp1: "", disp2: "0", flag: false });_defineProperty(this, "onKeyPress",

    pad => {
      if (pad.d === "del") {
        if (this.state.disp1.length === 1) {
          this.setState({ disp1: "" });
          this.setState({ disp2: 0 });
          return;
        }
        let count1 = this.state.disp1.length;
        let temp1 = this.state.disp1.substr(0, count1 - 1); //subtract character set from string
        let count2 = this.state.disp2.length;
        let temp2 = this.state.disp2.substr(0, count2 - 1);
        this.setState({ disp1: temp1 });
        this.setState({ disp2: temp2 });
        return;
      }

      if (pad.d === "ac") {
        this.setState({ disp1: "", disp2: "0", flag: false });
        return;
      }

      if (pad.d === "=" && !/=/.test(this.state.disp1)) {
        this.setState(stat => {
          let res = 0;
          res = `${stat.disp1}=${result(stat.disp1)}`;
          return { disp1: res };
        });
        this.setState({ disp2: result(this.state.disp1) });
        return;
      }
      //////////below makes sure disp2 display numbers and op signs and results one at the time
      if (/\d|\./.test(pad.d)) {
        if (!this.state.flag) {
          this.setState({ flag: true });
          this.setState({ disp2: "" });
        }
        this.setState(stat => {
          let trimmed = /\d*\.\d*\.\d*/.test(stat.disp2 + pad.d) ?
          stat.disp2 :
          stat.disp2 + pad.d;
          trimmed = trimmed.replace(/(^0)(\d)/, "$2");
          return { disp2: trimmed.replace(/(^\.)/, "0$1") };
        });
      } else {
        console.log(this.state.flag);
        if (this.state.flag) {
          this.setState({ flag: false });
        }
        this.setState({ disp2: pad.d });
      }

      ////////////////////////////////////////////////////////////////////////////

      if (/=/.test(this.state.disp1) && !/\d|=/.test(pad.d)) {
        let equal = this.state.disp2;
        this.setState({ disp1: equal + pad.d });
        return;
      } else if (/=/.test(this.state.disp1)) {
        this.setState({ disp1: pad.d, disp2: pad.d, flag: false });
        return;
      }

      let helper = this.regTest(this.state.disp1 + pad.d);
      this.setState({ disp1: helper });
    });_defineProperty(this, "regTest",

    eq => {
      if (/ac/.test(eq)) {
        return eq = "";
      }
      if (!/\D*\d*\.\d*\.\d*\D*/g.test(eq) && !/\*--/.test(eq)) {//no more than one decimal point and no *--
        return eq.
        replace(/(^0)(\d)/, "$2").
        replace(/(\D)(\D)(\D)/, "$3").
        replace(/([\+*\/-])(\.)/g, "$10$2").
        replace(/^(\.)/g, "0$1").
        replace(/(-)(-)/g, "+").
        replace(/(\+)(-)/g, "$2").
        replace(/(\.)([\+\/*-])([\+\/*])/g, "$1$3").
        replace(/([\+\/*-])([\+\/*])/g, "$2");
      } else {
        return this.state.disp1;
      } //if we enter . after 0.
    });}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "title" }, "FunkCulator"), /*#__PURE__*/
      React.createElement("div", { id: "cont" }, /*#__PURE__*/
      React.createElement(Display, { disp1: this.state.disp1, disp2: this.state.disp2 }), /*#__PURE__*/
      React.createElement("div", { id: "board" }, /*#__PURE__*/
      React.createElement(KeyNum, { keys: keypad, onPress: this.onKeyPress }))), /*#__PURE__*/


      React.createElement("div", { id: "sign" }, "by F C Neme")));


  }}


const KeyNum = ({ onPress, keys }) => {
  return keys.map(pad => {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: pad.id,
        className: `btn ${pad.class}`,
        onClick: () => onPress(pad) },

      pad.txt));


  });
};

const Display = ({ disp1, disp2 }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "master-disp" }, /*#__PURE__*/
    React.createElement("p", { id: "d-one", className: "disable-select" },
    disp1), /*#__PURE__*/

    React.createElement("p", { id: "display", className: "disable-select" },
    disp2)));



};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));

//////////////////////////Calculator Logic Functions////////////////////////////////////

const digitizer = eq => {
  return eq.
  replace(/([-+*/])([+*/])/g, "$2").
  replace(/(\W)(\W)/g, "_$1_$2").
  replace(/(\d)([-+*/])(\d)/g, "$1_$2_$3").
  replace(/(\d)([-+*/])(\d)/g, "$1_$2_$3").
  replace(/(\d)([\*/])(\d)/g, "$1_$2_$3").
  replace(/([-+*/]$)/g, "_$1").
  split("_");
};

const parser = arr => {//this parses numbers in string format to float
  let arr1 = [];
  for (let i = 0; i < arr.length; i++) {
    if (
    arr[i] !== "+" &
    arr[i] !== "-" &
    arr[i] !== "*" &
    arr[i] !== "/")
    {
      arr1[i] = parseFloat(arr[i]);
    } else {
      arr1[i] = arr[i];
    }
  }
  return arr1;
};

const formLog = arr => {console.log(arr);
  let aux = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] === "*" && arr[i + 2]) {
      aux.push(arr[i] * arr[i + 2]);
      i += 3;
    }
    if (arr[i + 1] === "/" && arr[i + 2]) {
      aux.push(arr[i] / arr[i + 2]);
      i += 3;
    }
    arr[i] !== undefined && aux.push(arr[i]);
  }
  return typeof aux[aux.length - 1] === "number" ?
  aux :
  aux.splice(0, aux.length - 1);
};

function eqRed(arr) {
  const total = arr.reduce((prev, curr, ind, arr) => {
    return curr === "/" ?
    prev / arr[ind + 1] :
    curr === "+" ?
    prev + arr[ind + 1] :
    curr === "-" ?
    prev - arr[ind + 1] :
    curr === "*" ?
    prev * arr[ind + 1] :
    prev;
  });
  return total;
}
const result = exp => {
  return eqRed(formLog(formLog(parser(digitizer(exp)))));
}; //formLog is executed twice to resolve the case where / and * are consecutive in an equation