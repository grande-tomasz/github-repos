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
        console.log(user);
      } else {
        throw "No user data specified in repos element";
      }
    } catch (e) {
      // log when repos element did not have user information
      console.log(e, repoElement);
      return;
    }
    // when there is no update data then it gets undefined
    const update = repoElement.dataset.update;
    console.log(update);
  });
};
window.onload = load;
