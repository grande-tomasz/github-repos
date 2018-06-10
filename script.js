/**
 * Function that runs when the whole document is loaded
 */
const load = () => {
  // get all elements with repos tag
  const repos = document.querySelectorAll("repos");

  // loop through each repos element
  repos.forEach(repoElement => {
    try {
      if (repoElement.dataset.user) {
        const user = repoElement.dataset.user;
        const update = repoElement.dataset.update;

        const apiUrl = "https://api.github.com";
        fetch(`${apiUrl}/users/${user}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw "No user in GitHub with specified login";
            }
          })
          .then(resJson => {
            const userName = resJson.name ? resJson.name : resJson.login;
            // return fetch from repos API to chain promise
            fetch(`${apiUrl}/users/${user}/repos`)
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
              })
              .then(resJson => {
                let updatedRepos = [];
                if (update !== undefined) {
                  // when repo date has been specified get only repos after that date
                  updatedRepos = resJson.filter(
                    repo => repo.updated_at >= update
                  );
                } else {
                  // when repo date has not been specified get all repos
                  updatedRepos = resJson;
                }
                /**
                 * Generated tbody inner HTML based on the user repositories data
                 * @type {string}
                 */
                const tableData = updatedRepos.reduce((accumulator, repo) => {
                  accumulator += `
    <tr>
      <td>${repo.name}</td>
      <td>${repo.description}</td>
      <td>${new Date(repo.updated_at).toLocaleString()}</td>
      <td><a href="${repo.html_url}/archive/master.zip">Download</a></td>
    </tr>`;
                  return accumulator;
                }, "");

                const repoDiv = document.createElement("div");
                repoDiv.innerHTML = `<h1>${userName}</h1>
  <table>
  <thead>
    <tr>
      <th>Repository name</th>
      <th>Repository description</th>
      <th>Repository updated at</th>
      <th>Download link</th>
    </tr>
  </thead>
  <tbody>${tableData}
  </tbody>
  </table>
  `;
                console.log(repoDiv);
                const parentNode = repoElement.parentNode;
                parentNode.replaceChild(repoDiv, repoElement);
              });
          })

          // log when there is no GitHub user with the specified login
          .catch(error => console.log(error.message ? error.message : error));
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
