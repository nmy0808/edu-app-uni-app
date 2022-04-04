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
        @clickLeft="handleNavigator"
      ></uni-nav-bar>
      <!-- #endif -->
    </view>
    <view class="login-body">
      <view class="login-title">{{ type === "login" ? "登录" : "注册" }}</view>
      <uni-forms ref="form" :modelValue="formData">
        <uni-forms-item name="username">
          <uni-easyinput
            prefixIcon="person"
            v-model="formData.username"
            :styles="{ background: '#cccccc' }"
            placeholder="请输入用户名"
            maxlength="11"
          />
        </uni-forms-item>
        <uni-forms-item name="password">
          <uni-easyinput
            prefixIcon="locked"
            v-model="formData.password"
            placeholder="请输入密码"
            maxlength="12"
          />
        </uni-forms-item>
        <uni-forms-item name="repassword" v-if="type === 'reg'">
          <uni-easyinput
            prefixIcon="locked"
            v-model="formData.repassword"
            placeholder="请输入确认密码"
            maxlength="12"
          />
        </uni-forms-item>
        <uni-forms-item name="password">
          <button class="btn-login" form-type="submit" @click="handleSubmit">
            登录
          </button>
        </uni-forms-item>
      </uni-forms>
      <!-- -->
      <view class="login-other">
        <view class="login-reg" @click="handleSwitchType">
          {{ type === "reg" ? "去登录" : "注册账号" }}
        </view>
        <view
          class="login-find-password"
          @click="toPageFindPassword"
          v-if="type === 'login'"
        >
          忘记密码
        </view>
      </view>
      <view class="login-auth">
        <image class="wx-icon" src="@/static/default/wx.png" mode=""></image>
      </view>
      <view class="login-readme" v-if="type === 'login'">
        <uni-data-checkbox
          multiple
          v-model="readme"
          :localdata="[{ text: '已阅读并同意协议&隐私声明', value: 1 }]"
          selectedColor="#7ac98a"
          selectedTextColor="#b0adaa"
        ></uni-data-checkbox>
        <!-- <checkbox-group @change="handleReadmeChange">
					<label>
						<checkbox color="#7ac98a" value="1" :checked="readme === true" />
						<text>已阅读并同意协议&隐私声明</text>
					</label>
				</checkbox-group> -->
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import rules from "@/common/js/rules.js";
export default {
  data() {
    return {
      type: "login", // reg: 注册

      formData: {
        username: "nmymay01",
        password: "123123",
        repassword: "123123",
      },
      readme: [0],
    };
  },
  onReady() {
    // 需要在onReady中设置规则
    this.$refs.form.setRules(rules());
  },
  methods: {
    ...mapActions("user", ["login"]),
    /**
     * 切换注册/登录
     */
    async handleSwitchType() {
      // 重置验证
      await this.$refs.form.resetFields();
      if (this.type === "login") {
        this.type = "reg";
      } else {
        this.type = "login";
      }
    },
    /**
     *   提交
     */
    async handleSubmit(e) {
      // 全部验证
      await this.$refs.form.validate();
      const params = {};
      params.username = this.formData.username;
      params.password = this.formData.password;
      // 登录
      if (this.type === "login") {
        const isRead = !!this.readme[0];
        if (!isRead) {
          this.toast("请先阅读协议并勾选同意");
          return;
        }
        const { phone } = await this.login(params);
        this.toast("登录成功");
        // 判断 是否绑定手机号
        setTimeout(() => {
          if (phone) {
            uni.switchTab({
              url: "/pages/index/index",
            });
          } else {
            this.navTo("/pages/bind-phone/bind-phone");
          }
        }, 1000);
      } else {
        // 注册
        params.repassword = this.formData.repassword;
        await this.$http.registerApi(params);
        this.toast("注册成功");
        this.handleSwitchType();
      }
    },
    async toPageFindPassword() {
      // 重置验证
      await this.$refs.form.resetFields();
      this.navTo("/pages/find-password/find-password");
    },
    /**
     * 点击返回按钮
     */
    handleNavigator() {
      if (this.type === "login") {
        this.navBack();
      } else {
        this.handleSwitchType();
      }
    },
  },
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
      content: "";
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
