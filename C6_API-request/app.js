// fetch("https://reqres.in/api/users?page=2")
//     .then((res) => {
//         console.log(res)
//         return res.json()
//     })
//     .then((res) => {
//         let html = ""
//         res.data.forEach((element) => {
//             html += `<div>${element.first_name} ${element.last_name}</div>`
//         })
//         document.getElementById("result").innerHTML = html
//         console.log("first", res)
//     })

const http = axios.create({
    baseURL: "https://reqres.in/api/",
})

http.interceptors.request.use(
    (config) => {
        console.log(config)
        config.headers.Timeout = 100
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
http.interceptors.response.use(
    (config) => {
        console.log(config)

        return config.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

http.get("/users")
    .then((res) => {
        console.log(res.data.data)
    })
    .catch((error) => {
        console.log(error)
    })

// axios({
//     method: "get",
//     baseURL: "https://reqres.in/api/",
//     url: "/users",
// })
//     .then((res) => console.log("get all usser", res.data))
//     .catch((error) => console.log(error))

// axios({
//     method: "post",
//     baseURL: "https://reqres.in/api/",
//     url: "/users",
//     data: {
//         name: "morpheus",
//         job: "leader",
//     },
// })
//     .then((res) => console.log("post 1 user", res.data))
//     .catch((error) => console.log(error))

// axios({
//     method: "delete",
//     baseURL: "https://reqres.in/api/",
//     url: "/users/2",
// })
//     .then((res) => console.log("delete 1 user", res))
//     .catch((error) => console.log(error))
// axios({
//     method: "get",
//     baseURL: "https://reqres.in/api/",
//     url: "/users/2",
// })
//     .then((res) => console.log("get 1 user", res))
//     .catch((error) => console.log(error))
