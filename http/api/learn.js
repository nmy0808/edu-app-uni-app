import request from '@/http/request.js'

/**
 * 我的学习记录列表
 * course课程，column专栏，book电子书
 */
export const getLearnHistoryListApi= ({ page, type }) => {
	const url = '/mobile/user_history/list'
	const data = {page,type}
	const options = {}
	return request.get(url, data, options)
}
/**
 * 更新学习记录
 * course课程，column专栏，book电子书
 */
export const updateLearnHistoryApi= ({ id, type, progress, detail_id }) => {
	const url = '/mobile/user_history/update'
	const data = {id, type, progress, detail_id }
	const options = { hideLoading: true  }
	return request.post(url, data, options)
}