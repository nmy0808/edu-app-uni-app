<!-- 首页-课程列表组件-->
<template>
	<view class="course-list-container" :class="[isRow ? 'is-row' : '']">
		<!-- 独占一行样式 -->
		<template v-if="isRow">
			<course-item
				v-for="(item, index) in data"
				:key="index"
				:isRow="true"
				:data='item'
			></course-item>
		</template>
		<!-- 并列样式 -->
		<scroll-view v-else scroll-x class="course-list noScorll">
			<template v-for="(item, index) in data">
				<course-item :key="index" :data='item'></course-item>
			</template>
		</scroll-view>
	</view>
</template>

<script>
const constant = {
	media: '图文',
	audio: '音频',
	video: '视频',
	column: '专栏'
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
		}
	},
	methods: {}
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
