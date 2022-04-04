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
