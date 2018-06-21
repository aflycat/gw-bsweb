<template>
  <div class="equips">
    <gw-tabs :navList="tabData"
    @tabsNavClick="tabClick"
    >
      <Icon slot="nav-icon-0" class="tab-alarm" type="android-warning" v-if="tabData[0].hasAlarm"></Icon>
      <Icon slot="nav-icon-1" class="tab-alarm" type="android-warning" v-if="tabData[1].hasAlarm"></Icon>
      <div :slot="tabData[0].name" class="visual">
        <table class="gw-table yc">
          <thead>
            <tr>
              <th v-for="(th, index) of tabData[0].tbHead" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIdx) of tabData[0].tbList" :key="lineIdx">
              <td class="status">
                <span :class="{warning : line.m_IsAlarm}"></span>
              </td>
              <td v-text="line.m_iYCNo"></td>
              <td v-text="line.m_YCNm"></td>
              <td v-text="line.m_YCValue + line.m_Unit"></td>
              <td class="chart">
                <Button type="primary"
                icon="stats-bars" @click="openChart(line)"></Button>
              </td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :slot="tabData[1].name" class="state">
        <table class="gw-table yx">
          <thead>
            <tr>
              <th v-for="(th, index) of tabData[1].tbHead" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIdx) of tabData[1].tbList" :key="lineIdx">
              <td class="status">
                <span :class="{warning : line.m_IsAlarm}"></span>
              </td>
              <td v-text="line.m_iYXNo"></td>
              <td v-text="line.m_YXNm"></td>
              <td v-text="line.m_YXState"></td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :slot="tabData[2].name" class="tab-set" style="height: 100%;overflow: auto;">
        <Card title="操作命令" :dis-hover="true">
          <Button icon="ios-search"
          v-for="(btn, btnIndex) of tabData[2].setList"
          :key="btnIndex"
          v-text="btn.set_nm"
          @click="doSet(btn)"
          ></Button>
        </Card>
      </div>
    </gw-tabs>
    <Modal
    v-model="showChart"
    :title=chartTitle
    @on-cancel="closeChart"
    >
      <div id="realData"></div>
    </Modal>
    <Modal
    v-model="showSet"
    title="设置"
    @on-ok="setConfirm"
    >
      <Form :label-width="100"
      v-if="setEquip !== null"
      class="set-form"
      >
        <FormItem :label="setEquip.set_nm + '：'">
          <Input
          v-model="setEquip.newVal"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <gw-loading v-if="isLoading"></gw-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gwTabs from "@page/public/GwTabs"
import gwLoading from "@page/public/GwLoading"
export default {
  name: 'equips',

  data () {
    return {
       aa:700,
      isLoading: true,
      tabData: [
        {
          name: 'ycData',
          title: '遥测量',
          isActive: false,
          isShow: false,
          hasAlarm: false,
          tbHead: ['报警状态', '模拟量ID', '名称', '当前值', '实时数据', '备注'],
          tbList: []
        },
        {
          name: 'yxData',
          title: '遥信量',
          isActive: false,
          isShow: false,
          hasAlarm: false,
          tbHead: ['报警状态', '状态量ID', '名称', '当前状态', '备注'],
          tbList: []
        },
        {
          name: 'setData',
          title: '设置',
          isShow: false,
          isActive: false,
          hasSet: false,
          setList: []
        }
      ],
      showSet: false,
      showChart: false,
      setEquip: null,
      chart: null,
      realData: [],
      chartTitle: '',
      openEquip: -1,
      hubConn: null,
      hubProxy: null,
      timer: null
    }
  },
  components: {
    gwTabs,
    gwLoading
  },
  computed: mapState({
    equipNo: state => state.curEquip.equipNo
  }),
  methods: {
    tabClick(navList, nv) {
      navList.forEach(nv => {
        nv.isActive = false
      })
      this.$set(nv, "isActive", true)
      // console.log(nv)
    },
    getAllState () {
      this.isLoading = true
      this.Axios.post('/api/real/equip_item_state', {
        equip_no: this.equipNo
      }).then(res => {
        let rt = res.data.HttpData

        if (rt.code === 200) {
          let data = rt.data
           console.log(data);
          this.tabData[0].tbList.splice(0, this.tabData[0].tbList.length)
          this.tabData[1].tbList.splice(0, this.tabData[1].tbList.length)
          for (let key in data.YCItemDict) {
            this.tabData[0].tbList.push(data.YCItemDict[key])
          }
          if (this.tabData[0].tbList.length > 0) {
            this.tabClick(this.tabData, this.tabData[0])
            this.tabData[0].isShow = true
          }
          else {
            this.tabData[0].isActive = false
            this.tabData[0].isShow = false
          }
          for (let key in data.YXItemDict) {
            this.tabData[1].tbList.push(data.YXItemDict[key])
          }
          if (this.tabData[1].tbList.length > 0) {
            this.tabData[1].isShow = true
            if (!this.tabData[0].isActive) {
              this.tabClick(this.tabData, this.tabData[1])
            }
          }
          else {
            this.tabData[1].isActive = false
            this.tabData[1].isShow = false
          }
          this.tabData[2].equipInfo = data.EquipItem
          this.getSetopt(this.tabData[2].equipInfo.m_iEquipNo)
        } else {
          this.$Message.warning('数据获取失败，请重试！')
          this.isLoading = false
          console.log(rt)
        }
      }).catch(err => {
        this.$Message.warning('token验证失败，请检查登陆信息!')
        console.log(err)
      })
    },
    getSetopt (equipNo) {
      const reqData = {
        findEquip: true,
        equipNo: equipNo
      }
      this.Axios.post('/api/GWServiceWebAPI/getSetparmList', reqData)
        .then(res => {
          let rt = res.data.HttpData
          if (rt.code === 200) {
            let data = rt.data
            console.log(data)
            if (data.length > 0) {
              // console.log(data)
              this.tabData[2].hasSet = true
              this.tabData[2].isShow = true
              this.tabData[2].setList = data
              if (!this.tabData[0].isShow && !this.tabData[1].isShow) {
                this.tabClick(this.tabData, this.tabData[2])
              }
            }
            else {
              this.tabData[2].hasSet = false
              this.tabData[2].isShow = false
            }
            this.tabData[2].setList = this.tabData[2].setList.sort((a, b) => {
              return a.set_no - b.set_no
            })
            this.isLoading = false
          }
          else {
            this.isLoading = false
            this.$Message.warning('获取设置操作列表失败，请重试！')
            console.log(rt)
          }
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    doSet (equip) {
      console.log(equip)
      if (equip.set_type === 'V') {
        this.setEquip = equip
        this.$set(this.setEquip, 'newVal', this.setEquip.value)
        this.showSet = true
      } else {
        this.$Modal.confirm({
          title: '执行操作',
          content: '<p>确定执行操作：<span style="color:#f90">' + equip.set_nm + '</span></p>',
          onOk: () => {
            const reqData = {
              equip_no: '' + equip.equip_no,
              main_instr: equip.main_instruction,
              mino_instr: equip.minor_instruction || "",
              value: equip.value
            }
            console.log(reqData);
            this.Axios.post('/api/real/setup', reqData)
              .then(res => {
                console.log(reqData)
                const rt = res.data.HttpData
                if (rt.code === 201) {
                  console.log(rt);
                  this.$Message.success(rt.message)

                  // this.getAllState()
                } else {
                  console.log(rt)
                  this.$Message.warning('操作失败，请重试')
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
      }
    },
    setConfirm () {
      if (isNaN(parseInt(this.setEquip.newVal))) {
        this.$Message.warning('设置失败，请输入正确格式')
      } else {
        const reqData = {
          equip_no: '' + this.setEquip.equip_no,
          main_instr: this.setEquip.main_instruction,
          mino_instr: this.setEquip.minor_instruction,
          value: this.setEquip.newVal
        }
        this.Axios.post('/api/real/setup', reqData)
          .then(res => {
            const rt = res.data.HttpData
            if (rt.code === 201) {
              this.$Message.success(rt.message)
              // this.getAllState()
            } else {
              console.log(rt)
              this.$Message.warning('操作失败，请重试')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    connectServer(equipNo) {
      // console.log('conn')
      this.hubConn = null
      this.hubConn = $.hubConnection()
      this.hubProxy = this.hubConn.createHubProxy('ServerHub')
      this.hubProxy.on('sendConnect', data => {
        console.log(data)
      });

      // 来自广播新消息类型和数据
      this.hubProxy.on('sendAll', (data, type) => {
        // console.log('ycyxall--------------' + type, data)
        // 更新报警状态
        let rt = JSON.parse(data)
        // console.log(rt)
        if (type === 'ycp') {
          this.tabData[0].hasAlarm = rt.some(item => item.m_IsAlarm === 'True')
          if (this.tabData[0].hasAlarm) {
            this.updateNavAlarm('alarm')
          } else {
            this.updateNavAlarm('fine')
          }
        } else if (type === 'yxp') {
          this.tabData[1].hasAlarm = rt.some(item => item.m_IsAlarm === 'True')
          if (this.tabData[1].hasAlarm) {
            this.updateNavAlarm('alarm')
          } else {
            this.updateNavAlarm('fine')
          }
        }
      });

      // ycp有广播消息
      this.hubProxy.on('sendYcpSingle', data => {
        // console.log('yccccp----------------', data)
        // 更新ycp实时数据
        this.tabData[0].tbList.forEach(item => {
          let rt = data.split(',')
          if (item.m_iYCNo === parseInt(rt[0])) {
            item.m_YCValue = rt[2]
            item.m_IsAlarm = rt[4] === 'True' ? true : false
            item.m_AdviceMsg = rt[3]
            this.tabData[0].hasAlarm = item.m_IsAlarm
          }
        })
      });

      // yxp有广播消息
      this.hubProxy.on('sendYxpSingle', data => {
          // console.log('yxxxxp-------------------', data)
          // 更新yxp实时数据
          this.tabData[1].tbList.forEach(item => {
            let rt = data.split(',')
            if(item.m_iYXNo === parseInt(rt[0])) {
              item.m_YXState = rt[2]
              item.m_IsAlarm = rt[4] === 'True' ? true : false
              item.m_AdviceMsg = rt[3]
              this.tabData[1].hasAlarm = item.m_IsAlarm
            }
          })
      });

      // 监听设备状态
      this.hubProxy.on('sendEquipSingle', data => {
        // console.log('equip-------------------', data)
        let rt = data.split(',')
        if (rt[2] === 'HaveAlarm') {
          this.updateNavAlarm('alarm')
        } else if (rt[2] === 'CommunicationOK') {
          this.updateNavAlarm('fine')
        }
      });
      
      this.hubConn.stop()
      // 开始连接signalr
      this.hubConn.start()
        .done(() => {
          // console.log('start!')
          this.hubProxy.invoke('Connect')
          this.hubProxy.invoke('ListenEquipAll', window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
          this.hubProxy.invoke('StartListen', equipNo, window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
        })
        .fail(err => {
            console.log('错误-------:', err)
        })

      // signalr重连
      this.hubConn.reconnecting(() => {
        this.hubConn.stop();
        this.hubConn.start()
          .done(() => {
              // console.log('start!')
              this.hubProxy.invoke('Connect')
              this.hubProxy.invoke('ListenEquipAll', window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
              this.hubProxy.invoke('StartListen', equipNo, window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
          })
          .fail(err => {
              console.log('错误-------:', err)
          })
      })
      // signalr断开连接
      this.hubConn.disconnected(() => {
        this.hubConn.stop()
      })
      // 高频连接触发
      this.hubConn.connectionSlow((err) => {
        // console.log(err)
      })
      // 收到signalr消息触发
      this.hubConn.received(() => {
        // console.log(err)
      })
    },
    connectHub (equipNo) {
      // console.log('reflash conn')
      this.hubConn.stop()
      // 开始连接signalr
      this.hubConn.start()
        .done(() => {
          // console.log('start!')
          this.hubProxy.invoke('Connect')
          this.hubProxy.invoke('ListenEquipAll', window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
          this.hubProxy.invoke('StartListen', equipNo, window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
        })
        .fail(err => {
            console.log('错误-------:', err)
        })
    },
    closeChart () {
      this.chart = null
      clearInterval(this.timer)
    },
    openChart (lineObj) {
      console.log(22);
      if (this.chart === null) {
        this.chart = this.$echart.init(document.getElementById('realData'))
      }
      this.openEquip = lineObj.m_iYCNo
      this.realData.splice(0, this.realData.length)
      this.chartTitle = lineObj.m_YCNm
      this.showChart = !this.showChart
      // console.log(lineObj)
      this.chart.setOption({
        title: {
          show: false,
          text: lineObj.m_YCNm,
          textStyle: {
            width: '100%',
            fontSize: 16,
            align: 'center'
          }
        },
        tooltip: {},
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLabel: {
            margin: 12
          }
        },
        yAxis: [{
          name: lineObj.m_Unit,
          nameTextStyle: {
            align: 'right',
            padding: [0, 30, 0, 0]
          },
          nameGap: 30,
          type: 'value',
          scale: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 12
          },
          // boundaryGap: ['20%', '20%']
          min: value => value.min -1,
          max: value => value.max + 1
        }],
        series: [{
            name: lineObj.m_Unit,
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#7BB4EB',
              borderColor: '#7BB4EB',
              borderWidth: 4
            },
            label: {
              show: true,
              distance: 8,
              color: '#333',
              formatter: (item) => item.value[1] + lineObj.m_Unit
            },
            lineStyle: {
              color: '#7BB4EB'
            },
            data: this.realData
        }]
      })
      if (this.timer) clearInterval(this.timer)
      this.updateChart([new Date().getTime(), parseInt(lineObj.m_YCValue)])
      if (this.chart !== null) {
        this.timer = setInterval(() => {
          this.updateChart([new Date().getTime(), parseInt(lineObj.m_YCValue)])
        }, 3000)   
      }
    },
    updateChart (newData) {
      this.realData.push(newData)
      if (this.realData.length > 15) {
        this.realData.shift()
      }
      // console.log(this.realData)
      this.chart.setOption({
        series: [{
          data: this.realData
        }]
      })
    },
    updateNavAlarm (state) {
      this.$emit('updateNavState', this.equipNo, state)
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setEquipNo', to.hash.substr(1))
    next()
    this.getAllState()
    this.connectHub(this.equipNo)
  },
  beforeRouteLeave (to, from, next) {
    this.hubConn.stop()
    next()
  },
  mounted () {
    this.$store.commit('setEquipNo', this.$route.hash.substr(1))
    this.getAllState()
    this.connectServer(this.equipNo)
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equips.scss"></style>
