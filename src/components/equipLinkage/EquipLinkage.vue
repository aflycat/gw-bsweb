<template>
  <div class="equip-linkage">
    <gw-tabs :navList="tabs" @tabsNavClick="tabClick">
      <div slot="tabnav" class="extend">
        <a class="btn add" href="javascript:;" v-if="tabs[0].isActive" @click="showAdd = !showAdd">添加</a>
        <a class="btn add" href="javascript:;" v-else @click="showAddScene = !showAddScene">添加场景</a>
      </div>
      <div :slot="tabs[0].name" class="linkage">
        <Spin fix v-if="loadData">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <table class="gw-table">
          <thead>
            <tr>
              <th v-for="(head, cIndex) of linkTable.tbTitle" :key="cIndex" v-text="head"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, cIndex) of linkTable.list" :key="cIndex + '-tr'">
              <td v-text="item.equipName"></td>
              <td v-text="item.cType"></td>
              <td v-text="item.cCurren"></td>
              <td v-text="item.delayTime"></td>
              <td v-text="item.linkageEquip"></td>
              <td v-text="item.linkageOpt"></td>
              <td v-text="item.optCode"></td>
              <td v-text="item.remarks"></td>
              <td class="opt">
                <i title="编辑" class="iconfont icon-scheduleMODIFY" @click="editModal(item)"></i>
                <i title="删除" class="iconfont icon-scheduleDEL" @click="deleteLinkage(item)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :slot="tabs[1].name" class="scene">
        <Spin fix v-if="sceneLoading">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <Collapse
        v-if="sceneData.length"
        :value="sceneData[0].equip_no + '-' + sceneData[0].set_no"
        accordion
        >
          <Panel
          class="panel"
          v-for="(scene, index) of sceneData"
          :key="index + '-' + scene.set_no"
          :name="scene.equip_no + '-' + scene.set_no"
          >
              {{scene.set_nm}}
              <Form slot="content"
              :label-width="120"
              label-position="left"
              class="form"
              >
                <FormItem label="场景名称">
                  <Input v-model="scene.set_nm"></Input>
                </FormItem>
                <FormItem label="场景控制项">
                  <ul>
                    <li v-for="(opt, optIndex) of scene.children"
                    :key="optIndex"
                    >
                      <div class="show">
                        <span>{{optIndex+1}}.</span>
                        <span v-text="opt.parentEquip.equip_nm"></span>:
                        <span>{{opt.set_nm}}</span>
                      </div>
                      <div class="btnbox">
                        <ButtonGroup>
                          <Button type="primary" icon="arrow-up-c" title="在前面插入一项" @click="actModal(index, optIndex, false)"></Button>
                          <Button type="primary" icon="arrow-down-c" title="在后面插入一项" @click="actModal(index, optIndex, true)"></Button>
                          <Button type="error" icon="ios-trash-outline" title="删除" @click="deleteAct(optIndex, scene.children)"></Button>
                        </ButtonGroup>
                      </div>
                    </li>
                  </ul>
                  <div class="btnbar">
                    <a href="javascript:;" class="btn submit" v-if="scene.children.length < 1" @click="actModal(index, 0, false)">新增控制</a>
                    <a href="javascript:;" class="btn submit" @click="submitScene(scene)">保存场景</a>
                    <a href="javascript:;" class="btn delete" @click="deleteScene(scene)">删除</a>
                  </div>
                </FormItem>
              </Form>
          </Panel>
        </Collapse>
      </div>
    </gw-tabs>
    <Modal v-model="showAdd"
    @on-ok="addLinkage(formData)"
    >
      <div slot="header">联动设置</div>
      <Form :label-width="180"
      :model="formData"
      >
        <FormItem label="选择联动触发设备和触发点：">
          <Cascader
          :data="listAdd"
          :load-data="loadListAdd"
          v-model="formData.selectedAdd"
          ></Cascader>
        </FormItem>
        <FormItem label="设置延时时间(毫秒)：">
          <Input
          v-model="formData.layout"
          placeholder="延时时间"
          ></Input>
        </FormItem>
        <FormItem label="选择联动关联设备和操作："
        >
          <Cascader
          :data="formData.linkageEquips"
          :load-data="loadLinkageEquips"
          v-model="formData.selectedLinkages"
          >
          </Cascader>
        </FormItem>
        <FormItem label="备注信息：">
          <Input
          v-model="formData.remarks"
          placeholder="备注信息"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal  v-model="showAct" @on-ok="insertAct(insertForm)">
      <div slot="header">插入控制</div>
      <Form :label-width="180"
      :model="insertForm" style="height:220px;"
      >
        <FormItem>
          <RadioGroup v-model="insertForm.type">
          <Radio label="设备控制"></Radio>
          <Radio label="设置延时"></Radio>
        </RadioGroup>
        </FormItem>
        <template v-if="insertForm.type === '设备控制'">
          <FormItem label="选择控制设备：" style="padding-right: 100px">
            <Select v-model="insertForm.actEquip"
            @on-change="judgeSetVal"
            >
              <Option
              v-for="(item, index) of insertForm.insertList"
              :value="item.value"
              :key="index"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="设置值：" v-if="insertForm.setVal">
            <Input v-model="insertForm.actVal" placeholder="设置值"></Input>
          </FormItem>
        </template>
        <template v-if="insertForm.type === '设置延时'">
          <FormItem label="时长(毫秒)：">
            <p>{{insertForm.totalTime}}ms</p>
          </FormItem>
          <FormItem label="延时间隔：">
            <TimePicker
            v-model="insertForm.delayTime"
            type="time"
            placeholder="设置时间"
            format="HH:mm:ss:SSS"
            @on-change="calDelayTime"
            ></TimePicker>
          </FormItem>
        </template>
      </Form>
    </Modal>
    <Modal v-model="showAddScene"
    >
      <div slot="header">添加场景</div>
      <Form :label-width="200"
      :model="newScene"
      :rules="ruleNewScene"
      ref="sceneValidate"
      >
        <FormItem label="场景名称：" prop="title" style="padding-right: 100px">
          <Input v-model="newScene.title" placeholder="输入场景名称"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showAddScene = false">取消</Button>
        <Button type="primary" size="large" @click="addScene(sceneData, newScene)">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import gwTabs from "@page/public/GwTabs"
export default {
  data() {
    return {
      loadData: false,
      showAdd: false,
      showAct: false,
      showDelete: false,
      showAddScene: false,
      listAdd: [],
      typeList: [
        {
          value: "X",
          label: "状态量报警",
          children: []
        },
        {
          value: "x",
          label: "状态量恢复",
          children: []
        },
        {
          value: "C",
          label: "模拟量越线",
          children: []
        },
        {
          value: "c",
          label: "模拟量恢复",
          loading: false,
          children: []
        },
        {
          value: "E",
          label: "设备通讯故障",
          children: []
        },
        {
          value: "e",
          label: "设备通讯恢复",
          children: []
        },
        {
          value: "S",
          label: "设备状态故障",
          children: []
        },
        {
          value: "s",
          label: "设备状态恢复",
          children: []
        }
      ],
      tabs: [
        {
          name: "linkage",
          title: "联动设置",
          isActive: true,
          isShow: true
        },
        {
          name: "scene",
          title: "场景编辑",
          isActive: false,
          isShow: true
        }
      ],
      linkTable: {
        tbTitle: [
          "触发设备",
          "触发类型",
          "触发点",
          "延时(ms)",
          "联动设备",
          "联动命令",
          "命令参数",
          "备注信息",
          "操作"
        ],
        list: []
      },
      formData: {
        isEdit: false,
        layout: 0,
        selectedAdd: [],
        linkageEquips: [],
        selectedLinkages: [],
        optCode: '',
        remarks: ''
      },
      setList: [],
      equipList: [],
      sceneLoading: false,
      sceneData: [],
      insertForm: {
        isAfter: true,
        curIndex: 0,
        insertList: [],
        setVal: false,
        actEquip: 0,
        actVal: 0,
        type: '设备控制',
        delayTime: '00:00:00:000',
        totalTime: 0
      },
      newScene: {
        title: ''
      },
      ruleNewScene: {
        title: [
          {
            required: true,
            message: '名称不能为空'
          }
        ]
      }
    }
  },
  methods: {
    tabClick(navList, nv) {
      navList.forEach(nv => {
        nv.isActive = false
      })
      this.$set(nv, "isActive", true)
      if (nv.name === "linkage" && this.linkTable.list.length < 1) {
        this.initAddList()
      } else if (nv.name === "scene" && this.setList.length < 1) {
        this.initSceneList()
      }
      // console.log(nv)
    },
    addLinkage (data) {
      let reqData = {
        id: data.id,
        equipNo: data.selectedAdd[0],
        cType: data.selectedAdd[1],
        cNo: data.selectedAdd.length > 2 ? data.selectedAdd[2] : 0,
        delay: parseInt(data.layout),
        linkEquipNo: data.selectedLinkages[0],
        linkNo: data.selectedLinkages[1],
        optCode: data.optCode,
        remarks: data.remarks.replace(/'/g, '\'\'')
      }
      if (!reqData.equipNo || !reqData.cType || !reqData.linkEquipNo || !reqData.linkNo) {
        this.$Message.info('配置不正确，请选择后操作!')
        return false
      }
      if (data.isEdit === false) {
        this.Axios.post('/api/GWServiceWebAPI/addLinkage', reqData)
          .then(res => {
            let rt = res.data.HttpData
            if (rt.code === 200) {
              if (rt.data === 1) {
                this.$Message.success('添加成功')
                this.initTableList(this.linkTable)
              } else {
                this.$Message.warning('操作失败，请重试！')
              }
            } else {
              console.log(rt)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.Axios.post('/api/GWServiceWebAPI/updateLinkage', reqData)
          .then(res => {
            let rt = res.data.HttpData
            if (rt.code === 200) {
              if (rt.data === 1) {
                this.$Message.success('修改成功')
                this.initTableList(this.linkTable)
              } else {
                this.$Message.warning('修改失败，请重试！')
              }
            } else {
              this.$Message.error('服务器错误，请重试！')
            }
            this.formData.isEdit = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    editModal (row) {
      this.showAdd = true
      // console.log(row)
      this.formData.id = row.originalData.ID
      this.formData.selectedAdd = [row.originalData.iequip_no, row.originalData.iycyx_type, row.originalData.iycyx_no]
      this.formData.layout = row.originalData.delay
      this.formData.selectedLinkages = [row.originalData.oequip_no, row.originalData.oset_no]
      this.formData.remarks = row.originalData.ProcDesc
      this.formData.isEdit = true
      // this.addLinkage(this.formData)
    },
    deleteLinkage (row) {
      // console.log(row)
      this.$Modal.confirm({
        title: '操作提示',
        content: '是否删除该设置?',
        onOk: () => {
          this.Axios.post('/api/GWServiceWebAPI/deleteLinkage', {
            id: row.originalData.ID
          })
            .then(res => {
              let rt = res.data.HttpData
              if (rt.code === 200 && rt.data === 1) {
                this.$Message.success('删除成功')
                this.initTableList(this.linkTable)
              } else {
                this.$Message.warning('操作失败，请重试！')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      this.showDelete = true
    },
    loadListAdd(item, callback) {
      // 触发设备和可触发点级联载入
      item.loading = true;
      let reqData = {
        equip_nos: item.value
      };
      this.Axios.all([
        this.Axios.post("/api/GWServiceWebAPI/getYcp", reqData),
        this.Axios.post("/api/GWServiceWebAPI/getYxp", reqData)
      ])
        .then(
          this.Axios.spread((ycpRes, yxpRes) => {
            let ycpRt = ycpRes.data.HttpData,
              yxpRt = yxpRes.data.HttpData;
            if (ycpRt.code === 200 || yxpRt.code === 200) {
              let ycpData = ycpRt.data,
                yxpData = yxpRt.data;
              item.children = this.typeList;
              if (!ycpData || !ycpData.length) {
                item.children = item.children.filter((child, index) => {
                  return index !== 2 && index !== 3;
                });
              } else {
                item.children.map((child, index) => {
                  if (index === 2 || index === 3) {
                    child.children = ycpData.map(yc => {
                      return {
                        value: yc.yc_no,
                        label: yc.yc_nm
                      }
                    })
                  }
                })
              }
              if (!yxpData || !yxpData.length) {
                item.children = item.children.filter((item, index) => {
                  return index !== 0 && index !== 1;
                });
              } else {
                item.children.map((child, index) => {
                  if (index === 0 || index === 1) {
                    child.children = yxpData.map(yx => {
                      return {
                        value: yx.yx_no,
                        label: yx.yx_nm
                      }
                    })
                  }
                })
              }
              item.loading = false;
              // console.log(ycpData, yxpData)
            } else {
              console.log(ycpRes, yxpRes);
              this.$Message.warning(ycpRt.message);
            }
            callback();
          })
        )
        .catch(err => {
          console.log(err);
        });
    },
    loadLinkageEquips (equip, callback) {
      // 联动设备和操作级联
      equip.loading = true
      this.Axios.post('/api/real/get_setparm', {
        equip_nos: equip.value
      })
        .then(res => {
          let rt = res.data.HttpData
          if (rt.code === 200) {
            let data = rt.data
            // console.log(data)
            equip.children = data.map(item => {
              return {
                value: item.set_no,
                label: item.set_nm,
                children: []
              }
            })
          }
          equip.loading = false
          callback()
        })
        .catch(err => {
          console.log(err)
        })
    },
    actModal (parentIndex, childIndex, isAfter) {
      this.insertForm.isAfter = isAfter
      this.insertForm.scenIndex = parentIndex
      this.insertForm.actIndex = childIndex
      this.showAct = !this.showAct
    },
    judgeSetVal (option) {
      if (option.split('-')[2] === 'V') {
        this.insertForm.setVal = true
      } else {
        this.insertForm.setVal = false
      }
    },
    calDelayTime (time) {
      this.insertForm.totalTime = parseInt(time.split(':')[0]) * 3600000 + parseInt(time.split(':')[1]) * 60000 + parseInt(time.split(':')[2]) * 1000 + parseInt(time.split(':')[3])
      this.insertForm.totalTime = isNaN(this.insertForm.totalTime) ? 0 : this.insertForm.totalTime
    },
    insertAct (data) {
      let insertIndex = data.isAfter ? (data.actIndex + 1) : data.actIndex
      if (data.type === '设备控制') {
        if (data.actEquip === '') {
          this.$Message.warning('未选择控制项')
          return
        }
        let equipNo = parseInt(data.actEquip.split('-')[0]),
          setNo = parseInt(data.actEquip.split('-')[1])
        let newItem = data.insertList.filter(equip => {
          return equip.equip_no === equipNo && equip.set_no === setNo
        })[0]
        // console.log(newItem)
        this.sceneData[data.scenIndex].children.splice(insertIndex, 0, newItem)
      }
      else if (data.type === '设置延时') {
        if (data.totalTime <= 0) {
          this.$Message.warning('设置的延时需大于0ms')
          return
        }
        this.sceneData[data.scenIndex].children.splice(insertIndex, 0, {
          isDelay: true,
          parentEquip: {
            equip_nm: "间隔操作"
          },
          set_nm: "延时间隔" + data.totalTime + "ms",
          time: data.totalTime
        })
      }
    },
    deleteAct (actIndex, actList) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '是否删除该项？',
        onOk () {
          actList.splice(actIndex, 1)
        }
      })
    },
    submitScene (scene) {
      // console.log(scene)
      let dataStr = ''
      scene.children.forEach((item, index) => {
        if (item.isDelay) {
          dataStr += (index === 0) ? item.time : '+' + item.time
        } else {
          dataStr += (index === 0) ? (item.equip_no + ',' + item.set_no) : ('+' + item.equip_no + ',' + item.set_no)
        }
      })
      let reqData = {
        equipNo: scene.equip_no,
        setNo: scene.set_no,
        sceneName: scene.set_nm,
        dataStr: dataStr
      }
      // console.log(reqData)
      this.Axios.post('/api/GWServiceWebAPI/updateScene', reqData)
       .then(res => {
         let rt = res.data.HttpData
         if (rt.code === 200 && rt.data > 0) {
            this.$Message.success('保存成功！')
         } else {
            this.$Message.warning('操作失败，请重试！')
            console.log(rt)
         }
       })
       .catch(err => {
         console.log(err)
       })
    },
    addScene (sceneList, newItem) {
      let title = newItem.title.replace(/'/g, '\'\'')
      if (sceneList.some(item => {
        return item.set_nm === title
      })) {
        this.$Message.warning('该场景名称已存在，请重试！')
      }
      else {
        this.$refs['sceneValidate'].validate(flag => {
          if (flag) {
            let setNo = 1,
              equipNo = 0
            if (this.equipList.filter(equip => equip.communication_drv === 'GWChangJing.NET.dll').length > 0) {
              equipNo = this.equipList.filter(equip => equip.communication_drv === 'GWChangJing.NET.dll')[0].equip_no
            }
            sceneList.forEach(item => {
              setNo += (sceneList.some(scene => {
                return scene.set_no === setNo
              })) ? 1 : 0
            })
            let reqData = {
              title: title,
              equipNo: equipNo,
              setNo: setNo
            }
            
            this.Axios.post('/api/GWServiceWebAPI/addScene', reqData)
              .then(res => {
                let rt = res.data.HttpData
                if (rt.data > 0) {
                  this.$Message.success('场景添加成功')
                  this.initSceneList()
                }
                else {
                  console.log(rt)
                  this.$Message.warning('场景添加失败，请重试！')
                }
              })
              .catch(err => {
                console.log(err)
              })
            this.showAddScene = false
          }
        })
      }
    },
    deleteScene (scene) {
      // console.log(this.sceneData)
      this.$Modal.confirm({
        title: '删除场景',
        content: '是否删除该场景？',
        onOk: () => {
          let reqData = {
            equipNo: scene.equip_no,
            setNo: scene.set_no
          }
          this.Axios.post('/api/GWServiceWebAPI/deleteScene', reqData)
            .then(res => {
              let rt = res.data.HttpData
              if (rt.code === 200 && rt.data > 0) {
                this.$Message.success('删除成功！')
                this.initSceneList()
              }
              else {
                this.$Message.warning('操作失败，请重试！')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    initTableList (dt) {
      this.loadData = true
      this.Axios.all([this.Axios.post('/api/GWServiceWebAPI/getLinkageList'), this.Axios.post('/api/GWServiceWebAPI/getYcpList'), this.Axios.post('/api/GWServiceWebAPI/getYxpList'), this.Axios.post('/api/GWServiceWebAPI/getSetparmList', {
        findEquip: false
      })])
        .then(this.Axios.spread((res, ycpRes, yxpRes, parmRes) => {
          let rt = res.data.HttpData,
            ycpRt = ycpRes.data.HttpData,
            yxpRt = yxpRes.data.HttpData,
            parmRt = parmRes.data.HttpData
          if (rt.code === 200 && ycpRt.code === 200 && yxpRt.code === 200 && parmRt.code === 200) {
            let data = rt.data,
              ycpData = ycpRt.data,
              yxpData = yxpRt.data,
              parmData = parmRt.data
            // console.log(data)
            dt.list = data.map(row => {
              let result = {}
              result.originalData = row
              result.delayTime = row.delay
              result.optCode = row.value
              result.remarks = row.ProcDesc
              this.formData.linkageEquips.forEach(item => {
                if (row.oequip_no === item.value) {
                  result.linkageEquip = item.label
                }
              })
              parmData.forEach(item => {
                if (row.oequip_no === item.equip_no && row.oset_no === item.set_no) {
                  result .linkageOpt = item.set_nm
                }
              })
              this.listAdd.forEach(item => {
                result.equipName = (item.value === row.iequip_no) ? item.label : result.equipName
              })
              this.typeList.forEach(item => {
                if (item.value === row.iycyx_type)
                {
                  result.cType = item.label
                }
              })
              // console.log(row)
              if (row.iycyx_type === "c" || row.iycyx_type === "C"){
                ycpData.forEach(item => {
                  if (row.iequip_no === item.equip_no && row.iycyx_no === item.yc_no) {
                    result.cCurren = item.yc_nm
                  }
                })
              } else if (row.iycyx_type === "x" || row.iycyx_type === "X") {
                yxpData.forEach(item => {
                  if (row.iequip_no === item.equip_no && row.iycyx_no === item.yx_no) {
                    result.cCurren = item.yx_nm
                  }
                })
              } else {
                result.cCurren = "无"
              }
              return result
            })
            this.loadData = false
            // console.log(dt.list)
          }
        }))
        .catch(err => {
          console.log(err)
        })
    },
    initAddList () {
      // 获取新增设置菜单相关数据
      if (this.listAdd.length < 1 || this.formData.linkageEquips.length < 1) {
        this.loadData = true
        this.Axios.all([this.Axios.post('/api/GWServiceWebAPI/getEquipList'), this.Axios.post('/api/GWServiceWebAPI/getSetparmList', {findEquip: false})])
          .then(this.Axios.spread((equipRes, parmRes) => {
            let equipRt = equipRes.data.HttpData,
              parmRt = parmRes.data.HttpData
              if (equipRt.code === 200 && parmRt.code === 200) {
                let equipData = equipRt.data,
                  parmData = parmRt.data
                  // console.log(equipData)
                // 触发设备列表
                this.listAdd = equipData.map(item => {
                  return {
                    value: item.equip_no,
                    label: item.equip_nm,
                    loading: false,
                    children: []
                  }
                })
                // console.table(equipRt.data)
                // console.table(parmData)
                // 联动关联设备列表
                this.formData.linkageEquips = equipData.filter((equip, index) => {
                  if (parmData.some(parm => {
                    return equip.equip_no === parm.equip_no
                  })) {
                    return equip
                  }
                }).map(equip => {
                  return {
                      value: equip.equip_no,
                      label: equip.equip_nm,
                      loading: false,
                      children: []
                    }
                })
                this.loadData = false
                // console.log(this.formData.linkageEquips)
              }
              this.initTableList(this.linkTable)
          }))
          .catch(err => {
            console.log(err)
          })
      }
    },
    initSceneList () {
      this.sceneLoading = true
      this.Axios.all([this.Axios.post('/api/GWServiceWebAPI/getSetparmList', {findEquip: false}), this.Axios.post('/api/GWServiceWebAPI/getEquipList')])
        .then(this.Axios.spread((res, equipRes) => {
          let rt = res.data.HttpData,
            equipRt = equipRes.data.HttpData
          if (rt.code === 200 && equipRt.code === 200) {
            this.setList = rt.data
            this.equipList = equipRt.data
            this.sceneData = this.setList.filter(item => {
              return item.set_type === "J"
            }).map(item => {
              let keyArr = []
              if (item.value !== null) {
                keyArr = item.value.split('+').map(key => {
                  return key.split(',')
                })
              }
              else {
                keyArr = [['']]
              }
              this.$set(item, 'childKey', keyArr)
              this.$set(item, 'children', [])
              item.childKey.forEach(k => {
                if (k.length < 2) {
                  if (k[0] !== '') {
                    let time = parseInt(k[0])
                    item.children.push({
                      isDelay: true,
                      time: time,
                      set_nm: '延时间隔' + time + '毫秒'
                    })
                  }
                }
                else {
                  this.setList.forEach(equip => {
                    let equipNo = parseInt(k[0]),
                    setNo = parseInt(k[1])
                    if (equip.equip_no === equipNo && equip.set_no === setNo) {
                      item.children.push(equip)
                    }
                  })
                }
              })
              item.children.map(child => {
                if (child.isDelay) {
                  child.parentEquip = {
                    equip_nm: '间隔操作'
                  }
                }
                else {
                  this.equipList.forEach(equip => {
                    if (equip.equip_no === child.equip_no) {
                      child.parentEquip = equip
                    }
                  })
                }
                return child
              })
              return item
            })
            // console.log(this.setList)
            this.insertForm.insertList = this.setList.map(equip => {
              equip.value = equip.equip_no + '-' + equip.set_no + '-' + equip.set_type
              this.$set(equip, 'label', equip.set_nm)
              if (!equip.parentEquip) {
                equip.parentEquip = this.equipList.filter(item => {
                  return equip.equip_no === item.equip_no
                })[0]
              }
              return equip
            })
            // 过滤目前不可操作设备
            this.insertForm.insertList = this.insertForm.insertList.filter(equip => {
              if (this.equipList.some(eqp => {
                return equip.equip_no === eqp.equip_no
              })) {
                return equip
              }
            })
            // console.log(this.sceneData)
          } else {
            this.$Message.warning('初始化数据失败，请重试！')
            console.log(rt, equipRt)
          }
          this.sceneLoading = false
        }))
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    gwTabs
  },
  mounted() {
    this.tabs.forEach(item => {
      let curTab = item.isActive ? item.name : null
      if (curTab === "linkage") {
        this.initAddList()
      }
      else if (curTab === "scene") {
        this.initSceneList()
      }
    })
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equip-linkage.scss"></style>