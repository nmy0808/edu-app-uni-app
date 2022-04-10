<template>
	<view class="course-detail-page">
		<image :src="detailData.cover" mode="" class="course-detail-cover"></image>
		<!-- 如果是活动模块, 显示倒计时 -->
		<view class="module-box app-container" v-if="module && !isbuy">
			 <!-- 如果是拼团 -->
			 <template v-if="module ==='group' && isLoaded">
				 <countdown
					:startTime="detailData.group.start_time"
					:endTime="detailData.group.end_time"
					:pnum='detailData.group.p_num'
					:price='detailData.group.price'
					:oprice='detailData.price'
					:module="module"
				 ></countdown>
			 </template>
			 <!-- 如果是秒杀 -->
			 <template v-if="module ==='flashsale' && isLoaded">
			 				 <countdown
			 					:startTime="detailData.flashsale.start_time"
			 					:endTime="detailData.flashsale.end_time"
								:usedNum='detailData.flashsale.used_num'
			 					:snum='detailData.flashsale.s_num'
			 					:price='detailData.flashsale.price'
			 					:oprice='detailData.price'
			 					:module="module"
			 				 ></countdown>
			 </template>
		</view>
		<!--  -->
		<tabs v-model="tabIndex" :data="tabs"></tabs>
		<template v-if="tabIndex === 0">
			<view id="swiper_content_1">
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
					<view class="detail-title">专栏简介</view>
					<!-- 不需要引入，可直接使用 -->
					<mp-html :content="detailData.content" :key="id" />
				</view>
			</view>
		</template>
		<template v-else>
			<course-content
				:columnId="id"
				:data="detailData.column_courses"
			></course-content>
		</template>
		<view class="course-detail-buy">
			<button v-if="!isbuy" class="course-buy-btn" @click="onSubmit">
				立即订购 ¥{{ detailData.price }}
			</button>
			<!-- <button v-else class="course-buy-btn" @click="onLearn">
				立即学习
			</button> -->
		</view>
	</view>
</template>

<script>
export default {
	components: {  },
	data() {
		return {
			id: null,
			detailData: {},
			type: null,
			module: null,
			group_id:'',
			flashsale_id:'',
			tabIndex: 0,
			tabs: [{ name: '简介', index: 0 }, { name: '目录', index: 1 }]
		};
	},
	onLoad(e) {
		this.id = e.id;
		this.column_id = e.column_id;
		this.module = e.module
		this.group_id = e.group_id
		this.flashsale_id = e.flashsale_id
		this.getData();
	},
	mounted() {
		uni
			.createSelectorQuery()
			.in(this)
			.select('#swiper_content_1')
			.fields(
				{
					size: true
				},
				({ height }) => {
					console.log(height);
					// 获取该元素距离上边的距离
				}
			)
			.exec();
	},
	computed: {
		/**
		 * 判断当前是否加载完数据
		 */
		isLoaded() {
			return JSON.stringify(this.detailData) !== '{}';
		},
		// 当前课程是否已经购买或者免费
		isbuy(){
			if(JSON.stringify(this.detailData) === '{}') return
			if(this.detailData.isbuy || parseFloat(this.detailData.price) === 0 ){
				return true
			}else{
				return false
			}
		},
	},
	methods: {
		async getData() {
			const params = {};
			params.id = this.id;
			params.group_id = this.group_id;
			params.flashsale_id = this.flashsale_id;
			params.type = 'column'
			const fetchApiMap = {
				activity: this.$http.getGroupDetailApi,
				normal: this.$http.getColumnDetailApi
			};
			const fetchApi = this.module
				? fetchApiMap['activity']
				: fetchApiMap['normal'];
			const { data } = await fetchApi(params);
			uni.setNavigationBarTitle({
				title: data.title
			});
			this.detailData = data;
			this.type = data.type;
			console.log(data);
		},
		/**
		 * 收藏
		 */
		async handleCollect() {
			const value = !this.detailData.isfava;
			const params = {};
			params.goods_id = this.id;
			// `course`、`column`、`book`
			params.type = 'column';
			params.value = this.value;
			await this.$http.setCollectApi(params);
			this.toast(value ? '已收藏' : '取消收藏');
			this.detailData.isfava = value;
		},
		onSwiperChange({ detail }) {
			this.tabIndex = detail.current;
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
		/**
		 * 立即学习
		 */
		onLearn(){
			console.log(22);
		},
		// 立即订购
		async onSubmit(){
			const flag = await this.$tool.isLogin({isLogin:true})
			if(flag){
				// 跳转到订单详情页
				const type = this.module ? this.module : 'column'
				const id = this.detailData.id
				uni.navigateTo({
					url: `/pages/order-detail/order-detail?type=${type}&id=${id}`
				})
			}
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
	.swiper-box {
		background-color: red;
		// min-height: calc(100vh - 700rpx);
	}
}
</style>
