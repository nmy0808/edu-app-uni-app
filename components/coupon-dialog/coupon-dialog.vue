<template>
	<uni-popup
		ref="inputDialog"
		type="bottom"
		:is-mask-click="true"
		@change="handleClose"
	>
		<view class="modal app-container">
			<!-- Header -->
			<view class="modal__header">
				<!-- Title -->
				{{ title }}
				<!-- Close icon sticks to the right -->
				<uni-icons
					type="close"
					color="#000000"
					size="20"
					@click="close"
				></uni-icons>
			</view>

			<!-- Content -->
			<scroll-view scroll-y="true" class="w-100">
				<template v-for="(item, index) in list">
					<view
						class="coupons-item is-vertical shadow"
						:class="{ active: item.id === currentId }"
						@click="handleConfirm(item)"
					>
						<view class="coupons-item-left">
							<view class="coupons-price text-ellipsis">
								¥ {{ item.price }}
							</view>
							<view class="coupons-tprice text-ellipsis">
								适用{{ item.typeKey }}: {{ item.title }}
							</view>
							<view class="coupons-date">结束日期: {{ item.end_time }}</view>
						</view>
					</view>
				</template>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'coupon-dialog',
	props: {
		placeholder: {
			type: String,
			default: '请输入内容'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		confirmText: {
			type: String,
			default: '确定'
		}
	},
	data() {
		return {
			currentId: null,
			list: [],
			title: '',
			success: null //成功回调
		};
	},
	methods: {
		open({ list = [], success = null, title = '' }) {
			this.title = title;
			this.list = list;
			this.success = success;
			this.$refs.inputDialog.open();
		},
		close() {
			this.$refs.inputDialog.close();
		},
		handleConfirm(item) {
			// 如果重复优惠券选择为取消
			if (item.id === this.currentId) {
				this.$emit('confirm', null);
				// 成功回调
				if (this.success) {
					this.success(null);
				}
				this.currentId = null
				return;
			}
			// 选中优惠券
			this.$emit('confirm', item);
			// 成功回调
			if (this.success) {
				this.success(item);
			}
			this.currentId = item.id
			this.close();
		},
		handleClose(e) {
			this.$emit('change', e.show);
		}
	}
};
</script>

<style lang="scss" scoped>
.modal {
	/* Border */
	border-radius: 4px;
	background-color: white;
	height: 80vh;
}
.modal__header {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
.coupons-item {
	display: flex;
	align-items: center;
	padding-left: 40rpx;
	height: 220rpx;
	border-radius: $uni-border-radius-base;
	border: 1px solid transparent;
	box-sizing: border-box;
	font-size: 14px;
	background-color: white;
	border: 1px solid $uni-border-color-light;
	&.active {
		border: 1px solid #999999;
	}
	.coupons-price {
		font-size: 16px;
		color: $uni-color-error;
	}
	.coupons-tprice {
	}
	.coupons-date {
	}
}
</style>
