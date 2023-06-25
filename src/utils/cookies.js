import cookies from "js-cookie"


export default function setAuthCookie(token, email, name) {
    cookies.set("token", token, {
        expires: 1,
    })
    cookies.set("email", email, {
        expires: 1,
    })
    cookies.set("name", name, {
        expires: 1,
    })
}

export function getAuthCookie() {
    const token = cookies.get("token")
    return token
}
export function getAuthCookieAdminEmail() {
    const email = cookies.get("email")
    return email
}
export function getAuthCookieAdminName() {
    const name = cookies.get("name")
    return name
}

export function removeAuthCookie() {
    cookies.remove("email")
    cookies.remove("name")
    cookies.remove("token")
}