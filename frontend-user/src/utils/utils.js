export function validateUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function validatePassword(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export function passwordMatch(password, confirmPassword){
    return password == confirmPassword
}