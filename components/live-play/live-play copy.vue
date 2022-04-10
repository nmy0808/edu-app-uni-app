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
			:autoplay="true"
			:danmu-list="appDanmuList"
			enable-danmu
			danmu-btn
			controls
		></video>
		<!-- #endif -->

		<view class="text-danger app-container">
			系统提示:直播内容及互动评论须严格遵守直播规范，严禁传播违法违规、低俗血暴、吸烟酗酒、造谣诈骗等不良有害信息。
		</view>
		<view class="live-play-input">
			<uni-easyinput
				class="easyinput"
				v-model="value"
				placeholder="说点什么~"
				@confirm="sendDanmu"
			/>
		</view>
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
			value: '',
			videoContext: null,
			appDanmuList: [],
			currentTime: 0,
			demoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
		};
	},
	props: {
		data: {
			type: Object,
			default: () => {
				return {};
			}
		},
		liveId: {
			type: Number,
			default: null
		}
	},
	created() {
		
	},
	mounted() {
		this.getLiveCommentList();
		// #ifdef APP
		this.videoContext = uni.createVideoContext('myVideo');
		// #endif
	},
	destroyed() {
		// #ifdef H5
		this.videoContext.off('timeupdate',this.handleTimeUpdate)
		// #endif
	},
	methods: {
		/**
		 * 获取弹幕列表
		 */
		async getLiveCommentList() {
			const params = {};
			params.live_id = this.liveId;
			console.log("?", this.liveId);
			const { data } = await this.$http.getLiveCommentListApi(params);
			// this.danmuList = data.rows
			const temp = JSON.parse(JSON.stringify(data.rows));
			// #ifdef APP
			this.appDanmuList = temp.map(item => {
				const res = {};
				res.text = item.content;
				res.color = item.color;
				res.time = item.time;
				return res;
			});
			// #endif
			// #ifdef H5
			this.appDanmuList = temp.map(item => {
				const res = {};
				res.id = item.id;
				res.txt = item.content;
				res.start = item.time * 1000;
				res.duration = 3000;
				res.mode =  'scroll';
				res.style= {
					color: item.color,
					borderRadius: '50px',
					padding: '5px 5px',
					backgroundColor: 'rgba(255, 255, 255, 0.1)'
				}
				return res;
			});
			this.videoContext = new FlvPlayer({
				id: 'mse',
				// url: this.data.playUrl,
				url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
				height: uni.upx2px(420),
				width: window.innerWidth,
				isLive: true,
				playsinline: true,
				danmu: {
					comments: this.appDanmuList,
					area: {
						start: 0,
						end: 1
					},
					closeDefaultBtn: false,
					defaultOff: false,
					panel: false
				}
			});
			this.videoContext.on('timeupdate',this.handleTimeUpdate)
			// #endif
		},
		sendDanmu() {
			// #ifdef H5
			this.videoContext.danmu.sendComment({  //发送弹幕
			    duration: 3000,
			    id: 'id',
			    start: this.currentTime * 1000,
			    txt: this.value,
			    style: {
			        color:this.getRandomColor(),
			        fontSize: '20px',
			        border: 'solid 1px #ff9500',
			        borderRadius: '50px',
			        padding: '5px 11px',
			        backgroundColor: 'rgba(255, 255, 255, 0.1)'
			    }
			})
			// #endif
		
			// #ifdef APP
			this.videoContext.sendDanmu({
				text: this.value,
				color: this.getRandomColor()
			});
			// #endif
			this.value = '';
		},
		handleTimeUpdate(e){
			this.currentTime = e.currentTime
		},
		getRandomColor() {
			const rgb = [];
			for (let i = 0; i < 3; ++i) {
				let color = Math.floor(Math.random() * 256).toString(16);
				color = color.length == 1 ? '0' + color : color;
				rgb.push(color);
			}
			return '#' + rgb.join('');
		},
		statechange(e) {
			console.log('live-player code:', e.detail.code);
		},
		error(e) {
			console.error('live-player error:', e.detail.errMsg);
		}
	}
};
</script>

<style lang="scss" scoped>
.live-play-container {
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
}
</style>
