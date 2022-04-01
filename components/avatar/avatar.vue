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
		src="@/static/default/default_avatar.png"
		mode=""
	></image>
</template>

<script>
export default {
	name:"avatar",
	props:{
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
	&.circle {
		border-radius: 50%;
	}
}
</style>
