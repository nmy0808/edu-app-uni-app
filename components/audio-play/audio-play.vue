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
			<text class="iconfont icon-ziyuan11 audio-loop icon-btn" :class="{active:isLoop}" @click="loop"></text>
			<view class="play-box">
				<text class="play-btn iconfont mx-3 " :class="{ 'icon-tianchongxing-' : isPlay, 'icon-bofang2': !isPlay }"  @click="switchPlay"></text>
			</view>
			<text class="iconfont icon-shoucang1 audio-fav icon-btn" :class="{active: isfava}" @click="$emit('collect')"></text>
		</view>
	</view>
</template>

<script>
import tool from '@/common/js/tool.js';
export default {
	name: 'audio-play',
	props: {
		url: {
			type: String,
			default: ''
		},
		isfava: {
			type: Boolean,
			default: false
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
		this.innerAudioContext.src = this.url;
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
	.play-box{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 120rpx;
		margin: 0 40rpx;
		.play-btn {
			font-size: 90rpx;
			color: $uni-color-primary;
			&.icon-tianchongxing-{
				font-size: 99rpx;
			}
		}
	}

	.play-fav {
	}
	.icon-btn{
		color: #bbbbbb;
		font-size: 40rpx;
	}
	.icon-btn.active{
		color: $uni-color-primary;
	}
}
</style>
