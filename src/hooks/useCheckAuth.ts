import jwt_decode from 'jwt-decode';

export const useCheckAuth = () => {
    return () => {
        try {
            const token = localStorage.getItem('token') || '';
            const decoded: Token = jwt_decode(token);
            const now = Math.floor(+new Date() / 1000);
            const { exp } = decoded;

            // Once API is faster return this
            // const isUser = await GET('/api/status');
            // return isUser.okay ? true : false;

            return (token && now <= +exp);
        } catch (error) {
            return false;
        }
    }
}

export const logout = () => localStorage.clear()


export const get_user_id = () => localStorage.getItem('user_id');


interface Token {
    id: string;
    iat: string;
    exp: string;
}