import router from './router'
import store from './store'
import getMenus from '@/api/login'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
    Message,
    MessageBox
} from 'element-ui'
import {
    getToken
} from '@/utils/tokenActions'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({
    showSpinner: false
})

const whiteList = ['/login', '/auth-redirect']
router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    if (getToken()) {
        if (to.path === '/login') {
            // NProgress.done();
            next();
        } else {
            store.dispatch('getMenus').then(res => {
                console.log('菜单名称kkk',
                    res.data.data)
                const roles = res.data.data
                const accessRoutes = store.dispatch('permission/generateRoutes', roles)
                router.addRoutes(accessRoutes)
                next({
                    ...to,
                    replace: true
                })
            })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            NProgress.done();
            next();
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done();
        }

    }

})
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})