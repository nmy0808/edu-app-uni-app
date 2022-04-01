<template>
	<view>
		<view :style="{ height: statusBar + 'px', background: color }">6</view>
	</view>
</template>

<script>
import getSystemInfo from '@/common/js/systemInfo.js';
export default {
	name: 'area-top-bar',
	props: {
		color: {
			type: String,
			default: 'white'
		}
	},
	data() {
		return {
			statusBar: 0
		}
	},
	mounted() {
		getSystemInfo().then(res => {
			this.statusBar = res.statusBar;
			console.log(this.statusBar);
		});
	},
};
</script>

<style lang="scss"></style>
