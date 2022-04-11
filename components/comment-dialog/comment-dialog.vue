<template>
	<uni-popup ref="inputDialog" type="bottom" :is-mask-click="true"
	@change='handleClose'
	>
		<view class="modal app-container">
			<!-- Header -->
			<view class="modal__header">
				<!-- Title -->
				{{title}}
				<!-- Close icon sticks to the right -->
				<view class="btn-send" @click="handleConfirm">
					发送
				</view>
			</view>

			<!-- Content -->
			<uni-easyinput type="textarea"  v-model="temp.value" :placeholder="placeholder" 
				
			/>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'comment-dialog',
	props: {
		placeholder: {
			type: String,
			default: '请输入内容'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		confirmText: {
			type: String,
			default: '确定'
		}
	},
	data() {
		return {
			temp: {
				value: ''
			},
			title: '',
			success:null, //成功回调
		};
	},
	methods: {
		open({ value = '',success=null, confirm = null, title = '' }) {
			this.temp.value = value;
			this.title = title;
			this.success = success;
			this.$refs.inputDialog.open();
		},
		close(){
			this.$refs.inputDialog.close();
		},
		handleConfirm() {
			if(this.temp.value.trim() === '') {
				return uni.showToast({
					title: '没有评论内容',
					icon: 'none'
				})
			}
			this.$emit('confirm', this.temp.value);
			// 成功回调
			if(this.success){
				this.success(this.temp.value)
			}
			this.close()
		},
		handleClose(e){
				this.$emit('change', e.show)
		}
	}
};
</script>

<style lang="scss" scoped>
.modal {
	/* Border */
	border-radius: 4px;
	background-color: white;
	height: 360rpx;
}
.btn-send{
	width: 100rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $uni-color-primary;
	border-radius: $uni-border-radius-base;
	font-size: 12px;
	color: white;
}
.modal__header {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}

</style>
