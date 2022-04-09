<!-- 首页-优惠券 -->
<template>
	<view class="indexcoupons-container">
		<scroll-view :scroll-x="true" class="scroll-view noScorll" v-if="list.length">
			<template v-for="(item, index) in list">
				<coupons-item :key="index" :data='item'></coupons-item>
			</template>
		</scroll-view>
		<view class="coupons-skeleton flex animate__animated animate__fadeIn" v-else>
			<view class="skeleton-item coupons-skeleton-item" v-for="(item,index) in 2" :key='index'>
			</view>
		</view>
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
	.coupons-skeleton{
		width: 100%;
		height: 120rpx;
	}
	.coupons-skeleton-item{
		width: 340rpx;
		height: 120rpx;
		margin: 0 20rpx;
	}
	.skeleton-item{
		background-color: $uni-color-paragraph;
	}
}
</style>
