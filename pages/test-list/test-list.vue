<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<book-list v-if="type==='book'" :data='list' isRow :module='type'></book-list>
			<!-- <course-list v-else :data='list' isRow :module='type'></course-list> -->
				<test-item v-for="(item,index) in list" :key='index' 
				:data='item'
				></test-item>
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
			uni.setNavigationBarTitle({
				title: '考试列表'
			})
		},
		methods:{
			async upCallback( {num}){
				const {data} = await this.$http.getTestListApi(num)
				num === 1 ? this.list = data.rows : this.list = this.list.concat(data.rows)
				this.mescroll.endBySize(this.list.length , data.count)
				console.log(data);
			}
		}
	}
</script>

<style lang="scss">

</style>
