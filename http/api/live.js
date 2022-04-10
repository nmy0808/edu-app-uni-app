import request from '@/http/request.js'
/**
 * 直播列表
 */
export const getLiveListApi= (page) => {
	const url = '/mobile/live/list'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 直播详情
 */
export const getLiveDetailApi= ({id}) => {
	const url = '/mobile/live/read'
	const data = { id: parseInt(id) }
	const options = {  }
	return request.get(url, data, options)
}

/**
 * 查看弹幕列表
 */
export const getLiveCommentListApi= ({page=1, live_id}) => {
	const url = '/mobile/live_comment'
	const data = { page, live_id }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 发送弹幕
 */
export const sendDanmuApi= ({content, live_id, time, color}) => {
	const url = '/mobile/live_comment/save'
	const data = { content, live_id, time, color }
	const options = {  }
	return request.post(url, data, options)
}