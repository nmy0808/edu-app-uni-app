import request from '@/http/request.js'

/**
 * 登录
 */
export const loginApi= ({username, password }) => {
	const url = '/mobile/login'
	const data = { username, password }
	const options = {}
	return request.post(url, data, options)
}

/**
 * 微信app/小程序/H5登录
 */
export const oauthLoginApi= ({type, access_token,openid, code, rawData }) => {
	const url = '/mobile/weixin_login'
	const data = { type, access_token,openid, code, rawData}
	const options = {}
	return request.post(url, data, options)
}


/**
 * 账号注册
 */
export const registerApi= ({username, password, repassword }) => {
	const url = '/mobile/reg'
	const data = { username, password, repassword }
	const options = {}
	return request.post(url, data, options)
}

/**
 * 退出登录
 */
export const logoutApi= () => {
	const url = '/mobile/logout'
	const data = { }
	const options = {}
	return request.post(url, data, options)
}

/**
 * 获取手机验证码
 */
export const getCaptchaApi= (phone) => {
	const url = '/mobile/get_captcha'
	const data = { phone }
	const options = {}
	return request.post(url, data, options)
}
/**
 * 绑定手机号
 */
export const bindMobileApi= ({phone, code}) => {
	const url = '/mobile/bind_mobile'
	const data = { phone , code}
	const options = {}
	return request.post(url, data, options)
}

/**
 * 找回密码
 */
export const findPasswordApi= ({phone, code, password, repassword}) => {
	const url = '/mobile/forget'
	const data = {phone, code, password, repassword}
	const options = {}
	return request.post(url, data, options)
}

/**
 * 修改资料
 */
export const updateInfoApi= ({ avatar, nickname, sex }) => {
	const url = '/mobile/update_info'
	const data = { avatar, nickname, sex }
	const options = {}
	return request.post(url, data, options)
}

/**
 * 修改密码
 */
export const updatePasswordApi= (opassword, password, repassword) => {
	const url = '/mobile/update_password'
	const data = { opassword, password, repassword }
	const options = {}
	return request.post(url, data, options)
}