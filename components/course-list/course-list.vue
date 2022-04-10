<!-- 首页-课程列表组件-->
<template>
	<view class="course-list-container" :class="[isRow ? 'is-row' : '']">
		<!-- 独占一行样式 -->
		<template v-if="isRow">
			<course-item
				v-for="(item, index) in data"
				:key="index"
				:isRow="true"
				:data="item"
				@click.native="toPageDetail(item)"
			></course-item>
		</template>
		<!-- 并列样式 -->
		<scroll-view v-else scroll-x class="course-list noScorll">
			<template v-for="(item, index) in data">
				<course-item
					:key="index"
					:data="item"
					@click.native="toPageDetail(item)"
				></course-item>
			</template>
		</scroll-view>
	</view>
</template>

<script>
const constant = {
	media: '图文',
	audio: '音频',
	video: '视频',
	column: '专栏',
	live: '直播'
};
export default {
	name: 'course-list',
	components: {},
	props: {
		isRow: {
			type: Boolean,
			default: false
		},
		data: {
			type: Array,
			default: () => {
				return [];
			}
		},
		module: {
			type: String,
			default: ''
		}
	},
	methods: {
		// 跳转至对应类型的详情页
		toPageDetail(item) {
			let type = ''
			if(item.type === 'column' || !item.type){
				 type ='column'
			}
			else{
				 type ='course'
			}
			let url = `/pages/${type}-detail/${type}-detail?id=${item.id}`
			
			// 当前是否是活动模块类型
			if(this.module === 'group'){
				//如果是拼团类型, 传入参数 model和拼团id
				url += `&module=${this.module}&group_id=${item.group_id}`
			}
			// 当前是否是活动秒杀类型
			if(this.module === 'flashsale'){
				//如果是拼团类型, 传入参数 model和秒杀id
				url += `&module=${this.module}&flashsale_id=${item.flashsale_id}`
			}
			// 当前是否是活动秒杀类型
			if(this.module === 'live'){
				 url = `/pages/${this.module}-detail/${this.module}-detail?id=${item.id}`
				url += `&module=${this.module}`
			}
			// 跳转
			// 详情页只有两种类型 'column'/'course'
			uni.navigateTo({ url });
		}
	}
};
</script>

<style scoped lang="scss">
.course-list-container {
	padding: $uni-spacing-container 0;
	.course-list {
		margin-top: $uni-spacing-container;
		width: 750rpx;
		white-space: nowrap;
	}
	.is-row {
		white-space: normal;
	}
}
</style>
