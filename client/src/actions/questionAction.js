import axios from 'axios';
import * as types from '../constant/Question/questionConstant';

export const getQuestions = (testId) => async (dispatch) => {

    try {

        dispatch({ type: types.QUESTION_REQUEST });


        const  {data} = await axios.get('http://localhost:5000/api/questions/'.concat(testId.toString()));


        dispatch({
            type: types.QUESTION_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: types.QUESTION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

}