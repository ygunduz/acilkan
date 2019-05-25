import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DistrictReducer from './DistrictReducer';
import BloodGroupReducer from './BloodGroupReducer';
import ProfileFormReducer from './ProfileFormReducer';
import HospitalReducer from './HospitalReducer';
import RequestFormReducer from './RequestFormReducer';

export default combineReducers({
    auth: AuthReducer,
    districts: DistrictReducer,
    bloodGroups: BloodGroupReducer,
    profileForm: ProfileFormReducer,
    hospitals: HospitalReducer,
    requestForm: RequestFormReducer
});