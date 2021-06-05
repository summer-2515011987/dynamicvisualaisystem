import {
    asyncRoutes,
    constantRoutes
} from '@/router'
import {
    getMenus
} from "@/api/login"

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {
            ...route
        }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

/**
 * 判断是否还有子级菜单
 */
function getChildrenMenu(routes, children) {
    if (children) {
        children.forEach(element => {
            if (element.menuType == 'RESOURCE_TYPE_MENU') {
                const childrenMenuObj = {
                    path: element.menuPath === null ? '/' : element.menuPath.replace("/", ""),
                    name: element.menuPath === null ? '/' : element.menuPath.replace("/", ""),
                    meta: {
                        title: element.menuDesc,
                        icon: "nested"
                    },
                    component: element.menuPageUrl === "" ? '/' : () =>
                        import ("@/views/setMain.vue"),
                    children: []
                }
                if (element.childrenMenuList) {
                    getChildrenMenu(childrenMenuObj.children, element.childrenMenuList);
                }
                routes.push(childrenMenuObj)
            }
        });
    }
}



/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
    data.forEach(item => {
        const menu = {
            path: item.menuPath === '#' ? item.id + '_key' : item.menuPath,
            component: Layout,
            hidden: false,
            redirect: 'noRedirect',
            children: [],
            meta: {
                title: item.menuDesc,
                icon: "nested"
            },
            name: 'menu_' + item.id
        }

        if (item.childrenMenuList) {
            getChildrenMenu(menu.children, item.childrenMenuList);
        }

        routes.push(menu)

    });
}
const state = {
    routes: [],
    assRoutes: []
}
const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
    }
}
const actions = {
    generateRoutes({
        commit
    }, roles) {
        return new Promise(resolve => {
            const loadMenuData = [];

            getMenus().then(response => {
                let data = response.data.data;

                Object.assign(loadMenuData, data);
                const tempAsyncRoutes = Object.assign([], asyncRoutes);

                generaMenu(tempAsyncRoutes, loadMenuData);

                let accessedRoutes;

                if (roles.includes("admin")) {
                    accessedRoutes = tempAsyncRoutes || [];
                } else {
                    accessedRoutes = filterAsyncRoutes(tempAsyncRoutes, roles);
                }

                commit("SET_ROUTES", accessedRoutes);

                resolve(accessedRoutes);

            });

        });
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}