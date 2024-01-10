import { jwtDecode, type JwtPayload } from "jwt-decode";


/**
 * @param token  the token 
 * @returns  Return boolean check token 
 */

export const checkToken = (token: string): boolean => {
    const decoded: JwtPayload = jwtDecode(token);

    const timeNow = Date.now() / 1000;

    if ((decoded.exp as number) < timeNow) {
        return false
    }
    return true
}