import { 
    PROFILE_UPDATED 
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    surname: '',
    phone: '',
    adress: '',
    district: '',
    bloodGroup: '',
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