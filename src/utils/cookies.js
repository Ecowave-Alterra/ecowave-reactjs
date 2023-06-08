import cookies from "js-cookie"


export default function setAuthCookie(token, id) {
    cookies.set("token", token, {
        expires: 1,
    })
    cookies.set("Admin", id, {
        expires: 1,
    })
}

export function getAuthCookie() {
    const token = cookies.get("token")
    return token
}
export function getAuthCookieAdminId() {
    const Id = cookies.get("Admin")
    return Id
}

export function removeAuthCookie() {
    cookies.remove("Admin")
    cookies.remove("token")
}