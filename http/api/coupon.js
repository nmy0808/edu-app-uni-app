import request from '@/http/request.js'

/**
 * 获取可用优惠券列表
 */
export const getCouponListApi= () => {
	const url = '/mobile/coupon'
	const data = {}
	const options = {}
	return request.get(url, data, options)
}
/**
 * 领取优惠券
 */
export const getCouponByIdApi= (coupon_id) => {
	const url = '/mobile/user_coupon/receive'
	const data = {coupon_id}
	const options = {}
	return request.post(url, data, options)
}

/**
 * 我的优惠券列表
 */
export const getMyCouponListApi= (page) => {
	const url = '/mobile/user_coupon'
	const data = {page}
	const options = {}
	return request.get(url, data, options)
}
