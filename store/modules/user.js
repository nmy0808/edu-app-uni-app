import $http from '@/http'
import sotrageKey from '../sotrageKey.js'
export default {
	// 独立命名空间
	namespaced: true,
	// 通过 state 声明数据
	state: () => {
		return {
			userInfo: uni.getStorageSync(sotrageKey.USERINFO) || '',
			token: uni.getStorageSync(sotrageKey.TOKEN) || ''
		};
	},
	mutations: {
		asyncStorage(state){
			uni.setStorageSync(sotrageKey.USERINFO, state.userInfo)
			uni.setStorageSync(sotrageKey.TOKEN, state.token)
		},
		setUserInfo(state, userInfo){
			state.userInfo = userInfo
			this.commit('user/asyncStorage')
		},
		setToken(state, token){
			state.token = token
			this.commit('user/asyncStorage')
		},
		setPhone(state, phone){
			state.userInfo.phone = phone
			this.commit('user/asyncStorage')
		},
		clearAll(state){
			state.token = ''
			state.userInfo = ''
			console.log(123123);
			this.commit('user/asyncStorage')
		}
	},
	actions: {
		 /**
			* 登录
			*/
		async login(ctx, { username, password }){
			const params = {};
			params.username = username;
			params.password = password;
			const { data } = await $http.loginApi(params);
			ctx.commit('setUserInfo', data)
			ctx.commit('setToken', data.token)
			console.log(data);
			return data
		},
		/**
			* 退出登录
			*/
		async logout(ctx){
			await $http.logoutApi();
			ctx.commit('clearAll')
		},
		/**
		 * 修改个人资料
		 */
		async updateUserInfo(ctx, userInfo){
			const temp = JSON.parse(JSON.stringify(ctx.state.userInfo))
			Object.keys(userInfo).forEach(key=>{
				temp[key] = userInfo[key]
			})
			await $http.updateInfoApi(temp)
			ctx.commit('setUserInfo', temp)
			uni.hideToast({
				title: '修改成功',
				icon: 'none'
			})
			return true
		}
	}
};
