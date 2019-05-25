import { 
    REQUEST_FORM_UPDATED 
} from '../actions/types';

const INITIAL_STATE = {
    district: 'Adalar',
    bloodGroup: 'A+',
    hospital: 'Acıbadem Maslak Hastanesi',
    description: '',
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case REQUEST_FORM_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value }
        default:
            return state;
    }
}