<template>
  <div class="home">
       <h1>深圳市敢为软件技术有限公司</h1>
       <ul>
         <li v-for="(item,index) in titles" :key="index">
           <div :dataClass="'snaBtn'+index" :class="{activeSnapshot: item.IsActive}" @click="activeSnapshot(item)">
              <h4>{{item.SnapshotName}}</h4>
              <Row>
                <Col span="12" class="infoTop"><span>{{numbers[index]}}</span>个</Col>
                <Col span="12" class="infoBottom">
                   <p>已处理<span>{{numberRresult[index]}}</span></p>
                   <p>未处理<span>{{numbers[index]-numberRresult[index]||0}}</span></p>
                </Col>
              </Row>
           </div>
          </li>
       </ul> 
      <div class="snapashot">
          <table  class="gw-table">
            <thead>
              <tr>
                <th>类型</th>
                <th>时间</th>
                <th>事件</th>
                <th>确认</th>
                <th>处理意见</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of events" :key="index" v-show="item.retrievalShow">
                <td>
                  <img :src="getIMG(item.Level)" alt="" style="vertical-align: middle;" />
                {{item.Level}}
                </td>
                <td>{{item.Time}}</td>
                <td><p >{{item.EventMsg}}</p></td>
                <td>
                  <Button type="info" @click="initModal(item)" v-show="!item.bConfirmed">请确认</Button>
                  <i v-show="item.bConfirmed" class="iconfont icon-ok" style="font-size: 1.5rem;"></i>
                </td>
                <td>{{item.Proc_advice_Msg}}</td>
              </tr>
            </tbody>
          </table>
        </div> 
        <Modal v-model="sureModal" title="确认处理该事件吗？" @on-ok="approvalOK" class="modalAlert">
            <h1 :title="eventsString">事件：<span>{{eventsString}}</span></h1>
            <input type="hidden"/>
            <p>请输入处理意见（100字以内）：</p>
            <Input type="textarea" :rows="4" v-model="inputAsgument"></Input>
            <Checkbox  label="是" style="margin: 10px 0;" v-model="sureMobile">是否发送短信？</Checkbox>
            <CheckboxGroup class="groupCheck" v-show="sureMobile" v-model="sureMobileTel">
              <Checkbox v-for="(item,index) of users" :key="index" class="groupCheckChild" :label="item.MobileTel" >{{item.MobileTel}}({{item.Administrator}})</Checkbox>
            </CheckboxGroup>
        </Modal>
      </div>
</div>

</template>

<script>
import { formatDate } from "../../assets/js/date.js";
export default {

  data () {
    return {
      titles: [], //标题
      numbers:[],//数量
      events: [],//事件
      users:[], //人员
      inputAsgument:'', //弹窗输入意见
      eventsString: '',//事件字符
      eventsTime: '',//事件时间
      numberAsgument:'',//数量参数
      eventAsgument:'',//事件参数
      sureModal: false,//显示弹框
      sureMobile: false,//是否显示联系人
      sureMobileTel: [],//勾选了哪些联系人
      numberRresult:[], //已完成数量
        
    }
  },
  mounted() {
    this.requestTitle();
		},
  methods: {
    activeSnapshot: function(dt){
      dt.IsActive = !dt.IsActive;
      if(dt.IsActive)  //selected
         {
            this.events.forEach(function(ele,index){
              if(ele.Level == dt.SnapshotName)
                ele.retrievalShow = false;
            });
         }
      else  
         {
            this.events.forEach(function(ele,index){
              if(ele.Level == dt.SnapshotName)
                ele.retrievalShow = true;
            });
         }
    },
    requestTitle: function(){
        var element = this;
        let url = "/api/Db/SelectData?tableName=GWSnapshotConfig";
        this.XHRGet(url, _success_Title_query);
        function _success_Title_query(response) {
          element.titles.length = 0;
          let arrayLike = response.data.HttpData.data;
          let code = response.data.HttpData.code;
          if(code == 200)
          {
              let getAlmReportLength = arrayLike.length;
              for (var i = 0; i < getAlmReportLength; i++) {
                  let AlmReport_data = {
                      SnapshotName: arrayLike[i].SnapshotName, 
                      SnapshotLevelMin: arrayLike[i].SnapshotLevelMin, 
                      SnapshotLevelMax: arrayLike[i].SnapshotLevelMax, 
                      MaxCount: arrayLike[i].MaxCount,
                      IsShow: arrayLike[i].IsShow,
                      IconRes: arrayLike[i].IconRes,
                      Reserve1: arrayLike[i].Reserve1,
                      Reserve2: arrayLike[i].Reserve2,
                      Reserve3: arrayLike[i].Reserve3,
                      IsActive: false,
                  }  
                  element.titles.push(AlmReport_data);
              }
              element.numberAsgument = element.getString(element.titles);
              element.eventAsgument = element.getArray(element.titles);
              element.requestNumber(element.numberAsgument);
              element.requestEvent(element.eventAsgument);
          }
          else
          {element.requestTitle();}
        }
    },
    requestNumber: function(value){
      var WeekAlmReportInsert = {levels: value},element = this;
      this.XHRPost("get_RealTimeEventCount",WeekAlmReportInsert,_success_Number_update);
      function _success_Number_update(response) {
          element.numbers.length = 0;
          let arrayLike = response.data.HttpData.data;
          var code = response.data.HttpData.code;
          if(code == 200)
          {
            let getAlmReportLength = arrayLike.split(",");
            for(var i=0;i<getAlmReportLength.length;i++)
              element.numbers.push(getAlmReportLength[i]);
          }
          else
          { 
             element.requestNumber(value);
          }

      }
    },
    requestEvent: function(value){
      var WeekAlmReportInsert = {event_Level_list: value},element = this;
     
      this.XHRPost("get_RealTimeEvent",WeekAlmReportInsert,_success_Event_update);
      function _success_Event_update(response) {
     
          element.events.length = 0;
          let arrayLike = response.data.HttpData.data;
           var code = response.data.HttpData.code;
          if(code == 200)
          {
              let getAlmReportLength = arrayLike.length;
              for(var i=0;i<getAlmReportLength;i++)
              {
                  var dataJson = {
                          Dt_Confirmed: arrayLike[i].Dt_Confirmed,
                          Equipno: arrayLike[i].Equipno,
                          EventMsg: arrayLike[i].EventMsg,
                          Level: element.getbeetween(arrayLike[i].Level),
                          PlanNo: arrayLike[i].PlanNo,
                          Proc_advice_Msg: arrayLike[i].Proc_advice_Msg,
                          Related_pic: arrayLike[i].Related_pic,
                          Time: arrayLike[i].Time.replace("T"," "),
                          Type: arrayLike[i].Type,
                          User_Confirmed: arrayLike[i].User_Confirmed,
                          Wavefile: arrayLike[i].Wavefile,
                          Ycyxno: arrayLike[i].Ycyxno,
                          ZiChanID: arrayLike[i].ZiChanID,
                          bConfirmed: arrayLike[i].bConfirmed,
                          related_video: arrayLike[i].related_video,
                          retrievalShow: true,
                    };
                    element.events.push(dataJson);
              }
              element.requestUser(); 
              setTimeout(function(){element.querySuccess();},200);
          }
          else
          {
             element.requestEvent(value);
          }
  
      }

    },
    requestUser: function(value){
        var element = this;
        let url = "/api/Db/SelectData?tableName=Administrator";
        this.XHRGet(url, _success_users_query);
        function _success_users_query(response) {
          element.users.length = 0;
          let arrayLike = response.data.HttpData.data;
          let code = response.data.HttpData.code;
          if(code == 200)
          {          
                let getAlmReportLength = arrayLike.length;
                for (var i = 0; i < getAlmReportLength; i++) {
                    let AlmReport_data = {
                        Administrator: arrayLike[i].Administrator,
                        EMail: arrayLike[i].EMail,
                        Telphone: arrayLike[i].Telphone,
                        MobileTel: arrayLike[i].MobileTel,
                        AckLevel: arrayLike[i].AckLevel,
                        Reserve1: arrayLike[i].Reserve1,
                        Reserve2: arrayLike[i].Reserve2,
                        Reserve3: arrayLike[i].Reserve3,
                    }  
                    element.users.push(AlmReport_data);
                }
          }
          else
          {
               element.requestUser();
          }
        }
    },    
    approvalOK :function(){
      var isYes = false;
      if(this.sureMobileTel.length>0)
       isYes = true;

      var WeekAlmReportInsert = {
        	msg: this.inputAsgument,
					shortmsg: isYes,
					tel: this.sureMobileTel.join(','),
					evtname: this.eventsString,
					time: this.eventsTime,
      },
      element = this.events,querySuccess = this.querySuccess,
      eventsString=this.eventsString,
      inputAsgument= this.inputAsgument,
      eventsTime = this.eventsTime;
      this.XHRPost("set_EventConfirm",WeekAlmReportInsert,_success_submit_update);
      function _success_submit_update(response) {
          element.forEach(function(ele,index){
             if(ele.EventMsg == eventsString && ele.Time == eventsTime)
               {
                 ele.Proc_advice_Msg = inputAsgument;ele.bConfirmed = true;
                 querySuccess();
                 return false;
               }
          });
          
      }

    },
    initModal: function(value){
      this.sureModal = !this.sureModal;
      this.sureMobile = false;
      this.eventsString = value.EventMsg;
      this.eventsTime = value.Time;
      this.sureMobileTel = [];
      this.inputAsgument = '';
    },

    //发送请求
    XHRPost: function(api, updateJson, _success) {
      var msg = this.$Message;
      let urlna = "/api/GWServiceWebAPI/" + api;
      this.Axios.post(urlna, updateJson, {
        headers: { "Content-type": "application/json" }
      })
        .then(response => {
          // msg.info("执行成功");
          _success(response);
        })
        .catch(error => {
         
        });
    },
    XHRGet: function(url, _success) {
      var msg = this.$Message;
      this.Axios({
        method: "get",
        url: url,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          // msg.info("执行成功");
          _success(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    //处理字符串
    getArray: function(value){
      var ArrayValue='';
      value.forEach(function(ele,index){
        let minValue = parseInt(ele.SnapshotLevelMin),maxValue = parseInt(ele.SnapshotLevelMax);
        for(var i= minValue;i<=maxValue;i++)
        {
            let punctuation =',';
            ArrayValue += (i+punctuation);
        }
      });
      return ArrayValue.substr(0,ArrayValue.length-1);
    },
    getString: function(value){
      var stringValue='';
      value.forEach(function(ele,index){
        let minValue = parseInt(ele.SnapshotLevelMin),maxValue = parseInt(ele.SnapshotLevelMax);
        for(var i= minValue;i<=maxValue;i++)
        {
            let punctuation = i==maxValue?';':',';
            stringValue += (i+punctuation);
        }
      });
      return stringValue;
    },
    getbeetween: function(number){
      var beetString = '';
      this.titles.forEach(function(ele,index){
        let minValue = parseInt(ele.SnapshotLevelMin),maxValue = parseInt(ele.SnapshotLevelMax);
        for(var i= minValue;i<=maxValue;i++)
        {
            if(parseInt(number) == i)
              { beetString = ele.SnapshotName;}
        }
      });
      return beetString;
    },
    getIMG: function(name){
       var ele = this.titles,len = ele.length,url ="";
       for(var i=0; i<len; i++)
       {
          if(ele[i].SnapshotName == name)
            { url = "/static/infor/"+ele[i].IconRes;
              return url;
            }
       }

    },

    //检索哪些已处理
    querySuccess: function(){
      var titles = this.titles,titlesLength = titles.length;
      var events = this.events,eventsLength = events.length;
      this.numberRresult = [];
      for(var i=0;i<titlesLength;i++)
        { 
          var value = 0;
          for(var j=0;j<eventsLength;j++)
          {

              if(titles[i].SnapshotName == events[j].Level && events[j].bConfirmed)
                { 
                  value++;
                }
          }
           this.numberRresult.push(value); 
        }
       
    },


  }




}
</script>
<style lang="scss" src="../../assets/styles/sass/home.scss"></style>
