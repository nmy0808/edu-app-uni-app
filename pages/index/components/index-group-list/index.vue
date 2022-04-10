<!-- 首页-标题组件 -->
<template>
	<view class="indexgrouplist-container">
		<index-title title="拼团" move="查看更多" isMove></index-title>
		<course-list  v-if="list.length" :data="list" module='group'></course-list>
		<!-- 骨架屏 -->
		<view class="group-skeleton flex animate__animated animate__fadeIn" v-else>
			<view class="skeleton-item group-skeleton-item" v-for="(item,index) in 2" :key='index'>
			</view>
		</view>
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
		type: ''
	},
	data() {
		return {
			page: 1,
			list: [],
			fetchApiMap: {
				group: this.$http.getGroupListApi,
				flashsale: this.$http.getFlashsaleListApi
			}
		};
	},
	created() {
		this.getList();
	},
	methods: {
		async getList() {
			const fetchApi = this.fetchApiMap[this.type];
			// const params = {};
			// params.page = this.page;
			const { data } = await fetchApi(this.page);
			this.list = data.rows
			console.log( data.rows, "///");
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
		white-space: nowrap;
	}
	.group-skeleton{
		width: 100%;
		height: 358rpx;
	}
	.group-skeleton-item{
		width: 340rpx;
		height: 268rpx;
		margin: 0 20rpx;
	}
	.skeleton-item{
		background-color: $uni-color-paragraph;
	}
}
</style>
