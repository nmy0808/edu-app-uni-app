<template>
	<view class="test-detail app-container">
		<!-- time -->
		<view class="time">
			倒计时: {{$tool.formatSeconds(tt)}}
		</view>
		<template v-for="(item, index) in detailData.testpaper_questions">
			<view class="header" :key="index" v-show="index === currentIndex">
				<view class="title">
					<!-- 题类型 -->
					{{ typeMap[item.type] }}
				</view>
				<view class="index">第{{ index + 1 }}题</view>
			</view>
			<view class="body" v-show="index === currentIndex">
				<view class="question"><mp-html :content="item.title"></mp-html></view>
				<answer-option
					:type="item.type"
					:value="answer[index]"
					:options="item.options"
					@change="handleAnswerChange"
				></answer-option>
			</view>
		</template>
		<action-bar
			:showSubmit='true'
			:currentIndex="currentIndex"
			:menus="menus"
			@select="handleToggle"
			@change="handleToggle"
			@submit='handleSubmit'
		></action-bar>
	</view>
</template>

<script>
import typeMap from '@/typeMap/index.js';
import AnswerOption from './components/answer-option.vue';
export default {
	// props:{
	// 	num: {
	// 		type: Number,
	// 		default: 0
	// 	}
	// },
	components: { AnswerOption },
	data() {
		return {
			typeMap,
			id: null,
			currentIndex: 0,
			answer: [], //答案
			detailData: {
		// 		"id": 12,
		// "title": "测试试卷111",
		// "total_score": 100,
		// "pass_score": 60,
		// "expire": 60,
		// "testpaper_questions": [
		// 	{
		// 		"id": 42,
		// 		"score": 25,
		// 		"question_id": 73,
		// 		"title": "说说你的看法",
		// 		"remark": "问题解析",
		// 		"type": "answer",
		// 		"user_value": [
		// 			""
		// 		]
		// 	},
		// 	{
		// 		"id": 43,
		// 		"score": 25,
		// 		"question_id": 72,
		// 		"title": "请问我年龄多大",
		// 		"remark": "问题解析",
		// 		"type": "completion",
		// 		"user_value": [
		// 			""
		// 		]
		// 	},
		// 	{
		// 		"id": 44,
		// 		"score": 0,
		// 		"question_id": 71,
		// 		"title": "请问我是男生还是女生",
		// 		"remark": "问题解析",
		// 		"type": "trueOrfalse",
		// 		"options": [
		// 			"正确",
		// 			"错误"
		// 		],
		// 		"user_value": -1
		// 	},
		// 	{
		// 		"id": 45,
		// 		"score": 25,
		// 		"question_id": 70,
		// 		"title": "你的名字叫什么",
		// 		"remark": "问题解析",
		// 		"type": "checkbox",
		// 		"options": [
		// 			"张三",
		// 			"李四",
		// 			"王五",
		// 			"王五哈"
		// 		],
		// 		"user_value": []
		// 	},
		// 	{
		// 		"id": 46,
		// 		"score": 25,
		// 		"question_id": 65,
		// 		"title": "你的名字叫什么",
		// 		"remark": "问题解析",
		// 		"type": "checkbox",
		// 		"options": [
		// 			"张三",
		// 			"李四",
		// 			"王五",
		// 			"王五哈"
		// 		],
		// 		"user_value": []
		// 	}
		// ],
		// "user_test_id": 7,
		},
			tt: 0,
			timer:null
		};
	},
	async onLoad(e) {
		this.id = e.id;
		uni.setNavigationBarTitle({
			title: '考试考试'
		});
		await this.getData().catch(_=>{
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/test-list/test-list'
				})
			}, 600)
		})
		this.tt = this.detailData.expire * 60
		this.timer = setInterval(async()=>{
			this.tt = this.tt - 1
			if(this.tt === 0){
				this.toast('考试时间已到')
				clearInterval(this.timer)
				// const params = {}
				// params.user_test_id = this.detailData.user_test_id
				// params.value = this.answer
				// this.menus((item,index)=>{
				// 	const v = params.value[index]
				// 	if( v === undefined){
				// 		params.value[index] = null
				// 	}
				// })
				// await this.$http.summitTestApi(params)
				// this.toast('提交成功!')
				// setTimeout(()=>{
				// 	uni.navigateTo({
				// 		url:'/pages/test-list/test-list'
				// 	})
				// }, 300)
			}
		}, 1000)
	},
	onBackPress() {
		this.handleSubmit()
		return true
	},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	computed: {
		menus() {
			return this.detailData.testpaper_questions || [];
		}
	},
	methods: {
		async getData() {
			const params = {};
			params.id = this.id;
			const {data} = await this.$http.beginTestApi(params);
			this.detailData = data;
		},
		/**
		 * 切换题目
		 */
		handleToggle({ index }) {
			this.currentIndex = index;
		},
		/**
		 * 答题
		 */
		handleAnswerChange({ value }) {
			const temp = JSON.parse(JSON.stringify(this.answer));
			temp[this.currentIndex] = value;
			this.answer = temp;
		},
		handleSubmit(){
			uni.showModal({
				title: '确定提交试卷?',
				success: async ({confirm})=>{
					if(confirm){
						if(this.answer.length !== this.menus.length){
							this.toast('答题不完整, 请检查')
							return
						}
						const params = {}
						params.user_test_id = this.detailData.user_test_id
						params.value = this.answer
						await this.$http.summitTestApi(params)
						this.toast('提交成功!')
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/test-list/test-list'
							})
						}, 300)
					}
				}
			})
		},
		async submit(){
			const params = {}
			params.user_test_id = this.detailData.user_test_id
			params.value = this.answer
			this.menus.forEach((item,index)=>{
				const type = item.type
				const v = params.value[index]
				if( v === undefined){
					if(type === 'answer'){
						params.value[index] = ['']
					}
					else if(type === 'completion'){
						params.value[index] = ['']
					}
					else if(type === 'trueOrfalse'){
						params.value[index] = null
					}
					else if(type === 'checkbox'){
						params.value[index] = []
					}
					else if(type === 'radio'){
						params.value[index] = []
					}
				}
			})
			await this.$http.summitTestApi(params)
			this.toast('提交成功!')
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/test-list/test-list'
				})
			}, 300)
		}
	}
};
</script>

<style lang="scss" scoped>
	.test-detail{
		.time{
			text-align: center;
			padding: 20rpx 0;
			color: $uni-color-error;
		}
		.header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			.title{
				font-size: 14px;
				color: $uni-color-subtitle;
			}
			.index{
				font-size: 14px;
				color: $uni-color-subtitle;
			}
			
		}
		.question{
			font-size: 18px;
		}
	}
</style>
