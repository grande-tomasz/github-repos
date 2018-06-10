"use strict";

/**
 * Fetch required data from GitHub API for the given user
 * @param {Element} repoElement - HTML repos element
 */
var fetchRepoData = function fetchRepoData(repoElement) {
  var user = repoElement.dataset.user;
  var update = repoElement.dataset.update;

  var apiUrl = "https://api.github.com";
  fetch(apiUrl + "/users/" + user).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw "No user in GitHub with specified login: " + user;
    }
  }).then(function (resJson) {
    var userName = resJson.name ? resJson.name : resJson.login;
    fetch(apiUrl + "/users/" + user + "/repos").then(function (response) {
      if (response.ok) {
        return response.json();
      }
    }).then(function (resJson) {
      var updatedRepos = [];
      if (update !== undefined) {
        // when repo date has been specified get only repos after that date
        updatedRepos = resJson.filter(function (repo) {
          return repo.updated_at >= update;
        });
      } else {
        // when repo date has not been specified get all repos
        updatedRepos = resJson;
      }
      /**
       * Generated tbody inner HTML based on the user repositories data
       * @type {string}
       */
      var tableData = updatedRepos.reduce(function (accumulator, repo) {
        accumulator += "\n      <tr>\n        <td>" + repo.name + "</td>\n        <td>" + repo.description + "</td>\n        <td>" + new Date(repo.updated_at).toLocaleString() + "</td>\n        <td><a class=\"md-btn\" href=\"" + repo.html_url + "/archive/master.zip\">Download</a></td>\n      </tr>";
        return accumulator;
      }, "");

      var repoDiv = document.createElement("div");
      repoDiv.classList.add("repo");
      repoDiv.innerHTML = "<h1>" + userName + "</h1>\n  <table>\n    <thead>\n      <tr>\n        <th>Repository name</th>\n        <th>Repository description</th>\n        <th>Repository updated at</th>\n        <th>Download link</th>\n      </tr>\n    </thead>\n    <tbody>" + tableData + "\n    </tbody>\n  </table>\n  ";
      var parentNode = repoElement.parentNode;
      parentNode.replaceChild(repoDiv, repoElement);
    });
  })

  // log when there is no GitHub user with the specified login
  .catch(function (error) {
    return console.log(error.message ? error.message : error);
  });
};

/**
 * Function that runs when the whole document is loaded
 */
var load = function load() {
  // get all elements with repos tag
  var repos = document.querySelectorAll("repos");

  // loop through each repos element
  repos.forEach(function (repoElement) {
    try {
      if (repoElement.dataset.user) {
        fetchRepoData(repoElement);
      } else {
        throw "No user data specified in repos element";
      }
    } catch (e) {
      // log when repos element did not have user information
      console.log(e, repoElement);
      return;
    }
    // when there is no update data then it gets undefined
  });
};

window.onload = load;
