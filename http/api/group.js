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
/**
 * 拼团详情
 * 专栏ID 拼团ID 秒杀ID
 */
export const getGroupDetailApi= ({ id,type='course',column_id,group_id, flashsale_id }) => {
	let url = '/mobile/course/read'
	if(type==='column'){
		url = '/mobile/column/read'
	}
	const data = { id }
	if(column_id){data.column_id = column_id}
	if(group_id){data.group_id = group_id}
	if(flashsale_id){data.flashsale_id = flashsale_id}
	const options = {}
	return request.get(url, data, options)
}
