<!-- 首页-标题组件 -->
<template>
	<view class="indexgrouplist-container">
		<index-title title="最新列表" move="查看更多" isMove @click.native='toPageList'></index-title>
		<course-list :isRow="true" :data="data"></course-list>
	</view>
</template>

<script>
import IndexTitle from '../index-title/index.vue';
export default {
	name: 'index-group-list',
	components: { IndexTitle },
	props: {
		title: {
			type: String,
			default: '标题'
		},
		move: {
			type: String,
			default: '更多'
		},
		data: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	methods: {
		handleClick(e) {
			this.$emit('move', e);
		},
		toPageList(){
			uni.navigateTo({
				url: '/pages/list/list?type=course'
			})
		}
	}
};
</script>

<style scoped lang="scss">
.indexgrouplist-container {
	padding: $uni-spacing-container 0;
	.indextitle-container {
		padding: 0 $uni-spacing-container;
	}
	.course-list {
		margin-top: $uni-spacing-container;
		width: 750rpx;
	}
}
</style>
