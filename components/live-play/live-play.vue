<template>
	<view class="live-play-container">
		<!-- #ifdef H5 -->
		<div id="mse"></div>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<live-player
			:src="demoUrl"
			autoplay
			@statechange="statechange"
			@error="error"
			style="width: 100vw;height: 400rpx;"
		/>
		<!-- #endif -->

		<!-- #ifdef APP -->
		<video
			id="myVideo"
			:src="demoUrl"
			style="width: 100vw;height: 400rpx;"
			:autoplay="false"
			:danmu-list="danmuList"
			@timeupdate='handleAppTimeUpdate'
			enable-danmu
			danmu-btn
			controls
		></video>
		<!-- #endif -->

	
		<!-- <view class="live-play-input">
			<uni-easyinput
				class="easyinput"
				v-model="value"
				placeholder="说点什么~"
				@confirm="sendDanmu"
			/>
		</view> -->
	</view>
</template>

<script>
// #ifdef H5
import 'xgplayer';
import FlvPlayer from 'xgplayer-flv';
// #endif
export default {
	name: 'live-play',
	data() {
		return {
			// currentDanmu: '',
			videoContext: null,
			danmuList: [],
			currentTime: 0,
			demoUrl:
				'//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
		};
	},
	props: {},
	mounted() {},
	beforeDestroy() {
		// #ifdef H5
		// 注销监听当前播放进度的事件 (h5)
		this.videoContext.off('timeupdate', this.handleH5TimeUpdate);
		// #endif
	},
	methods: {
		onloaded(){
			this.videoContext.play()
			console.log(44444);
		},
		/**
		 *  视频url, 弹幕列表
		 */
		init({ playUrl, danmuList }) {
			console.log(2222);
			// 处理弹幕格式
			this.danmuList = this.parseDanmuList(danmuList);
			// 1.初始化播放器
			// #ifdef APP
			//   app播放器初始化
			this.videoContext = uni.createVideoContext('myVideo');

			// #endif
			// #ifdef H5
			//   h5播放器初始化
			this.videoContext = new FlvPlayer({
				id: 'mse',
				// url: playUrl,
				url: this.demoUrl,
				height: uni.upx2px(420),
				width: window.innerWidth,
				isLive: true,
				playsinline: true,
				'x5-video-player-type': 'h5',
				danmu: {
					comments: this.danmuList, // 弹幕列表
					area: {
						start: 0,
						end: 1
					},
					closeDefaultBtn: false,
					defaultOff: false,
					panel: false
				}
			});
			// 监听当前播放时间 (h5)
			this.videoContext.on('timeupdate', this.handleH5TimeUpdate);
			// #endif
		},
		/**
		 * 发送弹幕
		 */
		sendDanmu({ text, id, color, time }) {
			// #ifdef H5
			this.videoContext.danmu.sendComment({
				//发送弹幕
				duration: 3000,
				id: id, //id
				start: time,
				txt: text, //弹幕
				style: this.getH5DanmuStyle(color)
			});
			// #endif
			// #ifdef APP
			this.videoContext.sendDanmu({
				text: text, //弹幕
				color: color
			});
			// #endif
		},
		/**
		 *  监听当前播放时间 (h5)
		 */
		handleH5TimeUpdate(e) {
			this.currentTime = e.currentTime * 1000;
		},
		/**
		 *  监听当前播放时间 (app)
		 */
		handleAppTimeUpdate({detail}) {
			this.currentTime = detail.currentTime * 1000;
		},
		/**
		 * 处理弹幕列表的格式
		 */
		parseDanmuList(danmuList) {
			let danmuListTemp = JSON.parse(JSON.stringify(danmuList));
			// #ifdef APP
			return danmuListTemp.map(item => {
				const res = {};
				res.id = item.id;
				res.text = item.content;
				res.color = item.color;
				res.time = item.time;
				return res;
			});
			// #endif
			// #ifdef H5
			return danmuListTemp.map(item => {
				const res = {};
				res.id = item.id;
				res.txt = item.content;
				res.start = item.time * 1000;
				res.duration = 3000;
				res.mode = 'scroll';
				res.style = this.getH5DanmuStyle(item.color);
				return res;
			});
			// #endif
		},
		/**
		 * 生成h5播放器的弹幕样式
		 */
		getH5DanmuStyle(color) {
			return {
				color: color ? color : this.getRandomColor(),
				borderRadius: '50px',
				padding: '5px 5px',
				backgroundColor: 'rgba(255, 255, 255, 0.1)'
			};
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
.live-play-container {
	
}
</style>
