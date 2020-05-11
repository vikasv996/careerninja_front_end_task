import Cookies from 'universal-cookie';
import diff from 'deep-diff';

const cookies = new Cookies();

export const isLoggedIn = () => {
    const session_token = cookies.get('session_token');
    return !!session_token;
};

export const deleteCookies = () => {
    cookies.remove('session_token');
    window.location.assign('/');
};

export const getCookies = () => {
    const session_token = cookies.get('session_token') ? cookies.get('session_token') : '';

    if (session_token) {
        return { session_token };
    } else {
        return 'unset';
    }
};

export const createDiff = (oldDetails, newDetails) => {
    let finalDiff = {};
    const difference = diff(oldDetails, newDetails);
    console.log("difference", difference);
    if (!difference) {
        return null;
    }
    difference.forEach((elem) => {
        let currentObject = finalDiff;
        for (let i = 0; i < elem.path.length; i++) {
            if (i === elem.path.length - 1) {
                currentObject[elem.path[i]] = elem.rhs;
            } else if (!currentObject[elem.path[i]]) {
                currentObject[elem.path[i]] = {};
            }
            currentObject = currentObject[elem.path[i]];
        }
    });
    return finalDiff;
};
