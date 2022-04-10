<template>
	<view class="judge-container">
		<view class="judge-item"
			:class="{ active: value === index }"
		 v-for="(item, index) in options" :key="index"
			@click="handleItem(index)"
			>
			<view class="judge-index">{{ index | format }}</view>
			<view class="judge-answer">{{ item }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'c-judge',
	filters:{
		format(v){
			return ['A','B','C','D','E','F','G','H'][v]
		}
	},
	props: {
		options: {
			type: Array,
			default: () => []
		},
		// 答案
		value: null
	},
	data() {
		return {
		};
	},
	methods:{
		handleItem(index){
			this.$emit('change', index)
		}
	}
};
</script>

<style lang="scss" scoped>
.judge-container {
	.judge-item {
		display: flex;
		border: 1px solid $uni-border-color-light;
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		&.active {
			border: 1px solid $uni-color-success;
		}
		.judge-index {
			width: 60rpx;
			text-align: center;
		}
		.judge-answer {
		}
	}
}
</style>
