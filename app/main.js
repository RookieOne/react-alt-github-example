var React = require("react")
var $ = require("jquery")
var Router = require("react-router")
var routes = require("./routes.jsx")

$(function() {
  Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body);
  })
})
