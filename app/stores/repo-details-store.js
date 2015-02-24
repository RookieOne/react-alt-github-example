var alt = require("../alt-application.js")
var ReposActions = require("../actions/repos-actions.js")

class RepoDetailsStore {
  constructor() {
    this.repo = {}

    this.bindAction(ReposActions.repoFetched, this.onRepoFetched)
  }
  onRepoFetched(repo) {
    console.log(repo)
    this.repo = repo
  }
}

module.exports = alt.createStore(RepoDetailsStore)
