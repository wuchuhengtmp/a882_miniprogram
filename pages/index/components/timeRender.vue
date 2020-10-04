<template>
	<view class="componentWrapper">
		<view class="labelRender">
			{{label}}
		</view>
		<view>
			<picker
			 mode="multiSelector" 
			@columnchange="bindMultiPickerColumnChange"
			@change="_onChange"
			:value="multiIndex" 
			:range="multiArray">
				<view class="inputWrapper">
					<view v-if="isSelected">
						<view class="uni-input">
							{{`${
								multiArray[0][multiIndex[0]]
							}-${
								multiArray[1][multiIndex[1]]
							}-${
								multiArray[2][multiIndex[2]]
							}`}}
						</view>
						<view class="uni-input">
								{{`${
									multiArray[3][multiIndex[3]]
								}:${
									multiArray[4][multiIndex[4]]
								}`}}
						</view>
					</view>
					<view v-else class="notice">
						请选择
						<text class="icon-xiangxia"></text>
					</view>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: String,
			startTime: {
				type: String,
				default: undefined
			}
		},
		watch:{
			defaultTime: function(e) {
				console.log(this.defaultTime)
			}
		},
		data() {
			return {
				multiArray: [
					[],
					[],
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0, 0, 0],
				defaultTime: Date.now(),
				isSelected: false
			};
		},
		filters:{
			formatTime(e)
			{
				return typeof e < 10 ?  `0${e}` : e;
			}
		},
		computed: {
			// 已经选择的时间
			beSelectedTime: function() {
				const year = this.multiArray[0][this.multiIndex[0]];
				let month = this.multiArray[1][this.multiIndex[1]];
				let date = this.multiArray[2][this.multiIndex[2]];
				let houre =this.multiArray[3][this.multiIndex[3]];
				const minu = this.multiArray[4][this.multiIndex[4]];
				return `${year}-${month}-${date} ${houre}:${minu}`;
			}
		},
		methods: {
			// 修改
			_onChange(e) 
			{
				this.isSelected = true;
			},
			// 重置年列表
			_resetYearListByTime(time) 
			{
				const selectYear = (new Date(time)).getFullYear();
				const defaultYear = (new Date(this.defaultTime)).getFullYear();
				let yearCollect = [];
				for(let i = 0; i < 10; i++) {
					yearCollect.push(defaultYear + i);
				}
				this.multiArray[0] = yearCollect;
			},
			// 重置月列表
			_resetMonthListByTime(time)
			{
				//  月份列表受制于默认时间， 就是时间的点不能早于默认时间，可以等于。
				const selectYear = (new Date(time)).getFullYear();
				const defaultYear = (new Date(this.defaultTime)).getFullYear();
				const defaultMonth = (new Date(this.defaultTime)).getMonth();
				const selectMonth = this.multiArray[1][this.multiIndex[1]];
				let startMonth = 0;
				if (defaultYear === selectYear) {
					startMonth = defaultMonth;
				}
				let monthList = [];
				for(let i = startMonth; i < 12; i++) {
					monthList.push(i < 9 ? `0${i + 1}`: `${i + 1}`);
				}
				this.multiArray[1] = monthList;
			},
			// 重置天数
			_resetDaysListByTime(time)
			{
				const selectYear = (new Date(time)).getFullYear();
				const selectMonth = (new Date(time)).getMonth();
				const defaultYear = (new Date(this.defaultTime)).getFullYear();
				const defaultMonth = (new Date(this.defaultTime)).getMonth();
				const defaultDay = (new Date(this.defaultTime)).getDate();
				let startDay = 1;
				let lastDayOfMonth = (new Date(selectYear, selectMonth + 1, 0)).getDate();
				if  (selectYear === defaultYear && selectMonth === defaultMonth) {
					startDay = defaultDay;
					lastDayOfMonth = (new Date(defaultYear, defaultMonth + 1, 0)).getDate();
				}
				let days = [];
				for(let i = startDay; i <= lastDayOfMonth; i++) {
					days.push(i < 10 ? `0${i}`: `${i}`);
				}
				this.multiArray[2] = days;
			},
			// 重置小时列表
			_resetHourByTime(time)
			{
				const selectYear = (new Date(time)).getFullYear();
				const selectMonth = (new Date(time)).getMonth();
				const selectDay = (new Date(time)).getDate();
				const defaultYear = (new Date(this.defaultTime)).getFullYear();
				const defaultMonth = (new Date(this.defaultTime)).getMonth();
				const defaultDay = (new Date(this.defaultTime)).getDate();
				const defaultHour = (new Date(this.defaultTime)).getHours();
				let startHour = 0;
				if (
					selectYear === defaultYear &&
					selectMonth === defaultMonth &&
					selectDay === defaultDay
				) {
					startHour = defaultHour;
				}
				let hourList = [];
				for(let i = startHour; i < 24; i++) {
					hourList.push(i < 10 ? `0${i}`: `${i}`);
				}
				this.multiArray[3] = hourList;
			},
			// 重置分钟列表
			_resetMinute(time)
			{
				const selectYear = (new Date(time)).getFullYear();
				const selectMonth = (new Date(time)).getMonth();
				const selectDay = (new Date(time)).getDate();
				const selectHour = (new Date(time)).getHours();
				const defaultYear = (new Date(this.defaultTime)).getFullYear();
				const defaultMonth = (new Date(this.defaultTime)).getMonth();
				const defaultDay = (new Date(this.defaultTime)).getDate();
				const defaultHour = (new Date(this.defaultTime)).getHours();
				const defaultMinute = (new Date(this.defaultTime)).getMinutes();
				let startMinute = 0;
				let minuteList = [];
				if (
					selectYear === defaultYear &&
					selectMonth === defaultMonth &&
					selectDay === defaultDay &&
					selectHour === defaultHour
				) {
					startMinute = defaultMinute;
				}
				for(let i = startMinute; i < 60; i++) {
					minuteList.push(i < 10 ? `0${i}`: `${i}`);
				}
				this.multiArray[4] = minuteList;
			},
			// 重置时间
			_resetTime(time)
			{
				// 重置年列表
				this._resetYearListByTime(time);
				// 重置月列表
				this._resetMonthListByTime();
				// 重置日期列表
				this._resetDaysListByTime(time);
				//重置小时列表
				this._resetHourByTime(time);
				// 重置分钟列表
				this._resetMinute(time);
			},
			// 格式化数据
			_formatNumber(n) {
				return n;
			},
			bindMultiPickerColumnChange: function(e) {
				// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				// console.log(this.multiIndex[e.detail.column]);
				const column = e.detail.column;
				this.multiIndex[e.detail.column] = e.detail.value;
				const year = this.multiArray[0][this.multiIndex[0]];
				const month = parseInt(this.multiArray[1][this.multiIndex[1]]) - 1;
				const day = parseInt(this.multiArray[2][this.multiIndex[2]]);
				const hour = parseInt(this.multiArray[3][this.multiIndex[3]]);
				const minute = parseInt(this.multiArray[4][this.multiIndex[4]]);
				const selectTime = new Date(year, month, day, hour, minute);
				// 修改年
				if (column === 0) {
					this._resetYearListByTime(selectTime);
					this._resetMonthListByTime(selectTime);
					this._resetDaysListByTime(selectTime);
					this._resetHourByTime(selectTime);
					this._resetMinute(selectTime);
				} else if(column === 1){
					this._resetMonthListByTime(selectTime);
					this._resetDaysListByTime(selectTime);
					this._resetHourByTime(selectTime);
					this._resetMinute(selectTime);
				} else if(column === 2){
					this._resetDaysListByTime(selectTime);
					this._resetHourByTime(selectTime);
					this._resetMinute(selectTime);
				}else if(column === 3){
					this._resetHourByTime(selectTime);
					this._resetMinute(selectTime);
				}else if(column === 4){
					this._resetMinute(selectTime);
				}
				this.isSelected = true;
				let tmpMonth = month + 1;
				tmpMonth = tmpMonth < 10 ? `0${tmpMonth}` : `${tmpMonth}`;
				if (this.multiArray[1].indexOf(tmpMonth) !== -1)
				{
					this.multiIndex[1] = this.multiArray[1].indexOf(tmpMonth);
				}
				const tmpDay = day < 10 ? `0${day}` : `${day}`;
				if (this.multiArray[2].indexOf(tmpDay) !== -1) this.multiIndex[2] = this.multiArray[2].indexOf(tmpDay);
				const tmpHour = hour < 10 ? `0${hour}` : `${hour}`;
				if (this.multiArray[3].indexOf(tmpHour) !== -1) {
					this.multiIndex[3] = this.multiArray[3].indexOf(tmpHour);
				}
				const tmpMinute = minute < 10 ? `0${minute}` : `${minute}`;
				if (this.multiArray[4].indexOf(tmpMinute) !== -1) {
					this.multiIndex[4] = this.multiArray[4].indexOf(tmpMinute);
				}

				this.$emit('onChange', selectTime);
				this.$forceUpdate();
			}
		},
		updated() {
			
		},
		mounted() {

		},
		created() {
			// 重置时间
			let time  = Date.now();
			if (this.defaultTime) {
				time = this.defaultTime;
			}
			this._resetYearListByTime(time);
			this._resetMonthListByTime(time);
			this._resetDaysListByTime(time);
			this._resetHourByTime(time);
			this._resetMinute(time);
		}
	}
</script>

<style lang="scss">
	@import '../index.scss';

	.componentWrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		.labelRender {
			font-size: .7rem;
			margin-bottom: .5rem;
			color: $color;
			width: 4rem;
			text-align: center;

		}
		.inputWrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
			.notice {
				width: 100%;
				text-align: center;
				padding-left: 10upx;
			}
			.uni-input {
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
