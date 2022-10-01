function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const renderer = {
  link(href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
  } };

marked.use({
  breaks: true,
  renderer });


class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { input: cont });_defineProperty(this, "onInputChange",

    e => {
      this.setState({ input: e.target.value });
      console.log(this.state);
    });}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container-fluid", id: "box" }, /*#__PURE__*/
      React.createElement("h1", { id: "title", className: "text-center" }, /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-code" }), "\xA0 MARKDOWN EDITOR"), /*#__PURE__*/


      React.createElement(Editor, {
        onTxtChange: this.onInputChange,
        updatedTxt: this.state.input }), /*#__PURE__*/

      React.createElement("h2", { id: "sub", className: "text-center" }, "PREVIEW BOX"), /*#__PURE__*/
      React.createElement(Preview, { toMark: this.state.input })));


  }}


const Editor = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "editorCont" }, /*#__PURE__*/
    React.createElement("textarea", {
      className: "form-control",
      id: "editor",
      type: "text",
      value: props.updatedTxt,
      onChange: e => props.onTxtChange(e) })));



};

const Preview = props => {
  const markTxt = marked.parse(props.toMark);
  console.log(markTxt);
  return /*#__PURE__*/(
    React.createElement("div", { id: "prevCont" }, /*#__PURE__*/
    React.createElement("div", {
      className: "txt",
      dangerouslySetInnerHTML: { __html: markTxt },
      id: "preview" })));



};

const cont = `# Main Headings with 1 x hash 
## Sub Headings with 2 x hash 
Link text between square brackets [links](www.dolcemaria.co.uk) followed by the url between parentheses 
A line of code\`<div>Hi There</div>\` between two backticks
A Block of code between **3** backticks 
\`\`\`
render() { 
return ( 
<div className="container-fluid" id="box"> 
<Editor onTxtChange={this.onInputChange} updatedTxt={this.state.input} /><Preview toMark={this.state.input} /></div>
);}
\`\`\` 
**Write a list as you would in a piece of paper and as all items were number one priority** 
1. Item one 
1. Item two 
1. Item three 

> Beautiful Block Quotes using only right angle bracket

**Bold text surrounded by 2 pairs of asterixs** 
***
Image caption between square brackets followed by the image's URL within parentheses
![Imagine](https://as1.ftcdn.net/v2/jpg/04/97/04/52/1000_F_497045260_Uz9JJgWmF1zGDVBep7J1h3gy07fo6xTz.jpg)`;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));