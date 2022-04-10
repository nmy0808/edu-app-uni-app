<!-- 考试item -->
<template>
	<view class="test-container app-container shadow">
		<view class="test-header">
			<view class="test-title uni-ellipsis">{{ data.title }}</view>
			<view class="test-time">时长: {{ data.expire }}分钟</view>
		</view>
		<view class="test-body">
			<view class="test-score">题目总数: {{ data.question_count }}</view>
			<view class="test-score">总分数:{{ data.total_score }}</view>
			<view class="test-score">及格分: {{ data.pass_score }}</view>
		</view>
		<view class="test-footer">
			<view
				class="test-btn"
				:class="{ disable: data.is_test }"
				@click="toPageDetail"
			>
				{{ data.is_test ? '你考过了' : '参加考试' }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'test-item',
	props: {
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
	methods: {
		toPageDetail() {
			if (this.data.is_test) {
				return this.toast('请勿重复考试');
			}
			uni.showModal({
				title: '是否要参加考试?',
				success: ({ confirm }) => {
					if (confirm) {
						const id = this.data.id;
						uni.navigateTo({
							url: '/pages/test-detail/test-detail?id=' + id
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.test-container {
	margin-bottom: 20rpx;
	.test-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
		border-bottom: 1px solid $uni-img-default-color;
		.test-title {
			font-size: 18px;
			font-weight: bold;
		}
		.test-time {
			color: $uni-color-error;
			font-size: 12px;
		}
	}
	.test-body {
		display: flex;
		padding: 20rpx 0;
		.test-score {
			font-size: 14px;
			margin-right: 50rpx;
		}
	}
	.test-footer {
		padding: 20rpx 0;
		text-align: right;
		.test-btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: white;
			width: 160rpx;
			height: 70rpx;
			border-radius: 6rpx;
			background-color: #5fc777;
			// 禁用
			&.disable {
				background-color: $uni-img-default-color;
				color: #ccc;
			}
		}
	}
}
</style>
