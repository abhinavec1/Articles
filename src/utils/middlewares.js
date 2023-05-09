import Cookies from "js-cookie"

export const IsUserAuthenticated = () => {
    const XSessionId = Cookies.get("X-Session-Id")
    return XSessionId !== undefined
}