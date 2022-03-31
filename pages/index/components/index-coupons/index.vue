<!-- 首页-优惠券 -->
<template>
	<view class="indexcoupons-container">
		<scroll-view :scroll-x="true" class="scroll-view noScorll">
			<template v-for="(item, index) in list">
				<coupons-item :key="index" :data='item'></coupons-item>
			</template>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'index-coupons',
	data() {
		return {
			list: []
		};
	},
	created() {
		this.getCouponList()
	},
	methods: {
		async getCouponList() {
			const { data } = await this.$http.getCouponListApi();
			console.log(222);
			console.log(data);
			this.list = data
		}
	}
};
</script>

<style scoped lang="scss">
.indexcoupons-container {
	.scroll-view {
		width: 750rpx;
		white-space: nowrap;
		margin-top: $uni-spacing-container;
	}
}
</style>
