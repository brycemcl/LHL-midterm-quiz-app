const state = (() => {
  const actions = [];
  return (action) => {
    actions.push(action);
    console.log(actions);
    return actions;
  };
})();


export default state;