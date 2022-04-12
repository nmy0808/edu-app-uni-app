<template>
	<view
		class="home-page animate__animated animate__fadeIn"
		:style="{ 'padding-top': statusBar }"
	>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			:down="downOption"
			:up="upOption"
		>
			<template v-for="(item, index) in detailData">
				<view :key="index">
					<!-- search -->
					<view class="home-search" v-if="item.type === 'search'" @click="toPageSearch">
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
						v-else-if="
							item.listType === 'group' || item.listType === 'flashsale'
						"
						:type="item.listType"
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
				</view>
			</template>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import IndexSwiper from './components/index-swiper/index.vue';
import IconCategory from './components/icon-category/index.vue';
import IndexCoupons from './components/index-coupons/index.vue';
import IndexGroupList from './components/index-group-list/index.vue';
import IndexNewList from './components/index-new-list/index.vue';
import systemInfo from '@/common/js/systemInfo.js';
export default {
	mixins: [MescrollMixin],
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
			detailData: {},
			downOption: {},
			upOption: {
				use: false
			},
			statusBar: 0
		};
	},
	onLoad() {},
	onReady() {
		systemInfo().then(res => {
			this.statusBar = res.statusBar + 'px';
		});
	},
	methods: {
		async getData() {
			const { data } = await this.$http.getHomeDetailApi();
			this.detailData = {};
			setTimeout(() => {
				this.detailData = data;
			}, 30);
		},
		async downCallback() {
			await this.getData();
			this.mescroll.endSuccess();
		},
		toPageSearch(){
			this.navTo('/pages/search/search')
		}
	}
};
</script>

<style scoped lang="scss">
.home-page {
	.home-search {
		margin: 0 $uni-spacing-container;
		margin-bottom: $uni-spacing-container;
		background-color: $uni-bg-color-grey;
		width: 100%;
		height: 44px;
		line-height: 44px;
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
