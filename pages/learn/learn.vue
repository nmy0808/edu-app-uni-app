<template>
	<view class="learn-container">
		<no-login v-if="!$store.state.user.token">
				<view class="login-wrap">
					登录后才可以查看我的学习哦~
					<view class="login-btn" @click="toPageLogin">立即登录</view>
				</view>
		</no-login>
		<template v-else>
			<view class="learn-menus shadow">
				<view class="learn-menus-item " v-for="(item,index) in menus" :key='index'
					@click='item.handle'
				>
					<uni-icons class="learn-menus-item-icon" :type="item.icon" size="26" color="#f5cb64"></uni-icons>
					<view class="learn-menus-item-label">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="learn-main">
				<tabs :data="tabs" v-model="tabIndex"></tabs>
				<swiper class="learn-swiper-box" :duration="200" :current="tabIndex" @change="handleSwiperChange">
					<swiper-item >
							<learn-list ref='mescrollItem_0' type="course"></learn-list>
					</swiper-item>
					<swiper-item>
						<learn-list ref="mescrollItem_1" type="column"></learn-list>
					</swiper-item>
				</swiper>
			</view>
		</template>
		
	</view>
</template>

<script>
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
	export default {
		mixins:[MescrollCompMixin],
		data() {
			return {
				menus: [
					{ name: '帖子', type:'', icon:'compose', handle:()=>{
						uni.navigateTo({
							url :'/pages/my-post/my-post'
						})
					} },
					{ name: '考试', type:'', icon:'chat', handle:()=>{
						uni.navigateTo({
							url :'/pages/test-list/test-list?type='+'my'
						})
					} },
					{ name: '电子书', type:'', icon:'wallet', handle:()=>{} },
				],
				tabs: [{ name: '课程', index: 0 }, { name: '专栏', index: 1 }],
				tabIndex: 0
			};
		},
		methods:{
			toPageLogin(){
				this.navTo('/pages/login/login')
			},
			handleSwiperChange(e){
				this.tabIndex = e.target.current
			},
			handlePageScroll(e){
				console.log(1);
				let item = this.$refs["mescrollItem_" + this.tabIndex];
				if(item && item.mescroll) item.mescroll.onPageScroll(e);
			},
			handleReachBottom(){
				console.log(2);
				let item = this.$refs["mescrollItem_" + this.tabIndex];
				if(item && item.mescroll) item.mescroll.onReachBottom();
			},
			handlePullDownRefresh(){
				console.log(3);
				let item = this.$refs["mescrollItem_" + this.tabIndex];
				if(item && item.mescroll) item.mescroll.onPullDownRefresh();
			}
		}
	}
</script>
<style>
	page{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.learn-container{
		display: flex;
		flex-direction: column;
		height: 100%;
		.login-wrap{
				margin: 50rpx;
				.login-btn{
					width: 240rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;
					margin-top: 50rpx;
					border-radius: $uni-border-radius-lg;
					color: white;
					background: $uni-color-primary;
				}
			}
		.learn-menus{
			display: flex;
			justify-content: space-around;
			border-radius: $uni-border-radius-lg;
			padding: 30rpx 0;
			margin: 0 $uni-spacing-container;
			.learn-menus-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				.learn-menus-item-icon{
				}
				.learn-menus-item-label{
					color: $uni-color-title;
					font-size: $uni-font-size-sm;
					margin-top: 10rpx;
				}
			}
		}
		.learn-main{
			flex: 1;
			display: flex;
			flex-direction: column;
			.learn-swiper-box{
				flex: 1;
				// height: 100%;
			}
		}
		
	}

</style>
