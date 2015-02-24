var $ = require("jquery")
var React = require("react")

var App = require("./views/app.jsx")

$(function() {
  console.log("It works booyah")
  React.render(<App />, document.body)
})
