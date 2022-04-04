<template>
	<view class="audio-player-container app-container">
		<slider
			@change="onSliderChange"
			@changing="onSliderChanging"
			:value="currentTime"
			:block-size="10"
			activeColor="#7ac98a"
			block-color="#7ac98a"
			:min="0"
			:max="duration"
		/>
		<view class="audio-timer">
			<view class="timer-left">
				{{ currentTime === 0 ? '00:00:00' : currentTime | formatTime }}
			</view>
			<view class="timer-right">
				{{ duration === 0 ? '00:00:00' : duration | formatTime }}
			</view>
		</view>
		<view class="audio-control">
			<text type="iconfont" class="audio-loop" @click="loop">循环</text>
			<view class="play-btn " @click="switchPlay">play</view>
			<uni-icons type="star" class="audio-fav">收藏</uni-icons>
		</view>
	</view>
</template>

<script>
import tool from '@/common/js/tool.js';
export default {
	name: 'audio-play',
	props: {
		data: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	filters: {
		formatTime(v) {
			return tool.formatSeconds(v);
		}
	},
	data() {
		return {
			innerAudioContext: null,
			currentTime: 0,
			duration: 1,
			isLoop: false,
			isPlay: false,
			isSlider: false
		};
	},
	mounted() {
		this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src =
			'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
		this.innerAudioContext.onPlay(() => {
			console.log('开始播放');
		});
		this.innerAudioContext.onError(res => {
			uni.showToast({
				title: '音频加载失败',
				icon: 'none'
			});
		});

		// 结束
		this.innerAudioContext.onEnded(() => {
			this.isPlay = false;
		});
		// 播放进度
		this.innerAudioContext.onTimeUpdate(() => {
			if (this.isSlider) return;
			this.currentTime = this.innerAudioContext.currentTime;
		});
		// 总时长
		this.innerAudioContext.onCanplay(() => {
			this.duration = this.innerAudioContext.duration;
		});
	},
	methods: {
		onSliderChange({ detail }) {
			this.seek(detail.value);
			this.isSlider = false;
		},
		onSliderChanging({ detail }) {
			this.isSlider = true;
		},
		switchPlay() {
			if (this.isPlay) {
				this.pause();
			} else {
				this.play();
			}
		},
		play() {
			this.innerAudioContext.play();
			this.isPlay = true;
		},
		pause() {
			this.innerAudioContext.pause();
			this.isPlay = false;
		},
		// 单位s
		seek(time) {
			this.pause();
			setTimeout(() => {
				this.innerAudioContext.seek(time);
				this.innerAudioContext.onCanplay(() => {
					this.play();
				});
			});
		},
		// 循环
		loop() {
			this.innerAudioContext.loop = !this.isLoop;
			this.isLoop = !this.isLoop;
		}
	}
};
</script>

<style lang="scss" scoped>
.audio-timer {
	display: flex;
	justify-content: space-between;
}
.audio-control {
	display: flex;
	justify-content: center;
	align-items: center;
	.play-loop {
	}
	.play-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 120rpx;
		background-color: $uni-color-primary;
		border-radius: 50%;
		margin: 0 40rpx;
	}
	.play-fav {
	}
}
</style>
