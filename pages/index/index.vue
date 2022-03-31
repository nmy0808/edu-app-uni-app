<template>
	<view class="home-page animate__animated animate__fadeIn">
		<template v-for="(item, index) in detailData">
			<!-- search -->
			<view class="home-search" v-if="item.type === 'search'">
				<uni-icons class="mr-1" type="search" size="15"></uni-icons>
				{{ item.placeholder }}
			</view>
			<!-- swiper -->
			<index-swiper v-else-if="item.type === 'swiper'" :data="item.data" />
			<!-- icon-category -->
			<icon-category
				v-else-if="item.type === 'icons'"
				:data="item.data"
			></icon-category>
			<!-- coupons -->
			<index-coupons
				v-else-if="item.type === 'coupon'"
				:data="item.data"
			></index-coupons>
			<!-- 拼团 or 秒杀 -->
			<index-group-list
				v-else-if="item.listType === 'group' || item.listType ==='flashsale'"
				:type='item.listType'
			></index-group-list>
			<!-- newList -->
			<index-new-list
				v-else-if="item.type === 'list'"
				:data="item.data"
			></index-new-list>
			<!-- ad -->
			<image
				v-else-if="item.type === 'imageAd'"
				class="index-ad"
				:src="item.data"
				mode="widthFix"
			></image>
		</template>
	</view>
</template>

<script>
import IndexSwiper from './components/index-swiper/index.vue';
import IconCategory from './components/icon-category/index.vue';
import IndexCoupons from './components/index-coupons/index.vue';
import IndexGroupList from './components/index-group-list/index.vue';
import IndexNewList from './components/index-new-list/index.vue';
export default {
	components: {
		IndexSwiper,
		IconCategory,
		IndexCoupons,
		IndexGroupList,
		IndexNewList
	},
	data() {
		return {
			search: '请输入搜索关键词',
			detailData: {}
		};
	},
	onLoad() {
		this.getData();
	},
	onReady() {},
	methods: {
		async getData() {
			const { data } = await this.$http.getHomeDetailApi();
			this.detailData = data;
			console.log(data);
		}
	}
};
</script>

<style scoped lang="scss">
.home-page {
	.home-search {
		margin: $uni-spacing-container;
		background-color: $uni-bg-color-grey;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		border-radius: $uni-border-radius-sm;
		font-size: $uni-font-size-base;
		color: $uni-color-subtitle;
	}
	.index-ad {
		width: 100%;
		padding: 0 $uni-spacing-container;
		box-sizing: border-box;
	}
}
</style>
