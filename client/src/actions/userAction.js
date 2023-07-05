import axios from 'axios'
import * as types from '../constant/User/userConstants'
import TokenService from '../utils/tokenService'
import Cookies from 'universal-cookie';
export const login = (email, password) => async (dispatch) => {
    const cookies = new Cookies();
    axios.defaults.withCredentials = true;
    try {
        dispatch({ type: types.USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
               
            },

            
        }

        const { data } = await axios.post(
            `http://localhost:5000/api/users/login`,
            { email, password },
            config,
        )
    
        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        })

        cookies.set('refreshToken', 1, {
            sameSite: 'none',
            httpOnly: true,

        });
       
       TokenService.setuserInfo(data);
      
    } catch (error) {
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
   
    dispatch({ type: types.USER_LOGOUT })
    TokenService.removeuserInfo();
    
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: types.USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            `http://localhost:5000/api/users`,
            { name, email, password },
            config
        )

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data,
        })
  /*  auto sign in when register
        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        })*/
      

    } catch (error) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateBalance = (userId, newBalance) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.put(
        `/api/users/${userId}`,
        { balance: newBalance },
        config
      );
      localStorage.setItem('userBalance', data.balance);
      dispatch({
        type: types.USER_UPDATE_BALANCE,
        payload: data.balance,
      });
      TokenService.setuserInfo(data);
    } catch (error) {
      // Handle error
    }
  };
/* document.location.href = '/login'   */