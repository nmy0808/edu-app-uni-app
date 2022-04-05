import $http from '@/http'
import sotrageKey from '../sotrageKey.js'
export default {
	// 独立命名空间
	namespaced: true,
	// 通过 state 声明数据
	state: () => {
		return {
			history: uni.getStorageSync(sotrageKey.HISTORY) || [],
		};
	},
	mutations: {
		asyncStorage(state){
			uni.setStorageSync(sotrageKey.HISTORY, state.history)
		},
		setHistory(state, value){
			const index = state.history.indexOf(value)
			const maxLength = 10 // 最多保留记录的个数
			if(index!==-1){
				const target = state.history.splice(index, 1)[0]
				state.history.unshift(target)
				state.history = state.history.splice(0, maxLength)
			}else{
				state.history.unshift(value)
				state.history = state.history.splice(0, maxLength)
			}
			this.commit('history/asyncStorage')
		},
		clearAll(state){
			state.history = []
			this.commit('history/asyncStorage')
		}
	},
	actions: {
		 /**
			*
			*/
		async x(ctx, x){
		
		},
		
	}
};
