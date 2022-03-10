export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.data.authResult && user.data.authToken) {
        return { 'x-access-token': user.data };
    } else {
        return {};
    }
}