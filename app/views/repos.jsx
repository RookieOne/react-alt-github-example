var React = require("react/addons")
var superagent = require("superagent")
var RepoCard = require("./repo-card.jsx")
var ReposStore = require("../stores/repos-store.js")
var ReposActions = require("../actions/repos-actions.js")

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return ReposStore.getState()
  },
  componentWillMount() {
    ReposStore.listen(this.onChange)
  },
  componentWillUnmount() {
    ReposStore.unlisten(this.onChange)
  },
  onChange() {
    this.setState(ReposStore.getState())
  },
  search(evt) {
    evt.preventDefault()
    var searchText = this.refs.searchText.getDOMNode().value
    ReposActions.search(searchText)
  },
  renderRepos() {
    return this.state.repos.map((repo) => {
      return (
        <RepoCard repo={repo} />
      )
    })
  },
  renderLoading() {
    if (this.state.loading) {
      return (
        <div className="progress blue darken-2">
          <div className="indeterminate blue lighten-3"></div>
        </div>
      )
    } else {
      return ""
    }
  },
  render() {
    return (
      <div>
        <form onSubmit={this.search}>
          <div className="input-field">
            <label>Search GitHub Repos</label>
            <input type="text" ref="searchText"  />
          </div>
        </form>

        { this.renderLoading() }

        <div className="row">
          { this.renderRepos() }
        </div>
      </div>
    )
  }
})
