<template>
	<view class="post-detail app-container">
		<view class="post-item-header">
			<image
				class="post-avatar"
				:src="detailData.user.avatar || '/static/default/default_avatar.png'"
				mode=""
			></image>
			<view class="post-userinfo">
				<view class="post-username">{{ detailData.user.name }}</view>
				<view class="post-sex">{{ detailData.user.sex }}</view>
			</view>
			<view class="post-tag" v-if="detailData.is_top">精华</view>
		</view>
		<!-- content -->
		<template v-for="(item, index) in detailData.content">
			<mp-html :content="item.text"></mp-html>
			<image
				class="w-100 mt-3"
				v-for="(img, iindex) in item.images"
				:key="iindex"
				:src="img"
				mode=""
			></image>
			<divider></divider>
		</template>
		<!-- 评论 -->
		<mescroll-body
			height='200rpx'
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<template v-for="(item, index) in comments">
				<comment-item :data="item" @submit="handleOpen"></comment-item>
			</template>
			<!-- 占位输入框 -->
			
		</mescroll-body>
	<view class="bottom-input-default">
		2
	</view>
		<!-- 底部输入框 -->
		<view class="fixed-bottom" v-if="showInput">
			<view
				class="bottom-input animate__animated animate__fadeIn"
				@click="handleOpen()"
			>
				说点什么~
			</view>
			<!-- 收藏 -->
			<uni-icons
				class="post-icon"
				@click="handleSup"
				:type="detailData.issupport ? 'heart-filled' : 'heart'"
				size="20"
			></uni-icons>
		</view>

		<comment-dialog
			ref="dialogRef"
			placeholder="说点什么~"
			@change="handleDialogStateChange"
		></comment-dialog>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			showInput: true,
			comments: [],
			detailData: {
				id: null,
				desc: {
					text: '',
					images: []
				},
				content: [
					{
						text: '',
						images: []
					}
				],
				user_id: null,
				comment_count: 0,
				support_count: 0,
				is_top: 0,
				created_time: '',
				user: {
					id: null,
					avatar: '',
					sex: '未知',
					name: ''
				},
				issupport: false
			}
		};
	},
	async onLoad(e) {
		this.id = e.id;
		await this.getDetailData();
		uni.setNavigationBarTitle({
			title: '帖子详情'
		});
	},
	methods: {
		async getDetailData() {
			const params = {};
			params.id = this.id;
			const { data } = await this.$http.getPostDetailApi(params);
			this.detailData = data;
		},
		/**
		 * 获取评论列表
		 */
		async upCallback({ num }) {
			const params = {};
			params.post_id = this.id;
			const { data } = await this.$http.getPostCommentListApi(params);
			num === 1
				? (this.comments = data.rows)
				: (this.comments = this.comments.concat(data.rows));
			this.mescroll.endBySize(this.comments.length, data.count);
		},
		handleOpen(target) {
			this.$refs.dialogRef.open({
				title: '发送评论',
				success: async content => {
					const parmas = {};
					parmas.post_id = this.id;
					parmas.content = content;
					// 如果不是顶级回复, 是回复目标评论
					if (target) {
						parmas.reply_id = target.reply_id || target.id;
						parmas.reply_user = {};
						parmas.reply_user.id = target.user.id;
						parmas.reply_user.username =
							target.user.username || target.user.name;
						parmas.reply_user.avatar = target.user.avatar;
					}
					await this.$http.getPostReplyApi(parmas);
					this.toast('评论成功');
					this.mescroll.resetUpScroll();
				}
			});
		},
		/**
		 * 底部输入框显示切换
		 */
		handleDialogStateChange(show) {
			if (show) {
				this.showInput = false;
			} else {
				this.showInput = true;
			}
		},
		// 点赞
		async handleSup() {
			// 0:点赞, 1:取消点赞
			const fechApiMap = [
				this.$http.postSupportApi,
				this.$http.unPostSupportApi
			];
			const params = {};
			params.post_id = this.id;
			const fetchApi = fechApiMap[this.detailData.issupport ? 1 : 0];
			const { data } = await fetchApi(params);
			this.detailData.issupport = !this.detailData.issupport;
			if (this.detailData.issupport) {
				this.toast('已点赞');
				this.detailData.support_count++;
			} else {
				this.toast('取消点赞');
				this.detailData.support_count--;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.post-detail {
	.post-item-header {
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		.post-avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			background-color: $uni-img-default-color;
		}
		.post-userinfo {
			.post-username {
				font-size: 14px;
				color: $uni-color-primary;
			}
			.post-sex {
				font-size: 12px;
				color: $uni-color-subtitle;
			}
		}
		.post-tag {
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
	.bottom-input-default{
		height: 110rpx;
	}
	.fixed-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 110rpx;
		background-color: $uni-img-default-color;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.bottom-input {
			width: 100%;
			height: 100%;
			border: 1px solid $uni-border-color-light;
			background-color: white;
			color: $uni-color-subtitle;
			font-size: 12px;
			display: flex;
			align-items: center;
			text-indent: 1em;
			margin-right: 20rpx;
		}
	}
}
</style>
