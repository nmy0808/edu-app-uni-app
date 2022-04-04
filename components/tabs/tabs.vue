<template>
	<view class="tabs-container">
		<template v-for="(item, index) in data">
			<view class="tabs-item" :class="{ active: index === value }" :key="index"
				@click="handleClickItem(item, index)"
			>
				{{ item.name }}
			</view>
		</template>
	</view>
</template>

<script>
export default {
	name: 'tabs',
	props: {
		value: {
			type: Number,
			default: 0
		},
		data: {
			type: Array,
			default: () => {
				return [{ name: '课程', index: 0 }, { name: '专栏', index: 1 }];
			}
		}
	},
	data() {
		return {};
	},
	methods:{
		handleClickItem(item, index){
			this.$emit('input', index)
			this.$emit('change', item)
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs-container {
	display: flex;
	.tabs-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: $uni-font-size-base;
		position: relative;
		padding:  30rpx 0;
		transition: all 0.3s;
		&::after{
			content:  '';
			position: absolute;
			bottom: 6rpx;
			left: 50%;
			height: 6rpx;
			width: 0;
			background-color: $uni-color-primary;
			transform: translateX(-50%);
			transition: all 0.3s;
		}
		&.active{
			color: $uni-color-primary;
		}
		&.active::after{
			width: 10%;
		}
	}
}
</style>
