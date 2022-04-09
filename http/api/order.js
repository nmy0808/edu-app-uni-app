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
export const gegProdDetailApi= ({ type, id }) => {
	const url = '/mobile/goods/read'
	const data = { type, id }
	const options = {}
	return request.get(url, data, options)
}
