<!-- 优惠券 -->
<template>
	<!-- 水平样式 -->
	<view
		v-if="!isVertical"
		class="coupons-item"
		:class="{ 'is-get': data.isgetcoupon || data.used }"
	>
		<view class="coupons-item-left">
			<view class="coupons-price text-ellipsis">¥ {{ data.price }}</view>
			<view class="coupons-tprice text-ellipsis">
				适用{{ data.typeKey }}: {{ data.value.title }}
			</view>
		</view>
		<view class="coupons-item-right" @click="handleGetCoupon">
			{{ data.isgetcoupon ? '已领取' : '领取' }}
		</view>
	</view>
	<!-- 垂直样式 -->
	<view
		v-else
		class="coupons-item is-vertical"
		:class="{ 'is-get': isgetcoupon || data.used }"
	>
		<view class="coupons-item-left">
			<view class="coupons-price text-ellipsis">¥ {{ data.price }}</view>
			<view class="coupons-tprice text-ellipsis">
				适用{{ data.typeKey }}: {{ data.value.title }}
			</view>
			<view class="">结束日期: {{ data.end_time }}</view>
		</view>
		<view class="coupons-item-right" @click="handleGetCoupon">
			{{ data.used ? '已使用' : isgetcoupon ? '已过期' : '领取' }}
		</view>
	</view>
</template>

<script>
export default {
	name: 'coupons-item',
	props: {
		// 是否垂直
		isVertical: {
			type: Boolean,
			default: false
		},
		data: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {};
	},
	computed: {
		isgetcoupon() {
			const end = new Date(this.data.end_time).getTime();
			const now = new Date().getTime();
			return now - end > 0;
		}
	},
	methods: {
		/**
		 * 领取优惠券
		 */
		async handleGetCoupon() {
			if (this.data.isgetcoupon || this.data.used) return;
			await this.$http.getCouponByIdApi(this.data.id);
			this.toast('领取成功');
		}
	}
};
</script>

<style lang="scss" scoped>
.coupons-item {
	display: inline-flex;
	width: 340rpx;
	height: 120rpx;
	margin: 0 $uni-spacing-container/2;
	color: white;
	border-radius: $uni-border-radius-base;
	overflow: hidden;

	.coupons-item-left {
		background-color: #c9960d;
		border-right: 1px dashed white;
		height: 100%;
		width: 220rpx;
		font-size: $uni-font-size-sm;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-left: 10rpx;
		.coupons-price {
			font-size: $uni-font-size-base;
		}
		.coupons-tprice {
		}
	}
	.coupons-item-right {
		background-color: #fabc13;
		height: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-base;
	}
	// 已领取样式

	&.is-vertical {
		display: flex;
		width: 100%;
		margin: 20rpx 0;
		height: 160rpx;
		.coupons-item-left {
			flex: 1;
			.coupons-tprice {
				margin-top: 20rpx;
			}
		}
		.coupons-item-right {
			flex: none;
			width: 120rpx;
		}
	}
	&.is-get {
		.coupons-item-left {
			background-color: #dbe0e4;
		}
		.coupons-item-right {
			background-color: #dbe0e4;
		}
	}
}
.coupons-item:first-of-type {
	margin-left: $uni-spacing-container;
}
.coupons-item:last-of-type {
	margin-right: $uni-spacing-container;
}
</style>
