<template>
	<view class="course-item-container" :class="[isRow ? 'is-row' : '']">
		<view class="course-item-cover">
			<image class="course-image" :src="data.cover" mode=""></image>
			<view class="course-item-tag">{{ typeMap[data.type] || '专栏' }}</view>
		</view>
		<view class="course-item-desc">
			<view class="course-item-desc-title text-ellipsis">{{ data.title }}</view>
			<view v-if="data.try" class="course-item-desc-subtitle text-ellipsis">
				{{ data.try }}
			</view>
			<view class="course-item-desc-price">
				<text class="course-price">¥ {{ data.price }}</text>
				<text class="course-tprice">¥ {{ data.t_price }}</text>
			</view>
		</view>
	</view>
</template>

<script>
const typeMap = {
	media: '图文',
	audio: '音频',
	video: '视频',
	column: '专栏'
};
export default {
	name: 'course-item',
	props: {
		// 显示样式
		isRow: {
			type: Boolean,
			default: false
		},
		data: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			typeMap
		};
	}
};
</script>

<style lang="scss" scoped>
.course-item-container {
	display: inline-block;
	margin: 0 $uni-spacing-container/2;
	&:not(.is-row):first-of-type {
		margin-left: $uni-spacing-container;
	}
	&:not(.is-row):last-of-type {
		margin-right: $uni-spacing-container;
	}
	.course-item-cover {
		width: 340rpx;
		height: 180rpx;
		position: relative;
		.course-image {
			width: 100%;
			height: 100%;
		}
		.course-item-tag {
			position: absolute;
			right: 4rpx;
			bottom: 4rpx;
			border-radius: 4rpx;
			padding: 6rpx;
			color: white;
			background-color: rgba(0, 0, 0, 0.5);
			font-size: $uni-font-size-sm;
		}
	}
	.course-item-desc {
		.course-item-desc-title {
			width: 340rpx;
			font-size: $uni-color-title;
		}
		.course-item-desc-subtitle {
			color: $uni-color-light;
			font-size: $uni-color-light;
			font-size: $uni-font-size-sm;
			padding: $uni-spacing-col-sm 0;
		}
		.course-item-desc-price {
			.course-price {
				color: red;
				font-size: $uni-color-title;
				margin-right: $uni-spacing-container;
			}
			.course-tprice {
				font-size: $uni-font-size-sm;
				text-decoration: line-through;
				color: $uni-color-light;
			}
		}
	}
}
.is-row {
	display: flex;
	box-sizing: border-box;
	margin: 0 $uni-spacing-container;
	padding: $uni-spacing-container 0;
	border-bottom: 1px solid $uni-bg-color-grey;
	.course-item-cover {
		width: 300rpx;
		height: 170rpx;
		margin-right: $uni-spacing-container;
	}
	.course-item-desc {
		width: 386rpx;
		.course-item-desc-title {
			width: 380rpx;
		}
		.course-item-desc-price {
			margin-top: 30rpx;
		}
	}
}
</style>
