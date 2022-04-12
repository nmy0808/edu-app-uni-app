<template>
	<view class="column-content-container app-container">
		<view class="column-content-header">共 {{ data.length }} 节</view>
		<view
			class="column-content-item"
			v-for="(item, index) in data"
			:key="index"
			@click="handleItemClick(item)"
		>
			<view class="column-content-index">{{ (index + 1) | formatIndex }}</view>
			<view class="column-content-desc">
				<view class="column-content-title uni-ellipsis">{{ item.title }}</view>
				<view class="column-tag-box">
					<view class="column-tag-item">{{ typeMap[item.type] }}</view>
					<view v-if="isFree(item.price)" class="column-tag-item free">
						试看
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import typeMap from '@/typeMap';
export default {
	props: {
		columnId:{
			type: String,
			default: null
		},
		data: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	filters: {
		formatIndex(v) {
			return (v + '').padStart(3, '0');
		}
	},
	data() {
		return {
			typeMap
		};
	},
	methods: {
		isFree(v) {
			return v === '0.00' || v === 0 || v === '0';
		},
		async handleItemClick(item) {
			let url = '/pages/course-detail/course-detail';
			url += `?id=${item.id}`;
			console.log(item);
			if(parseFloat(item.price) !== 0 && !this.isbuy){
				return this.toast('请先购买该专栏')
			}
			// 跳转
			this.navTo(url);
			// 更新学习进度
			const params = {}
			params.id = this.columnId
			params.type = 'column'
			params.detail_id = item.id
			this.$http.updateLearnHistoryApi(params)
		}
	}
};
</script>

<style scoped lang="scss">
.column-content-container {
	.column-content-header {
		background-color: #f8f8f8;
		padding: 20rpx 0;
		color: $uni-color-subtitle;
	}
	.column-content-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1px solid $uni-border-color-light;
		.column-content-index {
			width: 100rpx;
			text-align: center;
			font-size: 12px;
		}
		.column-content-desc {
			flex: 1;
		}
		.column-content-title {
			font-size: 14px;
		}
		.column-tag-box {
			margin-top: 6rpx;
			.column-tag-item {
				display: inline-flex;
				padding: 2rpx 4rpx;
				border: 1px solid $uni-color-error;
				color: $uni-color-error;
				font-size: $uni-font-size-sm;
				border-radius: $uni-border-radius-sm;
				margin-right: 20rpx;
				&.free {
					border: 1px solid $uni-color-primary;
					color: $uni-color-primary;
				}
			}
		}
	}
}
</style>
