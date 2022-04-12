<template>
	<view class="action-bar-container">
		<view class="action-bar-inner">
			<uni-icons
				class="action-icon"
				size="30"
				:color="isPre ? '': '#ccc'"
				type="arrow-left"
				@click="handleToggle(-1)"
			></uni-icons>
			<view class="action-icon-box">
				<uni-icons
					class="action-icon"
					size="30"
					type="list"
					@click="handleOpen"
				></uni-icons>
				<view class="action-icon-text">
					{{currentIndex +1 }}/{{menus.length}}
				</view>
			</view>
			<view class="action-icon-box">
				<uni-icons
					v-if="showSubmit"
					class="action-icon"
					size="30"
					type="checkmarkempty"
					@click="handleSubmit"
				></uni-icons>
				<view class="action-icon-text">
					提交
				</view>
			</view>
			
			<uni-icons
				class="action-icon"
				size="30"
				:color="isNext ? '': '#ccc'"
				type="arrow-right"
				@click="handleToggle(1)"
			></uni-icons>
		</view>
		<!-- 抽屉 -->
		<uni-drawer ref="showRight" mode="left" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<!-- 菜单列表 -->
				<template v-for="(item, index) in menus">
					<view class="menu-box" 
					:class="{active: index === currentIndex}"
					:key="index" @click="handleClickItem(item,index)">
						<view class="menu-index">{{ (index + 1) | formatIndex }}</view>
						<view class="menu-desc">
							<view class="menu-title uni-ellipsis">{{item.title}}2</view>
							<view class="menu-tag" v-if="item.isfree">免费</view>
						</view>
					</view>
				</template>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
export default {
	name: 'action-bar',
	filters: {
		formatIndex(v) {
			return (v + '').padStart(3, '0');
		}
	},
	props: {
		// 当前选中菜单坐标
		currentIndex:{
			type: Number,
			default: 0
		},
		// 当前菜单列表
		menus: {
			type: Array,
			default: () => {
				return [1, 2, 3];
			}
		},
		// 是否显示提交按钮
		showSubmit:{
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	computed:{
		isPre(){
			return this.currentIndex > 0
		},
		isNext(){
			return this.currentIndex < this.menus.length -1
		}
	},
	methods: {
		handleOpen() {
			this.$refs.showRight.open();
		},
		// 点击菜单项
		handleClickItem(item, index) {
			this.$emit('select', {target:item, index});
			this.$refs.showRight.close();
		},
		handleToggle(num) {
			const index = this.currentIndex + num;
			if (index === -1 || index === this.menus.length) {
				return;
			}
			this.$emit('change', {target:this.menus[index], index})
		},
		handleSubmit(){
			this.$emit('submit')
		}
	}
};
</script>

<style lang="scss" scoped>
.action-bar-container {
	width: 100%;
	height: 100rpx;
	.action-bar-inner {
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		left: 0;
		background-color: $uni-img-default-color;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.action-icon-box{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.action-icon-text{
			font-size: 12px;
		}
		.action-icon {
		}
	}
	.action-icon {
	}
	.menu-box {
		display: flex;
		padding: 20rpx 0;
		font-size: 14px;
		font-weight: normal;
		&.active{
			color: $uni-color-success;
			background-color: $uni-img-default-color;
		}
		.menu-index {
			width: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $uni-color-subtitle;
			font-size: 12px;
		}
		.menu-desc {
			.menu-title {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
			}
			.menu-tag {
				border: 1px solid $uni-color-success;
				font-size: 12px;
				color: $uni-color-success;
				text-align: center;
				width: 60rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>
