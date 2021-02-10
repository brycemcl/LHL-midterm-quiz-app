const state = (() => {
  const startingURL = document.location;
  const actions = [];
  return (action) => {
    actions.push(action);
    console.log(actions);
    return { actions, startingURL };
  };
})();


export default state;