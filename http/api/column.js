import request from '@/http/request.js'

/**
 * 获取专栏详情
 */
export const getColumnDetailApi= ({id}) => {
	const url = '/mobile/column/read'
	const data = { id }
	const options = {}
	return request.get(url, data, options)
}
