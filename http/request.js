import {
	baseUrl,
	appid
} from '@/http/config.js'

import storageKey from '@/store/sotrageKey.js'
const request = (params) => {
	uni.showLoading()
	const token = uni.getStorageSync('__LCEDU_TOKEN__')
	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				appid,
				token
			},
			...params,
			url: baseUrl + params.url,

			success: (res) => {
				if (res.statusCode === 200 &&
					res.data.msg !== 'fail') {
					if (res.data.code ===
						20000 && res.data.msg !=='fail') {
						resolve(res.data)
						return
					}
				}
				const message = res.data
					.data || '请求失败,请稍后再试~'
				reject(message)
				uni.showToast({
					title: message,
					icon: 'none'
				})
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		});
	})
};
['get', 'post'].forEach((method) => {
	request[method] = (url, data, options = {}) => {
		return request({
			method,
			url,
			data,
			...options
		})
	}
})
export default request
