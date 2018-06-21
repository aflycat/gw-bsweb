import Vue from 'vue'
import Router from 'vue-router'
// 登陆组件
const Login = r => require.ensure([], () => r(require('@page/Login')), 'login')
// Index组件
const Index = r => require.ensure([], () => r(require('@page/Index')), 'index')
// 首页组件
const Home = r => require.ensure([], () => r(require('@page/home/Home')), 'page')
// 设备数据组件
const Equips = r => require.ensure([], () => r(require('@page/equips/Equips')), 'page')
// 实时快照组件
const Snapshot = r => require.ensure([], () => r(require('@page/snapshot/Snapshot')), 'page')
// 系统配置组件
const SystemConf = r => require.ensure([], () => r(require('@page/systemConf/SystemConf')), 'page')
// 事件查询组件
const EventQuery = r => require.ensure([], () => r(require('@page/eventQuery/EventQuery')), 'page')
// 报警排表组件
const Schedule = r => require.ensure([], () => r(require('@page/schedule/Schedule')), 'page')
// 定时任务组件
const TimeTask = r => require.ensure([], () => r(require('@page/timeTask/TimeTask.vue')), 'page')
// 设备联动组件
const EquipLinkage = r => require.ensure([], () => r(require('@page/equipLinkage/EquipLinkage')), 'page')

Vue.use(Router)

export default new Router({
//mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: Home
        },
        {
          name: 'equip',
          path: 'equips',
          component: Equips
        },
        {
          path: 'snapshot',
          name: 'snapshot',
          component: Snapshot
        },
        {
          path: 'systemConf',
          component: SystemConf
        },
        {
          path: 'eventQuery',
          component: EventQuery
        },
        {
          path: 'schedule',
          component: Schedule
        },
        {
          path: 'timeTask',
          component: TimeTask
        },
        {
          path: 'equipLinkage',
          component: EquipLinkage
        }
      ]
    }
  ]
})
