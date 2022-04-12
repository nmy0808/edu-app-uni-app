import request from '@/http/request.js'

/**
 * 获取可用优惠券列表
 */
export const getOrderListApi= ({ page, limit }) => {
	const url = '/mobile/order/list'
	const data = {page,limit}
	const options = {}
	return request.get(url, data, options)
}
/**
 * 下单前获取产品信息
 */
export const getProdDetailApi= ({ type, id }) => {
	const url = '/mobile/goods/read'
	const data = { type, id }
	const options = {}
	return request.get(url, data, options)
}
/**
 * 创建订单
 * 类型：course课程，column专栏，book电子书
 */
export const createdOrderApi= ({ goods_id, type, user_coupon_id = 0}) => {
	const url = '/mobile/order/save'
	const data = { goods_id, type, user_coupon_id }
	const options = {}
	return request.post(url, data, options)
}
/**
 * 微信app/小程序/H5支付订单
 * -订单号
 * -app支付，mp小程序支付，h5网页支付
 * -type等于mp和h5时必填code
 */
export const wxpayApi= ({ no, type, code}) => {
	const url = '/mobile/order/wxpay'
	const data = { no, type, code }
	const options = {}
	return request.post(url, data, options)
}
/**
 * 获取指定课程/专栏的可用优惠券数
 */
export const getCouponCountApi= ({ goods_id, type }) => {
	const url = '/mobile/user_coupon/count'
	const data = { goods_id, type }
	const options = {}
	return request.get(url, data, options)
}