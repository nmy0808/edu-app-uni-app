<template>
	<view class="coupons-item">
		<view class="coupons-item-left ">
			<view class="coupons-price text-ellipsis">¥ {{data.price}}</view>
			<view class="coupons-tprice text-ellipsis">
				适用: {{data.value.title}}
			</view>
		</view>
		<view class="coupons-item-right">领取</view>
	</view>
</template>

<script>
	export default {
		name:"coupons-item",
		props: {
			data: {
				type: Object,
				default: () => {
					return {};
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
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
		}
		.coupons-item:first-of-type {
			margin-left: $uni-spacing-container;
		}
		.coupons-item:last-of-type {
			margin-right: $uni-spacing-container;
		}
</style>
