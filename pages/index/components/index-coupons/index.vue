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
import typeMap from '@/typeMap/index.js'
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
	mounted() {
		uni.$on('login',this.getCouponList)
	},
	destroyed() {
		uni.$off('login',this.getCouponList)
	},
	methods: {
		async getCouponList() {
			const { data } = await this.$http.getCouponListApi();
			data.forEach(it=>{
				it.typeKey = typeMap[it.type]
			})
			this.list = data
			console.log(data);
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
