<template>
	<view>
		<!-- 封面 -->
		<view class="cover-box" v-if="!isShowPlayer">
			<image class="cover" :src="detailData.cover" mode=""></image>
			<view class="cover-mask">
				<view class="over" v-if="isOver">直播已结束</view>
				<view class="cover-time" v-else>
					<view class="start" v-if="detailData.start_time"> {{ '开始时间:'+detailData.start_time }}</view>
					<view class="end" v-if="detailData.end_time"> {{ '结束时间:'+detailData.end_time }}</view>
				</view>
			</view>
		</view>
		<!-- 播放器 -->
		<live-play v-if="!isOver && isShowPlayer" ref="playRef"></live-play>
		<!--  -->
		<view class="text-danger app-container">
			系统提示:直播内容及互动评论须严格遵守直播规范，严禁传播违法违规、低俗血暴、吸烟酗酒、造谣诈骗等不良有害信息。
		</view>
		
		<!-- #ifndef MP -->
		<!-- 发言 -->
		<view class="live-play-input">
			<uni-easyinput
				class="easyinput"
				v-model="danmuValue"
				placeholder="说点什么~"
				@confirm="sendDanmu"
			/>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
// #ifdef H5
// import axios from 'axios'
// #endif
export default {
	data() {
		return {
			id: null,
			detailData: {
				playUrl: ''
			},
			danmuList: [],
			danmuValue: ''
		};
	},
	onLoad(e) {
		this.id = e.id;
		/**
		 * 获取直播详情和弹幕列表后初始化播放器组件
		 */
		// axios.all([this.getData(), this.getDanmu()]).then(axios.spread( (acct, perms) =>{
		//   // 两个请求现在都执行完成
		// 		const params = {};
		// 		// 准备播放url和弹幕列表
		// 		params.playUrl = this.detailData.playUrl;
		// 		params.danmuList = this.danmuList;
		// 		// 初始化播放器组件
		// 		this.$refs.playRef.init(params);
		// }));
		Promise.all([this.getData(), this.getDanmu()]).then(_ => {
			if (this.isShowPlayer) {
				console.log(this.detailData);
				const params = {};
				// 准备播放url和弹幕列表
				params.playUrl = this.detailData.playUrl;
				params.danmuList = this.danmuList;
				// 初始化播放器组件
				this.$refs.playRef.init(params);
			}
		});
	},
	computed: {
		// 判断直播结束
		isOver() {
			return new Date(this.detailData.end_time) - new Date() < 0;
		},
		// 是否显示播放器
		isShowPlayer(){
			return this.detailData.isbuy || parseFloat(this.detailData.price) === 0
		}
	},
	methods: {
		async getData() {
			const params = {};
			params.id = this.id;
			const { data } = await this.$http.getLiveDetailApi(params);
			this.detailData = data;
		},
		async getDanmu() {
			const params = {};
			params.live_id = this.id;
			const { data } = await this.$http.getLiveCommentListApi(params);
			this.danmuList = data.rows;
		},
		async sendDanmu() {
			const params = {};
			params.content = this.danmuValue;
			params.live_id = this.id;
			params.time = parseInt(this.$refs.playRef.currentTime);
			params.color = this.getRandomColor();
			// 发送弹幕请求
			const { data } = await this.$http.sendDanmuApi(params);
			// 播放器发送弹幕
			try {
				this.$refs.playRef.sendDanmu({
					text: data.content,
					id: data.id,
					color: data.color,
					time: data.time
				});
			} catch (e) {
				//TODO handle the exception
			}
			this.danmuValue = '';
		},
		/**
		 * 随机颜色
		 */
		getRandomColor() {
			const rgb = [];
			for (let i = 0; i < 3; ++i) {
				let color = Math.floor(Math.random() * 256).toString(16);
				color = color.length == 1 ? '0' + color : color;
				rgb.push(color);
			}
			return '#' + rgb.join('');
		}
	}
};
</script>

<style lang="scss" scoped>
.cover-box {
	width: 100%;
	height: 420rpx;
	position: relative;
	.cover {
		width: 100%;
		height: 100%;
	}
	.cover-mask {
		background-color: rgba($color: #000000, $alpha: 0.5);
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		.cover-time {
			.start {
			}
			.end {
				margin-top: 10rpx;
			}
		}
	}
}

.live-play-input {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	background-color: $uni-img-default-color;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	box-sizing: border-box;
}
.easyinput {
	background-color: white;
}
</style>
