import { REQUEST_FORM_UPDATED } from './types';

export const requestFormUpdated = ({ prop, value }) => {
    if(prop === 'hospital' && !value){
        value = '';
    }
    
    return {
        type: REQUEST_FORM_UPDATED,
        payload: { prop, value }
    }
}