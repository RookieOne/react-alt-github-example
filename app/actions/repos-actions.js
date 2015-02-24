var alt = require("../alt-application.js")
var superagent = require("superagent")

class ReposActions {
  search(searchText) {
    superagent.get("https://api.github.com/search/repositories")
      .query({ q: searchText })
      .send()
      .end((response) => {
        this.actions.searchSuccess(response.body.items)
      })
    this.dispatch()
  }
  searchSuccess(repos) {
    this.dispatch(repos)
  }
  fetchRepo(owner, repoName) {
    superagent.get(`https://api.github.com/repos/${owner}/${repoName}`)
      .send()
      .end((response) => {
        this.actions.repoFetched(response.body)
      })
  }
  repoFetched(repo) {
    this.dispatch(repo)
  }
}

module.exports = alt.createActions(ReposActions)
