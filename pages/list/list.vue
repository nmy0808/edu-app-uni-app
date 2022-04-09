<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<course-list :data='list' isRow></course-list>
			 </mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				type: '',
				list: []
			};
		},
		onLoad(e) {
			this.type = e.type
			if(this.type === 'course'){
				uni.setNavigationBarTitle({
					title: '课程列表'
				})
			}
		},
		methods:{
			async upCallback( {num}){
				const {data} = await this.$http.getCourseListApi(num)
				num === 1 ? this.list = data.rows : this.list = this.list.concat(data.rows)
				this.mescroll.endBySize(this.list.length , data.count)
			}
		}
	}
</script>

<style lang="scss">

</style>
