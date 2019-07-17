import Vue from 'vue'
import Router from 'vue-router'
import Login from './../views/login'
import Luyou1 from './../components/luyou1'
import Luyou2 from './../components/luyou2'
import Luyou3 from './../components/luyou3'
import Luyou4 from './../components/luyou4'
import Err from './../components/err'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      children: [
        {
          path: '/luyou4',
          component: Luyou4
        },
          {
          path: '/luyou2',
          component: Luyou2,
          children:[
              {
                  path: 'luyou3',
                  component: Luyou3,
              },
          ],
        }, {
          path: '/luyou1',
          component: Luyou1,
        },
      ]
    },
    
  ]
})
