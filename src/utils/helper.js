import axios from "axios"
import Cookies from "js-cookie"

const HELPERS = {
    request: (config) => {
        return axios
            .request(config)
            .then((resonse) => {
                return resonse
            })
            .catch((err) => {
                throw err
            })
    },
    secureRequest: (config) => {
        config.headers = config.headers ? config.headers : {}
        const sessionId = Cookies.get("X-Session-Id")
        if (sessionId) {
            config.withCredentials = true
        }
        return HELPERS.request(config)
    },
    deleteCookie: (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export default HELPERS