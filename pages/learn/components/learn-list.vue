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
	mixins: [MescrollMixin],
	props: {
		type: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			downOption: {},
			upOption: {},
			list: []
		};
	},
	methods: {
		async upCallback({ num, size }) {
			const params = {};
			params.page = num;
			params.type = this.type;
			const { data } = await this.$http.getLearnHistoryListApi(params);
			num === 1
				? (this.list = data.rows)
				: (this.list = this.list.concat(data.rows));
			console.log(data.rows);
			this.mescroll.endBySize(this.list.length, 1);
		},
		handleItemClick(item){
			const id = item.id
			this.navTo('/pages/course-detail/course-detail?id=' + id)
		}
	}
};
</script>

<style scoped lang="scss"></style>
