<template>
	<view class="my-page">
		<view class="my-header">
			<view class="">
				我的
			</view>
		</view>
		<avatar></avatar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				h: ''
			};
		},
		 created() {
			 console.log(this.$getRoute());
		 }
	}
</script>

<style lang="scss" scoped>
.my-page{
	.my-header{
		background-color: $uni-color-primary;
		height: 360rpx;
		text-align: center;
		border-radius: 0 0 80rpx 80rpx;
	}
}
</style>
