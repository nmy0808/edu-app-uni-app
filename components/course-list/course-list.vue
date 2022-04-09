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
		},
		module: {
			type: String,
			default: ''
		}
	},
	methods: {
		// 跳转至对应类型的详情页
		toPageDetail(item) {
			// 详情页只有两种类型 'column'/'course'
			if (item.type === 'column' || !item.type) {
				uni.navigateTo({
					url: this.module
						? `/pages/column-detail/column-detail?id=${item.id}&module=${
								this.module
						  }`
						: `/pages/column-detail/column-detail?id=${item.id}`
				});
			} else {
				uni.navigateTo({
					url: this.module ? `/pages/course-detail/course-detail?id=${
						item.id
					}&module=${this.module}`:
					`/pages/course-detail/course-detail?id=${item.id}`
				});
			}
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
