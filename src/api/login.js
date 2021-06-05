import request from "@/utils/request";
let BASEPATH = "/smartedge";
//登录
// var loginPath = "/login";

// function login(data) {
//     return request({
//         url: BASEPATH + loginPath,
//         method: "post",
//         data: data
//     });
// }

//获取登录接口
export function getLogin() {
    return request({
        url: BASEPATH + '/login2',
        method: 'get'
    });
}
// 获取菜单接口

export function getMenus() {
    return request({
        url: BASEPATH + '/menu',
        method: 'get',
    });
}
export default {
    getLogin,
    getMenus
}