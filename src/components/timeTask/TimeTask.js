export default {
	data() {
		return {
			selecteTable: 0, //普通任务列表：选中行值
			selecteSystem: -1, //系统控制：选中行值
			SystemStatus: true, //系统控制：是否选中行，可进行删除操作
			selecteEquip: -1, //设备列表：选中行值
			EquipStatus: true, //设备列表：是否选中行，可进行删除操作
			CommonTaskTableID: "", //普通任务列表：选中行ID
			CommonTaskMaxTableID: 0, //普通任务列表：最大tableID
			CommonTaskList: [], //普通任务列表：数据数组
			CommonTaskSystemControl: [], //系统控制：数据数组
			ProcCmdList: [], //系统控制下拉数据：数据数组
			CommonTaskEquipControl: [], //设备列表：数据数组
			EquipControlList: [], //设备列表下拉数据：数据数组
			LoopTaskList: [], //循环任务：数据数组
			MaxDoOrder: 0, //循环任务：最大order
			WeekTaskPlanCommonList: [], //每周任务安排：普通任务列表勾选数组
			WeekTaskPlanLoopList: [], //每周任务安排：循环任务列表勾选数组
			sureModal: false, //循环任务模态框：默认不显示
			loopName: '', //循环任务：任务名称
			loopStartTime: "00:00:00", //循环任务模态框：起始时间
			loopEndTime: "23:59:59", //循环任务模态框：结束时间
			AppointTime: "00:00:00", //循环任务模态框：指定开始时间
			selecteLoop: -1, //循环任务选中行值
			LoopStatus: true, //循环任务是否选中
			loopCycleList: [], //一个循环周期内容
			loopMaxCycleNum: 1, //最大循环次数
			loopBtnType: "", //modal框类型 0增加 1修改
			loopModalTitle: "", //modal框标题
			loopTypeS: "", //modal框 设备控制选中值
			loopTypeE: "", //modal框 系统任务选中值
			loopTypeDay: 0, //modal框  时间间隔-天
			loopTypeHour: 0, //modal框  时间间隔-小时
			loopTypeMinute: 0, //modal框  时间间隔-分钟
			loopTypeSecond: 0, //modal框  时间间隔-秒
			selecteLoopCycle: -1, //循环周期内容选中项
			LoopCycleStatus: true, // 循环周期内容按钮是否disabled
			loopType: "指定开始时间：", //循环任务模态框：开始执行时间默认选项
			loopTypeCheck: [], //循环任务模态框：最大循环机执行完整默认值
			loopActionType: "设备控制", //循环任务模态框：内容安排默认下拉值

			WeekCommonTaskPlanList: [], //每周普通任务安排选中
			WeeLoopTaskPlanList: [], //每周循环任务安排选中

			specTimePlanList: [], //特殊日期安排 内容
			selecteSpecPlan: 0, //特殊日期安排 选中行
			specPlanStatus: true, //特殊日期安排是否选中
			specTableID: [], //特殊日期安排 选中任务ID

			tabPaneValue: '0', //tab页默认选中第一个

			commTableSortType: 0, //普通列表当前排序类型
			commTableSortDirection: [0, 0], //普通列表当前排序类型方向
			
			systemTableSortType: 0, //普通列表当前排序类型
			systemTableSortDirection: [0, 0, 0], //普通列表当前排序类型方向
			
			equipTableSortType: 0, //普通列表当前排序类型
			equipTableSortDirection: [0, 0, 0], //普通列表当前排序类型方向
			
			loopTableSortType: 0, //普通列表当前排序类型
			loopTableSortDirection: [0, 0, 0, 0, 0, 0], //普通列表当前排序类型方向
			
			specTableSortType: 0, //普通列表当前排序类型
			specTableSortDirection: [0, 0, 0], //普通列表当前排序类型方向
		}
	},
	mounted() {
		//获取所有数据
		this.getCommonTaskList();
		this.getCommonTaskProcCmd();
		this.getCommonTaskSetParm();
		this.getLoopTaskList();
		this.getWeekTaskPlan();
		this.getSpecTimePlan()
	},
	methods: {
		//------设置特殊日期安排排序---------
		specTableSortFunc(num) {
			let selecteSpecPlan=this.selecteSpecPlan;
			let specTimePlanListSelect=this.specTimePlanList[selecteSpecPlan];
			let specTableSortType = this.specTableSortType = num;
			let specTableSortDirection = this.specTableSortDirection;
			this.specTimePlanList.sort(function(a, b) {
				if(specTableSortDirection[specTableSortType] == 0) {
					if(specTableSortType == "0") {
						return a.DateName.localeCompare(b.DateName);
					} else if(specTableSortType == "1") {
						return a.BeginDate.localeCompare(b.BeginDate);
					} else if(specTableSortType == "2") {
						return a.EndDate.localeCompare(b.EndDate);
					}
				} else {
					if(specTableSortType == "0") {
						return b.DateName.localeCompare(a.DateName);
					} else if(specTableSortType == "1") {
						return b.BeginDate.localeCompare(a.BeginDate);
					} else if(specTableSortType == "2") {
						return b.EndDate.localeCompare(a.EndDate);
					}
				}
			});
			if(this.specTableSortDirection[specTableSortType] == 0) {
				this.specTableSortDirection.splice(specTableSortType, 1, 1)
			} else {
				this.specTableSortDirection.splice(specTableSortType, 1, 0)
			}
			let nowSelectdNum=this.specTimePlanList.indexOf(specTimePlanListSelect);
			this.selecteSpecPlan=nowSelectdNum;
		},
		//------设置循环任务排序---------
		loopTableSortFunc(num) {
			let selecteLoop=this.selecteLoop;
			let LoopTaskListSelect=this.LoopTaskList[selecteLoop];
			let loopTableSortType = this.loopTableSortType = num;
			let loopTableSortDirection = this.loopTableSortDirection;
			this.LoopTaskList.sort(function(a, b) {
				if(loopTableSortDirection[loopTableSortType] == 0) {
					if(loopTableSortType == "0") {
						return a.TableName.localeCompare(b.TableName);
					} else if(loopTableSortType == "1") {
						return a.BeginTime.localeCompare(b.BeginTime);
					} else if(loopTableSortType == "2") {
						return a.EndTime.localeCompare(b.EndTime);
					} else if(loopTableSortType == "3") {
						return a.ExecuteTime.localeCompare(b.ExecuteTime);
					} else if(loopTableSortType == "4") {
						return a.CycleMustFinish-b.CycleMustFinish;
					} else if(loopTableSortType == "5") {
						return a.MaxCycleNum-b.MaxCycleNum;
					}
				} else {
					if(loopTableSortType == "0") {
						return b.TableName.localeCompare(a.TableName);
					} else if(loopTableSortType == "1") {
						return b.BeginTime.localeCompare(a.BeginTime);
					} else if(loopTableSortType == "2") {
						return b.EndTime.localeCompare(a.EndTime);
					} else if(loopTableSortType == "3") {
						return b.ExecuteTime.localeCompare(a.ExecuteTime);
					} else if(loopTableSortType == "4") {
						return b.CycleMustFinish-a.CycleMustFinish;
					} else if(loopTableSortType == "5") {
						return b.MaxCycleNum-a.MaxCycleNum;
					}
				}
			});
			if(this.loopTableSortDirection[loopTableSortType] == 0) {
				this.loopTableSortDirection.splice(loopTableSortType, 1, 1)
			} else {
				this.loopTableSortDirection.splice(loopTableSortType, 1, 0)
			}
			let nowSelectdNum=this.LoopTaskList.indexOf(LoopTaskListSelect);
			this.selecteLoop=nowSelectdNum;
		},
		//------设置设备列表排序---------
		equipTableSortFunc(num) {
			let selecteEquip=this.selecteEquip;
			let CommonTaskEquipControlSelect=this.CommonTaskEquipControl[selecteEquip];
			let equipTableSortType = this.equipTableSortType = num;
			let equipTableSortDirection = this.equipTableSortDirection;
			this.CommonTaskEquipControl.sort(function(a, b) {
				if(equipTableSortDirection[equipTableSortType] == 0) {
					if(equipTableSortType == "0") {
						return a.Time.localeCompare(b.Time);
					} else if(equipTableSortType == "1") {
						return a.set_nm.localeCompare(b.set_nm);
					} else if(equipTableSortType == "2") {
						return a.TimeDur.localeCompare(b.TimeDur);
					}
				} else {
					if(equipTableSortType == "0") {
						return b.Time.localeCompare(a.Time);
					} else if(equipTableSortType == "1") {
						return b.set_nm.localeCompare(a.set_nm);
					} else if(equipTableSortType == "2") {
						return b.TimeDur.localeCompare(a.TimeDur);
					}
				}
			});
			if(this.equipTableSortDirection[equipTableSortType] == 0) {
				this.equipTableSortDirection.splice(equipTableSortType, 1, 1)
			} else {
				this.equipTableSortDirection.splice(equipTableSortType, 1, 0)
			}
			let nowSelectdNum=this.CommonTaskEquipControl.indexOf(CommonTaskEquipControlSelect);
			this.selecteEquip=nowSelectdNum;
		},
		//------设置系统控制排序---------
		systemTableSortFunc(num) {
			let selecteSystem=this.selecteSystem;
			let CommonTaskSystemControlSelect=this.CommonTaskSystemControl[selecteSystem];
			let systemTableSortType = this.systemTableSortType = num;
			let systemTableSortDirection = this.systemTableSortDirection;
			this.CommonTaskSystemControl.sort(function(a, b) {
				if(systemTableSortDirection[systemTableSortType] == 0) {
					if(systemTableSortType == "0") {
						return a.Time.localeCompare(b.Time);
					} else if(systemTableSortType == "1") {
						return a.proc_code-b.proc_code;
					} else if(systemTableSortType == "2") {
						return a.TimeDur.localeCompare(b.TimeDur);
					}
				} else {
					if(systemTableSortType == "0") {
						return b.Time.localeCompare(a.Time);
					} else if(systemTableSortType == "1") {
						return b.proc_code-a.proc_code;
					} else if(systemTableSortType == "2") {
						return b.TimeDur.localeCompare(a.TimeDur);
					}
				}
			});
			if(this.systemTableSortDirection[systemTableSortType] == 0) {
				this.systemTableSortDirection.splice(systemTableSortType, 1, 1)
			} else {
				this.systemTableSortDirection.splice(systemTableSortType, 1, 0)
			}
			let nowSelectdNum=this.CommonTaskSystemControl.indexOf(CommonTaskSystemControlSelect);
			this.selecteSystem=nowSelectdNum;
		},
		//------设置普通表格排序---------
		commTableSortFunc(num) {
			let selecteTable=this.selecteTable;
			let CommonTaskListSelect=this.CommonTaskList[selecteTable];
			let commTableSortType = this.commTableSortType = num;
			let commTableSortDirection = this.commTableSortDirection;
			this.CommonTaskList.sort(function(a, b) {
				if(commTableSortDirection[commTableSortType] == 0) {
					if(commTableSortType == "0") {
						return a.TableName.localeCompare(b.TableName);
					} else if(commTableSortType == "1") {
						return a.Comment.localeCompare(b.Comment);
					} else {
						return a.TableName.localeCompare(b.TableName);
					}
				} else {
					if(commTableSortType == "0") {
						return b.TableName.localeCompare(a.TableName);
					} else if(commTableSortType == "1") {
						return b.Comment.localeCompare(Comment);
					} else {
						return b.TableName.localeCompare(a.TableName);
					}
				}
			});
			if(this.commTableSortDirection[commTableSortType] == 0) {
				this.commTableSortDirection.splice(commTableSortType, 1, 1)
			} else {
				this.commTableSortDirection.splice(commTableSortType, 1, 0)
			}
			var nowSelectdNum=this.CommonTaskList.indexOf(CommonTaskListSelect);
			this.selecteTable=nowSelectdNum;
		},
		//------tab页点击事件：获取相应子内容---------
		updateCardInfo() {
			let tabPaneValue = this.tabPaneValue;
			if(tabPaneValue == 0) {
				this.getCommonTaskList();
				this.getCommonTaskProcCmd();
				this.getCommonTaskSetParm();
			} else if(tabPaneValue == 1) {
				this.getLoopTaskList();
			} else if(tabPaneValue == 2) {
				this.getWeekTaskPlan();
			} else if(tabPaneValue == 3) {
				this.getSpecTimePlan();
			}
		},
		//------特殊日期安排:保存---------
		saveSpecPlanFun() {
			//设备列表
			let specTimePlanList = this.specTimePlanList;
			for(let i = 0; i < specTimePlanList.length; i++) {
				let specTableID = [];
				let newCommonArr = "";
				let DayCommonTaskPlan = specTimePlanList[i].CommonTableID;
				for(let j = 0; j < DayCommonTaskPlan.length; j++) {
					if(DayCommonTaskPlan[j] != null) {
						newCommonArr += "T" + DayCommonTaskPlan[j] + "+";
					}
				}
				if(newCommonArr.length > 0) {
					newCommonArr = newCommonArr.substring(0, newCommonArr.length - 1)
				}

				let newLoopArr = "";
				let DayLoopTaskPlan = specTimePlanList[i].LoopTableID;
				for(let j = 0; j < DayLoopTaskPlan.length; j++) {
					if(DayLoopTaskPlan[j] != null) {
						newLoopArr += "C" + DayLoopTaskPlan[j] + "+";
					}
				}
				if(newLoopArr.length > 0) {
					newLoopArr = newLoopArr.substring(0, newLoopArr.length - 1)
				}
				if(newCommonArr.length > 0 && newLoopArr.length > 0) {
					specTableID.push(newCommonArr + "+" + newLoopArr)
				} else {
					specTableID.push(newCommonArr + newLoopArr)
				}

				if(specTimePlanList[i].isUpdateFlag) {
					if(specTimePlanList[i].DateName == "") {
						alert("日期名称不能为空");
						return false;
					}
					if(specTimePlanList[i].BeginDate == "") {
						alert("请选择起始日期");
						return false;
					}
					if(specTimePlanList[i].EndDate == "") {
						alert("请选择结束日期");
						return false;
					}
					if(specTimePlanList[i].BeginDate > specTimePlanList[i].EndDate) {
						alert("起始日期不能大于结束日期");
						return false;
					}

					if(specTimePlanList[i].DateName == "") {
						this.$Message.warning("任务名称不能为空");
						return false;
					}
					for(let m = 0; m < specTimePlanList.length; m++) {
						if(m != i && specTimePlanList[i].DateName == specTimePlanList[m].DateName && specTimePlanList[m].ID != "") {
							this.$Message.warning("该任务名称已存在");
							return false;
						}
					}

					if(specTimePlanList[i].ID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcSpecTable",
							cellDataList: " DateName='" + specTimePlanList[i].DateName.replace("'", "''") + "', BeginDate='" + this.formatTimeType(specTimePlanList[i].BeginDate).replace("'", "''") + "', EndDate='" + this.formatTimeType(specTimePlanList[i].EndDate).replace("'", "''") + "',[TableID]='" + specTableID + "' ",
							ifDataList: " ID =" + specTimePlanList[i].ID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("更新成功");
									this.specTimePlanList[i].isCommonSpan = true;
								} else {
									this.$Message.error("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						//插入新计划
						this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
							tableName: "GWProcSpecTable(DateName,BeginDate,EndDate,[TableID])",
							tableVlue: " select '" + specTimePlanList[i].DateName.replace("'", "''") + "','" + this.formatTimeType(specTimePlanList[i].BeginDate).replace("'", "''") + "','" + this.formatTimeType(specTimePlanList[i].EndDate).replace("'", "''") + "','" + specTableID + "' "
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("增加成功");
									this.getSpecTimePlan();
									//									this.selecteSpecPlan = -1;
								} else {
									this.$Message.error("增加失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					}
					this.specTimePlanList[i].isUpdateFlag = false;
				}
			}
		},
		//------特殊日期安排：删除---------
		delSpecPlanTask: function(api, json, _success) {
			this.$Modal.confirm({
				title: "提示",
				content: '<p style="font-size: 18px;position: relative;top: -6px;">确认要删除所选的1行吗?</p>',
				okText: "确认",
				onOk: () => {
					this.delSpecPlanTaskSure();
				},
				cancelText: "取消"
			});
		},
		//------特殊日期安排：确认删除---------
		delSpecPlanTaskSure() {
			let selecteSpecPlan = this.selecteSpecPlan;
			let specTimePlanList = this.specTimePlanList;
			let newArr = [];
			for(let i = 0; i < specTimePlanList.length; i++) {
				if(i !== selecteSpecPlan) {
					newArr.push(specTimePlanList[i])
				} else {
					if(specTimePlanList[i].TableName != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
							tableName: "GWProcSpecTable",
							tableVlue: " ID=" + specTimePlanList[i].ID + ""
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("删除成功");
								} else {
									this.$Message.error("删除失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					}
				}
			}
			this.specTimePlanList = newArr;
		},
		//------特殊日期安排：增加---------
		addSpecPlanTask() {
			this.specTimePlanList.push({
				ID: "",
				DateName: "",
				BeginDate: this.getNowFormatDate(),
				EndDate: this.getNowFormatDate(),
				TableID: [],
				CommonTableID: [],
				LoopTableID: [],
				isCommonSpan: true,
				isUpdateFlag: false
			});
		},
		//------特殊日期安排：勾选普通任务列表---------
		checkSpecCommonChange(day, item, index, e) {
			let CommonTableID = this.specTimePlanList[index].CommonTableID;
			if(e) {
				if(CommonTableID.indexOf(item) > -1) {
					CommonTableID[CommonTableID.indexOf(item)] = item;
				} else {
					CommonTableID.push(item);
				}

			} else {
				var newArr = [];
				for(let i = 0; i < CommonTableID.length; i++) {
					if(CommonTableID[i] != item) {
						newArr.push(CommonTableID[i])
					}
				}
				CommonTableID = newArr;
			}
			this.specTimePlanList[index].CommonTableID = CommonTableID;
			this.specTimePlanList[index].isUpdateFlag = true;
		},
		//------特殊日期安排：勾选循环任务列表---------
		checkSpecLoopChange(day, item, index, e) {
			let LoopTableID = this.specTimePlanList[index].LoopTableID;
			if(e) {
				if(LoopTableID.indexOf(item) > -1) {
					LoopTableID[LoopTableID.indexOf(item)] = item;
				} else {
					LoopTableID.push(item);
				}

			} else {
				var newArr = [];
				for(let i = 0; i < LoopTableID.length; i++) {
					if(LoopTableID[i] != item) {
						newArr.push(LoopTableID[i])
					}
				}
				LoopTableID = newArr;
			}
			this.specTimePlanList[index].LoopTableID = LoopTableID;
			this.specTimePlanList[index].isUpdateFlag = true;
		},
		//------特殊日期安排:编辑---------
		updateSpecPlanFun(index, newContent, TableType) {
			if(TableType == "DateName") {
				this.specTimePlanList[index].DateName = newContent;
			} else if(TableType == "BeginDate") {
				if(newContent == "") {
					this.specTimePlanList[index].BeginDate = newContent;
				} else {
					this.specTimePlanList[index].BeginDate = this.fmtDate(newContent) + " 00:00:00";
				}

			} else if(TableType == "EndDate") {
				if(newContent == "") {
					this.specTimePlanList[index].EndDate = newContent;
				} else {
					this.specTimePlanList[index].EndDate = this.fmtDate(newContent) + " 00:00:00";
				}
			}
			this.specTimePlanList[index].isUpdateFlag = true;
		},
		//------特殊日期安排:选中行---------
		selecteSpecPlanFun(index) {
			let ID;
			for(var i = 0; i < this.specTimePlanList.length; i++) {
				ID = this.specTimePlanList[i].ID;
				if(ID != "") {
					this.specTimePlanList[i].isCommonSpan = true;
				}
			}
			if(this.selecteSpecPlan == index) {
				if(this.specTimePlanList[index].isCommonSpan) {
					this.specTimePlanList[index].isCommonSpan = false;
				}
			}
			this.selecteSpecPlan = index;
			this.specPlanStatus = false;
		},
		//------特殊日期安排：获取数据---------
		getSpecTimePlan() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcSpecTable"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let specTimePlanListData = [];
					for(var i = 0; i < resultData.length; i++) {
						var checka = new Array();
						var checkb = new Array();
						let weekTable = resultData[i].TableID;

						var weektablesp = weekTable.split('+');
						for(var m = 0, n = 0, p = 0; m < weektablesp.length; m++) {
							if(weektablesp[m][0] == "T") {
								weektablesp[m] = weektablesp[m].substr(1);
								checka[n++] = parseInt(weektablesp[m]);
							} else if(weektablesp[m][0] == "C") {
								weektablesp[m] = weektablesp[m].substr(1);
								checkb[p++] = parseInt(weektablesp[m]);
							}
						}

						specTimePlanListData.push({
							ID: resultData[i].ID,
							DateName: resultData[i].DateName,
							BeginDate: resultData[i].BeginDate,
							EndDate: resultData[i].EndDate,
							TableID: resultData[i].TableID,
							CommonTableID: checka,
							LoopTableID: checkb,
							isCommonSpan: true,
							isUpdateFlag: false
						});
					}
					this.specTimePlanList = specTimePlanListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------每周任务安排：保存---------
		saveWeekTask() {
			let WeekCommonTaskPlanList = this.WeekCommonTaskPlanList;
			let WeeLoopTaskPlanList = this.WeeLoopTaskPlanList;
			let WeekAllTaskArr = [];
			if(WeekCommonTaskPlanList.length > 0 || WeeLoopTaskPlanList.length > 0) {
				for(let i = 0; i < WeekCommonTaskPlanList.length; i++) {
					let newCommonArr = "";
					let DayCommonTaskPlan = WeekCommonTaskPlanList[i];
					for(let j = 0; j < DayCommonTaskPlan.length; j++) {
						if(DayCommonTaskPlan[j] != null) {
							newCommonArr += "T" + DayCommonTaskPlan[j] + "+";
						}
					}
					if(newCommonArr.length > 0) {
						newCommonArr = newCommonArr.substring(0, newCommonArr.length - 1)
					}

					let newLoopArr = "";
					let DayLoopTaskPlan = WeeLoopTaskPlanList[i];
					for(let j = 0; j < DayLoopTaskPlan.length; j++) {
						if(DayLoopTaskPlan[j] != null) {
							newLoopArr += "C" + DayLoopTaskPlan[j] + "+";
						}
					}
					if(newLoopArr.length > 0) {
						newLoopArr = newLoopArr.substring(0, newLoopArr.length - 1)
					}
					if(newCommonArr.length > 0 && newLoopArr.length > 0) {
						WeekAllTaskArr.push(newCommonArr + "+" + newLoopArr)
					} else {
						WeekAllTaskArr.push(newCommonArr + newLoopArr)
					}
				}

				//删除原有计划
				this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
					tableName: "GWProcWeekTable",
					tableVlue: " 1=1 "
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200 && data.data != null) {
						//插入新计划
						this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
							tableName: "GWProcWeekTable(Mon, Tues, Wed, Thurs, Fri, Sat, Sun)",
							tableVlue: " select '" + WeekAllTaskArr[0] + "', '" + WeekAllTaskArr[1] + "', '" + WeekAllTaskArr[2] + "','" + WeekAllTaskArr[3] + "', '" + WeekAllTaskArr[4] + "', '" + WeekAllTaskArr[5] + "', '" + WeekAllTaskArr[6] + "' ",
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("更新成功");
								} else {
									this.$Message.error("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					}
				}).catch(err => {
					console.log(err)
				})

			}

		},
		//------每周任务安排：勾选普通任务列表---------
		checkCommonTaskChange(day, item, index, e) {
			let WeekCommonTaskPlanList = this.WeekCommonTaskPlanList;
			if(e) {
				if(WeekCommonTaskPlanList[day].indexOf(item) > -1) {
					WeekCommonTaskPlanList[day][WeekCommonTaskPlanList[day].indexOf(item)] = item;
				} else {
					WeekCommonTaskPlanList[day].push(item);
				}

			} else {
				var newArr = [];
				for(let i = 0; i < WeekCommonTaskPlanList[day].length; i++) {
					if(WeekCommonTaskPlanList[day][i] != item) {
						newArr.push(WeekCommonTaskPlanList[day][i])
					}
				}
				WeekCommonTaskPlanList[day] = newArr;
			}
			this.WeekCommonTaskPlanList[day] = WeekCommonTaskPlanList[day];
		},
		//------每周任务安排：勾选循环任务列表---------
		checkLoopTaskChange(day, item, index, e) {
			let WeeLoopTaskPlanList = this.WeeLoopTaskPlanList;
			if(e) {
				if(WeeLoopTaskPlanList[day].indexOf(item) > -1) {
					WeeLoopTaskPlanList[day][WeeLoopTaskPlanList[day].indexOf(item)] = item;
				} else {
					WeeLoopTaskPlanList[day].push(item);
				}

			} else {
				var newArr = [];
				for(let i = 0; i < WeeLoopTaskPlanList[day].length; i++) {
					if(WeeLoopTaskPlanList[day][i] != item) {
						newArr.push(WeeLoopTaskPlanList[day][i])
					}
				}
				WeeLoopTaskPlanList[day] = newArr;
			}
			this.WeeLoopTaskPlanList[day] = WeeLoopTaskPlanList[day];
		},
		//------每周任务安排：获取数据---------
		getWeekTaskPlan() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcWeekTable"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					if(resultData != "") {
						let weekx = new Array("Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun");
						let weekTable = new Array(resultData[0].Mon, resultData[0].Tues, resultData[0].Wed, resultData[0].Thurs, resultData[0].Fri, resultData[0].Sat, resultData[0].Sun);
						for(var k = 0; k < weekx.length; k++) {
							var checka = new Array();
							var checkb = new Array();
							var weektablesp;
							if(weekTable != "[]" && weekTable != "" && weekTable != null) {
								weektablesp = weekTable[k].split('+');
								for(var m = 0, n = 0, p = 0; m < weektablesp.length; m++) {
									if(weektablesp[m][0] == "T") {
										weektablesp[m] = weektablesp[m].substr(1);
										checka[n++] = parseInt(weektablesp[m]);
									} else if(weektablesp[m][0] == "C") {
										weektablesp[m] = weektablesp[m].substr(1);
										checkb[p++] = parseInt(weektablesp[m]);
									}
								}
							}
							this.WeekCommonTaskPlanList.push(checka);
							this.WeeLoopTaskPlanList.push(checkb)
						}
					} else {
						let weekx = new Array("Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun");
						for(var k = 0; k < weekx.length; k++) {
							var checka = new Array();
							var checkb = new Array();
							this.WeekCommonTaskPlanList.push(checka);
							this.WeeLoopTaskPlanList.push(checkb)
						}
					}

					//普通任务
					let WeekTaskPlanCommonListData = [];
					let CommonTaskListData = this.CommonTaskList;
					for(var i = 0; i < CommonTaskListData.length; i++) {
						WeekTaskPlanCommonListData.push({
							TableID: CommonTaskListData[i].TableID,
							TableName: CommonTaskListData[i].TableName,
						});
					}

					//循环任务
					let WeekTaskPlanLoopListData = [];
					let LoopTaskListData = this.LoopTaskList;
					for(var i = 0; i < LoopTaskListData.length; i++) {
						WeekTaskPlanLoopListData.push({
							TableID: LoopTaskListData[i].TableID,
							TableName: LoopTaskListData[i].TableName
						});
					}
					this.WeekTaskPlanCommonList = WeekTaskPlanCommonListData;
					this.WeekTaskPlanLoopList = WeekTaskPlanLoopListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------循环任务：删除---------
		delLoopTask: function(api, json, _success) {
			this.$Modal.confirm({
				title: "提示",
				content: '<p style="font-size: 18px;position: relative;top: -6px;">确认要删除所选的1行吗?</p>',
				okText: "确认",
				onOk: () => {
					this.delLoopTaskSure();
				},
				cancelText: "取消"
			});
		},
		//------循环任务：确认删除---------
		delLoopTaskSure() {
			let selecteLoop = this.selecteLoop;
			let LoopTaskList = this.LoopTaskList;
			let newArr = [];
			if(selecteLoop != -1) {
				for(let i = 0; i < LoopTaskList.length; i++) {
					if(i !== selecteLoop) {
						newArr.push(LoopTaskList[i])
					} else {
						if(LoopTaskList[i].TableName != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
								tableName: "GWProcCycleTList",
								tableVlue: " TableID=" + LoopTaskList[i].TableID + ""
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										this.$Message.success("删除成功");

										this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
											tableName: "GWProcCycleTable",
											tableVlue: " TableID=" + LoopTaskList[i].TableID + ""
										}).then(res => {}).catch(err => {
											console.log(err)
										});
										this.getLoopTaskList();
										this.selecteLoop = -1;

									} else {
										this.$Message.error("删除失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
				}
				this.LoopTaskList = newArr;
			}
		},
		//------modal框：初始化---------
		initLoopModal() {
			this.loopName = "";
			this.loopStartTime = "00:00:00";
			this.loopEndTime = "23:59:59";
			this.AppointTime = "00:00:00";
			this.loopType = "指定开始时间：";
			this.loopTypeCheck = [];
			this.loopActionType = "设备控制";
			this.loopCycleList = [];
			this.loopMaxCycleNum = 1;
			this.loopBtnType = ""; //模态框变更为修改模式
			this.loopModalTitle = "增加";
			this.loopTypeS = "";
			this.loopTypeE = "";
			this.loopTypeDay = 0;
			this.loopTypeHour = 0;
			this.loopTypeMinute = 0;
			this.loopTypeSecond = 0;
			this.selecteLoopCycle = -1;
			this.LoopCycleStatus = true;
		},
		//------循环周期内容：下移---------
		downLoopCycleList() {
			let selecteLoopCycle = this.selecteLoopCycle;
			let loopCycleList = this.loopCycleList;
			let newArr = [];
			if(loopCycleList.length > 0 && selecteLoopCycle < loopCycleList.length - 1) {
				for(let i = 0; i < loopCycleList.length; i++) {
					if(i == selecteLoopCycle) {
						newArr.push(loopCycleList[i + 1])
					} else if(i == selecteLoopCycle + 1) {
						newArr.push(loopCycleList[i - 1])
					} else {
						newArr.push(loopCycleList[i])
					}
				}
				this.selecteLoopCycle = selecteLoopCycle + 1;
				this.loopCycleList = newArr;
			}
		},
		//------循环周期内容：上移---------
		upLoopCycleList() {
			let selecteLoopCycle = this.selecteLoopCycle;
			let loopCycleList = this.loopCycleList;
			let newArr = [];
			if(loopCycleList.length > 0 && selecteLoopCycle > 0) {
				for(let i = 0; i < loopCycleList.length; i++) {
					if(i == selecteLoopCycle - 1) {
						newArr.push(loopCycleList[i + 1])
					} else if(i == selecteLoopCycle) {
						newArr.push(loopCycleList[i - 1])
					} else {
						newArr.push(loopCycleList[i])
					}
				}
				this.selecteLoopCycle = selecteLoopCycle - 1;
				this.loopCycleList = newArr;
			}
		},
		//------循环周期内容：删除---------
		delLloopCycleList() {
			let selecteLoopCycle = this.selecteLoopCycle;
			let loopCycleList = this.loopCycleList;
			let newArr = [];
			if(loopCycleList.length > 0) {
				for(let i = 0; i < loopCycleList.length; i++) {
					if(i != selecteLoopCycle) {
						newArr.push(loopCycleList[i])
					}
				}
				this.loopCycleList = newArr;
				this.LoopCycleStatus = true;
				this.selecteLoopCycle = -1;
			}
		},
		//------循环周期内容：选中背景突出显示---------
		SelecteLoopCycleFun(index) {
			this.selecteLoopCycle = index;
			this.LoopCycleStatus = false;
		},
		//------循环任务周期内容：保存---------
		saveLoopCycle() {
			let loopBtnType = this.loopBtnType;
			let loopName = this.loopName;
			let loopStartTime = "1900-01-01 " + this.loopStartTime;
			let loopEndTime = "1900-01-01 " + this.loopEndTime;
			let loopType = this.loopType;
			let AppointTime = this.AppointTime;
			let ZhenDianDo = 0,
				ZhidingDo = 0;
			if(loopType == "立即开始执行") {
				ZhenDianDo = 0;
				ZhidingDo = 0
			} else if(loopType == "整点开始执行") {
				ZhenDianDo = 1;
				ZhidingDo = 0
			} else {
				ZhenDianDo = 0;
				ZhidingDo = 1;
				AppointTime = "1900-01-01 " + AppointTime;
			}
			let loopTypeCheck = this.loopTypeCheck;
			let loopMaxCycleNum = this.loopMaxCycleNum;
			let CycleMustFinish = 0,
				MaxCycleNum = 0;
			if(loopTypeCheck.indexOf("限制最大循环次数？") > -1) {
				MaxCycleNum = this.loopMaxCycleNum;
			}
			if(loopTypeCheck.indexOf("是否必须执行完整？") > -1) {
				CycleMustFinish = 1;
			}
			//------循环任务：修改模式---------
			if(loopBtnType == 1) {
				let selecteLoop = this.selecteLoop;
				let LoopTaskList = this.LoopTaskList;

				if(loopName == "") {
					this.$Message.warning("任务名称不能为空");
					return false;
				}
				for(let m = 0; m < LoopTaskList.length; m++) {
					if(m != this.selecteLoop && loopName == LoopTaskList[m].TableName && LoopTaskList[m].TableID != "") {
						this.$Message.warning("该任务名称已存在");
						return false;
					}
				}

				this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
					tableName: "GWProcCycleTList",
					cellDataList: " TableName='" + loopName.replace("'", "''") + "', BeginTime='" + this.formatTimeType(loopStartTime).replace("'", "''") + "'," +
						"EndTime='" + this.formatTimeType(loopEndTime).replace("'", "''") + "', ZhenDianDo='" + ZhenDianDo + "'," +
						"ZhidingDo='" + ZhidingDo + "', CycleMustFinish='" + CycleMustFinish + "'," +
						"ZhidingTime='" + this.formatTimeType(AppointTime).replace("'", "''") + "', MaxCycleNum='" + MaxCycleNum + "' ",
					ifDataList: " TableID =" + LoopTaskList[selecteLoop].TableID
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200 && data.data != null) {
						let resultData = data.data;
						if(resultData == "1") {
							this.$Message.success("循环任务更新成功");
							let strExecute = "";
							let zDo = ZhenDianDo + "," + ZhidingDo;
							if(zDo == "0,0") {
								strExecute = "立即开始执行";
							} else if(zDo == "1,0") {
								strExecute = "整点开始执行";
							} else {
								strExecute = "指定开始时间：" + this.formatDate(AppointTime);
							}
							this.LoopTaskList[selecteLoop].TableName = loopName;
							this.LoopTaskList[selecteLoop].BeginTime = loopStartTime;
							this.LoopTaskList[selecteLoop].EndTime = loopEndTime;
							this.LoopTaskList[selecteLoop].ExecuteTime = strExecute;
							this.LoopTaskList[selecteLoop].ZhenDianDo = ZhenDianDo;
							this.LoopTaskList[selecteLoop].ZhidingDo = ZhidingDo;
							this.LoopTaskList[selecteLoop].ZhidingTime = AppointTime;
							this.LoopTaskList[selecteLoop].CycleMustFinish = CycleMustFinish;
							this.LoopTaskList[selecteLoop].ZhenDingTime = ZhenDianDo;
							this.LoopTaskList[selecteLoop].MaxCycleNum = MaxCycleNum;
						} else {
							this.$Message.error("循环任务更新失败");
						}

					}
				}).catch(err => {
					console.log(err)
				})

				let loopCycleList = this.loopCycleList;
				if(loopCycleList.length > 0) {
					this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
						tableName: "GWProcCycleTable",
						tableVlue: " TableID=" + LoopTaskList[selecteLoop].TableID + ""
					}).then(res => {
						let data = res.data.HttpData;
						if(data.code == 200 && data.data != null) {
							let resultData = data.data;
							let flag = true;
							for(let i = 0; i < loopCycleList.length; i++) {
								let loopActionType = loopCycleList[i].Type;
								let SleepUnit = loopCycleList[i].SleepUnit;
								if(SleepUnit == "小时") {
									SleepUnit = "H"
								} else if(SleepUnit == "分钟") {
									SleepUnit = "M"
								} else if(SleepUnit == "秒") {
									SleepUnit = "S"
								}
								this.MaxDoOrder = this.MaxDoOrder + 1;
								if(loopActionType == "E") {
									this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
										tableName: "GWProcCycleTable([TableID],DoOrder,[Type],set_no,equip_no,proc_code)",
										tableVlue: " select " + LoopTaskList[selecteLoop].TableID + "," + this.MaxDoOrder + ",'E'," + loopCycleList[i].set_no + "," + loopCycleList[i].equip_no + ",0 ",
									}).then(res => {
										let data = res.data.HttpData;
										if(data.code == 200 && data.data != null) {
											let resultData = data.data;
											if(resultData == "1") {

											} else {
												flag = false;
											}

										}
									}).catch(err => {
										console.log(err)
									})
								} else if(loopActionType == "S") {
									this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
										tableName: "GWProcCycleTable([TableID],DoOrder,[Type],set_no,proc_code,cmd_nm)",
										tableVlue: " select " + LoopTaskList[selecteLoop].TableID + "," + this.MaxDoOrder + ",'S',0," + loopCycleList[i].proc_code + ",'" + loopCycleList[i].cmd_nm.replace("'", "''") + "' ",
									}).then(res => {
										let data = res.data.HttpData;
										if(data.code == 200 && data.data != null) {
											let resultData = data.data;
											if(resultData == "1") {

											} else {
												flag = false;
											}

										}
									}).catch(err => {
										console.log(err)
									})
								} else if(loopActionType == "T") {
									this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
										tableName: "GWProcCycleTable([TableID],DoOrder,[Type],set_no,proc_code,SleepTime,SleepUnit)",
										tableVlue: " select " + LoopTaskList[selecteLoop].TableID + "," + this.MaxDoOrder + ",'T',0,0,'" + loopCycleList[i].SleepTime + "','" + SleepUnit + "' ",
									}).then(res => {
										let data = res.data.HttpData;
										if(data.code == 200 && data.data != null) {
											let resultData = data.data;
											if(resultData == "1") {

											} else {
												flag = false;
											}

										}
									}).catch(err => {
										console.log(err)
									})
								}
							}
							if(flag) {
								this.$Message.success("循环任务内容安排更新成功");
							} else {
								this.$Message.error("循环任务内容安排更新失败");
							}
						}
					}).catch(err => {
						console.log(err)
					})

				}
			}
			//------循环任务：增加模式---------
			else if(loopBtnType == 0) {
				let LoopTaskList = this.LoopTaskList;
				let newTableID = 1;
				if(LoopTaskList.length > 0) {
					newTableID = LoopTaskList.length + 1;
				}

				if(loopName == "") {
					this.$Message.warning("任务名称不能为空");
					return false;
				}
				for(let m = 0; m < LoopTaskList.length; m++) {
					if(m != this.selecteLoop && loopName == LoopTaskList[m].TableName && LoopTaskList[m].TableID != "") {
						this.$Message.warning("该任务名称已存在");
						return false;
					}
				}

				this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
					tableName: "GWProcCycleTList([TableID],TableName,BeginTime,EndTime,ZhenDianDo,ZhidingDo,CycleMustFinish,ZhidingTime,MaxCycleNum)",
					tableVlue: " select " + newTableID + ", '" + loopName.replace("'", "''") + "', '" + this.formatTimeType(loopStartTime).replace("'", "''") + "'," +
						"'" + this.formatTimeType(loopEndTime).replace("'", "''") + "', '" + ZhenDianDo + "'," +
						"'" + ZhidingDo + "', '" + CycleMustFinish + "'," +
						"'" + this.formatTimeType(AppointTime).replace("'", "''") + "', '" + MaxCycleNum + "' ",
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200 && data.data != null) {
						let resultData = data.data;
						if(resultData == "1") {
							let strExecute = "";
							let zDo = ZhenDianDo + "," + ZhidingDo;
							if(zDo == "0,0") {
								strExecute = "立即开始执行";
							} else if(zDo == "1,0") {
								strExecute = "整点开始执行";
							} else {
								strExecute = "指定开始时间：" + this.formatDate(AppointTime);
							}
							this.LoopTaskList.push({
								TableID: newTableID,
								TableName: loopName,
								BeginTime: loopStartTime,
								EndTime: loopEndTime,
								ExecuteTime: strExecute,
								ZhenDianDo: ZhenDianDo,
								ZhidingDo: ZhidingDo,
								ZhidingTime: AppointTime,
								CycleMustFinish: CycleMustFinish,
								ZhenDingTime: ZhenDianDo,
								MaxCycleNum: MaxCycleNum
							});
							let flag = true;
							let loopCycleList = this.loopCycleList;
							for(let i = 0; i < loopCycleList.length; i++) {
								let loopActionType = loopCycleList[i].Type;
								let SleepUnit = loopCycleList[i].SleepUnit;
								if(SleepUnit == "小时") {
									SleepUnit = "H"
								} else if(SleepUnit == "分钟") {
									SleepUnit = "M"
								} else if(SleepUnit == "秒") {
									SleepUnit = "S"
								}
								if(loopActionType == "E") {
									this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
										tableName: "GWProcCycleTable([TableID],DoOrder,[Type],set_no,equip_no,proc_code)",
										tableVlue: " select " + newTableID + "," + (i + 1) + ",'E'," + loopCycleList[i].set_no + "," + loopCycleList[i].equip_no + ",0 ",
									}).then(res => {
										let data = res.data.HttpData;
										if(data.code == 200 && data.data != null) {
											let resultData = data.data;
											if(resultData == "1") {

											} else {
												flag = false;
											}

										}
									}).catch(err => {
										console.log(err)
									})
								} else if(loopActionType == "S") {
									this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
										tableName: "GWProcCycleTable([TableID],DoOrder,[Type],set_no,proc_code,cmd_nm)",
										tableVlue: " select " + newTableID + "," + (i + 1) + ",'S',0," + loopCycleList[i].proc_code + ",'" + loopCycleList[i].cmd_nm.replace("'", "''") + "' ",
									}).then(res => {
										let data = res.data.HttpData;
										if(data.code == 200 && data.data != null) {
											let resultData = data.data;
											if(resultData == "1") {

											} else {
												flag = false;
											}

										}
									}).catch(err => {
										console.log(err)
									})
								} else if(loopActionType == "T") {
									this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
										tableName: "GWProcCycleTable([TableID],DoOrder,[Type],set_no,proc_code,SleepTime,SleepUnit)",
										tableVlue: " select " + newTableID + "," + (i + 1) + ",'T',0,0,'" + loopCycleList[i].SleepTime + "','" + SleepUnit + "' ",
									}).then(res => {
										let data = res.data.HttpData;
										if(data.code == 200 && data.data != null) {
											let resultData = data.data;
											if(resultData == "1") {

											} else {
												flag = false;
											}

										}
									}).catch(err => {
										console.log(err)
									})
								}
							}
							if(flag) {
								this.$Message.success("循环任务内容安排新增成功");
							} else {
								this.$Message.error("循环任务内容安排新增失败");
							}
						} else {
							this.$Message.error("新增循环任务操作失败");
						}

					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		//------循环任务：插入---------
		insertCycle() {
			let loopActionType = this.loopActionType;
			if(loopActionType == "设备控制") {
				let loopTypeS = this.loopTypeS;
				if(loopTypeS != "") {
					let setnomArr = loopTypeS.split(",");
					let EquipControlList = this.EquipControlList;
					let set_nm = "";
					for(let i = 0; i < EquipControlList.length; i++) {
						if(EquipControlList[i].equip_no == setnomArr[0] && EquipControlList[i].set_no == setnomArr[1]) {
							set_nm = EquipControlList[i].set_nm;
						}
					}
					this.loopCycleList.push({
						TableID: "",
						Type: "E",
						equip_no: setnomArr[0],
						set_no: setnomArr[1],
						set_nm: set_nm,
						set_nom: setnomArr,
						ControlContent: "设备控制：" + set_nm,
						proc_code: "",
						cmd_nm: "",
						SleepTime: "",
						SleepUnit: ""
					});
				}
			} else if(loopActionType == "系统任务") {
				let loopTypeE = this.loopTypeE;
				if(loopTypeE != "") {
					let ProcCmdList = this.ProcCmdList;
					let cmd_nm = "";
					for(let i = 0; i < ProcCmdList.length; i++) {
						if(ProcCmdList[i].proc_code == loopTypeE) {
							cmd_nm = ProcCmdList[i].cmd_nm;
						}
					}
					this.loopCycleList.push({
						TableID: "",
						Type: "S",
						equip_no: "",
						set_no: "",
						set_nm: "",
						set_nom: "",
						ControlContent: "系统任务：" + cmd_nm,
						proc_code: loopTypeE,
						cmd_nm: cmd_nm,
						SleepTime: "",
						SleepUnit: ""
					});
				}

			} else if(loopActionType == "时间间隔") {
				let loopTypeDay = this.loopTypeDay;
				let loopTypeHour = this.loopTypeHour;
				let loopTypeMinute = this.loopTypeMinute;
				let loopTypeSecond = this.loopTypeSecond;
				if(loopTypeDay != 0 || loopTypeHour != 0 || loopTypeMinute != 0 || loopTypeSecond != 0) {
					let SleepUnit = "";
					let SleepTime = 0;
					if(loopTypeSecond != 0) {
						SleepUnit = "秒";
						SleepTime = parseInt(loopTypeDay * 24 * 60 * 60) + parseInt(loopTypeHour * 60 * 60) + parseInt(loopTypeMinute * 60) + parseInt(loopTypeSecond)
					} else if(loopTypeMinute != 0) {
						SleepUnit = "分钟";
						SleepTime = parseInt(loopTypeDay * 24 * 60) + parseInt(loopTypeHour * 60) + parseInt(loopTypeMinute)
					} else if(loopTypeDay != 0 || loopTypeHour != 0) {
						SleepUnit = "小时";
						SleepTime = parseInt(loopTypeDay * 24) + parseInt(loopTypeHour)
					}
					this.loopCycleList.push({
						TableID: "",
						Type: "T",
						equip_no: "",
						set_no: "",
						set_nm: "",
						set_nom: "",
						ControlContent: "时间间隔：" + SleepTime + SleepUnit,
						proc_code: "",
						cmd_nm: "",
						SleepTime: SleepTime,
						SleepUnit: SleepUnit
					});
				}
			}
		},
		//------循环任务：修改---------
		updateLoopTask() {
			this.initLoopModal();
			this.loopBtnType = 1; //模态框变更为修改模式
			this.loopModalTitle = "修改";
			this.sureModal = true;
			let selecteLoop = this.selecteLoop;
			let LoopTaskList = this.LoopTaskList[selecteLoop];
			this.loopName = LoopTaskList.TableName;
			this.loopStartTime = this.formatDate(LoopTaskList.BeginTime);
			this.loopEndTime = this.formatDate(LoopTaskList.EndTime);

			let zDo = LoopTaskList.ZhenDianDo + "," + LoopTaskList.ZhidingDo;
			if(zDo == "0,0") {
				this.loopType = "立即开始执行";
			} else if(zDo == "1,0") {
				this.loopType = "整点开始执行";
			} else {
				this.loopType = "指定开始时间：";
				this.AppointTime = this.formatDate(LoopTaskList.ZhidingTime);
			}

			if(LoopTaskList.CycleMustFinish != 0 && LoopTaskList.CycleMustFinish != null) {
				this.loopTypeCheck.push("是否必须执行完整？");
			}

			if(LoopTaskList.MaxCycleNum != 0 && LoopTaskList.MaxCycleNum != null) {
				this.loopTypeCheck.push("限制最大循环次数？");
				this.loopMaxCycleNum = LoopTaskList.MaxCycleNum;
			}
			this.Axios.post('/api/GWServiceWebAPI/get_LoopCycleList', {
				TableID: LoopTaskList.TableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let loopCycleListData = [];
					let loopCycleListDataArr = [];
					let strControl = "";
					for(var i = 0; i < resultData.length; i++) {
						let SleepUnit = "";
						if(resultData[i].SleepUnit == 'S') {
							SleepUnit = "秒"
						} else if(resultData[i].SleepUnit == 'M') {
							SleepUnit = "分钟"
						} else if(resultData[i].SleepUnit == 'H') {
							SleepUnit = "小时"
						}
						if(resultData[i].Type == "E") {
							strControl = "设备控制：" + resultData[i].set_nm;
						} else if(resultData[i].Type == "S") {
							strControl = "系统任务：" + resultData[i].cmd_nm;
						} else if(resultData[i].Type == "T") {
							strControl = "时间间隔：" + resultData[i].SleepTime + SleepUnit
						}
						loopCycleListData.push({
							TableID: resultData[i].TableID,
							DoOrder: resultData[i].DoOrder,
							Type: resultData[i].Type,
							equip_no: resultData[i].equip_no,
							set_no: resultData[i].set_no,
							set_nm: resultData[i].set_nm,
							set_nom: resultData[i].equip_no + "," + resultData[i].set_no,
							ControlContent: strControl,
							proc_code: resultData[i].proc_code,
							cmd_nm: resultData[i].cmd_nm,
							SleepTime: resultData[i].SleepTime,
							SleepUnit: resultData[i].SleepUnit
						});
						loopCycleListDataArr.push(resultData[i].TableID);
					}
					this.loopCycleList = loopCycleListData;
					this.MaxDoOrder = loopCycleListDataArr == "" ? 0 : Math.max.apply(null, loopCycleListDataArr);
				}
			}).catch(err => {
				console.log(err)
			});
		},
		//------循环任务:增加---------
		addLoopTask() {
			this.initLoopModal();
			this.loopBtnType = 0; //模态框变更为增加模式
			this.loopModalTitle = "增加";
			this.sureModal = true;
		},
		//------循环任务:选中行---------
		SelecteLoopFun(index) {
			let ID;
			for(var i = 0; i < this.LoopTaskList.length; i++) {
				ID = this.LoopTaskList[i].ID;
				if(ID != "") {
					this.LoopTaskList[i].isCommonSpan = true;
				}
			}
			if(this.selecteLoop == index) {
				if(this.LoopTaskList[index].isCommonSpan) {
					this.LoopTaskList[index].isCommonSpan = false;
				}
			}
			this.selecteLoop = index;
			this.LoopStatus = false;
		},

		//------获取循环任务---------
		getLoopTaskList() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcCycleTList"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let LoopTaskListData = [];
					let strExecute = "";
					for(var i = 0; i < resultData.length; i++) {
						let zDo = resultData[i].ZhenDianDo + "," + resultData[i].ZhidingDo;
						if(zDo == "0,0") {
							strExecute = "立即开始执行";
						} else if(zDo == "1,0") {
							strExecute = "整点开始执行";
						} else {
							strExecute = "指定开始时间：" + this.formatDate(resultData[i].ZhidingTime);
						}
						LoopTaskListData.push({
							TableID: resultData[i].TableID,
							TableName: resultData[i].TableName,
							BeginTime: resultData[i].BeginTime,
							EndTime: resultData[i].EndTime,
							ExecuteTime: strExecute,
							ZhenDianDo: resultData[i].ZhenDianDo,
							ZhidingDo: resultData[i].ZhidingDo,
							ZhidingTime: resultData[i].ZhidingTime,
							CycleMustFinish: resultData[i].CycleMustFinish,
							ZhenDingTime: resultData[i].ZhenDianDo,
							MaxCycleNum: resultData[i].MaxCycleNum
						});
					}
					this.LoopTaskList = LoopTaskListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------设备控制：获取下拉数据---------
		getCommonTaskSetParm() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "SetParm"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let EquipControlListData = [];
					for(var i = 0; i < resultData.length; i++) {
						EquipControlListData.push({
							equip_no: resultData[i].equip_no,
							set_no: resultData[i].set_no,
							set_nm: resultData[i].set_nm,
							set_nom: resultData[i].equip_no + "," + resultData[i].set_no,
						});
					}
					this.EquipControlList = EquipControlListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------设备控制：删除---------
		delEquipFun: function(api, json, _success) {
			this.$Modal.confirm({
				title: "提示",
				content: '<p style="font-size: 18px;position: relative;top: -6px;">确认要删除所选的1行吗?</p>',
				okText: "确认",
				onOk: () => {
					this.delEquipFunSure();
				},
				cancelText: "取消"
			});
		},
		//------设备控制：确认删除---------
		delEquipFunSure() {
			let selecteEquip = this.selecteEquip;
			let CommonTaskEquipControl = this.CommonTaskEquipControl;
			let newArr = [];
			if(selecteEquip != -1) {
				for(let i = 0; i < CommonTaskEquipControl.length; i++) {
					if(i !== selecteEquip) {
						newArr.push(CommonTaskEquipControl[i])
					} else {
						if(CommonTaskEquipControl[i].TableName != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
								tableName: "GWProcTimeEqpTable",
								tableVlue: " ID=" + CommonTaskEquipControl[i].ID + ""
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										this.$Message.success("删除成功");
									} else {
										this.$Message.error("删除失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
				}
				this.CommonTaskEquipControl = newArr;
			}

		},
		//------设备控制：增加---------
		addEquipFun() {
			let date = this.getNowFormatDate();
			this.CommonTaskEquipControl.push({
				ID: "",
				TableID: "",
				Time: date,
				set_no: "",
				set_nm: "",
				set_nom: "",
				TimeDur: "1900-01-01 00:00:04",
				isCommonSpan: false,
				isUpdateFlag: true
			});

		},
		//------设备控制：编辑---------
		updateCommonEquipFun(index, newContent, TableType) {
			if(TableType == "Time") {
				this.CommonTaskEquipControl[index].Time = this.CommonTaskEquipControl[index].Time.substring(0, 10) + " " + newContent;
			} else if(TableType == "set_no") {
				this.CommonTaskEquipControl[index].set_no = newContent;
			} else {
				this.CommonTaskEquipControl[index].TimeDur = this.CommonTaskEquipControl[index].TimeDur.substring(0, 10) + " " + newContent;
			}
			this.CommonTaskEquipControl[index].isUpdateFlag = true;
		},
		//------设备控制:选中行---------
		SelecteEquipFun(index) {
			let ID;
			for(var i = 0; i < this.CommonTaskEquipControl.length; i++) {
				ID = this.CommonTaskEquipControl[i].ID;
				if(ID != "") {
					this.CommonTaskEquipControl[i].isCommonSpan = true;
				}
			}
			if(this.selecteEquip == index) {
				if(this.CommonTaskEquipControl[index].isCommonSpan) {
					this.CommonTaskEquipControl[index].isCommonSpan = false;
				}
			}
			this.selecteEquip = index;
			this.EquipStatus = false;
		},
		//------设备控制：获取数据---------
		getCommonTaskEquipControl() {
			this.Axios.post('/api/GWServiceWebAPI/get_CommonTaskEquipControl', {
				TableID: this.CommonTaskTableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let CommonTaskEquipControlData = [];
					for(var i = 0; i < resultData.length; i++) {
						CommonTaskEquipControlData.push({
							ID: resultData[i].ID,
							TableID: resultData[i].TableID,
							Time: resultData[i].Time,
							set_no: resultData[i].set_no,
							set_nm: resultData[i].set_nm,
							equip_no: resultData[i].equip_no,
							set_nom: resultData[i].equip_no + "," + resultData[i].set_no,
							TimeDur: resultData[i].TimeDur,
							isCommonSpan: true,
							isUpdateFlag: false
						});
					}
					this.CommonTaskEquipControl = CommonTaskEquipControlData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------系统控制：获取下拉数据---------
		getCommonTaskProcCmd() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWExProcCmd"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let ProcCmdListData = [];
					for(var i = 0; i < resultData.length; i++) {
						ProcCmdListData.push({
							proc_code: resultData[i].proc_code,
							cmd_nm: resultData[i].cmd_nm
						});
					}
					this.ProcCmdList = ProcCmdListData;console.log(ProcCmdListData)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------系统控制:删除---------
		delSystemFun: function(api, json, _success) {
			this.$Modal.confirm({
				title: "提示",
				content: '<p style="font-size: 18px;position: relative;top: -6px;">确认要删除所选的1行吗?</p>',
				okText: "确认",
				onOk: () => {
					this.delSystemFunSure();
				},
				cancelText: "取消"
			});
		},
		//------系统控制:删除---------
		delSystemFunSure() {
			let selecteSystem = this.selecteSystem;
			let CommonTaskSystemControl = this.CommonTaskSystemControl;
			let newArr = [];
			if(selecteSystem != -1) {
				for(let i = 0; i < CommonTaskSystemControl.length; i++) {
					if(i !== selecteSystem) {
						newArr.push(CommonTaskSystemControl[i])
					} else {
						if(CommonTaskSystemControl[i].TableName != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
								tableName: "GWProcTimeSysTable",
								tableVlue: " ID=" + CommonTaskSystemControl[i].ID + ""
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										this.$Message.success("删除成功");
									} else {
										this.$Message.error("删除失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
				}
				this.CommonTaskSystemControl = newArr;
			}

		},
		//------系统控制:增加---------
		addSystemTask() {
			let date = this.getNowFormatDate();
			this.CommonTaskSystemControl.push({
				ID: "",
				TableID: "",
				Time: date,
				proc_code: "",
				cmd_nm: "",
				TimeDur: "1900-01-01 00:00:04",
				isCommonSpan: false,
				isUpdateFlag: true
			});

		},
		//------系统控制:编辑---------
		updateCommonSystemFun(index, newContent, TableType) {
			if(TableType == "Time") {
				this.CommonTaskSystemControl[index].Time = this.CommonTaskSystemControl[index].Time.substring(0, 10) + " " + newContent;
			} else if(TableType == "proc_code") {
				this.CommonTaskSystemControl[index].proc_code = newContent;
			} else {
				this.CommonTaskSystemControl[index].TimeDur = this.CommonTaskSystemControl[index].TimeDur.substring(0, 10) + " " + newContent;
			}
			this.CommonTaskSystemControl[index].isUpdateFlag = true;
			let tempObj = this.CommonTaskSystemControl[index];
			this.CommonTaskSystemControl.splice(index, 1, tempObj);
			console.log(this.CommonTaskSystemControl[index])
		},
		//------系统控制:选中行---------
		SelecteSystemFun(index) {
			let ID;
			for(var i = 0; i < this.CommonTaskSystemControl.length; i++) {
				ID = this.CommonTaskSystemControl[i].ID;
				if(ID != "") {
					this.CommonTaskSystemControl[i].isCommonSpan = true;
					//					this.CommonTaskSystemControl[i].isUpdateFlag = false;
				}
			}
			if(this.selecteSystem == index) {
				if(this.CommonTaskSystemControl[index].isCommonSpan) {
					this.CommonTaskSystemControl[index].isCommonSpan = false;
				}
			}
			this.selecteSystem = index;
			this.SystemStatus = false;
		},
		//------系统控制：获取数据---------
		getCommonTaskSystemControl() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableNameAndID', {
				TableName: "GWProcTimeSysTable",
				TableID: this.CommonTaskTableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let CommonTaskSystemControlData = [];
					for(var i = 0; i < resultData.length; i++) {
						CommonTaskSystemControlData.push({
							ID: resultData[i].ID,
							TableID: resultData[i].TableID,
							Time: resultData[i].Time,
							proc_code: resultData[i].proc_code,
							cmd_nm: resultData[i].cmd_nm,
							TimeDur: resultData[i].TimeDur,
							isCommonSpan: true,
							isUpdateFlag: false
						});
					}
					this.CommonTaskSystemControl = CommonTaskSystemControlData;console.log(CommonTaskSystemControlData)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------普通任务（含普通任务列表、系统控制、设备列表）:保存编辑信息---------
		saveCommonTaskFun() {
			//普通任务列表
			let CommonTaskList = this.CommonTaskList;
			for(let i = 0; i < CommonTaskList.length; i++) {
				if(CommonTaskList[i].isUpdateFlag) {
					if(CommonTaskList[i].TableName == "") {
						this.$Message.warning("任务名称不能为空");
						return false;
					}
					for(let m = 0; m < CommonTaskList.length; m++) {
						if(m != i && CommonTaskList[i].TableName == CommonTaskList[m].TableName && CommonTaskList[m].TableID != "") {
							this.$Message.warning("该任务名称已存在");
							return false;
						}
					}
					if(CommonTaskList[i].TableID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcTimeTList",
							cellDataList: " TableName='" + CommonTaskList[i].TableName.replace("'", "''") + "', Comment='" + CommonTaskList[i].Comment.replace("'", "''") + "'",
							ifDataList: " TableID =" + CommonTaskList[i].TableID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success('更新成功');
									this.CommonTaskList[i].isCommonSpan = true;
								} else {
									this.$Message.error("更新失败");
								}
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						if(CommonTaskList[i].TableName != "") {
							this.CommonTaskMaxTableID = this.CommonTaskMaxTableID + 1;
							this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
								tableName: "GWProcTimeTList([TableID],TableName,Comment)",
								tableVlue: " select " + this.CommonTaskMaxTableID + ",'" + CommonTaskList[i].TableName.replace("'", "''") + "','" + CommonTaskList[i].Comment.replace("'", "''") + "' "
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										this.$Message.success("增加成功");
										this.getCommonTaskList();
									} else {
										this.$Message.error("增加失败");
									}
								}
							}).catch(err => {
								console.log(err)
							})
						} else {
							this.$Message.warning("任务名称不能为空");
						}
					}
					this.CommonTaskList[i].isUpdateFlag = false;
				}
			}
			//系统控制
			let CommonTaskSystemControl = this.CommonTaskSystemControl;
			for(let i = 0; i < CommonTaskSystemControl.length; i++) {
				if(CommonTaskSystemControl[i].isUpdateFlag) {
					if(CommonTaskSystemControl[i].proc_code == "") {
						alert("请选择控制类型");
						return false;
					}
					if(CommonTaskSystemControl[i].ID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcTimeSysTable",
							cellDataList: " [Time]='" + this.formatTimeType(CommonTaskSystemControl[i].Time) + "', TimeDur='" + this.formatTimeType(CommonTaskSystemControl[i].TimeDur) + "', proc_code='" + CommonTaskSystemControl[i].proc_code + "' ",
							ifDataList: " TableID =" + CommonTaskSystemControl[i].TableID + " and ID=" + CommonTaskSystemControl[i].ID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("更新成功");
									this.CommonTaskSystemControl[i].isCommonSpan = true;
								} else {
									this.$Message.error("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						if(CommonTaskSystemControl[i].proc_code != "") {
							var newCommTaskID=this.CommonTaskTableID;
							if(this.CommonTaskTableID==""){
								newCommTaskID=this.CommonTaskMaxTableID;
							}
							let ProcCmdList=this.ProcCmdList;
							let cmd_nm;
							for(let j=0;j<ProcCmdList.length;j++){
								if(ProcCmdList[j].proc_code==CommonTaskSystemControl[i].proc_code){
									cmd_nm=ProcCmdList[j].cmd_nm;
								}
							}
							this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
								tableName: "GWProcTimeSysTable([TableID],[Time],TimeDur,proc_code,cmd_nm)",
								tableVlue: " select " + newCommTaskID + ",'" + this.formatTimeType(CommonTaskSystemControl[i].Time) + "','" + this.formatTimeType(CommonTaskSystemControl[i].TimeDur) + "', " + CommonTaskSystemControl[i].proc_code + ", '" + cmd_nm + "' "
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										this.$Message.success("增加成功");
										this.getCommonTaskSystemControl();
									} else {
										this.$Message.error("增加失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						} else {
							this.$Message.warning("请选择控制类型");
						}
					}
					this.CommonTaskSystemControl[i].isUpdateFlag = false;
				}
			}
			//设备列表
			let CommonTaskEquipControl = this.CommonTaskEquipControl;
			for(let i = 0; i < CommonTaskEquipControl.length; i++) {
				if(CommonTaskEquipControl[i].isUpdateFlag) {
					if(CommonTaskEquipControl[i].set_nom == "") {
						alert("请选择控制类型");
						return false;
					}
					let set_nom = CommonTaskEquipControl[i].set_nom;
					let equip_no = set_nom.split(",")[0];
					let set_no = set_nom.split(",")[1];
					if(CommonTaskEquipControl[i].ID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcTimeEqpTable",
							cellDataList: " [Time]='" + this.formatTimeType(CommonTaskEquipControl[i].Time) + "', TimeDur='" + this.formatTimeType(CommonTaskEquipControl[i].TimeDur) + "', equip_no='" + equip_no + "', set_no='" + set_no + "' ",
							ifDataList: " ID =" + CommonTaskEquipControl[i].ID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("更新成功");
									this.CommonTaskEquipControl[i].isCommonSpan = true;
								} else {
									this.$Message.error("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						if(CommonTaskEquipControl[i].set_no != "") {
							var newCommTaskID=this.CommonTaskTableID;
							if(this.CommonTaskTableID==""){
								newCommTaskID=this.CommonTaskMaxTableID;
							}
							this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
								tableName: "GWProcTimeEqpTable([TableID],[Time],TimeDur,equip_no,set_no)",
								tableVlue: " select " + newCommTaskID + ",'" + this.formatTimeType(CommonTaskEquipControl[i].Time) + "','" + this.formatTimeType(CommonTaskEquipControl[i].TimeDur) + "'," + equip_no + "," + set_no + " "

							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										this.$Message.success("增加成功");
										this.getCommonTaskEquipControl();
									} else {
										this.$Message.error("增加失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
					this.CommonTaskEquipControl[i].isUpdateFlag = false;
				}
			}
		},
		//------普通任务列表：删除---------
		delCommonTask: function(api, json, _success) {
			this.$Modal.confirm({
				title: "提示",
				content: '<p style="font-size: 18px;position: relative;top: -6px;">确认删除日程表 ' + this.CommonTaskList[this.selecteTable].TableName + ' 吗?</p>',
				okText: "确认",
				onOk: () => {
					this.delCommonTaskSure();
				},
				cancelText: "取消"
			});
		},
		//------普通任务列表：删除---------
		delCommonTaskSure() {
			let selecteTable = this.selecteTable;
			let CommonTaskList = this.CommonTaskList;
			let newArr = [];
			for(let i = 0; i < CommonTaskList.length; i++) {
				if(i !== selecteTable) {
					newArr.push(CommonTaskList[i])
				} else {
					if(CommonTaskList[i].TableName != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
							tableName: "GWProcTimeTList",
							tableVlue: " TableID=" + CommonTaskList[i].TableID + ""
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									this.$Message.success("删除成功");
									this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
										tableName: "GWProcTimeSysTable",
										tableVlue: " TableID=" + CommonTaskList[i].TableID + ""
									}).then(res => {}).catch(err => {
										console.log(err)
									});
									this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
										tableName: "GWProcTimeEqpTable",
										tableVlue: " TableID=" + CommonTaskList[i].TableID + ""
									}).then(res => {}).catch(err => {
										console.log(err)
									});
									this.getCommonTaskList();
									this.selecteTable = 0;
								} else {
									this.$Message.error("删除失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					}
				}
			}
			this.CommonTaskList = newArr;
		},
		//------普通任务列表：增加---------
		addCommonTask() {
			this.CommonTaskList.push({
				TableID: "",
				TableName: "",
				Comment: "",
				isCommonSpan: false,
				isUpdateFlag: true
			});console.log(this.CommonTaskList)
			this.selecteTable = this.CommonTaskList.length-1;
			this.SystemStatus = true;
			this.EquipStatus = true;
			this.selecteSystem = -1;
			this.selecteEquip = -1;
			this.CommonTaskTableID = this.CommonTaskList.length;
			this.getCommonTaskSystemControl();
			this.getCommonTaskEquipControl();
		},

		//------普通任务列表:编辑---------
		updateCommonFun(index, newContent, TableType) {
			if(TableType == "TableName") {
				this.CommonTaskList[index].TableName = newContent.target.value;
			} else {
				this.CommonTaskList[index].Comment = newContent.target.value;
			}
			this.CommonTaskList[index].isUpdateFlag = true;
		},
		//------普通任务列表:选中行---------
		SelecteTableFun(index) {console.log(index)
			let TableID;
			for(var i = 0; i < this.CommonTaskList.length; i++) {
				TableID = this.CommonTaskList[i].TableID;
				if(TableID != "") {
					this.CommonTaskList[i].isCommonSpan = true;
				}
			}
			if(this.selecteTable == index) {
				if(this.CommonTaskList[index].isCommonSpan) {
					this.CommonTaskList[index].isCommonSpan = false;
				}
			}
			this.selecteTable = index;
			this.SystemStatus = true;
			this.EquipStatus = true;
			this.selecteSystem = -1;
			this.selecteEquip = -1;
			this.CommonTaskTableID = this.CommonTaskList[index].TableID;
			this.getCommonTaskSystemControl();
			this.getCommonTaskEquipControl();
		},
		//------普通任务列表：获取数据---------
		getCommonTaskList() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcTimeTList"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let CommonTaskListData = [];
					let CommonTaskListDataArr = [];
					for(var i = 0; i < resultData.length; i++) {
						if(i == 0) {
							this.CommonTaskTableID = resultData[i].TableID;
						}
						CommonTaskListData.push({
							TableID: resultData[i].TableID,
							TableName: resultData[i].TableName,
							Comment: resultData[i].Comment,
							isCommonSpan: true,
							isUpdateFlag: false
						});
						CommonTaskListDataArr.push(resultData[i].TableID);
					}
					this.CommonTaskList = CommonTaskListData;
					this.CommonTaskMaxTableID = CommonTaskListDataArr == "" ? 0 : Math.max.apply(null, CommonTaskListDataArr);
					this.getCommonTaskSystemControl(),
						this.getCommonTaskEquipControl()
				}
			}).catch(err => {
				console.log(err)
			})
		},
		fmtDate(obj) {
			var date = new Date(obj);
			var year = 1900 + date.getYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			return year + '-' + month + '-' + strDate;
		},
		formatDate(time) {
			return time.substring(11, 19);
		},
		formatTimeType(time) {
			return time.replace("T", " ");
		},
		getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				" " + date.getHours() + seperator2 + date.getMinutes() +
				seperator2 + date.getSeconds();
			return currentdate;
		},
		getNowFormatDateTime() {
			var date = new Date();
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				"T" + date.getHours() + seperator2 + date.getMinutes() +
				seperator2 + date.getSeconds();
			return currentdate;
		},
		showLoopTypeNum() {
			if(this.loopTypeCheck.indexOf('限制最大循环次数？') > -1) {
				return true;
			} else {
				return false;
			}
		},

		ok() {

		},
		cancel() {

		}
	}
}