<template>
  <div class="gw-index">
    <header class="header">
      <div class="header-logo">
        <img class="logo" src="@assets/img/logos0.png" alt="logo">
      </div>
      <div class="header-opt">
        <span class="user" title="当前登陆用户">
          <span class="iconfont">&#xe62e;</span>{{$store.state.loginMsg}}</span>
        <!-- <span class="iconfont icon-Menu" :title="isFold ?'展开面板':'收缩面板'" :class="[isFold ? 'close' : 'open']" @click="foldAside"></span> -->
        <span :class="screenAll?'iconfont icon-pullScreenexit':'iconfont icon-pullScreen'" :title="screenAll?'还原':'全屏'" @click="fullScreen" ></span>
        <span class="iconfont" title="退出登陆" @click="logout">&#xe641;</span>
      </div>
    </header>
    <div class="main">
      <aside class="nav-left" :class="[isFold ? 'close' : 'open']">
        <nav class="nav-list">
          <Tree v-if="navList.length" :data="navList" :render="renderNavItem"></Tree>
        </nav>
        <div class="fold" :class="[isFold ? 'close' : 'open']" :title="isFold ?'展开面板':'收缩面板'" @click="foldAside">
          <!-- <span class="ivu-icon" :class="[isFold ? 'ivu-icon-arrow-left-b' : 'ivu-icon-arrow-right-b']"></span> -->
            <!-- <span class="iconfont icon-Menu"></span> -->
            <img src="@assets/img/menu.png" alt="" />
        </div>
      </aside>
      <section class="main-body" :class="{home : $store.state.curPage.isHome}">
        <div class="titlebar" v-if="!$store.state.curPage.isHome">
          <a href="javascript:;" @click="toHome">
            <!-- <i class="iconfont icon-MenuHome"></i> -->
            首页
          </a>
          <span class="split">>></span>
          <a class="cur">{{$store.state.curPage.name}}</a>
          <span v-if="$store.state.curPage.childName" class="split">>></span>
          <a v-if="$store.state.curPage.childName">{{$store.state.curPage.childName}}</a>
        </div>
        <router-view class="router-page" v-if="loadCompleted" :rootSave="rootSave" @updateNavState="doNavState"></router-view>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
            "title": "首页",
            "href": "home",
            "iconClass": " iconfont icon-MenuHome",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "设备数据",
            "href": "equips",
            "iconClass": " iconfont icon-MenuEquips",
            "loading": false,
            "expand": false,
            "hasChild": true,
            "children": [],
            "selected": false
        },
        {
            "title": "实时快照",
            "href": "snapshot",
            "iconClass": " iconfont icon-MenuSnapshot",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "系统配置",
            "href": "systemConf",
            "iconClass": " iconfont icon-MenuSystemConf",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "事件查询",
            "href": "eventQuery",
            "iconClass": " iconfont icon-MenuEventQuery",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "报警排表",
            "href": "schedule",
            "iconClass": " iconfont icon-MenuSchedule",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "定时任务",
            "href": "timeTask",
            "iconClass": " iconfont icon-MenuTimeTask",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "设备联动",
            "href": "equipLinkage",
            "iconClass": " iconfont icon-MenuEquipLinkage",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        }
      ],
      loadCompleted: false,
      isFold: false,
      curPath22: "",
      rootSave: {},
      screenAll: false,//是否全屏
    };
  },
  methods: {
    foldAside() {
      // 侧边栏收起展开
      this.isFold = !this.isFold;
    },
    getAuth() {
      // 判断appkey和infokey是否存在正确
      if (window.localStorage["gw_token"]) {
        this.$store.dispatch("reflashSet");
        this.Axios.defaults.headers.common[
          "Authorization"
        ] = this.$store.state.gwToken;
        this.Axios.get("/api/server/auth_name")
          .then(rt => {
            let data = rt.data.HttpData;
            if (data.code !== 200) {
              this.$router.push("/login");
            } else {
              console.log("密钥验证成功,当前连接的服务:[", data.data, "]");
            }
          })
          .catch(err => {
            console.log(err);
            console.log("密钥验证失败，请检查登陆设置!");
          });
      } else {
        this.$router.push("/");
      }
    },
    logout() {
      // 退出登陆
      this.$Modal.confirm({
        title: '操作提示',
        content: '是否注销当前登陆？',
        onOk: () => {
          window.localStorage.removeItem("gw_token")
          window.localStorage.removeItem("login_msg")
          // this.navList.splice(0, this.navList.length)
          this.$router.replace("/login")
        }
      })
    },
    toHome () {
      this.navList.forEach(item => {
        if (item.expand) item.expand = false
        item.selected = item.title === '首页' ? true : false
      })
      this.$store.commit('setCurpage', {
        isHome: true
      })
      this.$router.push('/index/home')
    },
    loadNavList(navItem, callback) {
      if (navItem.hasChild) {
        navItem.loading = true;
        // 异步获取列表节点
        this.Axios.all([this.Axios.post("/api/real/equip_tree"), this.Axios.post('/api/GWServiceWebAPI/getEquipList'), this.Axios.get('/api/GWServiceWebAPI/getEquipState')])
          .then(this.Axios.spread((treeRes, equipRes, stateRes) => {
            let treeRt = treeRes.data.HttpData,
              equipRt = equipRes.data.HttpData,
              stateRt = stateRes.data.HttpData
            if (treeRt.code === 200 && equipRt.code === 200 && stateRt.code === 200) {
              let treeData = []
              let equipData = equipRt.data
              let stateData = stateRt.data
              treeData = treeRt.data.GWEquipTreeItems
              let resultData = []
              this.dealNavList(treeData, equipData, resultData, stateData)
              callback(resultData)
              console.log("获取设备列表成功!")
            } else {
              this.$Message.warning('获取设备列表失败，请重试！')
              console.log(treeRt, equipRt, stateRt)
            }
          }))
          .catch(err => {
            console.log(err)
          })
          .then(() => {
            let equipNo = parseInt(this.$route.hash.substring(1))
            this.findEquip(this.navList[1].children, equipNo)
            navItem.loading = false
            this.loadCompleted = true
          })
      } else {
        return false;
      }
    },
    findEquip (arr, equipNo) {
      for (let i = 0; i < arr.length; i++) {
        if (equipNo === parseInt(arr[i].equipNo)) {
          arr[i].selected = true
          this.$store.commit('setCurpage', {
            isHome: false,
            name: '设备数据',
            childName: arr[i].title
          })
          break
        } else {
          if (arr[i].children.length > 0) {
            this.$set(arr[i], 'expand', true)
            this.findEquip(arr[i].children, equipNo)
          }
        }
      }
    },
    dealNavList(arrData, equipList, result, stateList = []) {
      // 处理设备数据子列表
      arrData = arrData.filter(item => {
        if (equipList.some(equip => {
          return equip.equip_no === parseInt(item.EquipNo) || item.EquipNo === ''
        })) {
          return item
        }
      }).filter(item => {
        if (item.EquipNo === '1005' && item.Image === '精密空调.png') {
          return false
        } else {
          return true
        }
      })
      arrData.forEach((dt, index) => {
        if (dt.GWEquipTreeItems && dt.GWEquipTreeItems.length) {
          // 设置报警状态
          let alarmNum = 0
          let alarmState = ''
          let equipTreeArr = dt.GWEquipTreeItems.filter(item => {
            if (equipList.some(equip => {
              return equip.equip_no === parseInt(item.EquipNo) || item.EquipNo === ''
            })) {
              return item
            }
          })
          equipTreeArr.forEach(item => {
            alarmNum += (stateList.filter(state => state.m_iEquipNo === parseInt(item.EquipNo))[0].m_State === 2) ? 1 : 0
          })
          alarmState = (alarmNum > 0) ? 'alarm' : 'fine'
          result.push({
            alarmState: alarmState,
            title: dt.Name,
            children: [],
            selected: false,
            render: (h, { root, node, data }) => {
              return h(
                "div",
                {
                  style: {
                    fontSize: "14px",
                    cursor: "pointer",
                    position: "relative",
                    paddingLeft: "36px"
                  },
                  class: ["nav-item", data.selected ? "selected" : ""],
                  on: {
                    click: () => {
                      this.$set(data, "expand", !data.expand);
                    }
                  }
                },
                [
                  h("Icon", {
                    style: {
                      width: "20px",
                      height: "20px",
                      lineHeight: "20px",
                      textAlign: "center"
                    },
                    class: [
                      "ivu-icon",
                      data.expand
                        ? "ivu-icon-arrow-down-b"
                        : "ivu-icon-arrow-right-b"
                    ]
                  }),
                  h(
                    "span",
                    {
                      style: {
                        display: "inline-block",
                        verticalAlign: "middle",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        marginRight: "6px"
                      },
                      class: 'alarm-state ' + data.alarmState
                    }
                  ),
                  h(
                    "span",
                    {
                      style: {
                        lineHeight: "50px"
                      }
                    },
                    data.title
                  )
                ]
              );
            }
          });
          this.dealNavList(dt.GWEquipTreeItems, equipList, result[index].children, stateList)
        } else {
          let equipNo = parseInt(dt.EquipNo)
          let alarmState = ''
          let stateNum = stateList.filter(item => item.m_iEquipNo === equipNo)[0].m_State
          switch (stateNum) {
            case 0:
              alarmState = 'offline'
              break;
            case 1:
              alarmState = 'fine'
              break;
            case 2:
              alarmState = 'alarm'
              break;
            case 3:
              alarmState = 'setting'
              break;
            case 4:
              alarmState = 'initial'
              break;
            case 5:
              alarmState = 'withdrawing'
              break;
            default:
              alarmState = 'unknown'
              break;
          }
          if (equipNo === 300) {
            dt.Name = '场景控制'
          } else if (equipNo === 1005) {
            dt.Name = '虚拟设备'
          }
          result.push({
            title: dt.Name,
            equipNo: dt.EquipNo,
            href: "equips",
            alarmState: alarmState,
            children: [],
            selected: false,
            render: (h, { root, node, data }) => {
              return h(
                "div",
                {
                  style: {
                    fontSize: "14px",
                    cursor: "pointer",
                    position: "relative",
                    paddingLeft: "36px"
                  },
                  class: ["nav-item", data.selected ? "selected" : ""],
                  on: {
                    click: () => {
                      // console.log(this.navList[1])
                      if (data.selected) return false
                      let obj = {
                        isHome: false,
                        name: '设备数据',
                        childName: data.title
                      }
                      this.$store.commit('setCurpage', obj)
                      root.forEach(ele => {
                        if (ele.nodeKey !== 1) {
                          ele.node.selected = false
                        }
                      });
                      data.selected = true;
                      this.$router.push({
                        path: "equips#" + data.equipNo
                      });
                    }
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        display: "inline-block",
                        verticalAlign: "middle",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        marginLeft: "28px",
                        marginRight: "6px"
                      },
                      class: 'alarm-state ' + data.alarmState
                    }
                  ),
                  h(
                    "span",
                    {
                      style: {
                        lineHeight: "50px"
                      }
                    },
                    data.title
                  )
                ]
              );
            }
          });
        }
      });
    },
    renderNavItem(h, { root, node, data }) {
      this.rootSave = root;
      // leftNav节点渲染
      if (data.hasChild) {
        return h(
          "div",
          {
            style: {
              fontSize: "16px",
              paddingLeft: "34px",
              position: "relative",
              cursor: "pointer"
            },
            class: ["nav-item", data.selected ? "selected" : ""],
            on: {
              click: () => {
                this.navItemClick(root, data)
              }
            }
          },
          [
            h("Icon", {
              style: {
                width: "20px",
                height: "20px",
                lineHeight: "20px",
                position: "absolute",
                top: "50%",
                left: "10px",
                marginTop: "-10px",
                textAlign: "center"
              },
              class: [
                "ivu-icon",
                data.expand ? "ivu-icon-arrow-down-b" : "ivu-icon-arrow-right-b"
              ]
            }),
            h("Icon", {
              props: {
                type: data.iconClass,
                size: 28
              },
              style: {
                verticalAlign: "middle",
                width: "22px"
              }
            }),
            h(
              "span",
              {
                style: {
                  verticalAlign: "middle",
                  lineHeight: "60px",
                  marginLeft: "20px"
                }
              },
              data.title
            ),
            h("Spin", {
              props: {
                fix: true
              },
              style: [data.loading ? { "z-index": "71" } : { "z-index": "-1" }]
            })
          ]
        );
      } else {
        return h(
          "div",
          {
            style: {
              fontSize: "16px",
              paddingLeft: "34px",
              position: "relative",
              cursor: "pointer",
              transition: "all 400ms"
            },
            class: ["nav-item", data.selected ? "selected" : ""],
            on: {
              click: () => {
                let obj = data.title === '首页' ? {
                  isHome: true
                } : {
                  isHome: false,
                  name: data.title
                }
                this.$store.commit('setCurpage', obj)
                if (data.selected) return false
                root.forEach(ele => {
                  if (ele.node.expand) ele.node.expand = false
                  ele.node.selected = false
                })
                data.selected = true
                this.$router.push(data.href)
              }
            }
          },
          [
            h("Icon", {
              props: {
                type: data.iconClass,
                size: 28
              },
              style: {
                verticalAlign: "middle",
                width: "22px"
              }
            }),
            h(
              "span",
              {
                style: {
                  verticalAlign: "middle",
                  lineHeight: "60px",
                  marginLeft: "20px"
                }
              },
              data.title
            )
          ]
        );
      }
    },
    navItemClick (root, data, equipNo = null) {     
      if (data.children.length < 1) {
        this.loadNavList(data, rt => {
          rt.forEach(item => { 
            data.children.push(item)
          })
          data.loading = false
          this.$set(data, "expand", !data.expand)
        });
      }
      else {
        this.$set(data, "expand", !data.expand)
      }
      if (data.selected) return false
      root.forEach(ele => {
        ele.node.selected = false
      });
      data.selected = true
    },
    setNav () {
      const pathF = this.$route.path.split('/')[1],
        pathS = this.$route.path.split('/')[2]
        if (pathF === 'index') {
          this.navList.forEach(nav => {
            if (nav.href === pathS) {
              let obj = pathS === 'home' ? {
                isHome: true
              } : {
                isHome: false,
                name: nav.title
              }
              this.$store.commit('setCurpage', obj)
            }
            nav.selected = nav.href === pathS ? true : false
          })
          if (pathS === 'equips') {
            this.navItemClick(this.navList, this.navList[1])
          } else {
            this.loadCompleted = true
          }
        }
    },
    fullScreen(){
      //全屏事件
            if ($("body").hasClass("full-screen")) {
              this.screenAll = false;
                var de = document;
                if (de.exitFullscreen) {
                    de.exitFullscreen();
                } else if (de.mozCancelFullScreen) {
                    de.mozCancelFullScreen();
                } else if (de.webkitCancelFullScreen) {
                    de.webkitCancelFullScreen();
                }
                $("body").removeClass("full-screen");
            }
            else {this.screenAll = true;
                var de = document.documentElement;
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else if (de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                } else if (de.webkitRequestFullScreen) {
                    de.webkitRequestFullScreen();
                } else if (de.msRequestFullscreen) {
                    de.msRequestFullscreen();
                }
                $("body").addClass("full-screen");
            }
    },
    doNavState (equipNo, state) {
      if (this.navList[1].children.length) {
        this.dealNavState(this.navList[1].children, equipNo, state)
        this.dealSumState(this.navList[1].children)
      }
    },
    dealNavState (list, equipNo, state) {
      list.forEach(item => {
        if (item.children.length) {
          this.dealNavState(item.children, equipNo, state)
        } else {
          if (parseInt(item.equipNo) === parseInt(equipNo)) {
            item.alarmState = state
          }
        }
      })
    },
    dealSumState (list) {
      list.forEach(item => {
        if (item.children.length) {
          let alarmNum = 0
          item.children.forEach(nav => {
            alarmNum += (nav.alarmState === 'alarm') ? 1 : 0
          })
          item.alarmState = (alarmNum > 0) ? 'alarm' : 'fine'
          this.dealSumState(item.children)
        }
      })
    }
  },
  created () {
    this.getAuth()
    this.setNav()
  }
}
</script>

<style lang="scss" src="../assets/styles/sass/index.scss"></style>
