<template>
  <view class="my-page">
    <uni-nav-bar
      statusBar
      right-icon="more-filled"
      title="我的"
      backgroundColor="#5ccb84"
      :border="false"
      color="white"
    ></uni-nav-bar>
    <!-- header -->
    <template v-if="!userInfo">
      <view
        class="my-user app-container"
        @click.stop="navTo('/pages/login/login')"
      >
        <avatar></avatar>
        <!-- 判断登录: 显示用户名还是登录按钮 -->
        <view class="user-desc">
          <view class="user-top">立即登录</view>
          <view class="user-bottom">登录解锁更多功能</view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="my-user app-container" @click.stop="toPageUserInfo">
        <avatar :img="userInfo.avatar"></avatar>
        <!-- 判断登录: 显示用户名还是登录按钮 -->
        <view class="user-desc username">
          <view class="user-top">
            {{ userInfo.nickname || userInfo.username }}
          </view>
          <view class="user-bottom">{{ userInfo.desc || "暂无描述" }}</view>
        </view>
      </view>
    </template>
    <!-- 订单菜单 -->
    <view class="my-icon-menu shadow" :style="{ transform: `translateY(${customBar})` }">
      <template v-for="(item, index) in iconMenu">
        <view class="menu-item" :key="index" @click="item.handle">
          <uni-icons
            class="menu-icon"
            :type="item.icon"
            color="#f5cc69"
            size="24"
          />
          <view class="menu-label">{{ item.text }}</view>
        </view>
      </template>
    </view>
    <!-- 列表 -->
    <uni-list :border="false" class='my-list'>
      <uni-list-item clickable showArrow @click="toPageCoupon">
        <template slot="header">
          <uni-icons class="my-list-icon" type="wallet" color="" size="20" />
          <text class="my-list-label">我的优惠券</text>
        </template>
      </uni-list-item>
      <uni-list-item clickable showArrow>
        <template slot="header">
          <uni-icons class="my-list-icon" type="help" color="" size="20" />
          <text class="my-list-label">常见问题</text>
        </template>
      </uni-list-item>
      <uni-list-item clickable showArrow @click="toPageSetting">
        <template slot="header">
          <uni-icons class="my-list-icon" type="settings" color="" size="20" />
          <text class="my-list-label">设置</text>
        </template>
      </uni-list-item>
    </uni-list>
    <!-- 菜单列表 -->
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import systemInfo  from '@/common/js/systemInfo.js'
export default {
  data() {
    return {
      iconMenu: [
        { icon: "wallet", text: "订单", handle: () => {
          this.navTo('/pages/order/order')
        } },
        { icon: "chat", text: "消息", handle: () => {} },
        { icon: "star", text: "收藏", handle: () => {} },
        { icon: "map", text: "在学", handle: () => {} },
      ],
			customBar: 0
    };
  },
  mounted() {
		systemInfo().then(res=>{
			this.customBar = res.navigator + 'px'
		})
	},
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    toPageLogin() {
      this;
    },
    toPageUserInfo() {
      this.navTo("/pages/userinfo/userinfo");
    },
		toPageSetting(){
			this.navTo('/pages/setting/setting')
		},
		toPageCoupon(){
			this.navTo('/pages/coupon/coupon')
		}
  },
};
</script>

<style lang="scss" scoped>
.my-page {
  .my-header {
    background-color: $uni-color-primary;
    height: 360rpx;
    text-align: center;
    position: relative;
  }
  .my-user {
    display: flex;
    padding-top: 50rpx;
    box-sizing: border-box;
    background-color: $uni-color-primary;
    height: 360rpx;
    border-radius: 0 0 80rpx 80rpx;
    .user-desc {
      margin-left: $uni-spacing-container;
      color: white;
      .user-top {
        margin-top: 16rpx;
        font-size: $uni-font-size-lg;
        &.username {
          font-size: $uni-font-size-base;
        }
      }
      .user-bottom {
        margin-top: 10rpx;
        font-size: $uni-font-size-sm;
      }
    }
  }
  .my-icon-menu {
    position: absolute;
    top: 300rpx;
    left: $uni-spacing-container;
    right: $uni-spacing-container;
    z-index: 999;
    border-radius: $uni-border-radius-lg;
    padding: 30rpx 0;
    display: flex;
    justify-content: space-around;
    background: white;
    .menu-item {
      text-align: center;
      .menu-icon {
      }
      .menu-label {
        margin-top: 4rpx;
        font-size: $uni-font-size-base;
      }
    }
  }
  .my-list{
    padding-top: 30rpx;
  }
  .my-list-icon {
    color: $uni-color-primary;
  }
  .my-list-label {
    margin-left: 10rpx;
  }
}
</style>
