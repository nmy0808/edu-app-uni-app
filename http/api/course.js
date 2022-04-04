import request from '@/http/request.js'

/**
 * 查看课程详情
 * id 	课程ID
 * column_id   专栏ID
 * group_id     拼团ID
 * flashsale_id   秒杀ID
 */
export const getCourseDetailApi= (data) => {
	const url = '/mobile/course/read?id=12&column_id=0'
	const options = {}
	return request.get(url, data, options)
}
