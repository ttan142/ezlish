import * as types from '../constant/Test/testConstant';



export const testListReducer = (state = { tests: []}, action) => {
    switch (action.type) {
        case types.TEST_REQUEST:
            return { loading: true, tests: [] };
        case types.TEST_SUCCESS:
            return {
                loading: false,
                tests: action.payload
            };
        case types.TEST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
