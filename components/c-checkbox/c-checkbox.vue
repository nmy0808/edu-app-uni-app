<template>
	<view class="checkbox-container">
		<view class="checkbox-item"
			:class="{ active: isChecked(index) }"
		 v-for="(item, index) in options" :key="index"
			@click="handleItem(index)"
			>
			<view class="checkbox-index">{{ index | format }}</view>
			<view class="checkbox-answer">{{ item }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'c-checkbox',
	filters:{
		format(v){
			return ['A','B','C','D','E','F','G','H'][v]
		}
	},
	props: {
		options: {
			type: Array,
			default: () => []
		},
		// 答案
		value: null
	},
	data() {
		return {
			tempValue: []
		};
	},
	mounted() {
		if(Array.isArray(this.value)  ){
			this.tempValue = this.value
		}
	},
	methods:{
		isChecked(v){
			return this.tempValue.includes(v)
		},
		handleItem(value){
			const index = this.tempValue.indexOf(value)
				if(index !== -1){
					this.tempValue.splice(index,1)
				}else{
					this.tempValue.push(value)
				}
			const temp = JSON.parse(JSON.stringify(this.tempValue))
			this.$emit('change', temp)
		}
	}
};
</script>

<style lang="scss" scoped>
.checkbox-container {
	.checkbox-item {
		display: flex;
		border: 1px solid $uni-border-color-light;
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		&.active {
			border: 1px solid $uni-color-success;
		}
		.checkbox-index {
			width: 60rpx;
			text-align: center;
		}
		.checkbox-answer {
		}
	}
}
</style>
