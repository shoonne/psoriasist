import { CHANGE_MEDICIN_TEXT } from './types';
export const changeMedicinText = (text) => {
    return {
        type: CHANGE_MEDICIN_TEXT,
        payload: text 
    };
}