const state = ({ action, message }) => {
  const actions = [];

  return (action) => {
    actions.push(action);
  };
};


export default state;