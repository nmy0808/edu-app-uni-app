<template>
	<mescroll-uni
		ref="mescrollRef"
		@init="mescrollInit"
		@down="downCallback"
		@up="upCallback"
		:down="downOption"
		:up="upOption"
		:fixed="false"
		:bottombar="false"
	>
		<learn-course-litem
			v-for="(item, index) in list"
			:key="index"
			:data="item"
			@click.native='handleItemClick(item)'
		></learn-course-litem>
	</mescroll-uni>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	name:	'learn-list',
	mixins: [MescrollMixin],
	props: {
		type: {
			type: String,
			default: ''
		},
		keyWord:{
			type: String,
			default: ''
		}
	},
	data() {
		return {
			downOption: {},
			upOption: {},
			fetchApi: { learn:  this.$http.getLearnHistoryListApi, search:  this.$http.searchApi },
			list: []
		};
	},
	watch: {
		keyWord(){
			this.mescroll.resetUpScroll()
		}
	},
	methods: {
		async upCallback({ num, size }) {
			const params = {};
			params.page = num;
			params.type = this.type;
			params.keyWord = this.keyWord || '';
			const fetchApi = this.keyWord?this.fetchApi['search']:this.fetchApi['learn']
			const { data } = await fetchApi(params);
			num === 1
				? (this.list = data.rows)
				: (this.list = this.list.concat(data.rows));
			this.mescroll.endBySize(this.list.length, 1);
		},
		handleItemClick(item){
			const id = item.id
			let url = ''
			if(!item.type){
				url ='/pages/column-detail/column-detail?id=' + id
			}else{
				url ='/pages/course-detail/course-detail?id=' + id
			}
			this.navTo(url)
		}
	}
};
</script>

<style scoped lang="scss"></style>
