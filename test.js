// const axios  = require("axios")
const token  = "vk1.a.uCudWR-JvWvkGUvJjwvx5ODNebQmkSS1ypccv1HqaGVlaD0CXMddPehukB_nhERF85DyFb0HlNSG6-ZdNwXLrZ1GoHZj3UOMP7fyyC7fbAPDDrncOTwIu8lQAJsK7YRKsK9Odfndb5N9HmStrL6yk-usPSTWMtMetnN3jAh61cPol6VnP3jp_KoppJv6boO4h0-0dXJGerl1nF-iLTNR0g"
// // axios.get(`https://api.vk.com/method/groups.search?city_id=1&count=1000&q=%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0&access_token=${token}&v=5.131`)
// // .then(res=>console.log(res.data))
//
// // axios.get(`https://api.vk.com/method/groups.search?city_id=1&count=1000&q=%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0&access_token=${token}&v=5.131`,
// //     {
// //         proxy: {
// //             protocol: 'http',
// //             host: '45.140.75.172',
// //             port: 30009,
// //             auth: {
// //                 username: 'tv_bb_mail_ru',
// //                 password: '5e73e46cad'
// //             }
// //         }
// //     }
// // )
// //     .then(res=>console.log(res.data))
//
//
const proxyUrl = '45.140.75.172';
const authUsername = 'tv_bb_mail_ru';
const authPassword = '5e73e46cad';
const authString = `${authUsername}:${authPassword}`;
const authEncoded = Buffer.from(authString).toString('base64');
const axios  = require("axios-https-proxy-fix")

const axiosInstance = axios.create({
    proxy: {
        protocol: 'http',
        host: proxyUrl,
        port: 30009,
        auth: {
            username: authUsername,
            password: authPassword,
        },
    }
});
//
const url = `https://api.vk.com/method/groups.search?city_id=1&count=1000&q=%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0&access_token=${token}&v=5.131`
const url2 = 'http://ipinfo.io/json'

axiosInstance.get(`${url}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });


