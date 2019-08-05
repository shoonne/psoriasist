import {ADD_DOCTORS_NOTE} from './types';
export const addNote = (text) => {
    return {
        type: ADD_DOCTORS_NOTE ,
        payload: text
    }
}