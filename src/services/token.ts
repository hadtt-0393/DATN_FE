const getToken = () => {
    const token = localStorage.getItem("accessToken");
    const tokenJson = token ? JSON.parse(token) : null;
    return tokenJson;
}

export {getToken}