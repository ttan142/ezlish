import axios from 'axios';
import * as types from '../constant/Test/testConstant';
import TokenService from '../utils/tokenService'
import api from "../config/axios"
export const listTests = () => async (dispatch) => {
    
    try {
        
        dispatch({ type: types.TEST_REQUEST });
     

        const { data } = await api.get('/test/toeic');


        dispatch({
            type: types.TEST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: types.TEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

}

export const listIELTSTests = () => async (dispatch) => {

    try {
     
        dispatch({ type: types.TEST_REQUEST });
    
        const { data } = await api.get('/test/ielts');

        dispatch({
            type: types.TEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.TEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

}

export const getAllTest = () => async (dispatch) => {
  try {
    dispatch({ type: types.TEST_REQUEST });

    const { data } = await api.get('/test/');

    dispatch({
      type: types.TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.TEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/*
export const listTests =  () =>async (dispatch)=>{
    
    try {
        dispatch({ type: types.TEST_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': TokenService.getLocalAccessToken()
            },
        }

        const { data } = await axios.get('http://localhost:5000/api/test/toeic',config);
      

        dispatch({
            type: types.TEST_SUCCESS,
            payload: data,
        });
       
        } catch (error) {
        dispatch({
            type: types.TEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
    
}

export const listIELTSTests = () => async (dispatch) => {
    
    try {
        dispatch({ type: types.TEST_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': TokenService.getLocalAccessToken()
            },
        }
        
        const { data } = await axios.get('http://localhost:5000/api/test/ielts',config);

        dispatch({
            type: types.TEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.TEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

}
*/
export const listTestsYear = (year) => async (dispatch) => {
    try {
        dispatch({ type: types.TEST_REQUEST });

        const { data } = await axios.get('/api/test/${year}');
        console.log(data);

        dispatch({
            type: types.TEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.TEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

}