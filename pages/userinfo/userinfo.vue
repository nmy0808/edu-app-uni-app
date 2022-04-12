<template>
	<view class="userinfo-page">
		<uni-list padding="false" :border="false">
			<uni-list-item
				showArrow
				title="头像"
				clickable
				:padding="false"
				:border="false"
				@click="handleAvatar"
			>
				<template v-slot:footer>
					<avatar :img='userInfo.avatar'></avatar>
				</template>
			</uni-list-item>
			<uni-list-item
				showArrow
				:border="false"
				title="昵称"
				clickable
				:rightText="userInfo.nickname || '未填写'"
				@click="handleNickname"
			/>
			<uni-list-item
				showArrow
				:border="false"
				title="性别"
				clickable
				:rightText="userInfo.sex || '保密'"
				@click="handleSex"
			/>
			<uni-list-item
				showArrow
				:border="false"
				title="手机"
				clickable
				:rightText="userInfo.phone || '未绑定'"
				@click="handlePhone"
			/>
		</uni-list>
		<input-dialog ref="inputDialogRef"></input-dialog>
	</view>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			formData: {
				avatar: '',
				nickname: '',
				sex: '',
				phone: ''
			}
		};
	},
	computed: {
		...mapState('user', ['userInfo'])
	},
	created() {
		this.formData = Object.assign({}, this.userInfo);
	},
	methods: {
		...mapActions('user',['updateUserInfo']),
		async handleAvatar() {
			const avatar = await this.$http.uploadApi()
			this.updateUserInfo({ avatar })
		},
		handleNickname() {
			this.$refs.inputDialogRef.open({
				value: this.formData.nickname,
				title: '请填写昵称',
				confirm: nickname => {
					// this.formData.nickname = nickname;
					this.updateUserInfo({ nickname })
				}
			});
		},
		handleSex() {
			const itemList = ['男', '女']
			uni.showActionSheet({
				itemList,
				success: (res)=> {
					const tapIndex = res.tapIndex
					this.updateUserInfo({ sex: itemList[tapIndex] })
				},
				fail: (res)=> {
					console.log(res.errMsg);
				}
			});
		},
		handlePhone() {
			this.navTo('/pages/bind-phone/bind-phone')
		}
	}
};
</script>

<style lang="scss" scoped>
.userinfo-page {
	/deep/ .uni-list-item__content {
		justify-content: center;
	}
	.userinfo-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1px solid $uni-border-color-light;
	}
	.submit-btn {
		background-color: $uni-color-primary;
		color: white;
		margin: 20rpx $uni-spacing-container;
	}
}
</style>
