<template>
	<view class="search-page">
		<view class="flex align-center app-container">
			<uni-icons type="back" @click="navBack" size="20"></uni-icons>
			<uni-search-bar
				class="flex-1"
				radius="5"
				placeholder="搜点什么~"
				cancelButton="always"
				@confirm="search"
				@cancel="cancel"
			/>
		</view>
		<!-- history -->
		<template v-if="!showList">
			<view class="history-header">
				<view class="search-title">
					历史记录
				</view>
				<view class="search-clear" @click='handleRemoveHistory'>
					清除全部
				</view>
			</view>
			<view class="history-list app-container">
				<view
					class="history-item text-ellipsis"
					v-for="(item, index) in history"
					:key="index"
					@click="handleHistoryItemClick(item)"
				>
					{{ item }}
				</view>
			</view>
			{{ keyWord }}
		</template>

		<!-- list -->
		<template v-else>
			<tabs id="search_tabs" :data="tabs" v-model="tabIndex"></tabs>
			<swiper
				class="learn-swiper-box"
				:style="{height: swiperHeight}"
				:duration="200"
				:current="tabIndex"
				@change="handleSwiperChange"
			>
				<swiper-item>
					<learn-list
						ref="mescrollItem_0"
						type="course"
						:keyWord="keyWord"
					></learn-list>
				</swiper-item>
				<swiper-item>
					<learn-list
						ref="mescrollItem_1"
						type="column"
						:keyWord="keyWord"
					></learn-list>
				</swiper-item>
			</swiper>
		</template>
	</view>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
export default {
	mixins: [MescrollCompMixin],
	data() {
		return {
			tabs: [{ name: '课程', index: 0 }, { name: '专栏', index: 1 }],
			tabIndex: 0,
			keyWord: '',
			showList: false,
			swiperHeight: 0
		};
	},
	mounted() {},
	watch: {
		showList(val){
			if(!val) return
			const that = this
			setTimeout(() => {
				uni
					.createSelectorQuery()
					.in(this)
					.select('#search_tabs')
					.fields(
						{
							rect: true,
							size: true
						},
						e => {
							// 获取该元素距离上边的距离
							const top = e.top || 0
							const height = e.height || 0
							const winHeight =  uni.getSystemInfoSync().windowHeight
							this.swiperHeight = winHeight - top - height + 'px'
						}
					)
					.exec();
			}, 300);
		}
	},
	computed: {
		...mapState('history', ['history'])
	},
	methods: {
		...mapMutations('history', ['setHistory', 'clearAll']),
		search({ value }) {
			this.keyWord = value.trim();
			this.keyWord !== '' && this.setHistory(this.keyWord);
			this.showList = true;
		},
		cancel() {
			this.keyWord = '';
			this.showList = false;
		},
		/**
		 * 点击历史记录标签
		 */
		handleHistoryItemClick(val) {
			this.keyWord = val;
			this.showList = true;
			this.setHistory(val);
		},
		handleRemoveHistory(){
			uni.showModal({
				title: '清空全部历史记录?',
				success:(e)=>{
					if(e.confirm){
						this.clearAll()
					}
				}
			})
		},
		handlePageScroll(e) {
			let item = this.$refs['mescrollItem_' + this.tabIndex];
			if (item && item.mescroll) item.mescroll.onPageScroll(e);
		},
		handleReachBottom() {
			let item = this.$refs['mescrollItem_' + this.tabIndex];
			if (item && item.mescroll) item.mescroll.onReachBottom();
		},
		handlePullDownRefresh() {
			let item = this.$refs['mescrollItem_' + this.tabIndex];
			if (item && item.mescroll) item.mescroll.onPullDownRefresh();
		},
		handleSwiperChange(e) {
			this.tabIndex = e.target.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.search-page {
	padding-top: var(--status-bar-height);
	.history-header{
		display: flex;
		justify-content: space-between;
		padding: 40rpx 40rpx;
	}
	.search-title{
		text-align: right;
		font-size: 16px;
	}
	.search-clear{
		text-align: right;
		font-size: 12px;
		color: $uni-color-subtitle;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.history-item {
			padding: 8rpx 16rpx;
			background-color: $uni-img-default-color;
			margin: $uni-spacing-container;
			border-radius: 10rpx;
		}
	}
}
</style>
