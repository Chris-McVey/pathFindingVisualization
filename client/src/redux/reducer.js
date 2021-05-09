const initialState = {
  grid: [],
  mouseIsPressed: false,
  startNodeRow: 10,
  startNodeCol: 15,
  finishNodeRow: 10,
  finishNodeCol: 36,
  startPickedUp: false,
  finishPickedUp: false,
};

const reduxReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reduxReducer;
