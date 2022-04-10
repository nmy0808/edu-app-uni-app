<!-- 电子书内容 -->
<template>
	<view class="book-page">
		<mp-html :content="content"></mp-html>
		<action-bar
			:menus="menus"
			:currentIndex="currentIndex"
			@select="handleCurrentIndexChange"
			@change="handleCurrentIndexChange"
		></action-bar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			isfree: false,
			book_id: null,
			content: '',
			menus: [],
			currentIndex: 0,
			initData: true
		};
	},
	onLoad(e) {
		this.book_id = e.book_id;
		this.id = e.id;
		this.getData().catch(_ => {
			// 判断如果一进来电子书就不是免费的情况
			uni.switchTab({
				url: '/pages/index/index'
			});
		});
	},
	methods: {
		async getData() {
			const params = {};
			params.id = this.id;
			params.book_id = this.book_id;
			const { data } = await this.$http.getBookReadDetail(params);
			const { title, content, menus, isfree } = data;
			uni.setNavigationBarTitle({
				title
			});
			this.content = content;
			this.menus = menus;
			this.isfree = isfree;
		},
		// 点击菜单
		handleCurrentIndexChange({ target, index }) {
			const tempIndex = this.currentIndex;
			const tempId = this.id;
			this.currentIndex = index;
			this.id = target.id;
			// 处理该电子书未购买的情况
			this.getData().catch(res => {
				this.currentIndex = tempIndex;
				this.id = tempId;
			});
		}
	}
};
</script>

<style lang="scss"></style>
