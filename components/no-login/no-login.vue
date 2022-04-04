<template>
	<view class="nologin-container">
		<image src="/static/default/noLogin.png"></image>
		<slot>
			<view class="">
				请先登录~
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		name:"no-login",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.nologin-container{
	text-align: center;
	color: $uni-color-subtitle;
	margin-top: 140rpx;
}
</style>
