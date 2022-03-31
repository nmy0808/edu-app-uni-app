<!-- 首页-分类导航 -->
<template>
	<view class="icon-category-container">
		<template v-for="(item,index) in data">
			<view class="icon-category-item" :key='index'>
				<image class="icon-category-item-img" :src="item.src" mode=""></image>
				<view class="icon-category-item-text">{{item.name}}</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	name: 'icon-category',
	props: {
		data: {
			type: Array,
			default: () => {
				return [];
			}
		}
	}
};
</script>

<style scoped lang="scss">
.icon-category-container {
	display: flex;
	flex-wrap: wrap;
	.icon-category-item{
		margin-top: $uni-spacing-container;
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		.icon-category-item-img{
			width: 70rpx;
			height: 70rpx;
		}
		.icon-category-item-text{
			margin-top: $uni-spacing-col-sm;
			font-size: $uni-font-size-sm;
		}
	}
}
</style>
