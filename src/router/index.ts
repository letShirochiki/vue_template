import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
/**
 * Auto Generate Routes
 * @returns routes
 */
function loadRouters() {
    const content = import.meta.glob('../views/*/index.vue',{ eager: true });
    const childContent = import.meta.glob('../views/*/*/index.vue',{ eager: true });
    const grandsunContent = import.meta.glob('../views/*/*/*/index.vue',{ eager: true });
    const routes: RouteRecordRaw[] = [];
    const rootNode: Set<string> = new Set();
    const childNode: Set<Record<string,string>> = new Set();
    const grandsunNode: Set<Record<string,string>> = new Set();
    Object.keys(content).forEach((key) => {
        if(key === './index.ts') return;
        const name = key.replace(/(\.\.\/views\/|[^A-z][^\/]+)/g,'');
        rootNode.add(name);
    })
    Object.keys(childContent).forEach((key) => {
        const name = key.replace(/(\.\.\/views\/|[^A-z][^\/]+)/g,'');
        const cname = key.replace(/(\.\.\/views\/[^\/]+\/|[^A-z]?\/[^\/]+)/g,'');
        childNode.add({
            parent: name,
            child: cname,
        });
    })
    Object.keys(grandsunContent).forEach((key) => {
        const name = key.replace(/(\.\.\/views\/|[^A-z][^\/]+)/g,'');
        const cname = key.replace(/(\.\.\/views\/[^\/]+\/|[^A-z]?\/[^\/]+)/g,'');
        const pname = key.replace(/(\.\.\/views\/[^\/]+\/[^\/]+[^A-z]|\/[^\/]+)/g,'');
        childNode.add({
            parent: name,
            child: cname,
        });
        grandsunNode.add({
            parent: cname,
            child: pname,
        });
    })
    rootNode.forEach((name) => {
        let path = '/' + name.toLowerCase();
        if(name === 'Login') path = '/';
        const childRouter: RouteRecordRaw[] = [];
        Array.from(childNode).filter((v) => v.parent === name).forEach(({child: cname}) => {
            const cpath = `/${String(name.toLowerCase())}/${cname.toLocaleLowerCase()}`;
            const grandsunRouter: RouteRecordRaw[] = []
            Array.from(grandsunNode).filter((v) => v.parent === cname).forEach(({child: gname}) => {
                const gpath = `/${String(name.toLowerCase())}/${cname.toLocaleLowerCase()}/${gname.toLocaleLowerCase()}`;
                grandsunRouter.push({
                    name: gname,
                    path: gpath,
                    component: () => import(`../views/${name}/${cname}/${gname}/index.vue`)
                })
            })
            childRouter.push({
                name: cname,
                path: cpath,
                component: () => import(`../views/${name}/${cname}/index.vue`),
                children: grandsunRouter,
            })
        })
        routes.push({
            path,
            name,
            component: () => import(`../views/${name}/index.vue`),
            children: childRouter,
        })
    })
    return { routes };
}

function getRoutes() {
    const { routes } = loadRouters();
    return routes;
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: getRoutes(),
})

export default router;