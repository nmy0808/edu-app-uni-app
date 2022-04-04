<template>
	<view>
		<uni-list :border="false" class="setting-list">
			<template v-for="(item, index) in menus">
				<uni-list-item
					clickable
					:showArrow="item.showArrow"
					:key="index"
					@click="item.handle"
				>
					<template slot="header">
						<text class="setting-list-label">{{ item.name }}</text>
					</template>
					<template slot="footer">
						<text class="setting-list-value">{{ item.value }}</text>
					</template>
				</uni-list-item>
			</template>
		</uni-list>
		<button 
			v-if="$store.state.user.token" 
		type="default" class="mt-2" @click="handleLogout">退出登录</button>
	</view>
</template>

<script>
import storageKey from '@/store/sotrageKey.js';
export default {
	data() {
		return {
			menus: [
				{ name: '账户安全', value: '', showArrow: true, handle: () => {
					this.navTo('/pages/update-password/update-password')
				} },
				{
					name: '清除缓存',
					value: '',
					showArrow: false,
					handle: this.clearStorage
				},
				{ name: '检查更新', value: '', showArrow: true, handle: () => {} },
				{ name: '当前版本', value: '1.0.0', showArrow: false, handle: () => {} }
			],
			stroageInfo: null
		};
	},
	created() {
		this.getStrageInfo();
	},
	methods: {
		/**
		 * 计算本地存储大小
		 */
		getStrageInfo() {
			const data = uni.getStorageInfoSync();
			this.stroageInfo = data;
			this.menus.find(it => {
				if (it.name === '清除缓存') {
					let value = data.limitSize + '';
					let index = value.indexOf('.');
					if (index !== -1) {
						index += 3;
					} else {
						it.value = value + ' KB';
					}
					it.value = value.substr(0, index) + ' KB';
				}
			});
		},
		/**
		 * 清空本地存储
		 */
		clearStorage() {
			uni.showModal({
				title: '请否要清除缓存',
				success: ({ confirm }) => {
					if (confirm) {
						this.stroageInfo.keys.forEach(key => {
							if (key !== storageKey.USERINFO && key !== storageKey.TOKEN) {
								uni.removeStorageSync(key);
							}
						});
						this.getStrageInfo();
						this.toast('清理成功');
					}
				}
			});
		},
		async handleLogout(){
			await this.$store.dispatch('user/logout')
			this.toast('已退出登录')
		}
	}
};
</script>

<style lang="scss"></style>
