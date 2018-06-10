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
            console.log(userName);
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
