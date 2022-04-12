<template>
	<view class="publish-header app-container">
		<view class="publish-header">
			<picker
				@change="handleSelectBbs"
				:value="bbsTemp.currendIndex"
				range-key="title"
				:range="bbsTemp.list"
			>
				<view class="uni-input">
					{{
						bbsTemp.list.length
							? bbsTemp.list[bbsTemp.currendIndex].title
							: '请选择社区'
					}}
				</view>
			</picker>
			<!-- <button type="default" @click="handleSelectArea">选择地区</button> -->
			<uni-easyinput
				v-model="content"
				placeholder="请填写帖子内容"
				type="textarea"
			/>
			<view class="publish-img-title">
				<view class="">点击可浏览选好的图片</view>
				<view class="">{{ images.length }}/9</view>
			</view>
			<view class="post-img-box ">
				<view
					class="post-img-item"
					v-for="(item, index) in images"
					:key="index"
				>
					<image
						class="post-img"
						:src="item"
						@click.once="handlePreview(item)"
					></image>
					<!-- 删除图片按钮 -->
					<uni-icons
						class="post-img-close"
						type="close"
						color="#ffffff"
						@click.once="handleDeleteImg(index)"
					></uni-icons>
				</view>
				<!-- 上传图片 -->
				<view class="post-img-item img-plus" @click="handleUpload" v-if="images.length < 9">
					<uni-icons type="plus" size="30" color="#dddbdf"></uni-icons>
				</view>
			</view>
		</view>
		<view class="publish-bottom">
			<button class="button" type="primary" @click="handlePublish">发布</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: '',
			images: [],
			bbsTemp: {
				page: 1,
				currentId: 0,
				currendIndex: 0,
				list: [],
				total: 0
			}
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '发布帖子'
		});
		this.getBbsListData();
	},
	methods: {
		select(e){
			console.log(e);
		},
		/**
		 * 社区列表
		 */
		async getBbsListData() {
			const { data } = await this.$http.getBbsListApi(this.bbsTemp.page);
			const { rows, count, postCount, userCount } = data;
			if (this.bbsTemp.page === 1) {
				this.bbsTemp.list = rows;
				this.bbsTemp.list.unshift({
					id: null,
					title: '请选择社区'
				});
			} else {
				this.bbsTemp.list = this.bbsTemp.list.concat(rows);
			}
			this.bbsTemp.total = count;
			console.log(this.bbsTemp);
		},
		// 选择社区
		handleSelectBbs({ detail }) {
			const index = detail.value;
			const bbs = this.bbsTemp.list[index];
			this.bbsTemp.currentId = bbs.id;
			this.bbsTemp.currendIndex = index;
		},
		// 浏览图片
		handlePreview(item) {
			console.log(item);
			uni.previewImage({
				urls: [item]
			});
		},
		// 删除图片
		handleDeleteImg(index) {
			this.images.splice(index, 1);
		},
		// 上传图片
		async handleUpload() {
			const chooseOption = {}
			chooseOption.count = 1 //每次只能选择一张图片
			chooseOption.extension = ['jpg','png'] //支持文件类型
		
			const img = await this.$http.uploadApi(null, chooseOption);
			this.images.push(img);
		},
		// 发布
		async handlePublish() {
			if (this.bbsTemp.currentId === null) {
				return uni.toast('请选择社区');
			}
			if (this.content.trim() === '') {
				return uni.toast('帖子内容不能为空');
			}
			const params = {};
			params.bbs_id = this.bbsTemp.currentId;
			params.content = [];
			const item = { images: this.images, text: this.content };
			params.content.push(item);
			await this.$http.publishPostApi(params);
			this.toast('发布成功');
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 500);
		}
	}
};
</script>

<style lang="scss" scoped>
.publish-img-title {
	display: flex;
	justify-content: space-between;
	padding-top: 10rpx;
	font-size: 12px;
	// color: $uni-color-subtitle;
}
.post-img-box {
	margin-top: 20rpx;
	display: flex;
	flex-wrap: wrap;
	.post-img-item {
		width: 32%;
		height: 200rpx;
		margin-left: 2%;
		position: relative;
		.post-img {
			width: 100%;
			height: 100%;
		}
		.post-img-close {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			z-index: 2;
			background-color: rgba($color: #000000, $alpha: 0.3);
		}
	}
	.post-img-item:nth-of-type(3n + 1) {
		margin-left: 0;
	}
	.post-img-item:nth-of-type(3n) {
		margin-right: 0;
	}
	.post-img-item:nth-of-type(n + 4) {
		margin-top: 14rpx;
	}
	.img-plus {
		box-sizing: border-box;
		border: 1px solid $uni-border-color;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: $uni-border-radius-base;
	}
}
.publish-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 130rpx;
	padding: $uni-spacing-container;
	box-sizing: border-box;
	background-color: $uni-img-default-color;
	.button {
		width: 100%;
		height: 100%;
	}
}
</style>
