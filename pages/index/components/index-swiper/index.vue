<!-- 首页-轮播 -->
<template>
	<view class="indexswiper-container">
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="300"
			:circular="true"
		>
			<template v-for="(item, index) in data">
				<swiper-item :key="index">
					<view class="swiper-item">
						<image
							:src="item.src"
							mode="aspectFill"
							class="rounded shadow"
						></image>
					</view>
				</swiper-item>
			</template>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'index-swiper',
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
.indexswiper-container {
	height: 300rpx;
	.swiper-item {
		width: 750rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		image {
			width: 720rpx;
			height: 300rpx;
		}
	}
}
</style>
