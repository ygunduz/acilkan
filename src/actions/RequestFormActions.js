import { REQUEST_FORM_UPDATED } from './types';

export const requestFormUpdated = ({ prop, value }) => {
    return {
        type: REQUEST_FORM_UPDATED,
        payload: { prop, value }
    }
}