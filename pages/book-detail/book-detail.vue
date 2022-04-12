<template>
	<view class="course-detail-page">
		<image :src="detailData.cover" mode="" class="course-detail-cover"></image>
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
					<view class="detail-title">电子书简介</view>
					<!-- 不需要引入，可直接使用 -->
					<mp-html :content="detailData.try" :key="id" />
				</view>
			</view>
		</template>
		<template v-else>
			<course-content
				:bookId="id"
				:data="detailData.book_details"
				isBook
				:isbuy="detailData.isbuy"
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
		data() {
			return {
				id: null,
				detailData: {},
				tabIndex: 0,
				tabs: [{ name: '简介', index: 0 }, { name: '目录', index: 1 }]
			};
		},
		computed:{
			isLoaded(){
				return JSON.stringify(this.detailData) !== '{}'
			},
			isbuy(){
				if( !this.isLoaded ) return false
				if(this.detailData.isbuy || parseFloat(this.detailData.price) === 0 ){
					return true
				}else{
					return false
				}
			}
		},
		onLoad(e){
			this.id = e.id
			this.getData()
		},
		methods:{
			async getData(){
				const params = {}
				params.id = this.id
				const {data} = await this.$http.getBookDetail(params)
				this.detailData = data
				uni.setNavigationBarTitle({
					title: data.title
				})
			},
			// 立即订购
			async onSubmit(){
				const flag = await this.$tool.isLogin({isLogin:true})
				if(flag){
					// 跳转到订单详情页
					const type = 'book'
					const id = this.detailData.id
					uni.navigateTo({
						url: `/pages/order-detail/order-detail?type=${type}&id=${id}`
					})
				}
			},
			// 
			handleCollect(){
				console.log(22);
			}
		}
	}
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
