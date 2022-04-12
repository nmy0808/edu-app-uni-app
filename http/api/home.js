import request from '@/http/request.js'

/**
 * 获取首页数据
 */
export const getHomeDetailApi= () => {
	const url = '/mobile/index'
	const data = {}
	const options = {}
	return request.get(url, data, options)
}
