var React = require("react")
var { Link } = require("react-router")

module.exports = React.createClass({
  render() {
    return (
      <div className="col s6">
        <div className="card blue darken-2 z-depth-2 animated flipInY">
          <div className="card-content white-text">
            <Link to="repo-details" params={{ owner: this.props.repo.owner.login, name: this.props.repo.name }}>
              <span className="card-title">{ this.props.repo.name }</span>
            </Link>
            <br />
            { this.props.repo.full_name }
            <br />
            by { this.props.repo.owner.login }
          </div>
          <div className="card-action">
            <Link to="repo-details" params={{ owner: this.props.repo.owner.login, name: this.props.repo.name }}>
              details
            </Link>
          </div>
        </div>
      </div>
    )
  }
})
