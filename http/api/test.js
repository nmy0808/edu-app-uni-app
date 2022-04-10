import request from '@/http/request.js'
/**
 * 考试列表
 */
export const getTestListApi= (page) => {
	const url = '/mobile/testpaper/list'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}

/**
 * 开始考试
 */
export const beginTestApi= ({id}) => {
	const url = '/mobile/testpaper/read'
	const data = { id }
	const options = {  }
	return request.get(url, data, options)
}

/**
 * 我的考试记录
 */
export const getTestHistoryApi= (page) => {
	const url = '/mobile/user_test/list'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}

/**
 * 考试交卷
 */
export const summitTestApi= ({user_test_id, value }) => {
	const url = '/mobile/user_test/save'
	const data = { user_test_id, value }
	const options = {  }
	return request.post(url, data, options)
}