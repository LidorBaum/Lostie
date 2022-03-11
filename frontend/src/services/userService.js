import Cookies from 'js-cookie';
import httpService from './httpService';

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    updateUser,
    checkUserExistAndType,
    addUser,
    getFilteredUsers,
    getAllGeocodes,
};

function getAllGeocodes(lat, lng) {
    return httpService.get(`user/geocodes?lat=${lat}&lng=${lng}`);
}

function getFilteredUsers(filter = null) {
    if (filter) return httpService.get(`user/sorted?filter=${filter}`);
    return httpService.get(`user/sorted`);
}

function checkUserExistAndType(name) {
    return httpService.get(`user/type/${name}`);
}

function getUsers() {
    return httpService.get('user');
}

function getById(userId) {
    return httpService.get(`user/${userId}`);
}
function remove(userId) {
    return httpService.delete(`user/${userId}`);
}

function addUser(userObj) {
    return httpService.post('user', userObj);
}

function updateUser(user) {
    return httpService.put(`user/edit/${user._id}`, user);
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred);
    if (user.error) return user;
    return _handleLogin(user);
}

async function signup(userCred) {
    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${userCred.address}&key=AIzaSyA0PnKw6ClT_i8_c4ePtiXRLg7MjyC4VCA`,
        { method: 'GET' }
    );
    const data = await res.json();
    if (!data.results[0]?.geometry)
        return {
            error: {
                message: 'Emotional Damage',
            },
        };
    console.log(data.results[0].geometry.location.lat);
    console.log(data.results[0].formatted_address);
    userCred.geocode = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
    };
    const user = await httpService.post('auth/signup', userCred);
    if (user.error) return user;
    return _handleLogin(user);
}
async function logout() {
    Cookies.remove('user');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    Cookies.set('user', JSON.stringify(user));
    return user;
}
