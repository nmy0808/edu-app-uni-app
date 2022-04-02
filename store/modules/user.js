import $http from '@/http'
import sotrageKey from '../sotrageKey.js'
export default {
	// 独立命名空间
	namespaced: true,
	// 通过 state 声明数据
	state: () => {
		return {
			userInfo: uni.getStorageInfoSync(sotrageKey.USERINFO) || '',
			token: uni.getStorageInfoSync(sotrageKey.TOKEN) || ''
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
		clearAll(state){
			state.token = ''
			state.userInfo = ''
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
			await logoutApi();
			ctx.commit('clearAll')
		}
	}
};
