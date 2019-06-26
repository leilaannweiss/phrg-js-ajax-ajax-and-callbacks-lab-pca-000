const base = "https://api.github.com"
$(document).ready(function (){
});

function searchRepositories() {
  let searchTerm = $("#searchTerms").val()
  let uri = `${base}/search/repositories?q=${searchTerm}`
  $.get(uri, function(response) {
    const repoList = response.items.map(function(responseItem){ return( "<p>" + responseItem.name + "</p>"
      + "<p>" + '<a href="#" data-repository="' + responseItem.name + '" data-owner="' + responseItem.owner.login + '" onclick="showCommits(this)">Get Commits</a>'  + "</p>")}).join("")

      $("#results").html(repoList)
    }).fail(function(error){
  displayError()
  })
}

function showCommits(commit) {
  const owner = commit.dataset.owner
  const repo = commit.dataset.repository
  const uri = `${base}/repos/${owner}/${repo}/commits`
    $.get(uri, function(response) {
    const commitList = response.map(function(responseItem) {
      return(
        `<p> ${responseItem.sha} </p>`
      )
    }).join("")
  $("#details").html(commitList)
  })
}

function displayError(error) {
  $("#errors").html(`I'm sorry, there's been an error. Please try again.`)
}
