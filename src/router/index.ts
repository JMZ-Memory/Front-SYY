import nProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/index.vue'),
      children: [
        {
          path: 'userdetail',
          component: () => import('../views/Home/Userdetail/index.vue')
        },
        {
          path: 'literature',
          component: () => import('../views/Home/Literature/index.vue'),
          meta:{
            show:true
          },
     
          children: [
            {
              path: 'novel',
              component: () => import('../views/Home/Literature/Novel/index.vue'),
              meta:{
                show:false
              },
            },
            {
              path: 'ancient_poetry',
              component: () => import('../views/Home/Literature/Ancient_Poetry/index.vue'),
              meta:{
                show:false
              },
            },
            {
              path: 'modern_poetry',
              component: () => import('../views/Home/Literature/Modern_Poetry/index.vue'),
              meta:{
                show:false
              },
            },
            

          ]
        }
      ]

    },
    {
      path: '/ancient_and_modern_poetry_display:Keyword:Type?',
      name:'ancient_and_modern',
      component: () => import('../views/Home/Literature/Ancient_and_Modern_Poetry_Display/index.vue')
    },
    {
      path: '/novel_display:Keyword?',
      name:'novel_display',
      component: () => import('../views/Home/Literature/Novel_Display/index.vue'),
      children:[
        {
          path:'chapter:index?',
          name:'novel_context',
          component: () => import('../views/Home/Literature/Novel_Display/Main/index.vue'),
        }
        
      ]
      
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue'),


    },

  ]
})


router.beforeEach((to, from, next) => {
  nProgress.start()
  const token = window.localStorage.getItem('userInfo')
  if (token) {
    if (to.name == 'login') {
      next({ name: 'home' })
      return;
    } else {
      next()
      return;
    }
  } else {
    if (to.name == 'login') {
      next()
      return;
    } else {
      next({ name: 'login' })
      return
    }
  }

})

router.afterEach((to, from, next) => {
  nProgress.done()
})

export default router
