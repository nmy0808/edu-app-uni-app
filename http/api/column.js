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
/**
 * 搜索课程/专栏
 * course课程，column专栏
 */
export const searchApi= ({keyWord, type, page}) => {
	const url = '/mobile/search'
	const data = { keyword:keyWord,type, page }
	const options = {}
	return request.get(url, data, options)
}
