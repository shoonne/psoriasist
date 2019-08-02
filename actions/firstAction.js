import { CHANGE_DOKTOR_NOTE_TEXT } from './types';
export const changeTextHandler = (text) => {
    return {
        type: CHANGE_DOKTOR_NOTE_TEXT,
        payload: text 
    };
}