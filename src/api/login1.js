/**
 * 获取授权服务配置集合
 * @param params 查询参数
 */
export function fetchList(params) {
    return request({
        url: BASEPATH + "/clientConfig/list",
        method: "get",
        params: params
    });
}