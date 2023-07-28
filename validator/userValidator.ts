import { Login } from "../model/login";

export function validateUser(login: Login): string {
    if (login.username.length < 3) {
        return "Username is too short";
    }
    if (login.password.length < 8) {
        return "Password is too short. Should contain at least 8 characters";
    }
    if (login.username.length > 16) {
        return "Username can not be longer than 16 characters";
    }
    if (!hasBothCases(login.password)) {
        return "Password should contain at least one small lower case letter and one upper case letter";
    }
    if (!hasBothCases(login.username)) {
        return "Username should contain small and big letters";
    }
    return null;
}

function hasBothCases(str: string): boolean {
        return /[a-z]/.test(str) && /[A-Z]/.test(str);
}
