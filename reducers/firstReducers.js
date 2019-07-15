const initialState = {
    text: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_MEDICIN_TEXT":
            return action.payload;
        default:
            return state;
    }
}