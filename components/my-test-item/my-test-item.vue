<!-- 考试item -->
<template>
	<view class="test-container app-container shadow">
		<view class="test-header">
			<view class="test-title uni-ellipsis">{{ data.testpaper.title }}</view>
			<view class="test-time">{{ data.answer_status ?'考试完成':'未完成' }}</view>
		</view>
		<view class="test-body">
			<view class="test-score">总分数:{{ data.testpaper.total_score }}</view>
			<view class="test-score">及格分: {{ data.testpaper.pass_score }}</view>
			<view class="test-score text-danger"
			v-if="!data.read_status"
			>最终得分: 正在阅卷</view>
			<view
			 v-else
			 class="test-score text-primary">最终得分: {{data.score}} </view>
		</view>
		<view class="test-footer">
			{{data.created_time}}
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-test-item',
	props: {
		data: {
			type: Object,
			default: () => {
				return {};
			}
		},
		index: {
			type:Number,
			default:-1
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
						uni.redirectTo({
							url: '/pages/test-detail/test-detail?id=' + id
						});
						this.$emit('change', this.index)
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
			color: $uni-color-success;
			font-size: 12px;
		}
	}
	.test-body {
		display: flex;
		padding: 20rpx 0;
		.test-score {
			font-size: 14px;
			margin-right: 40rpx;
		}
	}
	.test-footer {
		padding: 20rpx 0;
		text-align: left;
		font-size: 12px;
		color: $uni-color-subtitle;
	}
}
</style>
