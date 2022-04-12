<!-- 首页-标题组件 -->
<template>
	<view class="indextitle-container">
		<view class="index-title-left">{{ title }}</view>
		<view v-if="isMove" class="index-title-right" @click="handleClick">
			{{move}}
		</view>
	</view>
</template>

<script>
export default {
	name: 'index-title',
	props: {
		title: {
			type: String,
			default: '标题'
		},
		move: {
			type: String,
			default: '更多'
		},
		isMove:{
			type: Boolean,
			default: true
		}
	},
	methods: {
		handleClick(e) {
			this.$emit('move', e);
		}
	}
};
</script>

<style scoped lang="scss">
.indextitle-container {
	display: flex;
	justify-content: space-between;
	.index-title-left{
		font-size: $uni-font-size-lg;
		font-weight: bold;
		color: $uni-color-title;
	}
	.index-title-right{
		font-size: $uni-font-size-sm;
		color: $uni-color-subtitle;
	}
}
</style>
