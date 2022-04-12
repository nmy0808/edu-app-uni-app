<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<book-list v-if="type==='book'" :data='list' isRow :module='type'></book-list>
				<test-item v-if='type === "test"' v-for="(item,index) in list" :key='index' 
				:index='index'
				:data='item'
				@change='handleTestStatusChange'
				></test-item>
				<my-test-item v-if='type === "my"' v-for="(item,index) in list" :key='index'
				:index='index'
				:data='item'
				></my-test-item>
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
				const fetchApiMap = {'test':this.$http.getTestListApi,'my':this.$http.getTestHistoryApi}
				const fetchApi = fetchApiMap[this.type]
				const {data} = await fetchApi(num)
				num === 1 ? this.list = data.rows : this.list = this.list.concat(data.rows)
				this.mescroll.endBySize(this.list.length , data.count)
			},
			handleTestStatusChange(index){
				this.list[index].is_test = true
			},
			refresh(){
				this.mescroll.resetUpScroll()
			}
		}
	}
</script>

<style lang="scss">

</style>
