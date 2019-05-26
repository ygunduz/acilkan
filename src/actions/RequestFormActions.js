import { REQUEST_FORM_UPDATED, CLEAR_REQUEST_FORM } from './types';

export const requestFormUpdated = ({ prop, value }) => {
    if(prop === 'hospital' && !value){
        value = '';
    }
    
    return {
        type: REQUEST_FORM_UPDATED,
        payload: { prop, value }
    }
}

export const clearRequestForm = () => {
    return {
        type: CLEAR_REQUEST_FORM
    }
}