const token = window.localStorage.Authorization;
const userRequest = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: token
    },
});

if (!token) {
    alert('請重新登入！');
    window.location.href = "/login";
}