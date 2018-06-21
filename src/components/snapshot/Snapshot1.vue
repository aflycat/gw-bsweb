<template>
	<div class="snapashot">
		<div class="common-tab">
			<Tabs type="card">
				<TabPane label="故障">
					<div class="common-table">
						<table>
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>

				<TabPane label="警告">
					<div class="common-table">
						<table>
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="信息">
					<div class="common-table">
						<table>
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="设置">
					<div class="common-table">
						<table>
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>

			</Tabs>
		</div>
		<Modal v-model="sureModal" title="设备配置" @on-ok="ok" @on-cancel="cancel" class="common-moal">
			<p>Content of dialog</p>
			<p>Content of dialog</p>
			<p>Content of dialog</p>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sureModal: false
			}
		},
		methods: {
			ok() {
				this.$Message.info('Clicked ok');
			},
			cancel() {
				this.$Message.info('Clicked cancel');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.snapshot {}
	
	.common-moal .ivu-modal-content {
		border-radius: 0px;
	}
	
	.common-moal .ivu-modal-header {
		padding: 8px 16px;
	}
	
	.common-moal .ivu-modal-header p,
	.common-moal .ivu-modal-header-inner {
		height: 30px;
		line-height: 35px;
		font-size: 16px;
		color: #1c2438;
		font-weight: 500;
	}
	
	.common-moal .ivu-btn {
		font-weight: 500;
		padding: 5px 20px;
		font-size: 14px;
		border-radius: 0px;
		/*-webkit-transition: color .2s linear, background-color .2s linear, border .2s linear, -webkit-box-shadow .2s linear;
		transition: color .2s linear, background-color .2s linear, border .2s linear, -webkit-box-shadow .2s linear;
		transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;
		transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear, -webkit-box-shadow .2s linear;
		color: #495060;
		background-color: #f7f7f7;
		border-color: #dddee1*/
	}
	
	.common-moal .ivu-btn-text {
	    color: #fff;
    background-color: #B5B5B5;
    border-color: #B5B5B5;
    font-size: 14px;
}
	
	.color-error {
		color: #eb303a;
	}
	
	.color-warn {
		color: #F29100;
	}
	
	.color-info {
		color: #35b458;
	}
	
	.color-set {
		color: #eb303a;
	}
	
	.common-table table {
		width: 100%;
		margin: 0;
		padding: 0;
	}
	
	.common-table table thead tr {
		background: #fff;
	}
	
	.common-table table thead tr th {
		padding: 17px 10px;
		color: #858585;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
	}
	
	.common-table table thead tr th:first-child {
		text-align: center;
	}
	
	.common-table table tbody tr td {
		padding: 11px 10px;
		color: #2e2e2e;
		font-size: 16px;
		font-weight: 500;
		text-align: left;

		min-width: 168px;

	}
	
	.common-table table tbody tr td:first-child {
		text-align: center;
	}
	
	.common-table table tbody tr td>i {
		width: 20px;
		height: 20px;
		font-size: 18px;
	}
	
	.common-table table tbody tr td>button {
		padding: 8px 9px;
		background: #05a3e5;
		font-size: 14px;
		color: #fff;
		border: 0;
	}
	
	.common-table table tbody tr {
		/*-webkit-transition: all 300ms linear 0s;-moz-transition: all 300ms linear 0s;-o-transition: all 300ms linear 0s;transition: all 300ms linear 0s;*/
	}
	
	.common-table table tbody tr:nth-child(even) {
		background: #fff;
	}
	
	.common-table table tbody tr:nth-child(odd) {
		background: #f9f9f9;
	}
	
	.common-table table tbody>.even {
		background: rgba(0, 0, 0, .13)!important;
	}
	
	.common-table table tbody>.odd {
		background-color: transparent!important;
	}
	
	.common-table table tbody tr:hover {
		background: rgba(255, 255, 255, .2)!important;
	}
	
	.common-table table tbody>.active {
		background: rgba(255, 255, 255, .2)!important;
	}
	
	.common-table table tbody>.hiddentd {
		background: rgba(0, 0, 0, .13)!important;
	}
	
	.common-table table tbody>.hiddentd:hover {
		background: rgba(0, 0, 0, .13)!important;
	}
	
	.common-table table tbody>.hiddentd td {
		padding: 0!important;
	}
	
	.common-tab {}
	/* 主内容界面边框大小 */
	
	.gw-index .main .main-body .snapashot {
		width: 100%;
		height: 100%;
		-webkit-box-shadow: 0px 0px 0px 0px #dadada;
		box-shadow: 0px 0px 0px 0px #dadada;
	}
	/* tab列表容器边框 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar {
		border-bottom: 0px;
	}
	/* tab列表边框 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav {
		border: 1px solid #dddee1;
	}
	/* tab列表高度 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
		height: 50px;
	}
	/* tab内容高度 */
	
	.common-tab .ivu-tabs-card>.ivu-tabs-content {
		height: 820px;
		margin-top: -16px;
	}
	/* tab内容背景色、边框 */
	
	.common-tab .ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
		background: #fff;
		border: 1px solid #dddee1;
	}
	/* tab列表默认大小、颜色样式 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
		margin: 0;
		height: 49px;
		line-height: 20px;
		color: #2e2e2e;
		font-size: 16px;
		padding: 13px 25px 16px;
		text-align: center;
		min-width: 123px;
		border: 0px;
		border-right: 1px solid #dddee1;
		border-top: 3px solid rgba(255, 255, 255, 0);
		box-sizing: border-box;
		border-radius: 0;
		-webkit-transition: all .3s ease-in-out;
		transition: all .3s ease-in-out;
		background: #f8f8f9
	}
	/* tab列表最后一个右边框为0 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:last-child {
		border-right: 0px;
	}
	/* tab列表选中样式 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
		height: 49px;
		background: #fff;
		box-sizing: border-box;
		border-top: 3px solid #09B7F7;
		border-right: 1px solid #dddee1;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		color: #2e2e2e;
	}
</style>