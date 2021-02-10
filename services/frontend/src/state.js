const state = (() => {
  const actions = [];

  return (action) => {
    actions.push(action);
    return actions;
  };
})();


export default state;