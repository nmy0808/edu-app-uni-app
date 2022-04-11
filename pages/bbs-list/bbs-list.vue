<!-- 社区列表 -->
<template>
	<view class="bbs-list-page">
		<view class="flex align-center app-container bbs-navigator">
			<uni-icons type="back" @click="toPageIndex" size="20"></uni-icons>
			<uni-search-bar
				class="flex-1"
				radius="5"
				placeholder="搜点什么~"
				cancelButton="none"
				@confirm="search"
			/>
			<uni-icons type="plus" @click="toPagePublish" size="20"></uni-icons>
		</view>
		<scroll-view
			scroll-x="true"
			class="bbs-box noScorll"
			@scrolltolower="loadMoveBbsList"
		>
			<template v-for="(item, index) in bbsTemp.list">
				<view
					class="bbs-item"
					:class="{ active: item.id === bbsTemp.currentId }"
					:key="index"
					@click='handleBbsItem(item)'
				>
					{{ item.title }}
				</view>
			</template>
		</scroll-view>
		<!-- 总帖子 总用户 -->
		<divider></divider>
		<view class="bbs-user">
			<view class="bbs-num">总帖子: {{ bbsTemp.postCount }}</view>
			<view class="user-num">总用户: {{ bbsTemp.userCount }}</view>
		</view>
		<divider></divider>
		<!--  -->
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<view class="post-item app-container" v-for="(item,index) in postList" :key='index'>
				<view class="post-item-header">
					<image class="post-avatar" :src="item.user.avatar ||'/static/default/default_avatar.png'" mode=""></image>
					<view class="post-userinfo">
						<view class="post-username">{{item.user.name}}</view>
						<view class="post-sex">{{item.user.sex}}</view>
					</view>	
					<view class="post-tag" v-if="item.is_top">
						精华
					</view>
				</view>
				<view class="post-item-body">
					<mp-html :content='item.desc.text'></mp-html>
					<view class="post-img-box">
						<image class="post-img-item" :src="img" v-for="(img,iindex) in item.desc.images" :key='iindex'>
						</image>
					</view>
				</view>
				<view class="post-item-footer">
					<view class="post-icon-box">
						<uni-icons class='post-icon' type="chat" size="20"></uni-icons>
						<text>{{item.comment_count}}</text>
					</view>
					<view class="post-icon-box">
						<!-- issupport -->
						<uni-icons class='post-icon'
						 @click='handleSup(item)'
						:type="item.issupport?'heart-filled':'heart'" size="20"></uni-icons>
						<text>{{item.support_count}}</text>
					</view>
					<view class="post-date">
						{{item.created_time}}
					</view>
				</view>
			</view>
		</mescroll-body>
		<!--  -->
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
	mixins: [MescrollMixin], 
	data() {
		return {
			keyword: '',
			bbsTemp: {
				currentId: 0,
				page: 1,
				list: [],
				total: 0,
				postCount: 0,
				userCount: 0
			},
			postList: []
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '社区列表'
		});
		this.getBbsListData();
	},
	methods: {
		/**
		 * 社区列表
		 */
		async getBbsListData() {
			const { data } = await this.$http.getBbsListApi(this.bbsTemp.page);
			const { rows, count, postCount, userCount } = data;
			if (this.bbsTemp.page === 1) {
				rows.unshift({ id: 0, title: '全部' });
				this.bbsTemp.list = rows;
			} else {
				this.bbsTemp.list = this.bbsTemp.list.concat(rows);
			}
			this.bbsTemp.total = count;
			this.bbsTemp.postCount = postCount;
			this.bbsTemp.userCount = userCount;
		},
		// 加载更多社区列表
		loadMoveBbsList() {
			if (this.bbsTemp.list.length >= this.bbsTemp.total + 1) return;
			this.bbsTemp.page++;
			this.getBbsListData();
		},
		/**
		 * 帖子列表
		 */
		async upCallback({ num }) {
			const params = {}
			params.keyword = this.keyword
			params.bbs_id = this.bbsTemp.currentId
			params.page = num
			console.log(params);
			const { data } = await this.$http.getPostListApi(params);
			num === 1 ? this.postList = data.rows : this.postList = this.postList.concat(data.rows)
			this.mescroll.endBySize(this.postList.length , data.count)
			console.log(data.rows);
		},
		/**
		 * 搜索
		 */
		search(e) {
			this.keyword = e.value
			this.mescroll.resetUpScroll()
		},
		/**
		 * 切换社区
		 */
		handleBbsItem(item){
			this.bbsTemp.currentId = item.id
			this.mescroll.resetUpScroll()
		},
		/**
		 * 发布
		 */
		toPagePublish() {
					uni.navigateTo({
						url :'/pages/publish-post/publish-post'
					})
		},
		// 点赞
		async handleSup(item){
			// 0:点赞, 1:取消点赞
			const fechApiMap = [this.$http.postSupportApi,this.$http.unPostSupportApi]
			const params = {}
			params.post_id = item.id
			const fetchApi = fechApiMap[item.issupport ? 1 : 0]
			const { data }  = await fetchApi(params)
			item.issupport = !item.issupport
			if(item.issupport){
				this.toast('已点赞')
				item.support_count ++
			}else{
				this.toast('取消点赞')
				item.support_count --
			}
		},
		toPageIndex() {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.bbs-navigator{
		padding-top: var(--status-bar-height);
	}
.bbs-box {
	white-space: nowrap;
	margin-bottom: 20rpx;
}
.bbs-item {
	display: inline-flex;
	padding: 10rpx 20rpx;
	font-size: 14px;
	border: 1px solid $uni-border-color-light;
	border-radius: $uni-border-radius-base;
	background-color: $uni-img-default-color;
	margin: 0 10rpx;
	&:first-of-type {
		margin-left: 20rpx;
	}
	&.active {
		background-color: $uni-color-success;
		border: 1px solid $uni-color-success;
		color: white;
	}
}
.bbs-user {
	display: flex;
	align-items: center;
	height: 60rpx;
	font-size: 14px;
	color: $uni-color-subtitle;
	.bbs-num {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.user-num {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
// 帖子列表
	.post-item{
		padding-bottom: 4rpx;
		box-sizing: border-box;
		border-bottom: 1px solid $uni-border-color-light;
		// padding: 40rpx 0;
		.post-item-header{
			padding-top: 20rpx;
			display: flex;
			align-items: center;
			.post-avatar{
				width : 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				background-color: $uni-img-default-color;
			}
			.post-userinfo{
				.post-username{
					font-size: 14px;
					color: $uni-color-primary;
				}
				.post-sex{
					font-size: 12px;
					color: $uni-color-subtitle;
				}
			}
			.post-tag{
				background-color: $uni-color-warning;
				color: white;
				height: 50rpx;
				width: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: $uni-border-radius-base;
				font-size: 12px;
				margin-left: auto;
			}
		}
		.post-item-body{
			margin-top: 20rpx;
			.post-img-box{
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;
				.post-img-item{
					width: 32%;
					height: 200rpx;
					margin-left: 2%;
				}
				.post-img-item:nth-of-type(3n + 1){
					margin-left: 0;
				}
				.post-img-item:nth-of-type(3n){
					margin-right: 0;
				}
				.post-img-item:nth-of-type(n + 4){
					margin-top: 14rpx;
				}
			}
		}
		.post-item-footer{
			margin: 20rpx 0;
			display: flex;
			align-items: center;
			font-size: 14px;
			.post-icon-box{
				display: flex;
				align-items: center;
				margin-right: 20rpx;
				.post-icon{
					margin-right: 6rpx;
				}
			}

			.post-date{
				color: $uni-color-subtitle;
				margin-left: auto;
			}
		}
	}
</style>
