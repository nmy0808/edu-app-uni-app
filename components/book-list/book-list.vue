<template>
	<view class="book-list">
		<template v-for="(item, index) in data" >
			<book-item :data='item' :key='index' isRow @click.native='toPageBookDetail(item)'
			:isMy='isMy'
			></book-item>
		</template>
	</view>
</template>

<script>
export default {
	name: 'book-list',
	props: {
		data: {
			type: Array,
			default: () => {
				return [];
			}
		},
		isMy:{
			type: Boolean,
			default:false
		}
	},
	data() {
		return {};
	},
	methods:{
		// 跳转到电子书详情
		toPageBookDetail(item){
			const id = item.id
			uni.navigateTo({
				url: `/pages/book-detail/book-detail?id=${id}`
			})
		}
	}
};
</script>

<style lang="scss"></style>
