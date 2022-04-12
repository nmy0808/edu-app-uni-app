import request from '@/http/request.js'
/**
 * 电子书列表
 */
export const getBookListApi= (page) => {
	const url = '/mobile/book/list'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 我的电子书列表
 */
export const getMyBookListApi= (page) => {
	const url = '/mobile/mybook'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 电子书详情
 */
export const getBookDetail= ({id}) => {
	const url = '/mobile/book/read'
	const data = { id }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 查看电子书章节和内容
 */
export const getBookReadDetail= ({id, book_id}) => {
	const url = '/mobile/book/detail'
	const data = { id, book_id }
	const options = { }
	return request.get(url, data, options)
}