<template>
	<view class="test-detail app-container">
		<template v-for="(item, index) in detailData.testpaper_questions">
			<view class="header" :key="index" v-show="index === currentIndex">
				<!-- time -->
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
		{{ answer }}
		<action-bar
			:currentIndex="currentIndex"
			:menus="menus"
			@select="handleToggle"
			@change="handleToggle"
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
				id: 77,
				title: '测试',
				total_score: 100,
				pass_score: 60,
				expire: 60,
				testpaper_questions: [
					{
						id: 42,
						score: 25,
						question_id: 73,
						title: '说说你的看法',
						remark: '问题解析',
						type: 'answer',
						user_value: ['']
					},
					{
						id: 43,
						score: 25,
						question_id: 72,
						title: '请问我年龄多大',
						remark: '问题解析',
						type: 'completion',
						user_value: ['']
					},
					{
						id: 44,
						score: 0,
						question_id: 71,
						title: '请问我是男生还是女生',
						remark: '问题解析',
						type: 'trueOrfalse',
						options: ['正确', '错误'],
						user_value: -1
					},
					{
						id: 45,
						score: 25,
						question_id: 70,
						title: '你的名字叫什么',
						remark: '问题解析',
						type: 'checkbox',
						options: ['张三', '李四', '王五', '王五哈'],
						user_value: []
					},
					{
						id: 46,
						score: 25,
						question_id: 65,
						title: '你的名字叫什么',
						remark: '问题解析',
						type: 'checkbox',
						options: ['张三', '李四', '王五', '王五哈'],
						user_value: []
					}
				],
				user_test_id: 465
			}
		};
	},
	onLoad(e) {
		this.id = e.id;
		uni.setNavigationBarTitle({
			title: '考试考试'
		});
		// this.getData()
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
			const { data } = await this.$http.beginTestApi(params);
			console.log(data);
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
		}
	}
};
</script>

<style lang="scss"></style>
