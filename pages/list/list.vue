<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<book-list v-if="type==='book'" :data='list' isRow :module='type'></book-list>
			<course-list v-else :data='list' isRow :module='type'></course-list>
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
			}else if(this.type === 'group'){
				uni.setNavigationBarTitle({
					title: '拼团列表'
				})
			}else if(this.type === 'flashsale'){
				uni.setNavigationBarTitle({
					title: '秒杀列表'
				})
			}else if(this.type === 'book'){
				uni.setNavigationBarTitle({
					title: '电子书列表'
				})
			}
		},
		methods:{
			async upCallback( {num}){
				const fetchApiMap = {
					course: this.$http.getCourseListApi,
					group: this.$http.getGroupListApi,
					flashsale: this.$http.getFlashsaleListApi,
					book: this.$http.getBookListApi,
					live: this.$http.getLiveListApi
				}
				const fetchApi = fetchApiMap[this.type]
				const {data} = await fetchApi(num)
				num === 1 ? this.list = data.rows : this.list = this.list.concat(data.rows)
				this.mescroll.endBySize(this.list.length , data.count)
			}
		}
	}
</script>

<style lang="scss">

</style>
