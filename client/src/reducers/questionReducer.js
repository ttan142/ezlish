import * as types from '../constant/Question/questionConstant';



export const questionReducer = (state = { questions: [] }, action) => {
    switch (action.type) {
        case types.QUESTION_REQUEST:
            return { loading: true, questions: [] };
        case types.QUESTION_SUCCESS:
            return {
                loading: false,
                questions: action.payload
            };
        case types.QUESTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
