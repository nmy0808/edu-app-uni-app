<template>
	<view class="my-page">
		<uni-nav-bar
			statusBar
			right-icon="more-filled"
			title="我的"
			backgroundColor="#5ccb84"
			:border="false"
			color="white"
		></uni-nav-bar>
		<!-- header -->
		<template v-if="!userInfo">
			<view
				class="my-user app-container"
				@click.stop="navTo('/pages/login/login')"
			>
				<avatar></avatar>
				<!-- 判断登录: 显示用户名还是登录按钮 -->
				<view class="user-desc">
					<view class="user-top">立即登录</view>
					<view class="user-bottom">登录解锁更多功能</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="my-user app-container" @click.stop="toPageUserInfo">
				<avatar :img='userInfo.avatar'></avatar>
				<!-- 判断登录: 显示用户名还是登录按钮 -->
				<view class="user-desc username">
					<view class="user-top">
						{{ userInfo.nickname || userInfo.username }}
					</view>
					<view class="user-bottom">{{ userInfo.desc || '暂无描述' }}</view>
				</view>
			</view>
		</template>
		<!-- 订单菜单 -->
		<!-- 菜单列表 -->
	</view>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	created() {},
	computed: {
		...mapState('user', ['userInfo'])
	},
	methods: {
		toPageLogin() {
			this;
		},
		toPageUserInfo() {
			this.navTo('/pages/userinfo/userinfo')
		}
	}
};
</script>

<style lang="scss" scoped>
.my-page {
	.my-header {
		background-color: $uni-color-primary;
		height: 360rpx;
		text-align: center;
	}
	.my-user {
		display: flex;
		padding-top: 50rpx;
		box-sizing: border-box;
		background-color: $uni-color-primary;
		height: 360rpx;
		border-radius: 0 0 80rpx 80rpx;
		.user-desc {
			margin-left: $uni-spacing-container;
			color: white;
			.user-top {
				margin-top: 16rpx;
				font-size: $uni-font-size-lg;
				&.username {
					font-size: $uni-font-size-base;
				}
			}
			.user-bottom {
				margin-top: 10rpx;
				font-size: $uni-font-size-sm;
			}
		}
	}
}
</style>
