import request from '@/http/request.js'

/**
 * 获取拼团列表
 * 是否可用：0否1是
 */
export const getGroupListApi= ({page, usable = 1}) => {
	const url = '/mobile/group'
	const data = { page, usable }
	const options = {}
	return request.get(url, data, options)
}
/**
 * 获取秒杀列表
 * 是否可用：0否1是
 */
export const getFlashsaleListApi= ({page, usable = 1}) => {
	const url = '/mobile/flashsale'
	const data = { page, usable }
	const options = {}
	return request.get(url, data, options)
}
