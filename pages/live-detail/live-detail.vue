<template>
	<view>
		<live-play ref="playRef"></live-play>
		<view class="text-danger app-container">
			系统提示:直播内容及互动评论须严格遵守直播规范，严禁传播违法违规、低俗血暴、吸烟酗酒、造谣诈骗等不良有害信息。
		</view>
		<view class="live-play-input">
			<uni-easyinput
				class="easyinput"
				v-model="danmuValue"
				placeholder="说点什么~"
				@confirm="sendDanmu"
			/>
		</view>
		
	</view>
</template>

<script>
	// #ifdef H5
	import axios from 'axios'
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
			if (this.detailData.isbuy) {
				const params = {};
				// 准备播放url和弹幕列表
				params.playUrl = this.detailData.playUrl;
				params.danmuList = this.danmuList;
				// 初始化播放器组件
				console.log('????');
				this.$refs.playRef.init(params);
			}
		});
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
		async sendDanmu(){
			const params = {}
			params.content = this.danmuValue
			params.live_id = this.id
			params.time = parseInt(this.$refs.playRef.currentTime)
			params.color = this.getRandomColor()
			// 发送弹幕请求
			const { data } = await this.$http.sendDanmuApi(params)
			// 播放器发送弹幕
			try{
			this.$refs.playRef.sendDanmu({text : data.content, id: data.id, color: data.color, time:data.time });
			}catch(e){
				//TODO handle the exception
			}
			this.danmuValue = ''
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
