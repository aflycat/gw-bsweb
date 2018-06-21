<style lang="css">

*{
  font-family: "微软雅黑",
}
/*sss*/
 ::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
.event-query{width:100%;height:100%;}
.event-query .wrap{width:100%;height:100%;}
.event-query .wrap .itemDetail{height:100%;overflow: hidden;padding-left: 15px;}
.event-query .wrap .itemList{height:100%;overflow-y: scroll;}
.dateSelect{padding:20px  0;}


.event-query .itemList p{
  width:95%;
  height:50px;
  line-height: 50px;
  background: #f9f9f9 !important;
  margin:10px auto;
  font-size:15px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.event-query .itemList p:hover{
  border:1px solid #2d8cf0;
  box-sizing: border-box;
  color:#2d8cf0;
  cursor:pointer;
}
.clickActive{
   border:1px solid #2d8cf0;
  box-sizing: border-box;
  color:#2d8cf0;
}
.common-tabEve{padding:12px 0 12px 0;}
.event-query .ivu-tabs-bar{margin-bottom: 0;height: 40px;}
.event-query .ivu-tabs-nav-container{height: 40px !important;}
.event-query .ivu-table-wrapper{
  border:none;
}

.event-query .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
  margin-right: 0;
  border-radius: 0;
  border-right: none;
  font-size:1rem;
  height:40px;
  border-bottom: 1px solid #dddee1;
}
.event-query .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:last-child{
   border-right:1px solid #dddee1;
}
.event-query .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
  border-top:1px solid #2d8cf0;
  box-sizing: border-box;
  background: #F9F9F9;
}
.event-query .ivu-table .ivu-table-header table .ivu-table-cell{
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  font-weight: 200;
  font-size: 0.9rem;
  text-align: center;
  color:#858585;
  width: 100%;
  height: 100%;
  line-height: 40px;
}

.event-query  .ivu-table th{
  background: #fff;
}
.event-query .ivu-table td,.event-query  .ivu-table th{
  border:none 0;
}
.event-query .ivu-table td{
  font-size:1rem;
}
.event-query .ivu-table:after{
  height: 0;
}
.event-query .ivu-table .demo-table-info-row td{
        background-color: #f9f9f9;

    }
.event-query .ivu-table .demo-table-error-row td{
    background-color: #fff; 
  }
.event-query   .ivu-table-row:hover{
      background-color: #ff0 !important; 
  }
.event-query   .common-tabEve .ivu-tabs-card>.ivu-tabs-content{
    margin-top: 0;
  }
.event-query   .common-tabEve .ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane{
    border:none 0;
  }
.event-query   .ivu-table:before{
    height:0;
  }
.event-query     .ivu-table-row:hover td{
      background: #ebf7ff !important; 
  }
.event-query   .ivu-date-picker-cells span em{
    font-size: 15px !important;
  }
.event-query   .ivu-btn-small{
    font-size: 14px;
  }
  .dateSelect{
    width: auto;
    position: absolute;
    top: -20px;
    right:30px;
    z-index: 99;
  }
.dataSelect i{
  font-size: 20px;
  color:#777;

}
.ivu-input::-webkit-input-placeholder{
  color:#777;
}
#placeholder{
  color:#777;
}
</style>

<template>
  <div class="event-query">
     <Row class="wrap">
        <Col span="3" class="itemList">
          <p title="全选" @click="selectAll()" :class="allSelect?'clickActive':''">全选</p>
  			  <p  v-for="(item,$index) in itemList" @click="selectId(item.m_iEquipNo,$index)" ref="mybox" :title="item.m_EquipNm">
            <!-- :class="$index==activeClass?'clickActive':'' -->
                {{item.m_EquipNm}}{{item.m_iEquipNo}}
          </p>
        </Col>
        <Col span="21" class="itemDetail">
         
        	
          <div class="common-tabEve">
              <Tabs type="card"  :animated="false">
                <div class="dateSelect">
                    <Button type="primary" style="margin-right:10px;border-radius:0;background:#2d8cf0;padding:8.5px 21.5px;font-size:14px;line-height:inherit;color:#fff;" @click="selectEvent()">查询</Button >
                    <DatePicker class="dataSelect" type="datetimerange" format="yyyy/MM/dd HH:mm" :options="option1" placeholder="请选择日期时间" style="width: 500px" @on-change="dateVale"></DatePicker>
                    
                  </div>
                <TabPane  label="设备事件" >
                   
                   <Table :columns="equipTh" :data="equipEvent" :height="tableHeight" :row-class-name="rowClassName" :loading="loading"></Table>
                </TabPane>
                <TabPane label="设置事件">
                   <Table :columns="sysTh" :data="setEvent" :height="tableHeight" :row-class-name="rowClassName" :loading="loading"></Table>
                </TabPane>
                <TabPane label="系统事件">
                   <Table :columns="sysEventTh" :data="sysEvent" :height="tableHeight" :row-class-name="rowClassName"  :loading="loading" ></Table>
                </TabPane>

              </Tabs>
             
            </div>
        </Col>
      </Row>
  </div>
</template>

<script>
export default {
   data () {
    return {
      tableHeight:650,
      itemList:[],//左侧列表
      equipEvent:[],//右侧设备事件
      setEvent:[],//右侧设置事件
      sysEvent:[],//右侧系统事件
      dateValue:[],
      equipId:0,
      loading:false,
      allSelect:false,
      equipTh:[
        {
          title:"设备名称",
          align: 'center',
          key:"name"
        },{
          title:"设备事件",
          align: 'center',
          key:"event"
        },{
          title:"时间",
          key:"time",
          align: 'center',
          sortable: true
        }
      ],
      sysTh:[
          {
            title:"设备名称",
            align: 'center',
            key:"name"
          },{
            title:"设置事件",
            align: 'center',
            key:"event"
          },{
            title:"操作人员",
            align: 'center',
            key:"person"
          },{
            title:"时间",
            key:"time",
            align: 'center',
            sortable: true
          }
      ],
      sysEventTh:[

          {
              title: '设备事件',
              key: 'event',
               align: 'center',
          },
          {
              title: '时间',
              key: 'time',
              align: 'center',
              sortable: true
          }
      ],
      // data1:[],
      activeClass:null,

      option1:{
        shortcuts:[
                      {
                        text: '今天',
                        value () {
                            const end=new Date();
                            const start=new Date().toLocaleDateString();
                            return [start, end];
                        }
                      },{
                            text: '7天',
                                value () {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    return [start, end];
                                
                            }
                      },{
                            text: '30天',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                      }

                  ]
      },searchArr:[]
    }
  },mounted (){
    this.init()

  },methods:{
     
     rowClassName (row, index) {
      // console.log(2)
                if (index%2== 0) {
                    return 'demo-table-info-row';
                } else if (index%2== 1) {
                    return 'demo-table-error-row';
                }
                return '';
            },
    init(){
       var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.tableHeight=h-170;
      this.Axios.post("/api/real/equip_state",{userName:window.localStorage.login_msg}).then(res=>{
        let response=res.data.HttpData.data;
        this.itemList=response;
      })
     },
     selectId(id,index){
        let nameStr=this.$refs.mybox[index].className;
        if(nameStr=="clickActive"){
          this.$refs.mybox[index].className=""
           this.allSelect=false;
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

     },
     selectEvent(){
        this.loadEventList();
     },
     dateVale(val){
        this.dateValue=val;
     },
     loadEventList(){
      let id=this.searchArr.toString();
       console.log(id);
      let dates=this.dateValue;
      
      if(dates.length==0){
        this.$Message.warning('请选择日期时间');
        return
      }

      let timeStr="";
      if(this.dateValue[0]==""){
        this.dateValue[0]=this.dateValue[1].split(" ")[0];
      }
      timeStr=this.dateValue.toString();
      //this.loading=true;
     this.Axios.post("/api/event/get_equip_evt",{times:timeStr,equip_nos:id}).then(res=>{//加载模拟量配置
          if(res.data.HttpStatus==200&&res.data.HttpData.data.length!=0){
            this.equipEvent=[];
            let respon=res.data.HttpData.data

            for(var i=0;i<respon.length;i++){
              let item={
                name:respon[i].equip_nm,
                event:respon[i].event,
                time:respon[i].time.replace("T"," ")
              }
              this.equipEvent.push(item);
            }
            
          }
          this.loading=false;
     });
     this.Axios.post("/api/event/get_set_evt",{times:timeStr,equip_nos:id}).then(res=>{


          if(res.data.HttpStatus==200&&res.data.HttpData.data.length!=0){
            this.setEvent=[];
            let respon=res.data.HttpData.data
            for(var i=0;i<respon.length;i++){
              let item={
                name:respon[i].equip_nm,
                event:respon[i].event,
                person:respon[i].operator,
                time:respon[i].time.replace("T"," ")
              }
              this.setEvent.push(item);
            }
          }
           this.loading=false;
      });
      this.Axios.post("/api/event/get_sys_evt",{times:timeStr}).then(res=>{
        
          if(res.data.HttpStatus==200&&res.data.HttpData.data.length!=0){
            this.sysEvent=[];
            let respon=res.data.HttpData.data
          //   // console.log(respon)
            for(var i=0;i<respon.length;i++){
              
              let item={
                
                event:respon[i].event,
                time:respon[i].time.replace("T"," ")
              }
              this.sysEvent.push(item)
            }
          }
           this.loading=false;
      });
     }

   
  },
  watch:{
       equipEvent:function(val){
         // console.log(val)
         if(val.length!=0)this.$Message.success('设备事件查询成功');
          
       },
       setEvent:function(val){
         // console.log(val)
         if(val.length!=0)this.$Message.success('设置事件查询成功');
          
       },
       sysEvent:function(val){
         // console.log(val)
         if(val.length!=0)this.$Message.success('系统事件查询成功');
          
       }
     }
}
</script>

