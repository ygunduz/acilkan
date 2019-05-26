import { 
    REQUEST_FORM_UPDATED,
    CLEAR_REQUEST_FORM 
} from '../actions/types';

const INITIAL_STATE = {
    district: 'Adalar',
    bloodGroup: 'A+',
    hospital: '',
    description: '',
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case REQUEST_FORM_UPDATED:
            return { ...state, [action.payload.prop]: action.payload.value }
        case CLEAR_REQUEST_FORM:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}