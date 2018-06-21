<template>
	<div class="snapashot">
		<div class="common-tab tab-content-border">
			<Tabs type="card" @on-click="updateCardInfo" :animated="false" v-model="tabPaneValue">
				<TabPane label="普通任务" name="0">
					<div class="three-content">
						<div class="table-toolbar">
							<span>普通任务列表</span>
							<button @click="saveCommonTaskFun()">保存</button>
							<button @click="delCommonTask()">删除</button>
							<button @click="addCommonTask()">增加</button>
						</div>
						<div class="common-smalltable three-smalltable">
							<table>
								<thead>
									<tr>
										<th @click="commTableSortFunc(0)">普通
											<i v-if="commTableSortType==0" v-show="commTableSortDirection[0]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="commTableSortType==0" v-show="commTableSortDirection[0]==1" class="iconfont icon-triangle-top"></i>
										</th>
										<th @click="commTableSortFunc(1)">说明
											<i v-if="commTableSortType==1" v-show="commTableSortDirection[1]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="commTableSortType==1" v-show="commTableSortDirection[1]==1" class="iconfont icon-triangle-top"></i>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) of CommonTaskList" :class="{activeTable:index==selecteTable}" @click="SelecteTableFun(index)" :key="'common'+index">
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">
												{{item.TableName}}
											</span>
											<div class="inputContent" v-show="!item.isCommonSpan">
												<input type="text" :value="item.TableName" @input="updateCommonFun(index,$event,'TableName')" />
											</div>
										</td>
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">
												{{item.Comment}}
											</span>
											<div class="inputContent" v-show="!item.isCommonSpan">
												<input type="text" :value="item.Comment" @input="updateCommonFun(index,$event,'Comment')" />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="three-content">
						<div class="table-toolbar">
							<span>系统控制</span>
							<button @click="delSystemFun()" :class="{bg_disabled:SystemStatus}">删除</button>
							<button @click="addSystemTask()">增加</button>
						</div>
						<div class="common-smalltable three-smalltable">
							<table>
								<thead>
									<tr>
										<th @click="systemTableSortFunc(0)">时间
											<i v-if="systemTableSortType==0" v-show="systemTableSortDirection[0]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="systemTableSortType==0" v-show="systemTableSortDirection[0]==1" class="iconfont icon-triangle-top"></i>
										</th>
										<th @click="systemTableSortFunc(1)">系统控制
											<i v-if="systemTableSortType==1" v-show="systemTableSortDirection[1]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="systemTableSortType==1" v-show="systemTableSortDirection[1]==1" class="iconfont icon-triangle-top"></i>
										</th>
										<th @click="systemTableSortFunc(2)">有效时段
											<i v-if="systemTableSortType==2" v-show="systemTableSortDirection[2]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="systemTableSortType==2" v-show="systemTableSortDirection[2]==1" class="iconfont icon-triangle-top"></i>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) of CommonTaskSystemControl" :key="'system'+index" :class="{activeTable:index==selecteSystem}" @click="SelecteSystemFun(index)">
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">{{item.Time.indexOf("T")==-1?item.Time.split(" ")[1]:item.Time.split("T")[1]}}</span>
											<Input size="large" v-show="!item.isCommonSpan" :value="formatDate(item.Time)" @input="updateCommonSystemFun(index,$event,'Time')" />
										</td>
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">
												<font v-for="(itemProc,indexProc) in ProcCmdList" v-show="item.proc_code==itemProc.proc_code" :key="indexProc">{{ itemProc.cmd_nm }}</font>
											</span>
											<Select v-model="item.proc_code" v-show="!item.isCommonSpan" size="large" filterable @on-change="updateCommonSystemFun(index,$event,'proc_code')">
												<Option v-for="itemProc in ProcCmdList" :value="itemProc.proc_code" :key="itemProc.cmd_nm">{{ itemProc.cmd_nm }}</Option>
											</Select>
										</td>
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">{{item.TimeDur.indexOf("T")==-1?item.TimeDur.split(" ")[1]:item.TimeDur.split("T")[1]}}</span>
											<Input size="large" v-show="!item.isCommonSpan" :value="formatDate(item.TimeDur)" @input="updateCommonSystemFun(index,$event,'TimeDur')" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="three-content">
						<div class="table-toolbar">
							<span>设备列表</span>
							<button @click="delEquipFun()" :class="{bg_disabled:EquipStatus}">删除</button>
							<button @click="addEquipFun()">增加</button>
						</div>
						<div class="common-smalltable three-smalltable">
							<table>
								<thead>
									<tr>
										<th @click="equipTableSortFunc(0)">时间
											<i v-if="equipTableSortType==0" v-show="equipTableSortDirection[0]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="equipTableSortType==0" v-show="equipTableSortDirection[0]==1" class="iconfont icon-triangle-top"></i>
										</th>
										<th @click="equipTableSortFunc(1)">设备控制
											<i v-if="equipTableSortType==1" v-show="equipTableSortDirection[1]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="equipTableSortType==1" v-show="equipTableSortDirection[1]==1" class="iconfont icon-triangle-top"></i>
										</th>
										<th @click="equipTableSortFunc(2)">有效时段
											<i v-if="equipTableSortType==2" v-show="equipTableSortDirection[2]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="equipTableSortType==2" v-show="equipTableSortDirection[2]==1" class="iconfont icon-triangle-top"></i>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) of CommonTaskEquipControl" :key="'equip'+index" :class="{activeTable:index==selecteEquip}" @click="SelecteEquipFun(index)">
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">{{item.Time.indexOf("T")==-1?item.Time.split(" ")[1]:item.Time.split("T")[1]}}</span>
											<Input v-show="!item.isCommonSpan" :value="formatDate(item.Time)" @input="updateCommonEquipFun(index,$event,'Time')" />
										</td>
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">
												<font v-for="(itemEquip,indexEquip) in EquipControlList" v-show="item.set_nom==itemEquip.set_nom" :key="'equipspan'+indexEquip">{{ itemEquip.set_nm }}</font>
											</span>
											<Select v-model="item.set_nom" v-show="!item.isCommonSpan" filterable @on-change="updateCommonEquipFun(index,$event,'set_no')">
												<Option v-for="(itemEquip,indexEquip) in EquipControlList" :value="itemEquip.set_nom" :key="'equipselect'+indexEquip">{{ itemEquip.set_nm }}</Option>
											</Select>
										</td>
										<td>
											<span class="spanContent" v-show="item.isCommonSpan">{{item.TimeDur.indexOf("T")==-1?item.TimeDur.split(" ")[1]:item.TimeDur.split("T")[1]}}</span>
											<Input v-show="!item.isCommonSpan" :value="formatDate(item.TimeDur)" @input="updateCommonEquipFun(index,$event,'TimeDur')" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</TabPane>
				<TabPane label="循环任务" name="1">
					<div class="table-toolbar table-toolbar-right">
						<!--<span>循环任务</span>-->
						<button @click="updateLoopTask()" :class="{bg_disabled:LoopStatus}" :disabled="LoopStatus">修改</button>
						<button @click="delLoopTask()" :class="{bg_disabled:LoopStatus}" :disabled="LoopStatus">删除</button>
						<button @click="addLoopTask()">增加</button>
					</div>
					<div class="common-smalltable">
						<table>
							<thead>
								<tr>
									<th @click="loopTableSortFunc(0)">循环任务名称
										<i v-if="loopTableSortType==0" v-show="loopTableSortDirection[0]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="loopTableSortType==0" v-show="loopTableSortDirection[0]==1" class="iconfont icon-triangle-top"></i>
									</th>
									<th @click="loopTableSortFunc(1)">有效起始时间
										<i v-if="loopTableSortType==1" v-show="loopTableSortDirection[1]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="loopTableSortType==1" v-show="loopTableSortDirection[1]==1" class="iconfont icon-triangle-top"></i></th>
									<th @click="loopTableSortFunc(2)">有效结束时间
										<i v-if="loopTableSortType==2" v-show="loopTableSortDirection[2]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="loopTableSortType==2" v-show="loopTableSortDirection[2]==1" class="iconfont icon-triangle-top"></i></th>
									<th @click="loopTableSortFunc(3)">开始执行时间
										<i v-if="loopTableSortType==3" v-show="loopTableSortDirection[3]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="loopTableSortType==3" v-show="loopTableSortDirection[3]==1" class="iconfont icon-triangle-top"></i></th>
									<th @click="loopTableSortFunc(4)">是否必须执行完整
										<i v-if="loopTableSortType==4" v-show="loopTableSortDirection[4]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="loopTableSortType==4" v-show="loopTableSortDirection[4]==1" class="iconfont icon-triangle-top"></i></th>
									<th @click="loopTableSortFunc(5)">最大循环次数
										<i v-if="loopTableSortType==5" v-show="loopTableSortDirection[5]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="loopTableSortType==5" v-show="loopTableSortDirection[5]==1" class="iconfont icon-triangle-top"></i></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) of LoopTaskList" :key="'loop'+index" :class="{activeTable:index==selecteLoop}" @click="SelecteLoopFun(index)">
									<td>
										<span class="spanContent">
											{{item.TableName}}
										</span>
									</td>
									<td>
										<span class="spanContent">
											{{formatDate(item.BeginTime)}}
										</span>
									</td>
									<td>
										<span class="spanContent">
											{{formatDate(item.EndTime)}}
										</span>
									</td>
									<td>
										<span class="spanContent">
											{{item.ExecuteTime}}
										</span>
									</td>
									<td>
										<span class="spanContent">
											{{item.CycleMustFinish=='0'?'否':'是'}}
										</span>
									</td>
									<td>
										<span class="spanContent">
											{{item.MaxCycleNum=='0'?'不受限制':item.MaxCycleNum}}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="每周任务安排" name="2">
					<div class="table-toolbar table-toolbar-right">
						<!--<span>每周任务安排</span>-->
						<button @click="saveWeekTask()">保存</button>
					</div>
					<div class="common-smalltable common-smalltable-checkbox">
						<table>
							<thead>
								<tr>
									<th>星期一</th>
									<th>星期二</th>
									<th>星期三</th>
									<th>星期四</th>
									<th>星期五</th>
									<th>星期六</th>
									<th>星期日</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<font>普通任务</font>
									</td>
									<td>
										<font>普通任务</font>
									</td>
									<td>
										<font>普通任务</font>
									</td>
									<td>
										<font>普通任务</font>
									</td>
									<td>
										<font>普通任务</font>
									</td>
									<td>
										<font>普通任务</font>
									</td>
									<td>
										<font>普通任务</font>
									</td>
								</tr>
								<tr v-for="(item,index) of WeekTaskPlanCommonList" :key="'weekcommon'+index">
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[0].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(0,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[1].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(1,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[2].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(2,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[3].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(3,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[4].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(4,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[5].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(5,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="item.TableName" :value="WeekCommonTaskPlanList[6].indexOf(item.TableID)>-1" @on-change="checkCommonTaskChange(6,item.TableID,index,$event)">{{item.TableName}}</Checkbox>
									</td>
								</tr>
								<tr>
									<td>
										<font>循环任务</font>
									</td>
									<td>
										<font>循环任务</font>
									</td>
									<td>
										<font>循环任务</font>
									</td>
									<td>
										<font>循环任务</font>
									</td>
									<td>
										<font>循环任务</font>
									</td>
									<td>
										<font>循环任务</font>
									</td>
									<td>
										<font>循环任务</font>
									</td>
								</tr>
								<tr v-for="(itemLoop,indexLoop) of WeekTaskPlanLoopList" :key="'weekloop'+indexLoop">
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[0].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(0,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[1].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(1,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[2].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(2,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[3].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(3,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[4].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(4,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[5].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(5,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
									<td>
										<Checkbox :label="itemLoop.TableName" :value="WeeLoopTaskPlanList[6].indexOf(itemLoop.TableID)>-1" @on-change="checkLoopTaskChange(6,itemLoop.TableID,indexLoop,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="特殊日期安排" name="3">
					<div class="table-toolbar table-toolbar-right">
						<!--<span>特殊日期安排</span>-->
						<button @click="saveSpecPlanFun">保存</button>
						<button @click="delSpecPlanTask">删除</button>
						<button @click="addSpecPlanTask">增加</button>
					</div>
					<div class="common-smalltable common-smalltable-checkboxgroup">
						<table>
							<thead>
								<tr>
									<th @click="specTableSortFunc(0)">日期名称
										<i v-if="specTableSortType==0" v-show="specTableSortDirection[0]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="specTableSortType==0" v-show="specTableSortDirection[0]==1" class="iconfont icon-triangle-top"></i>
									</th>
									<th @click="specTableSortFunc(1)">起始日期
										<i v-if="specTableSortType==1" v-show="specTableSortDirection[1]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="specTableSortType==1" v-show="specTableSortDirection[1]==1" class="iconfont icon-triangle-top"></i>
									</th>
									<th @click="specTableSortFunc(2)">结束日期
										<i v-if="specTableSortType==2" v-show="specTableSortDirection[2]==0" class="iconfont icon-triangle-bottom"></i>
										<i v-if="specTableSortType==2" v-show="specTableSortDirection[2]==1" class="iconfont icon-triangle-top"></i>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(itemSpec,indexSpec) of specTimePlanList" :class="{activeSpecTable:indexSpec==selecteSpecPlan}" :key="'speccommon'+indexSpec" @click="selecteSpecPlanFun(indexSpec)">
									<td>
										<span class="specContent" v-show="itemSpec.isCommonSpan">{{itemSpec.DateName}}</span>
										<Input v-show="!itemSpec.isCommonSpan" :value="itemSpec.DateName" @input="updateSpecPlanFun(indexSpec,$event,'DateName')" style="text-align: left;" />
									</td>
									<td>
										<span class="specContent" v-show="itemSpec.isCommonSpan">{{itemSpec.BeginDate.indexOf("T")>-1?itemSpec.BeginDate.split("T")[0]:itemSpec.BeginDate.split(" ")[0]}}</span>
										<DatePicker type="date" v-show="!itemSpec.isCommonSpan" :value="fmtDate(itemSpec.BeginDate)" @on-change="updateSpecPlanFun(indexSpec,$event,'BeginDate')"></DatePicker>
									</td>
									<td>
										<span class="specContent" v-show="itemSpec.isCommonSpan">{{itemSpec.EndDate.indexOf("T")>-1?itemSpec.EndDate.split("T")[0]:itemSpec.EndDate.split(" ")[0]}}</span>
										<DatePicker type="date" v-show="!itemSpec.isCommonSpan" :value="fmtDate(itemSpec.EndDate)" @on-change="updateSpecPlanFun(indexSpec,$event,'EndDate')"></DatePicker>
									</td>
									<!--<td>
										<i title="编辑" class="iconfont icon-scheduleMODIFY" @click="editTaskModal(itemSpec)"></i>
										<font>配置</font>
										<Checkbox v-for="(item,index) of WeekTaskPlanCommonList" :key="index" :label="item.TableName" :value="itemSpec.CommonTableID.indexOf(item.TableID)>-1"  @on-change="checkSpecCommonChange(0,item.TableID,indexSpec,$event)">{{item.TableName}}</Checkbox>
									    <font>循环任务</font>
									    <Checkbox v-for="(itemLoop,indexLoop) of WeekTaskPlanLoopList" :key="itemLoop.TableName" :label="itemLoop.TableName" :value="itemSpec.LoopTableID.indexOf(itemLoop.TableID)>-1" @on-change="checkSpecLoopChange(0,itemLoop.TableID,indexSpec,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>-->
								</tr>
							</tbody>
						</table>
					</div>
					<div class="common-smalltable common-smalltable-checkboxgroup common-smalltable-checkboxgroup-tasklist">
						<table>
							<thead>
								<tr>
									<th>任务名称<i class="iconfont"></i></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td v-for="(itemSpec,indexSpec) of specTimePlanList" v-if="indexSpec==selecteSpecPlan" :key="'specloop'+indexSpec">
										<font>普通任务</font>
										<Checkbox v-for="(item,index) of WeekTaskPlanCommonList" :key="index" :label="item.TableName" :value="itemSpec.CommonTableID.indexOf(item.TableID)>-1" @on-change="checkSpecCommonChange(0,item.TableID,indexSpec,$event)">{{item.TableName}}</Checkbox>
										<font>循环任务</font>
										<Checkbox v-for="itemLoop of WeekTaskPlanLoopList" :key="itemLoop.TableName" :label="itemLoop.TableName" :value="itemSpec.LoopTableID.indexOf(itemLoop.TableID)>-1" @on-change="checkSpecLoopChange(0,itemLoop.TableID,indexSpec,$event)">{{itemLoop.TableName}}</Checkbox>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
			</Tabs>
		</div>
		<Modal v-model="sureModal" :title="loopModalTitle" width="800" @on-ok="saveLoopCycle" @on-cancel="cancel" class="task-modal">
			<div class="one-third-modal">
				<p class="content-title">循环任务属性设置</p>
				<div class="content">
					<p class="input-title">循环任务名称：</p>
					<Input v-model="loopName" size="large" placeholder="请输入任务名称" />
					<p class="input-title">有效起始时间：</p>
					<TimePicker v-model="loopStartTime" size="large" type="time" placeholder="请输入起始时间"></TimePicker>
					<p class="input-title">有效结束时间：</p>
					<TimePicker v-model="loopEndTime" size="large" type="time" placeholder="请输入结束时间"></TimePicker>
					<RadioGroup v-model="loopType" class="execute-type">
						<Radio label="立即开始执行"></Radio><br />
						<Radio label="整点开始执行"></Radio><br />
						<Radio label="指定开始时间："></Radio>
						<TimePicker v-show="loopType=='指定开始时间：'" type="time" v-model="AppointTime"></TimePicker>
					</RadioGroup>
					<CheckboxGroup v-model="loopTypeCheck" class="execute-type">
						<Checkbox label="限制最大循环次数？"></Checkbox>
						<InputNumber v-if="showLoopTypeNum()" :min="1" v-model="loopMaxCycleNum"></InputNumber><br />
						<Checkbox label="是否必须执行完整？"></Checkbox>
					</CheckboxGroup>
				</div>
			</div>
			<div class="half-modal">
				<p class="content-title">循环任务内容安排</p>
				<div class="half-content">
					<ul class="loopCycleUl">
						<li v-for="(item,index) of loopCycleList" :key="'loopcycle'+index" :class="{activeTable:index==selecteLoopCycle}" @click="SelecteLoopCycleFun(index)">{{item.ControlContent}}</li>
					</ul>
					<Button type="primary" class="optionBtn" :class="{bg_disabled:LoopCycleStatus}" :disabled="LoopCycleStatus" @click="delLloopCycleList()">删除</Button>
					<Button type="primary" class="optionBtn" :class="{bg_disabled:LoopCycleStatus}" :disabled="LoopCycleStatus" @click="upLoopCycleList()">上移</Button>
					<Button type="primary" class="optionBtn" :class="{bg_disabled:LoopCycleStatus}" :disabled="LoopCycleStatus" @click="downLoopCycleList()">下移</Button>
				</div>
				<div class="half-content">
					<RadioGroup v-model="loopActionType" class="action-type">
						<Radio label="设备控制"></Radio>
						<Select v-model="loopTypeS" transfer filterable :disabled="loopActionType!='设备控制'">
							<Option v-for="(item,index) in EquipControlList" :value="item.set_nom" :key="'loopequip'+index">{{ item.set_nm }}</Option>
						</Select>
						<br />
						<Radio label="系统任务"></Radio>
						<Select v-model="loopTypeE" transfer filterable :disabled="loopActionType!='系统任务'">
							<Option v-for="(item,index) in ProcCmdList" :value="item.proc_code" :key="'loopsystem'+index">{{ item.cmd_nm }}</Option>
						</Select>
						<br />
						<Radio label="时间间隔"></Radio>
						<div>
							<InputNumber v-model="loopTypeDay" :min="0" :disabled="loopActionType!='时间间隔'"></InputNumber>天&emsp;
							<InputNumber v-model="loopTypeHour" :min="0" :disabled="loopActionType!='时间间隔'"></InputNumber>小时
							<InputNumber v-model="loopTypeMinute" :min="0" :disabled="loopActionType!='时间间隔'"></InputNumber>分钟
							<InputNumber v-model="loopTypeSecond" :min="0" :disabled="loopActionType!='时间间隔'"></InputNumber>秒&emsp;
						</div>
					</RadioGroup>
					<Button type="info" class="insertBtn" @click="insertCycle()">插入</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script src="./TimeTask.js"></script>

<style lang="css" src="@assets/styles/timetask.css"></style>