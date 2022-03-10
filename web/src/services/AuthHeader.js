export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user.data.authResult && user.data.sessionsId) {
        return { 'x-access-token': user.data };
    } else {
        return {};
    }
}