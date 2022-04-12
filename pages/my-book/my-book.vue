<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<book-list  :data='list' isRow isMy></book-list>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins:[MescrollMixin],
		data() {
			return {
				list:[]
			};
		},
		methods:{
			async upCallback( {num}){
				const {data} = await this.$http.getMyBookListApi(num)
				num === 1 ? this.list = data.rows : this.list = this.list.concat(data.rows)
				this.mescroll.endBySize(this.list.length , data.count)
			}
		}
	}
</script>

<style lang="scss">

</style>
