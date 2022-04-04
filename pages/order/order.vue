<template>
	<view class="order-page">
		<mescroll-body
			ref="mescrollRef"
			@up="upCallback"
			@down="downCallback"
			@init="mescrollInit"
		>
			<view class="order-page-item shadow" v-for="(item,index) in list" :key='index'>
					<view class="order-header">
						<view class="order-num">
							订单编号: {{item.no}}
						</view>
						<view class="order-date">
							订单时间: {{item.created_time}}
						</view>
					</view>
					<view class="order-content">
						{{item.goods}}
					</view>
				
					<view class="order-bottom">
						<view class="order-status await">
							{{typeMap[item.status]}}
						</view>
						<view class="order-price">
							¥ {{item.price}}
						</view>
					</view>
				</view>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	components: {},
	data: () => ({
		list: [],
		typeMap: {
			closed: '已取消',
			pendding: '等待支付',
			success: '支付完成',
		}
	}),
	computed: {},
	methods: {
		async upCallback({ page, size }) {
			const params = {};
			params.page = page;
			params.limit = size;
			const { data } = await this.$http.getOrderListApi(params);
			page === 1 ? (this.list = data.rows) : (this.list = this.list.concat(data.rows));
			this.$refs.mescrollRef.mescroll.endBySize(data.rows.length, data.count);
		}
	},
	watch: {},

	onLoad() {}
};
</script>

<style lang="scss" scoped>
.order-page {
	.order-page-item {
		margin: $uni-spacing-container;
		margin-top: 40rpx;
		padding: 0 $uni-spacing-container;
		.order-header {
			font-size: $uni-font-size-sm;
			color: $uni-color-subtitle;
			padding-top: 20rpx;
			.order-num {
			}
			.order-date {
				margin-top: 6rpx;
			}
		}
		.order-content {
			margin-top: 20rpx;
			font-size: $uni-font-size-base;
			padding: 60rpx 0;
			border-top: 1px solid $uni-border-color-light;
			border-bottom: 1px solid $uni-border-color-light;
		}

		.order-bottom {
			font-size: $uni-font-size-sm;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;
			.order-status {
				&.await {
				}
				&.success {
					color: $uni-color-success;
				}
			}
			.order-price {
				font-size: $uni-font-size-lg;
				color: $uni-color-error;
				font-weight: bold;
			}
		}
	}
}
</style>
