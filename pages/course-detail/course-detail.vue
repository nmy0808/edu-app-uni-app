<template>
	<view class="course-detail-page">
		<video
			v-if="type === 'video'"
			:src="detailData.content"
			class="w-100"
			controls
			:poster="detailData.cover"
			@timeupdate="handleVideoProgress"
		></video>
		<template v-if="type === 'audio'">
			<image
				:src="detailData.cover"
				mode=""
				class="course-detail-cover"
			></image>
			<audio-play
				:url="detailData.content"
				:isfava="detailData.isfava"
				@collect="handleCollect"
				@progress='handleVideoProgress'
			></audio-play>
		</template>
		<view class="course-detail-header app-container">
			<view class="course-detail-title text-ellipsis">
				{{ detailData.title }}
			</view>
			<view class="course-detail-subtitle ">
				<view class="">{{ detailData.sub_count }} 人学过</view>
				<uni-icons
					v-if="type !== 'audio'"
					class="icon-star"
					:type="detailData.isfava ? 'star-filled' : 'star'"
					size="26"
					color="#f4d200"
					@click="handleCollect"
				></uni-icons>
			</view>
		</view>
		<divider></divider>
		<view class="course-detail-content app-container">
			<view class="detail-title">课程简介</view>
			<!-- 不需要引入，可直接使用 -->
			<mp-html :content="detailData.try" :key="id" />
		</view>
		<view class="course-detail-buy">
			<button class="course-buy-btn">立即订购 ¥{{ detailData.price }}</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			detailData: {},
			type: null,
			fetchApi: {
				course: this.$http.getCourseDetailApi,
				column: this.$http.getColumnDetailApi
			},
			progressParams: {}
		};
	},
	onPageScroll({ scrollTop }) {
		if(this.type !== 'media') return
		uni
			.createSelectorQuery()
			.in(this)
			.select('.course-detail-page')
			.fields(
				{
					size: true
				},
				({ height }) => {
					// 更新学习进度
					const params = {};
					params.id = this.id;
					params.type = 'course';
					params.progress = (scrollTop / height) * 100;
					this.progressParams = params;
				}
			)
			.exec();
		clearTimeout(this.timer);
		this.timer = null;
	},
	onLoad(e) {
		this.id = e.id;
		this.getData();
	},
	destroyed() {
		const params = this.progressParams;
		if (!params.progress || params.type === '') return;
		this.$http.updateLearnHistoryApi(params);
	},
	methods: {
		async getData() {
			const params = {};
			params.id = this.id;
			const { data } = await this.$http.getCourseDetailApi(params);
			uni.setNavigationBarTitle({
				title: data.title
			});
			this.detailData = data;
			this.type = data.type;
			console.log(this.type);
		},
		/**
		 * 收藏
		 */
		async handleCollect() {
			const value = !this.detailData.isfava;
			const params = {};
			params.goods_id = this.id;
			// `course`、`column`、`book`
			params.type = this.type !== 'column' ? 'course' : 'column';
			params.value = this.value;
			await this.$http.setCollectApi(params);
			this.toast(value ? '已收藏' : '取消收藏');
			this.detailData.isfava = value;
		},
		handleVideoProgress({ detail }) {
			const progress = (detail.currentTime / detail.duration) * 100;
			// 更新学习进度
			const params = {};
			params.id = this.id;
			params.type = 'course';
			params.progress = progress;
			this.progressParams = params;
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
};
</script>

<style lang="scss" scoped>
.course-detail-page {
	padding-bottom: 50px;
	.course-detail-cover {
		width: 710rpx;
		height: 400rpx;
		border-radius: 30rpx;
		transform: translateX(20rpx);
	}
	.course-detail-header {
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		.course-detail-title {
			font-size: $uni-font-size-lg + 4px;
		}
		.course-detail-subtitle {
			font-size: $uni-font-size-base;
			color: $uni-color-subtitle;
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			align-items: center;
		}
	}
	.course-detail-content {
		margin-top: 30rpx;
		.detail-title {
			padding: 20rpx 0;
			border-bottom: 1px solid $uni-img-default-color;
			margin-bottom: 30rpx;
		}
	}
	.course-detail-buy {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.course-buy-btn {
		background-color: $uni-color-primary;
		color: white;
	}
}
</style>
