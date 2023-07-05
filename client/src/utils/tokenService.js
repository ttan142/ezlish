const getLocalRefreshToken = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.refreshToken;
};
const getLocalAccessToken = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token;
};
const updateLocalAccessToken = (token) => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo.token = token;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
const getuserInfo = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
};
const setuserInfo = (userInfo) => {
    console.log(JSON.stringify(userInfo));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
const removeuserInfo = () => {
    localStorage.removeItem("userInfo");
};
const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getuserInfo,
    setuserInfo,
    removeuserInfo
};
export default TokenService;