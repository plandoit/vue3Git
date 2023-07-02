// 封装常量路由

export const constantRoute =
    [
        {
            // 登录
            path: '/login',
            component: () => import('../views/login/index.vue'),
            name: 'login',
            meta: {
                title: '登录',
                hidden: true  //路由标题是否隐藏
            }
        },
        {
            // 首页
            path: '/',
            component: () => import('../layout/index.vue'),
            name: 'layout',
            meta: {
                title: '',
                hidden: false
            },
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: () => import('../views/home/index.vue'),
                    meta: {
                        title: '首页',
                        hidden: false
                    },

                },
            ]
        },
        {
            // 404报错
            path: '/404',
            component: () => import('../views/404/index.vue'),
            name: '404',
            meta: {
                title: '404',
                hidden: true
            }
        },
        {
            // 其他
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: 'Any',
            meta: {
                title: '任意路由',
                hidden: true
            }
        },
        {
            // 数据大屏
            path: '/screen',
            component: () => import('../views/screen/index.vue'),
            name: 'screen',
            meta: {
                title: '数据大屏',
                hidden: false
            }
        },
        {
            // 数据大屏
            path: '/users',
            component: () => import('../views/users/index.vue'),
            name: 'users',
            meta: {
                title: '团长管理',
                hidden: false
            }
        },
        {
            // 权限管理
            path: '/acl',
            component: () => import('../layout/index.vue'),
            name: 'acl',
            meta: {
                title: '权限管理',
                hidden: false
            },
            redirect: '/acl/user',
            children: [
                {
                    // 用户管理
                    path: '/acl/user',
                    component: () => import('../views/acl/user/index.vue'),
                    name: 'user',
                    meta: {
                        title: '用户管理',
                        hidden: false
                    }
                },
                {
                    // 角色管理
                    path: '/acl/role',
                    component: () => import('../views/acl/role/index.vue'),
                    name: 'role',
                    meta: {
                        title: '角色管理',
                        hidden: false
                    }
                },
                {
                    // 菜单管理
                    path: '/acl/permission',
                    component: () => import('../views/acl/permission/index.vue'),
                    name: 'permission',
                    meta: {
                        title: '菜单管理',
                        hidden: false
                    }
                },
            ]
        },
        {
            // 商品管理
            path: '/product',
            component: () => import('../layout/index.vue'),
            name: 'Product',
            meta: {
                title: '商品管理',
                hidden: false
            },
            redirect: '/product/trademark',
            children: [
                {
                    // 品牌管理
                    path: '/product/trademark',
                    component: () => import('../views/product/trademark/index.vue'),
                    name: 'trademark',
                    meta: {
                        title: '品牌管理',
                        hidden: false
                    }
                },
                {
                    // attr管理
                    path: '/product/attr',
                    component: () => import('../views/product/attr/index.vue'),
                    name: 'attr',
                    meta: {
                        title: '属性管理',
                        hidden: false
                    }
                },
                {
                    // spu管理
                    path: '/product/spu',
                    component: () => import('../views/product/spu/index.vue'),
                    name: 'spu',
                    meta: {
                        title: 'SPU管理',
                        hidden: false
                    }
                },
                {
                    // sku管理
                    path: '/product/sku',
                    component: () => import('../views/product/sku/index.vue'),
                    name: 'sku',
                    meta: {
                        title: 'SKU管理',
                        hidden: false
                    }
                },

            ]
        },

    ]

