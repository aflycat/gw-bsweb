
<style lang="scss">
$width:100%;
$height:100%;
$overflow:hidden;
$blueColor:#2d8cf0;
$num0:0px;

::-webkit-scrollbar{
  width: 4px;    
  height: 4px;
}

::-webkit-scrollbar-thumb{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.rowClassName{padding-left: $num0;padding-right: $num0;width: $width;text-align: center;}
.ivu-table-cell{padding-left: $num0;padding-right: $num0;width: $width;text-align: center;white-space: nowrap;overflow: hidden;word-break: keep-all;}

.ivu-modal{
  .ivu-modal-content>.ivu-modal-body{
     max-height:600px;overflow:auto;
  }
}
.moreInforWord{margin-top:10px;font-size:15px;}
.lableName{font-size: 16px;margin-right:10px;color:#989898;}
.labelVal{font-size: 15px;margin-left:10px;color:#303030;}
.clickActive{
 border:1px solid $blueColor;
 box-sizing: border-box;
 color:$blueColor
}
.system-conf{
    width:$width;
    height:$height;
    .wrap{
        width:$width;
        height:$height;
        .itemDetail{
            height: $height;
            overflow: $overflow;
            padding-left: 15px;
        }
        .itemList{
            height: $height;
            overflow-y: scroll;
            p{
              width:95%;
              height:50px;
              line-height: 50px;
              background: #f9f9f9;
              margin:10px auto;
              font-size:15px;
              text-align: center;
              white-space: nowrap;
              word-break: keep-all;
               text-overflow: ellipsis;
              overflow: $overflow;
              &:hover{
                  border:1px solid $blueColor;
                  box-sizing: border-box;
                  color:$blueColor;
                  cursor:pointer;
              }
            }
        }
    }
    .ivu-tabs-bar{
        margin-bottom:$num0;
        height: 40px;
    }
    .ivu-tabs-nav-container{height: 40px !important;}
    .ivu-table-wrapper{border:none;}
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar{
        .ivu-tabs-tab{
              margin-right:$num0;
              border-radius: $num0;
              border-right: none;
              font-size:15px;
              height:40px;
              line-height: 2;
              border-bottom: 1px solid #dddee1;
              &:last-child{
                  border-right:1px solid #dddee1;
              }
        }
        .ivu-tabs-tab-active{
            border-top:1px solid $blueColor;
            box-sizing: border-box;
            background: #F9F9F9;
        }
    }
    .ivu-table .ivu-table-header table{ 
        .ivu-table-cell{
              padding-left: $num0;
              padding-right:$num0;
              width: $width;
              font-weight: 200;
              font-size: 0.9rem;
              text-align: center;
              color:#858585;
              width:$width;
              height:$height;
              line-height:40px;
        }
    }
    .ycp .ivu-table .ivu-table-header table{
        .ivu-table-cell{

            white-space: nowrap;
            word-break:keep-all;
            overflow:$overflow;
           
           

        }
    }
   
    .ivu-table{
        &:after{
            height:$num0;
        }
        &:before{
            height:$num0;
        }
        th{
            background: #fff;
            border:none $num0;
        }
        td{
            border:none $num0;
            font-size: 1rem;
        }
        .demo-table-info-row td{
            background-color: #f9f9f9;
        }
        .demo-table-error-row td{
            background-color: #fff; 
        }
        .ivu-table-row{
            &:hover{
                td{
                    background: #ebf7ff !important; 
                }
            }
        }
        .ivu-table-wrapper{
             height:$height;
        }
    }
    .ivu-table-fixed,.ivu-table-fixed-right{
      .ivu-table-fixed-header{
        .ivu-table-cell{
          font-size:0.9rem;
          color:#858585;
          font-weight:200;
        }
      }
    }

    .ivu-table-fixed-right::before, .ivu-table-fixed::before{
      height:0;
    }
    .ivu-table-fixed, .ivu-table-fixed-right{
      box-shadow:none;
    }
    .ivu-table-fixed-right{
      right:-1;
    }
  
}
</style>

<template>
  <div class="system-conf">
    <Row class="wrap">
      <Col span="3" class="itemList">
      <p title="全选" @click="selectAll()" :class="allSelect?'clickActive':''">全选</p>
      <p  v-for="(item,$index) in itemList" @click="loadInformation(item.m_iEquipNo,$index)"   ref="mybox" :title="item.m_EquipNm">
        <!-- :class="$index==active?'clickActive':''" -->
        {{item.m_EquipNm}}
      </p>
    </Col>
    <Col span="21" class="itemDetail">
    <div class="common-tabSys">
      <Button type="primary" style="margin-right:10px;border-radius:0;background:#2d8cf0;padding:8.5px 21.5px;font-size:14px;line-height:inherit;color:#fff;position:absolute;right:0;z-index: 99;" @click="selectEvent()">查询</Button >
      <Tabs type="card" :animated="false">

        <TabPane label="设备配置" class="ycp">

          <Table :columns="columnsEq" :data="dataEq" :height="tableHeight"  :row-class-name="rowClassName"></Table>
          
        </TabPane>

        <TabPane label="遥测量配置" class="ycp">

          <Table :columns="columnsYc" :data="dataYc"  :height="tableHeight"  :row-class-name="rowClassName"></Table>
          
        </TabPane>
        <TabPane label="遥信量配置" class="ycp">

          <Table :columns="columnsYx" :data="dataYx" :height="tableHeight"  :row-class-name="rowClassName"></Table>

        </TabPane>
        <TabPane label="设置配置" class="ycp">

          <Table :columns="columnsSet" :data="dataSet" :height="tableHeight" :row-class-name="rowClassName" ></Table>

        </TabPane>
      </Tabs>
    </div>
  </Col>
</Row>
<Modal title="查看其他信息" v-model="modal1" class-name="vertical-center-modal" :styles="{top: '50px',width:'800px'}" class="uploadWrap">
    <Row>
        <Col span="12">
              <p class="moreInforWord" v-for="(key,val) in moreInfor" :key="val" v-if="val>=0&&val<=10" >
                <span class="lableName" style="width:170px;display:inline-block;text-align:right;">{{key.name}}</span>:<span class="labelVal">{{key.value}}</span> 
              </p>
        </Col>
        <Col span="12">
            <p class="moreInforWord" v-for="(key,val) in moreInfor" :key="val" v-if="val>10">
              <span class="lableName" style="width:170px;display:inline-block;text-align:right;">{{key.name}}</span>:<span class="labelVal">{{key.value}}</span> 
            </p>
        </Col>
    </Row>
</Modal>
<Modal title="编辑信息" v-model="modal2" class-name="vertical-center-modal"  :styles="{top: '50px',width:'800px'}"  class="uploadWrap"  @on-ok="configData(configIndex)">
<Row>
    <Col span="12">
          <p v-for="(item,index) in uploadInfor" v-if="index<=(leftNum+chazhiNum)"  style="margin-top:10px;">
            <span  style="width:125px;display:inline-block;text-align:right;">{{item.name}}:</span>
            <Input v-model="item.value"  v-if="index==0||item.name=='模拟量编号'||item.name=='状态量编号'||item.name=='设置号'" disabled placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
            <Input v-model="item.value"  v-else="index!=0" placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
          </p>
    </Col>
<Col span="12">
        <p v-for="(item,index) in uploadInfor" v-if="index>(leftNum+chazhiNum)"  style="margin-top:10px;">
          <span  style="width:125px;display:inline-block;text-align:right;">{{item.name}}:</span>
          <Input v-model="item.value"  v-if="index==0||item.name=='模拟量编号'||item.name=='状态量编号'||item.name=='设置号'" disabled placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
          <Input v-model="item.value"  v-else="index!=0" placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
        </p>
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">关联视频:</span>
          <Select style="width:200px;margin-left:20px;" clearable v-model="loadDefVideo"  placement="bottom" filterable  transfer>
            <Option v-for="item in  videoList" :key="item.ID"   :value="item.videoCode" >{{item.ChannelName}}</Option>

          </Select>
        </p>
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">资产编号:</span>
          <Select  style="width:200px;margin-left:20px;"  clearable v-model="loadDefZic"  placement="bottom" filterable transfer>
            <Option v-for="item in  zizhanList" :key="item.ZiChanID" :value="item.ZiChanID">{{item.ZiChanName}}</Option>
          </Select>
        </p>
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">预案号:</span>
          <Select  style="width:200px;margin-left:20px;"  clearable v-model="loadDefPlan"  placement="bottom" filterable transfer>
            <Option v-for="item in  planList" :key="item.ID" :value="item.PlanNo">{{item.PlanNo}}</Option>
          </Select>
        </p>

        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">是否显示报警 :</span>
          <Select  style="width:200px;margin-left:20px;" v-model="isAlarm" transfer>
           <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>          
         </Select>
        </p> 
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">是否记录报警 :</span>
          <Select  style="width:200px;margin-left:20px;" v-model="isMarkAmarm" transfer>
           <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>               
         </Select>
        </p>  
          <p style="margin-top:10px;" v-show="isSet_P" v-for="(item,index) in checkAlarm">
            <span style="width:125px;display:inline-block;text-align:right;">是否{{item.name}}:</span>
            <Select  style="width:200px;margin-left:20px;" v-model="item.res" transfer>
             <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
           </Select>
         </p>

         <p style="margin-top:10px;" v-show="isYc">
          <span style="width:125px;display:inline-block;text-align:right;" >是否曲线记录:</span>
          <Select style="width:200px;margin-left:20px;" v-model="curve_rcd" transfer>
           <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
         </Select>
       </p>
       <p style="margin-top:10px;" v-show="isYc">
        <span style="width:125px;display:inline-block;text-align:right;" >是否比例变换:</span>
        <Select style="width:200px;margin-left:20px;" v-model="scaleTran" transfer>
         <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
       </Select>
     </p>
       <p style="margin-top:10px;"  v-show="!isSet_P">
        <span style="width:125px;display:inline-block;text-align:right;">是否记录:</span>
        <Select  style="width:200px;margin-left:20px;" v-model="isMarkSet" transfer>
          <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
        </Select>
      </p>   
      <p style="margin-top:10px;"  v-show="!isSet_P">
        <span style="width:125px;display:inline-block;text-align:right;">是否可执行:</span>
        <Select  style="width:200px;margin-left:20px;" v-model="isExeSet" transfer>
          <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
        </Select>
      </p>  
      <p style="margin-top:10px;"  v-show="isYx">
        <span style="width:125px;display:inline-block;text-align:right;">是否取反:</span>
        <Select  style="width:200px;margin-left:20px;" v-model="negate" transfer>
          <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
        </Select>
      </p>   
  </Col>
</Row>


</Modal>
</div>
</template>

<script>

export default {
  data () {
    return {
       allSelect:false,
      columnsEq:[
      {title:"设备号", key:"equip_no",fixed:'left',width:93,
        render: (h, params) => {
          var txt=params.column.key
          let types=params.row.equip_no
         
          return h('div', [
            h('span', {
              style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                domProps: {
                  title: types
                }
            },types)
           
            ]);
        }

    },
      {title:"设备名称",key:"equip_nm",width:200,
      render: (h, params) => {
          var txt=params.column.key
          let types=params.row.equip_nm
         
          return h('div', [

            h('span', {
              style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                domProps: {
                  title: types
                }
            },types)
           
            ]);
        }
      },
      {title:"关联界面",key:"related_pic",width:200,
           render: (h, params) => {
          var txt=params.column.key
          let types=params.row.related_pic
         
          return h('div', [
            h('span', {
              style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                domProps: {
                  title: types
                }
            },types)
           
            ]);
        }
       },
      {title:"关联视频",key:"related_video",width:200,
          render: (h, params) => {
          var txt=params.column.key
          let types=params.row.related_video
         
          return h('div', [
            h('span', {
              style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                domProps: {
                  title: types
                }
            },types)
           
            ]);
        }

       },
      {title:"资产编号",key:"ZiChanID",width:200,
          render: (h, params) => {
          var txt=params.column.key
          let types=params.row.ZiChanID
         
          return h('div', [
            h('span', {
              style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                domProps: {
                  title: types
                }
            },types)
           
            ]);
        }
       },
      {title:"预案号",key:"PlanNo",width:200,
        render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.PlanNo
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }


    },
      {
        title:"显示报警",width:100,
        key:"showAlarm" ,
        render: (h, params) => {
          var txt=params.column.key
          let types=params.row[txt].split('"')[1]

          return h('div', [
            h('Icon', {
                  props: {
                    type:types,

                  },style:{
                    fontSize:"22px",
                    color:"#2d8cf0"
                  }
            }),
            h('strong', params.row.name)
            ]);
        }
      },{
        title:"记录报警",
        key:"markAlarm",width:100,
        render: (h, params) => {
          var txt=params.column.key
          let types=params.row[txt].split('"')[1]
          return h('div', [
            h('Icon', {
              props: {
                type:types
              },style:{
                fontSize:"22px",
                color:"#2d8cf0"
              }
            }),
            h('strong', params.row.name)
            ]);
        }

      }
      ],
      dataEq:[],
      columnsYc:[
      {title:"设备号",key:"equip_no",fixed:"left",width:93,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.equip_no
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{title:"模拟量编号",key:"yc_no",width:100,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.yc_no
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{ title:"模拟量名称",key:"yc_nm",width:200,

 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.yc_nm
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
    },{ title:"下限值",key:"val_min",width:100,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.val_min
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{title:"回复下限值",key:"restore_min",width:100,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.restore_min
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{title:"回复上限值",key:"restore_max",width:100,

 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.restore_max
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
    },{title:"上限值  ",key:"val_max",width:100,

 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.val_max
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
    },{ title:"单位",key:"unit",width:50,

 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.unit
                 
                  return h('div', [
                    h('span', {
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
    },{title:"关联页面",key:"related_pic",width:100,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.related_pic
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{ title:"关联视频",key:"related_video",width:100,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.related_video
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{title:"资产编号",key:"ZiChanID",width:100,

 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.ZiChanID
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
    },{title:"预案号",key:"PlanNo",width:100,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.PlanNo
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }

    },{title:"曲线记录",width:100,
key:"curve_rcd",
render:(h,params)=>{
  var txt=params.column.key
  let types=params.row[txt].split('"')[1]
  return h('div', [
    h('Icon', {
      props: {
        type:types
      },style:{
        fontSize:"22px",
        color:"#2d8cf0"
      }
    }),
    h('strong', params.row.name)
    ]);

}
},{
  title:"显示报警",width:100,
  key:"showAlarm" ,
  render:(h,params)=>{
    var txt=params.column.key
    let types=params.row[txt].split('"')[1]
    return h('div', [
      h('Icon', {
        props: {
          type:types
        },style:{
          fontSize:"22px",
          color:"#2d8cf0"
        }
      }),
      h('strong', params.row.name)
      ]);
  }


},{
  title:"记录报警",width:100,
  key:"markAlarm",
  render:(h,params)=>{
    var txt=params.column.key
    let types=params.row[txt].split('"')[1]
    return h('div', [
      h('Icon', {
        props: {
          type:types
        },style:{
          fontSize:"22px",
          color:"#2d8cf0"
        }
      }),
      h('strong', params.row.name)
      ]);
  }

}
],dataYc:[],
columnsYx:[
{title:"设备号",key:"equip_no",fixed:'left',width:93,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.equip_no
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"状态量编号",key:"yx_no",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.yx_no
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"状态量名称",key:"yx_nm",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.yx_nm
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"0-1事件",key:"evt_01",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.evt_01
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"1-0事件",key:"evt_10",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.evt_10
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"关联页面",key:"related_pic",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.related_pic
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"关联视频",key:"related_video",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.related_video
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"资产编号",key:"ZiChanID",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.ZiChanID
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"预案号",key:"PlanNo",width:200,
 render: (h, params) => {
                  var txt=params.column.key
                  let types=params.row.PlanNo
                 
                  return h('div', [
                    h('span', {
                      style: {
                 display: 'inline-block',
                 width: '100%',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap'
             },
                        domProps: {
                          title: types
                        }
                    },types)
                   
                    ]);
                }
},
{title:"显示报警",key:"showAlarm",width:100,
render:(h,params)=>{
  var txt=params.column.key
  let types=params.row[txt].split('"')[1]
  return h('div', [
    h('Icon', {
      props: {
        type:types
      },style:{
        fontSize:"22px",
        color:"#2d8cf0"
      }
    }),
    h('strong', params.row.name)
    ]);
}
},
{title:"记录报警",key:"markAlarm",width:100,
render:(h,params)=>{
  var txt=params.column.key
  let types=params.row[txt].split('"')[1]
  return h('div', [
    h('Icon', {
      props: {
        type:types
      },style:{
        fontSize:"22px",
        color:"#2d8cf0"
      }
    }),
    h('strong', params.row.name)
    ]);
}
},

],dataYx:[],
columnsSet:[
{title:"设备号",fixed:'left',width:93,key:"equip_no"},
{title:"设置号",width:200,key:"set_no"},
{title:"设置名称",width:200,key:"set_nm"},
{title:"设置类型",width:200,key:"set_type"},
{title:"操作命令",width:200,key:"main_instruction"},
{title:"操作参数",width:200,key:"minor_instruction"},
{title:"记录",key:"record",width:100,
render:(h,params)=>{
  var txt=params.column.key
  let types=params.row[txt].split('"')[1]
  return h('div', [
    h('Icon', {
      props: {
        type:types
      },style:{
        fontSize:"22px",
        color:"#2d8cf0"
      }
    }),
    h('strong', params.row.name)
    ]);
}
},
{title:"动作",key:"action",width:200,},
{title:"值",key:"value",width:200,},
{title:"是否可以执行",key:"canexecution",width:100,
render:(h,params)=>{
  var txt=params.column.key
  let types=params.row[txt].split('"')[1]
  return h('div', [
    h('Icon', {
      props: {
        type:types
      },style:{
        fontSize:"22px",
        color:"#2d8cf0"
      }
    }),
    h('strong', params.row.name)
    ]);
}
},
],dataSet:[],
isAlarm:"",
isMarkAmarm:"",
      alarmArrMark:[],//报警记录承载
      alarmArrIsShow:[],//报警显示
      alarmWay:[],//报警方式承载
      alarmArrMarkYc:[],//报警记录承载
      alarmArrIsShowYc:[],//报警显示
      alarmWayYc:[],
      alarmArrMarkYx:[],//报警记录承载
      alarmArrIsShowYx:[],//报警显示
      alarmWayYx:[],
      itemList:[],//左侧列表
      isMarkSet:"",
      isExeSet:"",
      isMarkSetArr:[],
      isExeSetArr:[],
      active:0,
      checkAlarm:[],//报警方式
      moreInfor:[],
      modal1:false,
      modal2:false,
      uploadInfor:[],
      leftNum:0,
      chazhiNum:0,
      videoList:[],//视频表获取关联视频
      zizhanList:[],//资产编号
      planList:[],//预案号
      tableHeight:650,
      loadDefVideo:[],//默认选中的视频
      loadDefZic:"",
      loadDefPlan:"",
      swit:[
      {txt:"是",keys:'True'},
      {txt:"否",keys:'False'}
      ],
      isSet_P:true,
      isYx:false,
      switB:[
      {txt:"是",keys:'True'},
      {txt:"否",keys:'False'}
      ],
      isYc:false,
      curve_rcd:"",//是否曲线记录
      negate:"",//是否取反，
      scaleTran:"",//是否比例变换
      curve_rcdArr:[],
      negateArr:[],
      scaleTranArr:[],
      configIndex:0,
      equipId:0,//当前设备id
      zcData:[],
      viData:[],
      alrmData:[],
      searchArr:[]
    }
  },beforeCreate(){
      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName:'GWZiChanTable'}).then(res=>{
          this.zcData=res.data.HttpData.data;
          // console.log(this.zcData)
      });
      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName :"GW_VideoInfo"}).then(res=>{
          this.viData=res.data.HttpData.data;
      });
      this.Axios.post("/GWService.asmx/QueryTableData",{tableName:'AlarmProc'}).then(res=>{
          this.alrmData=JSON.parse(res.data.d);
      })
      
  },mounted (){
      this.init();
  },methods:{
   rowClassName (row, index) {
    if (index%2== 0) {
      return 'demo-table-info-row';
    } else if (index%2== 1) {
      return 'demo-table-error-row';
    }
    return '';
  },
  init(){
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.tableHeight=h-160;
        this.Axios.post("/api/real/equip_state",{userName:window.localStorage.login_msg}).then(res=>{
          let response=res.data.HttpData.data;
          this.itemList=response;

        //* this.loadInformation(response[0].m_iEquipNo,0)

      })
      },loadInformation(id,index){
        let nameStr=this.$refs.mybox[index].className;

        if(nameStr=="clickActive"){
          this.allSelect=false;
          this.$refs.mybox[index].className=""
           var that = this;
           for (var i = 0;i <that.searchArr.length;i++) {
               var ind = that.searchArr[i];
               if (ind==id) {
                   that.searchArr.splice(i,1);
               }
           }
        }else{
          
          this.$refs.mybox[index].className="clickActive"
          this.searchArr.push(id);
          if(this.searchArr.length==this.itemList.length){
            this.allSelect=true;
          }
        }
        // console.log(this.searchArr)

      },selectAll(){
        
        if(!this.allSelect){
          this.allSelect=true;
          this.searchArr=[];

          for(var i=0;i<this.itemList.length;i++){
            this.$refs.mybox[i].className="clickActive";
            this.searchArr.push(this.itemList[i].m_iEquipNo);
          }
        }else{
          this.allSelect=false;
          this.searchArr=[];
          for(var i=0;i<this.itemList.length;i++){
            this.$refs.mybox[i].className="";
          }
          
        }

     },selectEvent(){
        // id,index

         // 布局完成,js尚未
        let id=this.searchArr.toString();
        // console.log(id)
        this.getPlanData()
        // this.active=index;
        this.equipId=id;
        
        this.Axios.all([this.Axios.post("/GWService.asmx/GetSystemConfig",{table_name:'Equip',equip_no_list:id})]).then(this.Axios.spread((res) => {


         let eqData=JSON.parse(res.data.d);
         // console.log(eqData);
         let arlarData=this.alrmData;
         let alarLen=arlarData.length;
         
         let zichanData=this.zcData;
         let videoData=this.viData;
         
         this.zizhanList=[];
         this.videoList=[];
        this.columnsEq.splice(8,alarLen+1)
          
          for(var i=0;i<videoData.length;i++){
            
            var item={
              ID:i,
              videoCode:videoData[i].EquipNum+","+videoData[i].ID,
              ChannelName:videoData[i].ChannelName
            }
            this.videoList.push(item);
          }
          for(var i=0;i<zichanData.length;i++){
            var item={
              ZiChanID:zichanData[i].ZiChanID,
              ZiChanName:zichanData[i].ZiChanName
            }
            this.zizhanList.push(item)
          }
            
            this.dataEq=[];

           
            for(var j=0;j<arlarData.length;j++){
             
              var itemAl={
                title:arlarData[j].Proc_name,
                key:"way"+j,
                width:100,
                render:(h,params)=>{
                  var txt=params.column.key
                  let types=params.row[txt].split('"')[1]
                  return h('div', [
                    h('Icon', {
                      props: {
                        type:types
                      },style:{
                        fontSize:"22px",
                        color:"#2d8cf0"
                      }
                    }),
                    h('strong', params.row.name)
                    ]);
                }
              }
              this.columnsEq.push(itemAl);
            }
            this.columnsEq.push({
              title:"操作",
              key:"deal",
              fixed:'right',
              width:100,
              render:(h,params)=>{
                return h('div', [
                  h('p', {
                      style: {
                        color:"#2d8cf0",
                        marginRight:"10px",
                        cursor:"pointer",
                        fontSize:"20px",
                        display:"inline-block"       
                      },
                    class:"iconfont icon-scheduleMODIFY",
                    on: {
                      click: () => {
                                          
                                              let ind=params.index;
                                              this.loadDefZic=eqData[ind].ZiChanID;
                                              this.loadDefVideo=eqData[ind].related_video;
                                              this.loadDefPlan=eqData[ind].PlanNo;
                                              this.isAlarm=this.alarmArrIsShow[ind];
                                              this.isMarkAmarm=this.alarmArrMark[ind];
                                              this.checkAlarm=this.alarmWay[ind];
                                              this.isSet_P=true;
                                              this.isYx=false;
                                              this.equipId=eqData[ind].equip_no;
                                              this.uploadInfor=[
                                              {name:"设备号",value:eqData[ind].equip_no,listName:'equip_no'},
                                              {name:"设备名称",value:eqData[ind].equip_nm,listName:'equip_nm'},
                                              {name:"关联界面",value:eqData[ind].related_pic,listName:'related_pic'},
                                              {name:"设备属性",value:eqData[ind].equip_detail,listName:'equip_detail'},
                                              {name:"通讯刷新周期",value:eqData[ind].acc_cyc,listName:'acc_cyc'},
                                              {name:"通故障处理意见",value:eqData[ind].proc_advice,listName:'proc_advice'},
                                              {name:"故障提示",value:eqData[ind].out_of_contact,listName:'out_of_contact'},
                                              {name:"故障恢复提示",value:eqData[ind].contacted,listName:'contacted'},
                                              {name:"报警声音文件",value:eqData[ind].event_wav,listName:'event_wav'},
                                              {name:"通讯端口",value:eqData[ind].local_addr,listName:'local_addr'},
                                              {name:"设备地址",value:eqData[ind].equip_addr,listName:'equip_addr'},
                                              {name:"通讯参数",value:eqData[ind].communication_param,listName:'communication_param'},
                                              {name:"通讯时间参数",value:eqData[ind].communication_time_param,listName:'communication_time_param'},
                                              {name:"报警升级周期（分钟）",value:eqData[ind].AlarmRiseCycle,listName:'AlarmRiseCycle'},
                                              {name:"模板设备号",value:eqData[ind].raw_equip_no,listName:'raw_equip_no'},
                                              {name:"附表名称",value:eqData[ind].tabname,listName:'tabname'},
                                              {name:"属性",value:eqData[ind].attrib,listName:'attrib'},
                                              {name:"安全时段",value:eqData[ind].SafeTime,listName:'SafeTime'}
                                              ];
                                              this.modal2=true;
                                              this.configIndex=0;
                                              this.leftNum=Math.floor(this.uploadInfor.length/2);
                                              this.chazhiNum=3;
                                            }
                                          }
                                        }),
                  h('p', {
                    style: {
                      color:"green",
                      cursor:"pointer",
                      display:"inline-block",
                      fontSize:"20px",
                    }, class:"iconfont icon-details ",
                    on: {
                      click: () => {
                                         
                                          let ind=params.index;

                                          this.modal1=true;
                                          this.moreInfor=[
                                            {name:"属性",value:eqData[ind].attrib},
                                            {name:"故障提示",value:eqData[ind].out_of_contact},             
                                            {name:"设备属性",value:eqData[ind].equip_detail},
                                            {name:"通讯端口",value:eqData[ind].local_addr},
                                            {name:"设备地址",value:eqData[ind].equip_addr},
                                            {name:"通讯参数",value:eqData[ind].communication_param},
                                            {name:"附表名称",value:eqData[ind].tabname},
                                            {name:"安全时段",value:eqData[ind].SafeTime},
                                            {name:"模板设备号",value:eqData[ind].raw_equip_no},
                                            {name:"通讯刷新周期",value:eqData[ind].acc_cyc},
                                            {name:"故障恢复提示",value:eqData[ind].contacted},
                                            {name:"报警声音文件",value:eqData[ind].event_wav},
                                            {name:"通讯时间参数",value:eqData[ind].communication_time_param},
                                            {name:"通故障处理意见",value:eqData[ind].proc_advice},
                                            {name:"报警升级周期（分钟)",value:eqData[ind].AlarmRiseCycle},
                                          ];
                                          
                                        }
                                      }
                                    })

                  ]);
}

});
           
            
            for(var i=0;i<eqData.length;i++){

              let checkArr=[],isShow,isMarlAl;

              if((parseInt(eqData[i].alarm_scheme)  & 1)>0){

                this.alarmArrIsShow.push("True");
                isShow='<Icon type="ios-checkmark-outline"></Icon>';
              }else{
               isShow='<Icon type="ios-circle-outline"></Icon>' ;
               this.alarmArrIsShow.push("False");
                    };
                    checkArr.push(isShow);
                    if((parseInt(eqData[i].alarm_scheme) & 2)>0){
                      this.alarmArrMark.push("True")
                      isMarlAl='<Icon type="ios-checkmark-outline"></Icon>';
                    }else{
                      this.alarmArrMark.push("False")

                      isMarlAl='<Icon type="ios-circle-outline"></Icon>' ;
                    };
                    checkArr.push(isMarlAl);

                    let arrName=[],waysArr=[];

                    for(var j=0;j<arlarData.length;j++){
                      let itemalar;
                      var alays = parseInt(arlarData[j].Proc_Code);
                      if ((parseInt(eqData[i].alarm_scheme) & alays) > 0) {
                        itemalar={
                          name:arlarData[j].Proc_name,
                          res:"True",
                          code:arlarData[j].Proc_Code


                        }
                        arrName[j]= '<Icon type="ios-checkmark-outline"></Icon>';
                      } else {
                       itemalar={
                        name:arlarData[j].Proc_name,
                        res:"False",
                        code:arlarData[j].Proc_Code
                      }
                      arrName[j]='<Icon type="ios-circle-outline"></Icon>' ;
                    }
                    waysArr.push(itemalar);
                    
                  }

                  this.alarmWay[i]=waysArr;
                  // console.log(i);
                  // console.log()
                  let nameVideo;
                  let zichanName;
                  for(var m=0;m<videoData.length;m++){
                    var  EquipNum=parseInt(eqData[i].related_video.split(",")[0]),ID=parseInt(eqData[i].related_video.split(",")[1])
                    if(EquipNum==videoData[m].EquipNum && ID==videoData[m].ID){
                      nameVideo=videoData[m].ChannelName;

                    }
                  }
                  for(var n=0;n<zichanData.length;n++){
                    if(eqData[i].ZiChanID==zichanData[n].ZiChanID){
                      zichanName=zichanData[n].ZiChanName
                    }
                  }

                  var itemEq={
                   equip_no:eqData[i].equip_no,
                   equip_nm: eqData[i].equip_nm,
                   related_pic:eqData[i].related_pic,
                   related_video:nameVideo,
                   ZiChanID:zichanName,
                   PlanNo:eqData[i].PlanNo,
                   showAlarm:checkArr[0],
                   markAlarm:checkArr[1],

                 }
                 for(var q=0;q<arrName.length;q++){
                  itemEq["way"+q]=arrName[q]
                }
                this.dataEq.push(itemEq);
              }

            })).catch(err => {})

//加载模拟量配置
this.Axios.all([this.Axios.post("/GWService.asmx/GetSystemConfig",{table_name:'ycp',equip_no_list:id})]).then(this.Axios.spread((res) => {
 let dataYc=JSON.parse(res.data.d);
 
 let arlarData=this.alrmData;
      let zichanData=this.zcData
       let videoData=this.viData

            this.dataYc=[];
            let alarLen=arlarData.length;
           this.columnsYc.splice(15,alarLen+1)
            for(var j=0;j<arlarData.length;j++){
               
              
              var itemAl={
                title:arlarData[j].Proc_name,
                width:100,
                key:"way"+j,
                render:(h,params)=>{
                   
                    var txt=params.column.key;
                    var types=params.row[txt].split('"')[1];
                    return h("div",[
                      h("Icon",{
                        props:{
                          type:types
                        },style:{
                          fontSize:"22px",
                          color:"#2d8cf0"
                        }
                      })
                      ])
                  }
                }
                this.columnsYc.push(itemAl)
              }
              this.columnsYc.push({
                title:"操作",
                key:"deal",width:100,
                 fixed: 'right',
                render:(h,params)=>{
                 return h("div",[
                  h("p",{
                     style: {
                        color:"#2d8cf0",
                        marginRight:"10px",
                        cursor:"pointer",
                        fontSize:"20px",
                        display:"inline-block"       
                      },
                    class:"iconfont icon-scheduleMODIFY",
                                      on: {
                                        click: () => {
                                         
                                          let index=params.index;
                                          
                                          this.modal2=true;
                                          this.isSet_P=true;
                                          this.loadDefZic=dataYc[index].ZiChanID;
                                          this.loadDefVideo=dataYc[index].related_video;
                                          this.loadDefPlan=dataYc[index].PlanNo;

                                          this.isAlarm=this.alarmArrIsShowYc[index];

                                          this.isMarkAmarm=this.alarmArrMarkYc[index];
                                          this.checkAlarm=this.alarmWayYc[index];

                                          this.curve_rcd=this.curve_rcdArr[index];
                                          this.scaleTran=this.scaleTranArr[index];
                                          this.isYc=true;
                                           this.equipId=dataYc[index].equip_no;
                                            // console.log(this.alarmWay[index])
                                            this.uploadInfor=[
                                              {name:"设备号",value:dataYc[index].equip_no,listName:'equip_no'},
                                              {name:"模拟量编号",value:dataYc[index].yc_no,listName:'yc_no'},
                                              {name:"单位",value:dataYc[index].unit,listName:'unit'},
                                              {name:"属性值",value:dataYc[index].val_trait,listName:'val_trait'},
                                              
                                              {name:"下限值",value:dataYc[index].val_min,listName:'val_min'},
                                              {name:"上限值",value:dataYc[index].val_max,listName:'val_max'},
                                              {name:"最小值",value:dataYc[index].physic_min,listName:'physic_min'},
                                              {name:"最大值",value:dataYc[index].physic_max,listName:'physic_max'},

                                              {name:"操作命令",value:dataYc[index].main_instruction,listName:'main_instruction'},
                                              {name:"操作参数",value:dataYc[index].minor_instruction,listName:'minor_instruction'},
                                              {name:"关联页面",value:dataYc[index].related_pic,listName:'related_pic'},
                                              {name:"处理意见",value:dataYc[index].proc_advice,listName:'proc_advice'},
                                              {name:"报警级别",value:dataYc[index].lvl_level,listName:'lvl_level'},
                                              {name:"声音文件",value:dataYc[index].wave_file,listName:'wave_file'},
                                              {name:"报警屏蔽",value:dataYc[index].alarm_shield,listName:'alarm_shield'},
                                              {name:"安全时段",value:dataYc[index].SafeTime,listName:'SafeTime'},

                                              
                                              {name:"模拟量名称",value:dataYc[index].yc_nm,listName:'yc_nm'},
                                              
                                              {name:"回复下限值",value:dataYc[index].restore_min,listName:'restore_min'},
                                              {name:"回复上限值",value:dataYc[index].restore_max,listName:'restore_max'},
                                              {name:"实测最小值",value:dataYc[index].yc_min,listName:'yc_min'},
                                              {name:"实测最大值",value:dataYc[index].yc_max,listName:'yc_max'},
                                              {name:"越下限事件",value:dataYc[index].outmin_evt,listName:'outmin_evt'},
                                              {name:"越上限事件",value:dataYc[index].outmax_evt,listName:'outmax_evt'},
                                              
                                              {name:"曲线记录阈值",value:dataYc[index].curve_limit,listName:'curve_limit'},
                                              {name:"报警升级周期",value:dataYc[index].AlarmRiseCycle,listName:'AlarmRiseCycle'},
                                              {name:"起始安全时段",value:dataYc[index].safe_bgn,listName:'safe_bgn'},
                                              {name:"结束安全时段",value:dataYc[index].safe_end,listName:'safe_end'},
                                              
                                             
                                              
                                              {name:"越线滞纳时间(秒)",value:dataYc[index].alarm_acceptable_time,listName:'alarm_acceptable_time'},
                                              {name:"恢复滞纳时间(秒)",value:dataYc[index].alarm_repeat_time,listName:'alarm_repeat_time'},
                                              {name:"重复报警时间(分钟)",value:dataYc[index].restore_acceptable_time,listName:'restore_acceptable_time'},
                                             
                                             
                                              
                                            ];
                                            this.configIndex=1;
                                            this.leftNum=Math.floor(this.uploadInfor.length/2);
                                            this.chazhiNum=4;

                                          }
                                        }
                                      }),
                                        h('p', {
                                          style: {
                                            color:"green",
                                            cursor:"pointer",
                                            display:"inline-block",
                                            fontSize:"20px",
                                          }, class:"iconfont icon-details ",
                                         on: {
                                          click: () => {
                                           let ind=params.index;

                                           this.moreInfor=[
                                          {name:"最小值",value:dataYc[ind].physic_min},
                                          {name:"最大值",value:dataYc[ind].physic_max},
                                          {name:"属性值",value:dataYc[ind].val_trait},

                                          {name:"操作命令",value:dataYc[ind].main_instruction},
                                          {name:"操作参数",value:dataYc[ind].minor_instruction},
                                          {name:"声音文件",value:dataYc[ind].wave_file},
                                          {name:"报警屏蔽",value:dataYc[ind].alarm_shield},
                                          {name:"比例变换",value:dataYc[ind].mapping=="True"||dataYc[ind].mapping=="true"?"已变换":"未变换"},
                                          {name:"安全时段",value:dataYc[ind].SafeTime},
                                          {name:"处理意见",value:dataYc[ind].proc_advice},
                                          {name:"报警级别",value:dataYc[ind].lvl_level},

                                          {name:"越下限事件",value:dataYc[ind].outmin_evt},
                                          {name:"越上限事件",value:dataYc[ind].outmax_evt},
                                          {name:"实测最小值",value:dataYc[ind].yc_min},
                                          {name:"实测最大值",value:dataYc[ind].yc_max},
                                          {name:"报警升级周期",value:dataYc[ind].AlarmRiseCycle},
                                          {name:"起始安全时段",value:dataYc[ind].safe_bgn},
                                          {name:"结束安全时段",value:dataYc[ind].safe_end},
                                          {name:"曲线记录阈值",value:dataYc[ind].curve_limit},
                                          {name:"越线滞纳时间(秒)",value:dataYc[ind].alarm_acceptable_time},
                                          {name:"恢复滞纳时间(秒)",value:dataYc[ind].alarm_repeat_time},
                                          {name:"重复报警时间(分钟)",value:dataYc[ind].restore_acceptable_time},
                                           
                                           
                                           
                                           ];
                                           this.modal1=true;
                                                                                
                                          }
                                        }
                                      })
])
} 
})


for(var i=0;i<dataYc.length;i++){


      let nameVideo;
      let zichanName;
      for(var m=0;m<videoData.length;m++){
        var  EquipNum=parseInt(dataYc[i].related_video.split(",")[0]),ID=parseInt(dataYc[i].related_video.split(",")[1])
        if(EquipNum==videoData[m].EquipNum && ID==videoData[m].ID){
          nameVideo=videoData[m].ChannelName
        }
      }

      for(var n=0;n<zichanData.length;n++){
        if(dataYc[i].ZiChanID==zichanData[n].ZiChanID){
          zichanName=zichanData[n].ZiChanName
        }
      }


      if(dataYc[i].mapping=="True"||dataYc[i].mapping=="true"){
        this.scaleTranArr.push("True")
      }else{
       this.scaleTranArr.push("False")
     }
   

     let checkArr=[],isShow,isMarlAl;
     if((dataYc[i].alarm_scheme & 1)>0){
       this.alarmArrIsShowYc.push("True");  
       isShow='<Icon type="ios-checkmark-outline"></Icon>'
     }else{
       this.alarmArrIsShowYc.push("False");  
       isShow='<Icon type="ios-circle-outline"></Icon>' 
     };
     checkArr.push(isShow);
     if((dataYc[i].alarm_scheme & 2)>0){
        this.alarmArrMarkYc.push("True")

        isMarlAl='<Icon type="ios-checkmark-outline"></Icon>'
      }else{
       this.alarmArrMarkYc.push("False")

       isMarlAl='<Icon type="ios-circle-outline"></Icon>' 
     };
   checkArr.push(isMarlAl);

   let arrName=[],waysArr=[];
   for(var j=0;j<arlarData.length;j++){
    let itemalar;
    var alays = parseInt(arlarData[j].Proc_Code);
    if ((dataYc[i].alarm_scheme & alays) > 0) {
     itemalar={
      name:arlarData[j].Proc_name,
      res:"True",
      code:arlarData[j].Proc_Code
    }
    arrName[j]= '<Icon type="ios-checkmark-outline"></Icon>'
  }
  else {
    arrName[j]='<Icon type="ios-circle-outline"></Icon>' 
    itemalar={
      name:arlarData[j].Proc_name,
      res:"False",
      code:arlarData[j].Proc_Code
    }
  }
  waysArr.push(itemalar)
}
this.alarmWayYc[i]=waysArr;
let curve_rcd;
                  // console.log(arrName)
                  if(dataYc[i].curve_rcd=="True"||dataYc[i].curve_rcd=="true"){
                    curve_rcd='<Icon type="ios-checkmark-outline"></Icon>'
                    this.curve_rcdArr.push("True")
                  }else{
                   curve_rcd='<Icon type="ios-circle-outline"></Icon>' 
                   this.curve_rcdArr.push("False")
                 }

                 let itemYc={
                  equip_no:dataYc[i].equip_no,
                  yc_no:dataYc[i].yc_no,
                  yc_nm:dataYc[i].yc_nm,
                  val_min:dataYc[i].val_min,
                  restore_min:dataYc[i].restore_min,
                  restore_max:dataYc[i].restore_max,
                  val_max:dataYc[i].val_max,
                  unit:dataYc[i].unit,
                  related_pic:dataYc[i].related_pic,
                  related_video:nameVideo,
                  ZiChanID:zichanName,
                  PlanNo:dataYc[i].PlanNo,
                  curve_rcd:curve_rcd,
                  markAlarm:checkArr[1],
                  showAlarm:checkArr[0]

                }
                for(var k=0;k<arrName.length;k++){
                  itemYc["way"+k]=arrName[k]
                }

                this.dataYc.push(itemYc)
                // console.log( this.dataYc)
              }
            })).catch(err => {})

this.Axios.all([this.Axios.post("/GWService.asmx/GetSystemConfig",{table_name:'yxp',equip_no_list:id})]).then(this.Axios.spread((res) => {
  
 let dataYx=JSON.parse(res.data.d);
 // console.log(dataYx)
 let arlarData=this.alrmData;
  let zichanData=this.zcData
  let videoData=this.viData
 
           this.dataYx=[];
           let alarLen=arlarData.length;
          
      for(var i=0;i<dataYx.length;i++){
                     this.columnsYx.splice(11,alarLen+1)
                      for(var j=0;j<arlarData.length;j++){
                        var itemAl={
                          title:arlarData[j].Proc_name,
                          key:"way"+j,
                          width:100,
                          render:(h,params)=>{
                            var txt=params.column.key;
                            var types=params.row[txt].split('"')[1];
                            return h("div",[
                              h("Icon",{
                                props:{
                                  type:types
                                },style:{
                                  fontSize:"22px",
                                  color:"#2d8cf0"
                                }
                              })
                              ])
                          }
                        }
                        this.columnsYx.push(itemAl)
                      }


                      this.columnsYx.push({
                        title:"操作",
                        key:"deal",
                        fixed:'right',
                        width:100,
                        render:(h,params)=>{
                         return h("div",[
                          h("p",{
                             style: {
                                  color:"#2d8cf0",
                                  marginRight:"10px",
                                  cursor:"pointer",
                                  fontSize:"20px",
                                  display:"inline-block"       
                                },
                              class:"iconfont icon-scheduleMODIFY",
                                                            on: {
                                                              click: () => {
                                                                let index=params.index;

                                                                this.modal2=true;
                                                                this.isSet_P=true;
                                                                this.isYx=true;
                                                                this.isYc=false;
                                                                this.loadDefZic=dataYx[index].ZiChanID;
                                                                this.loadDefVideo=dataYx[index].related_video;
                                                                this.loadDefPlan=dataYx[index].PlanNo;

                                                                this.isAlarm=this.alarmArrIsShowYx[index];
                                                                this.equipId=dataYx[index].equip_no;
                                                                this.isMarkAmarm=this.alarmArrMarkYx[index];
                                                                this.checkAlarm=this.alarmWayYx[index];
                                                                this.negate=this.negateArr[index]
                                                                this.uploadInfor=[
                                                                {name:"设备号",value:dataYx[index].equip_no,listName:'equip_no'},
                                                                {name:"模拟量编号",value:dataYx[index].yx_no,listName:'yx_no'},
                                                                {name:"状态量名称",value:dataYx[index].yx_nm,listName:'yx_nm'},
                                                                {name:"0-1事件  ",value:dataYx[index].evt_01,listName:'evt_01'},
                                                                {name:"1-0事件",value:dataYx[index].evt_10,listName:'evt_10'},
                                                                {name:"关联页面",value:dataYx[index].related_pic,listName:'related_pic'},
                                                                {name:"处理意见0-1",value:dataYx[index].proc_advice_r,listName:'proc_advice_r'}, 
                                                                {name:"处理意见1-0",value:dataYx[index].proc_advice_d,listName:'proc_advice_d'},
                                                                {name:"0-1级别",value:dataYx[index].level_r,listName:'level_r'},
                                                                {name:"1-0级别",value:dataYx[index].level_d,listName:'level_d'}, 
                                                                {name:"初始状态",value:dataYx[index].initval,listName:'initval'},
                                                                {name: "属性值",value:dataYx[index].val_trait,listName:'val_trait'}, 
                                                                {name:"操作命令",value:dataYx[index].main_instruction,listName:'main_instruction'}, 
                                                                {name:"操作参数",value:dataYx[index].minor_instruction,listName:'minor_instruction'}, 
                                                                {name:"越线滞纳时间（秒）",value:dataYx[index].alarm_acceptable_time,listName:'alarm_acceptable_time'}, 
                                                                {name:"恢复滞纳时间（秒）",value:dataYx[index].alarm_repeat_time,listName:'alarm_repeat_time'}, 
                                                                {name:"重复报警时间（分钟）",value:dataYx[index].restore_acceptable_time,listName:'restore_acceptable_time'},
                                                                {name: "声音文件",value:dataYx[index].wave_file,listName:'wave_file'},
                                                                {name: "报警屏蔽",value:dataYx[index].alarm_shield,listName:'alarm_shield'}, 
                                                                {name:"报警升级周期（分钟）",value:dataYx[index].AlarmRiseCycle,listName:'AlarmRiseCycle'}, 
                                                                {name:"安全时段",value:dataYx[index].SafeTime,listName:'SafeTime'}
                                                                ];


                                                                this.configIndex=2;
                                                                this.leftNum=Math.floor(this.uploadInfor.length/2);
                                                                this.chazhiNum=4;
                                                                  // this.show(params.index)
                                                                }
                                                              }
                                                            }),
                                                              h('p', {
                                                             style: {
                                                      color:"green",
                                                      cursor:"pointer",
                                                      display:"inline-block",
                                                      fontSize:"20px",
                                                    }, class:"iconfont icon-details ",
                                                              on: {
                                                                click: () => {
                                                                  let ind=params.index;
                                                                  this.modal1=true; 
                                                                  this.moreInfor=[
                                                                    {name:"取反",value:dataYx[ind].inversion=="True"||dataYx[ind].inversion=="true"?"已取反":"未取反"}, 
                                                                    {name:"属性值",value:dataYx[ind].val_trait}, 
                                                                    {name:"安全时段",value:dataYx[ind].SafeTime},
                                                                    {name:"初始状态",value:dataYx[ind].initval},
                                                                    {name:"操作命令",value:dataYx[ind].main_instruction}, 
                                                                    {name:"操作参数",value:dataYx[ind].minor_instruction}, 
                                                                    
                                                                    {name:"报警屏蔽",value:dataYx[ind].alarm_shield}, 
                                                                    {name:"0-1级别",value:dataYx[ind].level_r},
                                                                    {name:"1-0级别",value:dataYx[ind].level_d}, 
                                                                    {name:"起始安全时段",value:dataYx[ind].safe_bgn}, 
                                                                    {name:"结束安全时段",value:dataYx[ind].safe_end}, 
                                                                    {name:"处理意见0-1",value:dataYx[ind].proc_advice_r}, 
                                                                    {name:"处理意见1-0",value:dataYx[ind].proc_advice_d},
                                                                    {name:"越线滞纳时间(秒)",value:dataYx[ind].alarm_acceptable_time}, 
                                                                    {name:"恢复滞纳时间(秒)",value:dataYx[ind].alarm_repeat_time}, 
                                                                    {name:"重复报警时间(分钟)",value:dataYx[ind].restore_acceptable_time},
                                                                    {name:"报警升级周期(分钟)",value:dataYx[ind].AlarmRiseCycle}, 
                                                                    {name:"声音文件",value:dataYx[ind].wave_file},
                                                                  ];


                                                                }
                                                              }
                                                              })
                            ])
                      }

                      })

                      let nameVideo;
                      let zichanName;
                      for(var m=0;m<videoData.length;m++){
                        // console.log(nameVideo);
                       var  EquipNum=parseInt(dataYx[i].related_video.split(",")[0]),ID=parseInt(dataYx[i].related_video.split(",")[1]);
                        if(EquipNum==videoData[m].EquipNum && ID==videoData[m].ID){
                          nameVideo=videoData[m].ChannelName
                        }
                      }
                      // console.log(nameVideo);
                        for(var n=0;n<zichanData.length;n++){
                          if(dataYx[i].ZiChanID==zichanData[n].ZiChanID){
                            zichanName=zichanData[n].ZiChanName
                          }
                        }
                      if(dataYx[i].inversion=="True"||dataYx[i].inversion=="true"){
                        this.negateArr.push("True")
                      }else{
                        this.negateArr.push("False")
                      }
                      let checkArr=[],isShow,isMarlAl;
                        if((dataYx[i].alarm_scheme & 1)>0){
                          this.alarmArrIsShowYx.push("True")
                          isShow='<Icon type="ios-checkmark-outline"></Icon>'
                        }else{
                          this.alarmArrIsShowYx.push("False")
                          isShow='<Icon type="ios-circle-outline"></Icon>' 
                        };

                        checkArr.push(isShow);
                        if((dataYx[i].alarm_scheme & 2)>0){
                          this.alarmArrMarkYx.push("True")
                          isMarlAl='<Icon type="ios-checkmark-outline"></Icon>'
                        }else{
                          this.alarmArrMarkYx.push("False")
                          isMarlAl='<Icon type="ios-circle-outline"></Icon>' 
                        };
                        checkArr.push(isMarlAl);

                         let arrName=[],waysArr=[];
                        for(var j=0;j<arlarData.length;j++){
                            let itemalar;
                            var alays = parseInt(arlarData[j].Proc_Code);
                          if ((dataYx[i].alarm_scheme & alays) > 0) {
                              itemalar={
                                name:arlarData[j].Proc_name,
                                res:"True",
                                code:arlarData[j].Proc_Code
                              }
                              arrName[j]= '<Icon type="ios-checkmark-outline"></Icon>'
                            }else {
                             itemalar={
                              name:arlarData[j].Proc_name,
                              res:"False",
                              code:arlarData[j].Proc_Code
                            }
                            arrName[j]='<Icon type="ios-circle-outline"></Icon>' 
                          }
                          waysArr.push(itemalar);
                          
                        }
        
                        this.alarmWayYx[i]=waysArr;
                 // console.log(checkArr)

                       let itemYx={
                        equip_no:dataYx[i].equip_no,
                        yx_no:dataYx[i].yx_no,
                        yx_nm:dataYx[i].yx_nm,
                        evt_01:dataYx[i].evt_01,
                        evt_10:dataYx[i].evt_10,
                        related_pic:dataYx[i].related_pic,
                        related_video:nameVideo,
                        ZiChanID:zichanName,
                        PlanNo:dataYx[i].PlanNo,
                        showAlarm:checkArr[0],
                        markAlarm:checkArr[1]
                            // deal
                          }
                        for(var k=0;k<arrName.length;k++){
                          itemYx["way"+k]=arrName[k]
                        }
                        // console.log(itemYx)
                        this.dataYx.push(itemYx);

        }

   })).catch(err => {})


       this.Axios.post("/GWService.asmx/GetSystemConfig",{table_name:'SetParm',equip_no_list:id}).then(res4=>{//加载设置配置
        let data4=res4.data.d;
        let dataSet=JSON.parse(data4);
        this.dataSet=[];

       
        for(var i=0;i<dataSet.length;i++){
            this.columnsSet.splice(10,1)

          this.columnsSet.push({
            title:"操作",
            key:"deal",
            fixed:"right",
            width:100,
            render:(h,params)=>{
             return h("div",[
              h("p",{
                 style: {
                        color:"#2d8cf0",
                       
                        cursor:"pointer",
                        fontSize:"20px",
                        display:"inline-block"       
                      },
                    class:"iconfont icon-scheduleMODIFY",
                on: {
                  click: () => {
                    let index=params.index;

                    this.modal2=true;
                    this.isSet_P=false;
                    this.isYc=false;
                    this.isMarkSet =this.isMarkSetArr[index]
                    this.isExeSet =this.isExeSetArr[index]
                    this.equipId=dataSet[index].equip_no;
                    this.uploadInfor=[
                    {name:"设备号",value:dataSet[index].equip_no,listName:'equip_no'},
                    {name:"设置号",value:dataSet[index].set_no,listName:'set_no'},
                    {name:"设置名称",value:dataSet[index].set_nm,listName:'set_nm'},
                    {name:"值",value:dataSet[index].value,listName:'value'},
                    {name:"设置类型",value:dataSet[index].set_type,listName:'set_type'},
                    {name:"动作",value:dataSet[index].action,listName:'action'},
                    {name:"操作命令",value:dataSet[index].main_instruction,listName:'main_instruction'},
                    {name:"操作参数",value:dataSet[index].minor_instruction,listName:'minor_instruction'},
                    ]
                    this.leftNum=Math.floor(this.uploadInfor.length/2);
                    this.configIndex=3;
                  }
                }
              }),

              ])
           }

         })

          let record
          if(dataSet[i].record=="True"||dataSet[i].record=="true"){
            record='<Icon type="ios-checkmark-outline"></Icon>'
            this.isMarkSetArr.push("True")
          }else{
           record='<Icon type="ios-circle-outline"></Icon>' 
           this.isMarkSetArr.push("False")
         }
         let canexecution
              // console.log(dataSet[i].canexecution)
              if(dataSet[i].canexecution=="true"||dataSet[i].canexecution=="True"){
                canexecution='<Icon type="ios-checkmark-outline"></Icon>'
                this.isExeSetArr.push("True")

              }else{
                canexecution='<Icon type="ios-circle-outline"></Icon>' 
                this.isExeSetArr.push("False")
              }
              var itemSet={
                equip_no:dataSet[i].equip_no,
                set_no:dataSet[i].set_no,
                set_nm:dataSet[i].set_nm,
                set_type:dataSet[i].set_type,
                main_instruction:dataSet[i].main_instruction,
                minor_instruction:dataSet[i].minor_instruction,
                record:record,
                action:dataSet[i].action,
                value:dataSet[i].value,
                canexecution:canexecution,

              }
              this.dataSet.push(itemSet);
            }

          });

     },getPlanData(){
      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName :"GWPlan"}).then(res=>{
        let datas=res.data.HttpData.data;
        this.planList=[];
        for(var i=0;i<datas.length;i++){
          var item={
            ID:i,
            PlanNo:datas[i].PlanNo
          }
          this.planList.push(item)
        }

      })


    },configData(num){
        // console.log("点击确定"+num);
        switch (num)
        {
          case 0:
            // console.log(this.uploadInfor);
            var updateJSON=[];
            for (var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "listName":this.uploadInfor[i].listName,
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var alarCode={
             "id":this.equipId,
             "listName":"alarm_scheme",
             "vlaue":"'"+this.getAlarmCode()+"'"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
             "id":this.equipId,
             "listName":"related_video",
             "vlaue":"'"+this.loadDefVideo+"'"
           };
           updateJSON.push(lateVideo)
           var zichan={
            "id":this.equipId,
            "listName":"ZiChanID",
            "vlaue":"'"+this.loadDefZic+"'"
          };
          updateJSON.push(zichan)
          var planNo={
            "id":this.equipId,
            "listName":"PlanNo",
            "vlaue":"'"+this.loadDefPlan+"'"
          };
          updateJSON.push(planNo)
            // console.log(updateJSON)
            this.Axios.post("/api/real/update_equip",{update:JSON.stringify(updateJSON)}).then(res=>{
              var int=res.data.HttpData.data;
              if(int!=0&&res.data.HttpStatus==200){
                this.$Message.success('修改成功');
                this.selectEvent()
                 // this.loadInformation(this.equipId,this.active)
              }else{
                this.$Message.error('修改失败');
              }




            });
            break;
            case 1:

            var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yc_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var alarCode={
             "id":this.equipId,
             "yc_no":this.uploadInfor[1].value,
             "listName":"alarm_scheme",
             "vlaue":"'"+this.getAlarmCode()+"'"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
             "id":this.equipId,
             "yc_no":this.uploadInfor[1].value,
             "listName":"related_video",
             "vlaue":"'"+this.loadDefVideo+"'"
           };
           updateJSON.push(lateVideo)
           var zichan={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"ZiChanID",
            "vlaue":"'"+this.loadDefZic+"'"
          };
          updateJSON.push(zichan)
          var planNo={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"PlanNo",
            "vlaue":"'"+this.loadDefPlan+"'"
          };
          updateJSON.push(planNo)
          var curve_rcd={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"curve_rcd",
            "vlaue":"'"+this.curve_rcd+"'"
          }
          updateJSON.push(curve_rcd);
          var scaleTran={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"mapping",
            "vlaue":"'"+this.scaleTran+"'"
          }
          updateJSON.push(scaleTran);
          this.Axios.post("/api/real/update_ycp",{update:JSON.stringify(updateJSON)}).then(res=>{
           var int=res.data.HttpData.data;
           if(int!=0&&res.data.HttpStatus==200){
            this.$Message.success('修改成功');
             this.selectEvent()
             // this.loadInformation(this.equipId,this.active)

          }else{
            this.$Message.error('修改失败');
          }

          
          
        });
            // console.log(updateJSON)
            
            break;
            case 2:
            var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var alarCode={
             "id":this.equipId,
             "yx_no":this.uploadInfor[1].value,
             "listName":"alarm_scheme",
             "vlaue":"'"+this.getAlarmCode()+"'"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
             "id":this.equipId,
             "yx_no":this.uploadInfor[1].value,
             "listName":"related_video",
             "vlaue":"'"+this.loadDefVideo+"'"
           };
           updateJSON.push(lateVideo)
           var zichan={
            "id":this.equipId,
            "yx_no":this.uploadInfor[1].value,
            "listName":"ZiChanID",
            "vlaue":"'"+this.loadDefZic+"'"
          };
          updateJSON.push(zichan)
          var planNo={
            "id":this.equipId,
            "yx_no":this.uploadInfor[1].value,
            "listName":"PlanNo",
            "vlaue":"'"+this.loadDefPlan+"'"
          };
          updateJSON.push(planNo)

          var negate={
            "id":this.equipId,
            "yx_no":this.uploadInfor[1].value,
            "listName":"inversion",
            "vlaue":"'"+this.negate+"'"
          }
          updateJSON.push(negate);
          this.Axios.post("/api/real/update_yxp",{update:JSON.stringify(updateJSON)}).then(res=>{
           var int=res.data.HttpData.data;
           if(int!=0&&res.data.HttpStatus==200){
            this.$Message.success('修改成功');
             this.selectEvent()
             // this.loadInformation(this.equipId,this.active)
          }else{
            this.$Message.error('修改失败');
          }
          
          
        });
            // console.log(updateJSON)
            // console.log(this.uploadInfor)

            break;
            case 3:
            var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":"["+this.uploadInfor[i].listName+"]",
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var record={
              "id":this.equipId,
              "yx_no":this.uploadInfor[1].value,
              "listName":"[record]",
              "vlaue":this.isMarkSet
            }//是否记录,
            updateJSON.push(record);
            var canexecution={
              "id":this.equipId,
              "yx_no":this.uploadInfor[1].value,
              "listName":"[canexecution]",
              "vlaue":this.isExeSet
            }//是否可执行
            updateJSON.push(canexecution);
            this.Axios.post("/api/real/update_setparm",{update:JSON.stringify(updateJSON)}).then(res=>{
             var int=res.data.HttpData.data;
             if(int!=0&&res.data.HttpStatus==200){
              this.$Message.success('修改成功');
               // this.loadInformation(this.equipId,this.active)
              this.selectEvent()
            }else{
              this.$Message.error('修改失败');
            }



          });
            // console.log(updateJSON)
            // console.log(this.uploadInfor)
            break;
          }
          // this.loadInformation(this.equipId)
         

        },getAlarmCode(){
          var code=0;
        // console.log(this.isAlarm,this.isMarkAmarm,this.checkAlarm)
        if(this.isAlarm=="True")
          this.isAlarm=="True"?code+=1:code+=0;
        this.isMarkAmarm=="True"?code+=2:code+=0;
        for(var i=0;i<this.checkAlarm.length;i++){
          if(this.checkAlarm[i].res=="True"){
            code+=parseInt(this.checkAlarm[i].code) 
          }
        }

        //获取报警代码
        return code;
      }
    }
  }
  </script>

  