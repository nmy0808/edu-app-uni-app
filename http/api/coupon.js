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
