<!-- 答题组件 -->
<template>
	<view class="answer-container">
		<!-- 问答题 -->
		<template v-if="type === 'answer'">
			<uni-easyinput
				class="mt-1"
				type="textarea"
				:value="tempValue[0]"
				@input="handleInput"
				placeholder="请输入答案"
			/>
		</template>
		<!-- 填空题 -->
		<template v-else-if="type === 'completion'">
			<uni-easyinput
				v-for="(item, index) in tempValue"
				:key="index"
				class="mt-1"
				type="textarea"
				:value="tempValue[index]"
				@input="e => handleInput(e, index)"
				placeholder="请输入答案"
			/>
			<button type="default" @click="handleAdd">添加填空</button>
		</template>
		<!-- 判断题 -->
		<template v-else-if="type === 'trueOrfalse'">
			<c-judge :options='options' @change='handleInput' :value="value"></c-judge>
		</template>
		<!-- 多选题 -->
		<template v-else-if="type === 'checkbox'">
				<c-checkbox :options='options' @change='handleInput' :value="value"></c-checkbox>
		</template>
		<!-- 单选选题 -->
		<template v-else-if="type === 'radio'">
			<c-radio :options='options' @change='handleInput' :value="value"></c-radio>
		</template>
	</view>
</template>

<script>
// answer:'问答题',
// completion:"填空题",
// trueOrfalse:"判断题",
// checkbox:"多选题",
// radio:"单选选题"
export default {
	props: {
		// 题类型
		type: {
			type: String,
			default: ''
		},
		options: {
			type: Array,
			default: () => []
		},
		// 答案
		value: null
	},
	data() {
		return {
			tempValue: ['']
		};
	},
	mounted() {
		if (this.value) {
			const temp = JSON.parse(JSON.stringify(this.value));
			this.tempValue = temp;
		}
	},
	methods: {
		handleAdd() {
			this.tempValue.push('');
			const temp = JSON.parse(JSON.stringify(this.tempValue));
			this.$emit('change', { value: temp });
		},
		handleInput(e, index) {
			switch (this.type) {
				// 问答
				case 'answer':
					this.$emit('change', { value: [e] });
					break;
				// 填空
				case 'completion':
					this.tempValue[index] = e;
					const temp = JSON.parse(JSON.stringify(this.tempValue));
					this.$emit('change', { value: temp });
					break;
				// 判断
				case 'trueOrfalse':
				// console.log(e.detail.value);
				this.$emit('change', { value: e });
					break;
				// 多选
				case 'checkbox':
					this.$emit('change', { value: e });
					break;
				// 单选
				case 'radio':
				this.$emit('change', { value: e });
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style scoped lang="scss"></style>
