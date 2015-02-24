var React = require("react")
var { Link } = require("react-router")

module.exports = React.createClass({
  render() {
    return (
      <nav className="blue darken-2">
        <div className="nav-wrapper container">
          <Link to="repos" className="brand-logo">React + Flux</Link>
        </div>
      </nav>
    )
  }
})
