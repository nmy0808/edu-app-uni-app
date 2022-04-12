<template>
	<image
		class="avatar-container"
		:style="{
			width: size + 'rpx',
			height: size + 'rpx'
		}"
		:class="{
			circle: circle
		}"
		:src="img || '/static/default/default_avatar.png'"
		mode=""
	></image>
</template>

<script>
export default {
	name:"avatar",
	props:{
		img:{
			type: String,
			default: ''
		},
		size: {
			type: Number,
			default: 120
		},
		circle: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {

		};
	}
}
</script>

<style lang="scss" scoped>
.avatar-container {
	background-color: white;
	&.circle {
		border-radius: 50%;
	}
}
</style>
