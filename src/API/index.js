import HELPERS from "../utils/helper"

const baseURL = "http://localhost:3002/"

const API_MANAGER = {
    getSalt: (data) => {
        return HELPERS.request({
            baseURL,
            url: "login",
            method: "POST",
            data: data,
            headers: { "Content-Type": "application/json"}
        })
    },
    login: (data) => {
        return HELPERS.request({
            baseURL,
            url: "generate_session",
            method: "POST",
            data: data,
            headers: { "Content-Type": "application/json"}
        })
    },
    signup: (data) => {
        return HELPERS.request({
            baseURL,
            url: "register",
            method: "POST",
            data: data,
            headers: { "Content-Type": "application/json"}
        })
    },
    logout: () => {
        return HELPERS.secureRequest({
            baseURL,
            url: "logout",
            method: "POST",
            headers: { "Content-Type": "application/json"}
        })
    },
    writeBlog: (data) => {
        return HELPERS.secureRequest({
            baseURL,
            url: "write",
            method: "POST",
            data: data,
            headers: { "Content-Type": "application/json"}
        })
    },
    getBlogsList: (page_no) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `home`,
            method: "GET",
            params: {pageNumber: page_no},
            headers: { "Content-Type": "application/json"}
        })
    },
    getBlogDetail: (id) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `detail/${id}`,
            method: "GET",
            headers: { "Content-Type": "application/json"}
        })
    },
    postComment: (id, data) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `${id}/comment`,
            method: "POST",
            data: data,
            headers: { "Content-Type": "application/json"}
        })
    },
    getComments: (id) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `detail/${id}/comments`,
            method: "GET",
            headers: { "Content-Type": "application/json"}
        })
    },
    likeArticle: (id) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `${id}/like`,
            method: "POST",
            headers: { "Content-Type": "application/json"}
        })
    },
    unLikeArticle: (id) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `${id}/unlike`,
            method: "POST",
            headers: { "Content-Type": "application/json"}
        })
    },
    isArticleLiked: (id) => {
        return HELPERS.secureRequest({
            baseURL,
            url: `${id}/is_liked`,
            method: "GET",
            headers: { "Content-Type": "application/json"}
        })
    }
}

export default API_MANAGER