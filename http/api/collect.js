import request from '@/http/request.js'

/**
 * 设置收藏
 * ：course课程，column专栏，book电子书
 */
export const setCollectApi= ({goods_id,type,value}) => {
	const url = value ? '/mobile/collect' : '/mobile/uncollect'
	const data = { goods_id,type }
	const options = {}
	return request.post(url, data, options)
}
