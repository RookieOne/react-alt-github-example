var alt = require("../alt-application.js")
var ReposActions = require("../actions/repos-actions.js")

class ReposStore {
  constructor() {
    this.repos = []
    this.loading = false
    this.bindAction(ReposActions.search, this.onSearch)
    this.bindAction(ReposActions.searchSuccess, this.onSearchSuccess)
  }
  onSearch() {
    this.loading = true
  }
  onSearchSuccess(repos) {
    this.loading = false
    this.repos = repos
  }
}

module.exports = alt.createStore(ReposStore)
