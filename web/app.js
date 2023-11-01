class Http {
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:4000",
            timeout: 10000,
        })
        this.refreshTokenRequest = null
        this.instance.interceptors.request.use(
            (config) => {
                const access_token = localStorage.getItem("access_token")
                if (access_token) {
                    config.headers.Authorization = `Bearer ${access_token}`
                }
                return config
            },
            (error) => {
                Promise.reject(error)
            }
        )
        this.instance.interceptors.response.use(
            (config) => {
                return config.data
            },
            (error) => {
                // nếu response error phụ thuộc vào status và name sẽ chạy vào if
                if (
                    error.response.status === 401 &&
                    error.response.data.name === "EXPIRED_ACCESS_TOKEN"
                ) {
                    // set this.refreshTokenRequest để tránh trường hợp: nếu như 1 action thực hiện 2 lần fetch api sẽ dẫn tới call refreshToken 2 lần => nên khi refreshTokenRequest đã tồn tại thì ta gán lại bằng giá trị đó còn k thì mới gán bằng refreshToken()
                    this.refreshTokenRequest = this.refreshTokenRequest
                        ? this.refreshTokenRequest
                        : refreshToken().finally(() => {
                              this.refreshTokenRequest = null
                          })
                    // trả về giá trị của hàm refreshTokenRequest gán lại instance bằng config đã refactor
                    return this.refreshTokenRequest
                        .then((access_token) => {
                            error.response.config["Authorization"] =
                                access_token
                            return this.instance(error.response.config)
                        })
                        .catch((refresht_error) => {
                            throw refresht_error
                        })
                }
                console.log("loi", error)
                Promise.reject(error)
            }
        )
    }
    get(url) {
        return this.instance.get(url)
    }
    post(url, body) {
        return this.instance.post(url, body)
    }
}

const http = new Http()

const fetchProfile = () => {}

const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token")

    try {
        const res = await http.post("refresh-token", { refresh_token })
        const { access_token } = res.data
        localStorage.setItem("access_token", access_token)
        return access_token
    } catch (error) {
        localStorage.clear()
        throw error.response
    }
}

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    http.post("login", { username, password })
        .then((res) => {
            localStorage.setItem("access_token", res.data.access_token)
            localStorage.setItem("refresh_token", res.data.refresh_token)
        })
        .catch((error) => console.log(error))
})

document.getElementById("btn-get-profile").addEventListener("click", (e) => {
    e.preventDefault()

    http.get("profile")
        .then((res) => {
            console.log(res)
        })
        .catch((error) => console.log(error))
})

document.getElementById("btn-get-products").addEventListener("click", (e) => {
    e.preventDefault()

    http.get("products")
        .then((res) => {
            console.log(res)
        })
        .catch((error) => console.log(error))
})

document.getElementById("btn-get-both").addEventListener("click", (e) => {
    e.preventDefault()

    http.get("profile")
        .then((res) => {
            console.log(res)
        })
        .catch((error) => console.log(error))

    http.get("products")
        .then((res) => {
            console.log(res)
        })
        .catch((error) => console.log(error))
})
document.getElementById("btn-refresh-token").addEventListener("click", (e) => {
    e.preventDefault()
    refreshToken()
})
