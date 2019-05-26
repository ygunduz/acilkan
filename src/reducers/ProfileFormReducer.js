import { 
    PROFILE_UPDATED 
} from '../actions/types';

const INITIAL_STATE = {
    district: 'Adalar',
    bloodGroup: 'A+',
    name: '',
    surname: '',
    phone: '',
    adress: '',
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROFILE_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value }
        default:
            return state;
    }
}