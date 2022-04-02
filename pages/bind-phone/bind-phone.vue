<template>
	<view class="login-page">
		<view class="login-header">
			<!-- #ifndef MP -->
			<uni-nav-bar
				statusBar
				title=""
				:border="false"
				leftIcon="back"
				color="white"
				backgroundColor="transparent"
				@clickLeft="navBack"
			></uni-nav-bar>
			<!-- #endif -->
		</view>
		<view class="login-body">
			<view class="login-title">绑定手机号</view>
			<uni-forms ref="form" :modelValue="formData">
				<uni-forms-item name="phone">
					<view class="input-code-box">
						<uni-easyinput
							class="input-code"
							prefixIcon="chat"
							v-model="formData.phone"
							:styles="{ background: '#cccccc' }"
							placeholder="请输入手机号"
							type="number"
							maxlength="11"
						/>
						<send-code class="send-code" @send="handleSendCode"></send-code>
					</view>
					</uni-forms-item>
				<uni-forms-item name="code">
					<uni-easyinput
						prefixIcon="chat"
						v-model="formData.code"
						:styles="{ background: '#cccccc' }"
						placeholder="请输入验证码"
						type="number"
						maxlength="11"
					/>
				</uni-forms-item>
			
				</uni-forms-item>
				<uni-forms-item name="password">
					<button class="btn-login" form-type="submit" @click="handleSubmit">
						绑定
					</button>
				</uni-forms-item>
			</uni-forms>
			<!-- -->
		</view>
	</view>
</template>

<script>
import rules from '@/common/js/rules.js';
export default {
	data() {
		return {
			formData: {
				phone: 13100889930,
				code: null,
			}
		};
	},
	onReady() {
		// 需要在onReady中设置规则
		this.$refs.form.setRules(rules());
	},
	methods: {
		async handleSubmit(e) {
			// 全部验证
			await this.$refs.form.validate();
			// // 指定字段验证
			// await this.$refs.form.validateField('phone');
			// // 重置验证
			// await this.$refs.form.resetFields()
			const params = {}
			params.phone = this.formData.phone + ''
			params.code = this.formData.code + ''
			await this.$http.bindMobileApi(params)
			this.toast('绑定成功')
			setTimeout(()=>{
				this.navBack(2)
			}, 1000)
		},
		async handleSendCode(){
			// 指定字段验证
			await this.$refs.form.validateField('phone');
			const params = {}
			params.phone = this.formData.phone
			// 绑定手机
			const {data} = await this.$http.getCaptchaApi(params.phone)
			uni.showToast({
				title: '123123',
				icon: 'none'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.login-page {
	.login-header {
		height: calc(200rpx + var(--status-bar-height));
		background-image: linear-gradient(120deg, #3bfdaf 0%, #70d6f2 100%);
	}
	.login-body {
		position: relative;
		padding: 0 40rpx;
		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			height: 50rpx;
			top: -49rpx;
			background-color: white;
			border-radius: 20rpx 20rpx 0 0;
		}
		.login-title {
			padding: 50rpx 0;
			font-size: $uni-font-size-title;
		}
		// 验证码
		.input-code-box {
			display: flex;
			.input-code {
				flex: 1;
			}
			.send-code {
				width: 200rpx;
			}
		}
		.login-other {
			display: flex;
			justify-content: space-between;
			font-size: $uni-font-size-base;
			.login-reg {
				color: $uni-color-primary;
			}
			.login-find-password {
				color: $uni-color-subtitle;
			}
		}
		.login-auth {
			display: flex;
			justify-content: center;
			align-items: center;
			.wx-icon {
				margin-top: 60rpx;
				width: 80rpx;
				height: 80rpx;
			}
		}
		.login-readme {
			margin-top: 40rpx;
			/deep/ .uni-data-checklist {
				display: flex;
				justify-content: center;
			}
		}
	}
	/deep/ .uni-easyinput {
		background-color: #f5f5f5;
		border: 0;
		padding: 20rpx;
		box-sizing: border-box;
		.uni-easyinput__content {
			border: 0;
		}
	}
	/deep/ .checklist-text {
		color: $uni-color-subtitle !important;
	}

	.btn-login {
		color: #ffffff;
		background-color: $uni-color-primary;
	}
}
</style>
