import { combineReducers } from 'redux';

import {
    userLoginReducer,
    userRegisterReducer
} from './userReducer';
import {
    testListReducer,
} from './testReducers';

import {
    questionReducer,
} from './questionReducer';

const reducer = combineReducers({
    testList: testListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    questionList:questionReducer
})
export default reducer;