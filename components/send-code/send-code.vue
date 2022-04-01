<template>
	<view class="send-code-container" @click="handleSend">
		{{ num > 0 ? num + 's' : '发送验证码' }}
	</view>
</template>

<script>
export default {
	name: 'send-code',
	data() {
		return {
			num: 0,
			timer: null
		};
	},
	methods: {
		handleSend() {
			if (this.num === 0) {
				this.num = 3;
				this.$emit('send')
				this.timer = setInterval(() => {
					this.num--;
					if (this.num === 0) {
						clearInterval(this.timer);
					}
				}, 1000);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.send-code-container {
	background-color: $uni-color-primary;
	color: white;
	font-size: $uni-font-size-sm;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
