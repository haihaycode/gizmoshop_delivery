//authService.js


import { jwtDecode } from 'jwt-decode';
import store from '@/store';

export const handleAuthentication = (accessToken, refreshToken) => {
    try {
        const decodedToken = jwtDecode(accessToken);
        const userRoles = decodedToken.a || [];
        if (Array.isArray(userRoles) && (userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_SHIPPER'))) {
            store.dispatch('auth/setToken', accessToken);
            store.dispatch('auth/setRefreshToken', refreshToken);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
        return false;
    }
};


export const verifyLogin = () => {
    const token = store.getters['auth/token'];
    if (token) {
        const decoded = jwtDecode(token);
        const roles = decoded.a || [];
        return roles.includes('ROLE_SHIPPER') || roles.includes('ROLE_ADMIN');
    }
    return false;
};

export const SHIPPER = () => {
    const token = store.getters['auth/token'];
    if (token) {
        const decoded = jwtDecode(token);
        const roles = decoded.a || [];
        return roles.includes('ROLE_SHIPPER');
    }
    return false;
}