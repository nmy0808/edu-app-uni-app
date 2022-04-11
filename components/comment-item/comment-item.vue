<template>
	<view class="comment-item" >
		<view class="left">
			<image class="avatar" :src="data.user.avatar ||'/static/default/default_avatar.png'" mode=""></image>
		</view>
		<view class="right" >
			<view class="username">
				{{data.user.name}}{{data.reply_user && ' @'+ data.reply_user.username}}
				<view class="rep" @click="handlePublishComment()">回复</view>
			</view>
			<view class="content" >
				{{data.content}}
			</view>
			<view class="date">
				{{$tool.getHumanTime(data.created_time) }}
			</view>
			<!-- 回复 -->
			<view class="rep-box" v-if="data.post_comments && data.post_comments.length">
				<template v-for="(item,index) in data.post_comments">
					<comment-item :data='item' :key='index' @submit='handlePublishComment(item)'></comment-item>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"comment-item",
		props:{
			data: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handlePublishComment(item){
				// console.log(this.data.user.name);
				if(item){
					this.$emit('submit', item)
				}else{
				this.$emit('submit', this.data)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-item{
			display: flex;
			margin-top: 30rpx;
			.left{
				margin-top:4rpx;
				.avatar{
					width : 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					background-color: $uni-img-default-color;
				}
			}
			.right{
				flex: 1;
				.username{
					font-size: 12px;
					color: $uni-color-primary;
					display: flex;
				}
				.rep{
					margin-left: auto;
					color: $uni-color-subtitle;
				}
				.content{
					font-size: 14px;
				}
				.date{
					font-size: 12px;
					color: $uni-color-subtitle;
				}
			}
			.rep-box{
				margin: 20rpx 20rpx 20rpx 0rpx;
				background-color: $uni-img-default-color;
				padding: 20rpx;
				.comment-item{
					margin: 0rpx 10rpx;
					margin: 10rpx;
				}
			}
		}
</style>
