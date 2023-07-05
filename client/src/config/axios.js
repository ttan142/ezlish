import axios from "axios";
import TokenService from "../utils/tokenService";

const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    
    },
});
instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/users/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && err.response.data) {
              originalConfig._retry = true;
              try {
                const rs = await instance.post("/refreshToken/token", {
                  refreshToken: TokenService.getLocalRefreshToken(),
                });
                const { accessToken } = rs.data;
                TokenService.updateLocalAccessToken(accessToken);
                return instance(originalConfig);
              } catch (_error) {
                if (_error.response && _error.response.data) {
                  return Promise.reject(_error.response.data);
                }
                return Promise.reject(_error);
              }
            }
            if (err.response.status === 403 && err.response.data) {
                //login again
                window.alert("Your session time out.Please login again !")
                window.open("http://localhost:5000/auth/logout", "_self");
                TokenService.removeuserInfo();
                document.location.replace("/login")
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);
export default instance;