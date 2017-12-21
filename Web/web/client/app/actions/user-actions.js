'use strict';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGGING = 'USER_LOGGING';
export const USER_REFRESH = 'USER_REFRESH';

export const logging = () => ({
   type: USER_LOGGING
});

export const login = (loginInfo) => ({
    type: USER_LOGIN,
    ...loginInfo
});

export const logout = () => ({
    type: USER_LOGOUT
});

export const refresh = (loginInfo) => ({
    type: USER_REFRESH,
    ...loginInfo
});
