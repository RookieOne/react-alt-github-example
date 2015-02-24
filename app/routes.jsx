var React = require("react")
var Router = require("react-router")
var { Route } = Router
var App = require("./views/app.jsx")
var Repos = require("./views/repos.jsx")
var RepoDetails = require("./views/repo-details.jsx")

module.exports = (
  <Route handler={App}>
    <Route name="repos" handler={Repos} path="/" />
    <Route name="repo-details" handler={RepoDetails} path="/repo/:owner/:name" />
  </Route>
)
