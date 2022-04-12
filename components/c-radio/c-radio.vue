<template>
	<view class="radio-container">
		<view class="radio-item"
			:class="{ active: isChecked(index) }"
		 v-for="(item, index) in options" :key="index"
			@click="handleItem(index)"
			>
			<view class="radio-index">{{ index | format }}</view>
			<view class="radio-answer">{{ item }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'c-radio',
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
	mounted() {
		if(Array.isArray(this.value)  ){
			this.tempValue = this.value
		}
	},
	data() {
		return {
			tempValue: []
		};
	},
	methods:{
		isChecked(v){
			return this.tempValue.includes(v)
		},
		handleItem(index){
			if(this.tempValue.length === 0){
				this.tempValue= [index]
			}else{
				if(this.tempValue.includes(index)){
					this.tempValue= []
				}else{
					this.tempValue= [index]
				}
			}
			this.$emit('change', this.tempValue)
		}
	}
};
</script>

<style lang="scss" scoped>
.radio-container {
	.radio-item {
		display: flex;
		border: 1px solid $uni-border-color-light;
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		&.active {
			border: 1px solid $uni-color-success;
		}
		.radio-index {
			width: 60rpx;
			text-align: center;
		}
		.radio-answer {
		}
	}
}
</style>
