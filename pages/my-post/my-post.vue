<template>
	<view>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
		>
			<view class="post-item app-container" v-for="(item,index) in postList" :key='index'>
				<view class="post-item-header"  @click="toPageDetail(item)">
					<image class="post-avatar" :src="item.user.avatar ||'/static/default/default_avatar.png'" mode=""></image>
					<view class="post-userinfo">
						<view class="post-username">{{item.user.name}}</view>
						<view class="post-sex">{{item.user.sex}}</view>
					</view>	
					<view class="post-tag" v-if="item.is_top">
						精华
					</view>
				</view>
				<view class="post-item-body" @click="toPageDetail(item)">
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
					<view class="post-icon-box"
					@click='handleDeleteItem(item)'
					>
						<uni-icons class='post-icon'
							type='trash'
						 ></uni-icons>
						 <text>删除</text>
					</view>
					<view class="post-date">
						{{item.created_time}}
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				postList: []
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '社区列表'
			});
		},
		methods: {
			/**
			 * 帖子列表
			 */
			async upCallback({ num }) {
				const params = {}
				params.keyword = this.keyword
				params.page = num
				const { data } = await this.$http.getMyPostListApi(params);
				num === 1 ? this.postList = data.rows : this.postList = this.postList.concat(data.rows)
				this.mescroll.endBySize(this.postList.length , data.count)
			},
			resetUpScroll(){
				this.mescroll.resetUpScroll()
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
			// 删除帖子
			 handleDeleteItem(item){
				uni.showModal({
					title: '提示',
					content: '确定删除该帖子?',
					showCancel: false,
					showCancel:true,
					cancelText: '取消',
					confirmText: '确定',
					success:async res => {
						if(res.confirm){
							const params = {}
							params.id = item.id
							await this.$http.deletePostApi(params)
							this.toast('删除成功')
							setTimeout(()=>{
								this.mescroll.resetUpScroll()
								setTimeout(()=>{
									uni.pageScrollTo({
										scrollTop: 0,
										duration: 200
									})
								}, 30)
							}, 400)
						} 
					},
				});
			
			},
			toPageIndex() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			toPageDetail(item) {
				uni.navigateTo({
					url: '/pages/post-detail/post-detail?id='+item.id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
