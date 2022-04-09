<template>
	<view class="module-box app-container">
		<template v-if="module === 'group'">
			<view class="module-group-left">
				<view class="">
					<text class="price">¥{{ price }}</text>
					<text class="oprice">¥{{ oprice }}</text>
				</view>
				<view class="group-num">{{ pnum }}人拼团</view>
			</view>
		</template>
		<uni-countdown
			class="uni-countdown-box"
			color="#FFFFFF"
			background-color="#cf2e40"
			border-color="#00B26A"
			:day="activityDate.day"
			:hour="activityDate.hour"
			:minute="activityDate.minute"
			:second="activityDate.second"
		></uni-countdown>
	</view>
</template>

<script>
export default {
	name: 'countdown',
	props: {
		module: {
			type: String,
			default: 'group'
		},
		// 价格
		price: {
			type: String,
			default: ''
		},
		// 原价
		oprice: {
			type: String,
			default: ''
		},
		// 几人拼团
		pnum: {
			type: Number,
			default: 0
		},
		// 开始时间
		startTime: {
			type: String,
			default: ''
		},
		// 结束时间
		endTime: {
			type: String,
			default: ''
		}
	},
	computed: {
		// 计算倒计时
		activityDate() {
			const module = this.module;
			if (!module) return;
			const now_time = new Date();
			const start_time = new Date(this.startTime)
			const end_time = new Date(this.endTime)
			// 判断当前活动是否超时/未开始
			if (now_time - start_time < 0) {
				this.activity = '活动未开始';
				return;
			}
			if (end_time - now_time < 0) {
				this.activity = '活动已经结束';
				return;
			}
			// 计算倒计时时间
			return this.$tool.dateCount(end_time) || {};
		}
	},
	data() {
		return {
			activity: '' // 如果有值说明活动未开始/已结束
		};
	}
};
</script>

<style lang="scss" scoped>
.module-box {
	display: flex;
	box-sizing: border-box;
	.module-group-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		.price {
			color: $uni-color-error;
			font-size: 22px;
			font-weight: bold;
			margin-right: 20rpx;
		}
		.oprice {
			text-decoration: line-through;
			color: $uni-color-light;
			// font-size: 14px;
		}
		.group-num {
			font-size: 14px;
			margin-right: auto;
			margin-top: 10rpx;
			color: $uni-color-error;
		}
	}
	.uni-countdown-box {
		margin-left: auto;
	}
}
</style>
