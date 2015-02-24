var React = require("react")
var RepoDetailsStore = require("../stores/repo-details-store.js")
var { State, Link } = require("react-router")
var ReposActions = require("../actions/repos-actions.js")

module.exports = React.createClass({
  mixins: [State],
  getInitialState() {
    return RepoDetailsStore.getState()
  },
  componentWillMount() {
    RepoDetailsStore.listen(this.onChange)
    var params = this.getParams()
    ReposActions.fetchRepo(params.owner, params.name)
  },
  componentWillUnmount() {
    RepoDetailsStore.unlisten(this.onChange)
  },
  onChange() {
    this.setState(RepoDetailsStore.getState())
  },
  render() {
    return (
      <div id="repo-details">
        <Link to="repos">Back</Link>
        <div className="animated bounceInRight">
          <div className="page-header">
            <h1>{ this.state.repo.name }</h1>
          </div>
          <a href={ this.state.repo.html_url } target="_blank">{this.state.repo.html_url}</a>
          <h4>{ this.state.repo.description }</h4>
          <ul className="collection">
            <li className="collection-item">
              Forks
              <span className="badge">
                { this.state.repo.forks }
                <i className="fa fa-code-fork"></i>
              </span>
            </li>
            <li className="collection-item">
              Issues
              <span className="badge">
                { this.state.repo.open_issues }
                <i className="fa fa-exclamation-circle"></i>
              </span>
            </li>
            <li className="collection-item">
              Watchers
              <span className="badge">
                { this.state.repo.watchers }
                <i className="fa fa-eye"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
})
