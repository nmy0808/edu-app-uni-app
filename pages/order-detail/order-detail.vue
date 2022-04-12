<template>
	<view>
		<course-item :data="detailData" isRow></course-item>
		<divider></divider>
		<view class="">
			<!-- 优惠券 -->
			<view class="list-item" @click="handleOpenDialog" v-if="canCoupon">
				<view class="list-title">优惠券</view>
				<view class="" >{{ couponData ? '-¥' + couponData.price : couponCount }}</view>
				<uni-icons type="right" class="list-move" color="#cccccc"></uni-icons>
			</view>
			<view class="list-item">
				<view class="list-title">支付方式</view>
				<view class="list-pay">微信支付</view>
				<uni-icons type="right" class="list-move" color="#cccccc"></uni-icons>
			</view>
			<!--  -->
		</view>
		<!-- 支付方式 -->
		<!-- 支付按钮 -->
		<view class="fixed-bottom-box">
			<view class="fixed-bottom-box-btn" @click="onSubmit">
				<text>立即支付 ¥{{ currentPrice }}</text>
				<text class="coupon-price" v-if="currentCoupon">{{currentCoupon}} </text>
			</view>
		</view>
		<!-- 优惠券弹窗 -->
		<coupon-dialog ref="dialogRef"></coupon-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			type: '',
			couponCount: '', //优惠券数量
			detailData: {
				cover:
					'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/10ccf3a973f5193bec3c.png',
				id: null,
				price: '',
				title: '',
				type: ''
			},
			couponData: null // 当前优惠券
		};
	},
	onLoad(e) {
		this.id = e.id;
		this.type = e.type;
		this.gegDetailData();
		this.canCoupon && this.getCouponCount();
	},
	computed:{
		// 是否可以有优惠券相关
		canCoupon(){
			 return ['column', 'course'].includes(this.type )
		},
		// 当前价格
		currentPrice(){
			if(this.couponData){
				return this.detailData.price - this.couponData.price
			}else{
				return this.detailData.price
			}
		},
		// 当前优惠
		currentCoupon(){
				if(this.couponData){
					return `( 已优惠¥${this.couponData.price} )`
				}
				return null
		}
	},
	methods: {
		async gegDetailData() {
				const params = {};
				params.type = this.type;
				params.id = this.id;
				const { data } = await this.$http.getProdDetailApi(params);
				this.detailData = data;
		},
		// 获取指定课程/专栏的可用优惠券数
		async getCouponCount() {
			const params = {};
			params.type = this.type;
			params.goods_id = this.id;
			try {
				const { data } = await this.$http.getCouponCountApi(params);
				this.couponCount = data;
			} catch (e) {
				this.couponCount = '暂无可用';
			}
		},
		/**
		 * 支付
		 */
		async onSubmit() {
			const params = {};
			params.goods_id = this.id;
			params.type = this.type;
			// 如果选择了优惠券
			if(this.couponData && this.canCoupon){
				params.user_coupon_id = this.couponData.id
				console.log(params.user_coupon_id );
			}
			const { data } = await this.$http.createdOrderApi(params);
			const no = data.no;
			const { data: orderInfo } = await this.$http.wxpayApi({
				no,
				type: 'app'
			});

			orderInfo.appId = orderInfo.appid;
			return;
			console.log(orderInfo);
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo,
				success(res) {
					this.toast('1支付成功');
				},
				fail(e) {
					// 获取错误信息 err.errMsg
					console.log(e.errMsg);
				}
			});
		},
		async handleOpenDialog(){
			if(this.couponCount === 0) {
				return this.toast('暂无优惠券')
			}
			// 1.获取所有优惠券
			const {data} = await this.$http.getMyCouponListApi()
			// 2.筛选符合当前产品id的优惠券
			const list = data.rows.filter( it=> it.goods_id+'' === this.id +'' && !used)
			console.log(list);
			// 2.打开优惠券选择弹窗
			this.$refs.dialogRef.open({
				list: list,
				title: '选择优惠券',
				success: (target)=>{
					this.couponData = target
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.fixed-bottom-box {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 132rpx;
	padding: 20rpx;
	box-sizing: border-box;
}
.fixed-bottom-box-btn {
	width: 100%;
	height: 100%;
	background-color: #5fc677;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 18px;
	.coupon-price{
		font-size: 12px;
		margin-left: 10rpx;
	}
}
.list-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	font-size: 14px;
	border-bottom: 1px solid $uni-border-color-light;
	.list-title {
		margin-right: auto;
	}
	.list-move {
		margin-left: 10rpx;
	}
	.list-pay {
		color: $uni-color-success;
	}
}
</style>
