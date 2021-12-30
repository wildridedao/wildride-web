import Vue      from 'vue'
import store    from './store'
import router   from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//进度条配置
NProgress.configure({showSpinner: false});

//白名单
const whiteList = ['/login','/sign'];
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (localStorage.getItem('t')) {
        next();
    }
    else {
        //在免登录白名单，直接进入
        // if (whiteList.indexOf(to.path) !== -1) {
            next()
        // }
        // else {
        //     next({path: '/login'});
        //     NProgress.done()
        // }
    }
});

router.afterEach(() => {
    NProgress.done()
});
