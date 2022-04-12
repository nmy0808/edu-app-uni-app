<template>
	<uni-popup ref="inputDialog" type="dialog" :is-mask-click='true'>
		<uni-popup-dialog
			ref="inputClose"
			mode="input"
			:title="title"
			:value="temp.value"
			:placeholder="placeholder"
			@confirm="handleConfirm"
			:cancelText="cancelText"
			:confirmText="confirmText"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script>
export default {
	name: 'input-dialog',
	props: {
		placeholder: {
			type:String,
			default: '请输入内容'
		},
		cancelText: {
			type:String,
			default: '取消'
		},
		confirmText: {
			type:String,
			default: '确定'
		}
	},
	data() {
		return {
			temp: {
				value: ''
			},
			title: '',
			confirmFn: null
		};
	},
	methods: {
		open({value,confirm = null, title = ''}) {
			this.temp.value = value;
			this.title = title
			this.confirmFn = confirm
			this.$refs.inputDialog.open();
		},
		handleConfirm(value) {
			this.$emit('confirm', value);
			if (this.confirmFn) {
				this.confirmFn(value);
			}
		}
	}
};
</script>

<style lang="scss"></style>
