import {ADD_DOCTORS_NOTE} from './../actions/types';
export default (state = [],action) => {

    // Do something depending on the action type.
    switch ((action.type)) {
        case ADD_DOCTORS_NOTE:
            return action.payload;
        default:
            return state;
    }
}