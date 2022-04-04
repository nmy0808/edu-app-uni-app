<template>
	<view class="app-container">
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<template v-for="(item, index) in list">
				<coupons-item isVertical :data="item" :key="index"></coupons-item>
			</template>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import typeMap from '@/typeMap/index.js';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			list: []
		};
	},
	methods: {
		async upCallback({ num, size }) {
			const { data } = await this.$http.getMyCouponListApi(num);
			// 整理数据格式
			data.rows.forEach(item => {
				const key = item.type;
				item.typeKey = typeMap[key];
				item.value = { title: item.title };
			});
			if (num === 1) {
				this.list = [];
				setTimeout(() => {
					this.list = data.rows;
					this.mescroll.endBySize(this.list.length, data.count);
				});
			} else {
				this.list.concat(data.rows);
				this.mescroll.endBySize(this.list.length, data.count);
			}
		}
	}
};
</script>

<style lang="scss"></style>
