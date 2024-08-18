<template>
	<view class="container">
		<Tabs :TabList="tabNav" :currentTab="current" @tabs="tabsChange">
			<TabPane v-for="(dayData, i) in dataList" :key='i'>
				<view class="wrap m-1 pt-2 zerotimeline-class">
					<timelineEdit ref="zeroTimeline" :dataList='dayData' :i='i' gap='30px' :show-left="true"
						@updateDataList="handleUpdateDataList">
					</timelineEdit>
				</view>
			</TabPane>
		</Tabs>


		<view style="padding: 40rpx;">
			<!-- 标题 -->
			<h2>
				<input type="text" v-model="descTotal.strategyTitle"
					style="color: inherit; font-size: inherit; font-weight: inherit; font-family: inherit; padding: inherit; margin: inherit; border: inherit;"
					@input="handleTitleChange">

				<!-- <text style="color: blue">{{descTotal.day}}天</text> -->
			</h2>
			<!-- 主体内容 -->
			<fui-textarea type="text" v-model="descTotal.strategyDesc" readonly @input="handleDescChange" />
			<!-- 话题 -->
			<view style="display: flex;justify-content: space-between;" v-for="(item,index) in descTotal.topicList"
				:key="index">
				<view class="" style="color: blue;margin-bottom: 20rpx;margin-top: 20rpx;">#{{item.topicName}} </view>
			</view>
			<!-- 点赞 收藏帖子 收藏地点 -->

		</view>
		<view>
			<button style="background-color: #6A5DAC ;color:white;border-radius: 20rpx;" @tap="editST">保存修改</button>
		</view>
	</view>
	</view>
</template>

<script>
	import timelineEdit from "@/components/timeline-edit/timeline-edit.vue"
	import Tabs from '@/components/wiszx-tabs/tabs.vue'
	import TabPane from '@/components/wiszx-tabs/tabPane.vue'
	export default {
		components: {
			timelineEdit,
			Tabs,
			TabPane
		},
		data() {
			return {
				currentUserId: 0,
				current: 0,
				tabNav: [{
						title: '商品介绍'
					},
					{
						title: '规格参数'
					},
					{
						title: '售后保障'
					},
					{
						title: '售后保障'
					}
				],
				collected: false,
				collect: "收藏帖子",
				liked: false,
				like: "已喜欢",
				TabCur: 0,
				scrollLeft: 0,
				mainHeight: 400, //全屏或者局部滑动设置的高度
				tabNav: [],
				list: [], //中间数组
				descTotal: {},
				dataList: [],
				title: "",
				desc: "",
				strategyId: 0,
				desc: {
					userAvatar: "https://gd-hbimg.huaban.com/71cdd3cc1126caa5b4f346640ade2a58c275517a117083-zgsUvQ_fw236",
					userNickName: "Extrovert",
					stragetyTitle: "五一去杭州玩的攻略",
					stragetyDesc: "计划五一假期去杭州旅行是一个非常好的选择，因为杭州不仅有美丽的自然风光，还有丰富的文化遗产。下面是一个为期四天的杭州旅游攻略，涵盖了杭州的主要景点和一些实用的旅行小贴士。",
					topicList: [{
							topicName: "拍照",
						},
						{
							topicName: "打卡",
						},
						{
							topicName: "五一",
						}
					],
					publishTime: "2024.4.24"

				},
				follow: "关注",
				followed: false,
				collected: false,
				collect: 11,
				liked: false,
				like: 11,
				days: 4
			}
		},
		onLoad(options) {
			console.log(options.id)
			uni.request({
				url: 'http://110.40.182.65:8080/strategy/' + options.id,
				method: 'GET',
				data: {},
				success: res => {
					this.descTotal = res.data.data
					this.currentUserId = uni.getStorageSync('userId')

					console.log(this.currentUserId)
					console.log(this.descTotal)
					console.log(this.descTotal.topicList.map(item => item.topicName))
					// 该用户是否被本用户关注
					this.followed = this.descTotal.followed
					this.collected = this.descTotal.collected
					this.liked = this.descTotal.liked
					// console.log(this.swiperList);
					if (this.followed) {
						this.follow = "已关注"
					} else {
						this.follow = "关注ta"
					}
					if (this.collected) {
						this.collect = "已收藏"
					} else {
						this.collect = "收藏攻略"
					}
					if (this.liked) {
						this.like = "已喜欢"
					} else {
						this.like = "喜欢"
					}
					this.descTotal.publishTime = this.dayjs(this.descTotal.publishTime).format(
						"YYYY-MM-DD HH:mm:ss");
					this.strategyId = this.descTotal.strategyId
					console.log(this.descTotal.publishTime)
					this.days = this.descTotal.day
					console.log(this.days)
					for (let i = 0; i < this.days; i++) {
						this.tabNav.push({
							title: '第' + (i + 1) + '天' // 修改为从“第1天”开始而不是“第0天”
						});
					}
					this.dataList = []
					this.dataList = this.descTotal.strategySets.map(day => [{
							title: day.morning,
							content: day.morningDesc,
							sub: '补充内容',
							leftTime: '上午',
							leftTitle: '上午',
							leftContent: day.morningPlayTime + '小时',
							color: this.getRandomColor(),
						},
						{
							title: day.lunch,
							content: day.lunchDesc,
							sub: '补充内容',
							leftTime: '中午',
							leftTitle: '午餐',
							leftContent: day.lunchTime + '小时',
							color: this.getRandomColor(),
						},
						{
							title: day.afternoon,
							content: day.afternoonDesc,
							sub: '补充内容',
							leftTime: '下午',
							leftTitle: '下午',
							leftContent: day.afternoonPlayTime + '小时',
							color: this.getRandomColor(),
						},
						{
							title: day.dinner,
							content: day.dinnerDesc,
							sub: '补充内容',
							leftTime: '晚上',
							leftTitle: '晚餐',
							leftContent: day.dinnerTime + '小时',
							color: this.getRandomColor(),
						},
						{
							title: day.night,
							content: day.nightDesc,
							sub: '补充内容',
							leftTime: '深夜',
							leftTitle: '晚上',
							leftContent: day.nightPlayTime + '小时',
							color: this.getRandomColor(),
						}
					])
				},
				fail: () => {},
				complete: () => {}
			});

			this.init()
			console.log(this.dataList)
			// 首次加载先将notice数组赋值给中间数组,否则刚打开页面是没有内容显示的
			this.list = this.notice
			this.tabCur = []

		},
		mounted() {
			this.updateMainHeight();
		},
		methods: {
			handleTitleChange() {
				this.title = this.descTotal.strategyTitle
			},
			handleDescChange() {
				this.desc = this.descTotal.strategyDesc
			},
			handleUpdateDataList(updatedDataList) {
				const [updatedData, index] = updatedDataList;
				// 使用Vue.set()更新父组件的dataList
				this.$set(this.dataList, index, updatedData);
				console.log(this.dataList)
			},
			editST() {
				// 转换数据
				// 格式化dataList为所需的格式
				const strategySets = this.dataList.map((dayData, index) => {
					return {
						"id": null,
						"strategyId": this.strategyId,
						"sort": index + 1,
						"morning": dayData.find(item => item.leftTitle === "上午")?.title || "",
						"morningPlayTime": parseInt(dayData.find(item => item.leftTitle === "上午")?.leftContent
							.match(/\d+/)?.[0] || 0),
						"morningDesc": dayData.find(item => item.leftTitle === "上午")?.content || "",
						"afternoon": dayData.find(item => item.leftTitle === "下午")?.title || "",
						"afternoonPlayTime": parseInt(dayData.find(item => item.leftTitle === "下午")?.leftContent
							.match(/\d+/)?.[0] || 0),
						"afternoonDesc": dayData.find(item => item.leftTitle === "下午")?.content || "",
						"night": dayData.find(item => item.leftTitle === "晚上")?.title || "",
						"nightPlayTime": parseInt(dayData.find(item => item.leftTitle === "晚上")?.leftContent.match(
							/\d+/)?.[0] || 0),
						"nightDesc": dayData.find(item => item.leftTitle === "晚上")?.content || "",
						"lunch": dayData.find(item => item.leftTitle === "午餐")?.title || "",
						"lunchTime": parseInt(dayData.find(item => item.leftTitle === "午餐")?.leftContent.match(
							/\d+/)?.[0] || 0),
						"lunchDesc": dayData.find(item => item.leftTitle === "午餐")?.content || "",
						"dinner": dayData.find(item => item.leftTitle === "晚餐")?.title || "",
						"dinnerTime": parseInt(dayData.find(item => item.leftTitle === "晚餐")?.leftContent.match(
							/\d+/)?.[0] || 0),
						"dinnerDesc": dayData.find(item => item.leftTitle === "晚餐")?.content || ""
					};

				});
				console.log(strategySets)

				console.log(this.descTotal.stragetyDesc)

				uni.request({
					url: 'http://110.40.182.65:8080/strategy/publish',
					method: 'POST',
					data: {
						"strategyId": this.strategyId,
						"strategyTitle": this.title,
						"strategyDesc": this.descTotal.strategyDesc,
						"topicList": this.descTotal.topicList.map(item => item.topicName),
						"strategySets": strategySets,
						"day": strategySets.length,
						"postId": this.descTotal.postId
					},
					success: (res) => {
						console.log(res);
						uni.navigateTo({
							url: '/pages/stragety-detail4/stragety-detail4?id=' + this.descTotal
								.strategyId
						})
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						}, 2000)
						// plus.runtime.restart();
					},
					fail: (err) => {
						console.error("Strategy publish retry failed:", err);
						// Handle retry failure if needed
						uni.showToast({
							title: '修改失败',
							icon: 'none'
						}, 2000)
					}
				});
			},
			tabsChange(index) {
				this.current = index

			},
			randomAvatar(userId) {
				return "../../../../../static/user-avatar/" + (userId % 5 + 1) + '.jpg'
			},
			updateMainHeight() {
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.zerotimeline-class').boundingClientRect(rect => {
						if (rect) {
							this.mainHeight = rect.height
							this.mainHeight = this.mainHeight
						}
					}).exec();
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// 根据当前TabCur的值判断把哪个数组赋值给list
				this.list = this.TabCur == 0 ? this.notice : this.TabCur == 1 ? this.policy : this.news
				// Math.max(0, index - 1);
			},
			SwiperChange(e) {
				this.TabCur = e.detail.current
				this.scrollLeft = (e.detail.current - 1) * 60
				this.list = this.TabCur == 0 ? this.notice : this.TabCur == 1 ? this.policy : this.news
			},
			init() {
				// for (let i = 0; i < 5; i++) {
				// 	const obj = {
				// 		// time: `2023-11-1${i}`,
				// 		title: `南京总统府景区`,
				// 		content: `完成功能完成功能完成功能完成功能`,
				// 		sub: `补充内容`,
				// 		leftTime: `2023-11-1${i}`,
				// 		leftTitle: `11月1${i}日`,
				// 		leftContent: `开始\n|\n结束`,
				// 		color: this.getRandomColor(),

				// 	}
				// 	this.dataList.push(obj)
				// }

			},
			getRandomColor() {
				const red = Math.floor(Math.random() * 256);
				const green = Math.floor(Math.random() * 256);
				const blue = Math.floor(Math.random() * 256);
				return `rgb(${red}, ${green}, ${blue})`;
			},
			followUser() {
				//原本是关注，要取消关注
				if (this.followed == true) {
					uni.showModal({
						title: '确定要取消关注吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消关注
								uni.request({
									url: 'http://110.40.182.65:8080/user/cancel/follow/' + this.userId,
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.followed = !this.followed
								this.follow = "关注ta"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/user/follow/' + this.userId,
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						},
						fail: () => {
							uni.showToast({
								title: '关注失败',
								icon: "error"
							});
						},
						complete: () => {}
					});
					this.followed = !this.followed
					this.follow = "已关注"
				}
			},
			likePost() {
				//原本是关注，要取消关注
				if (this.liked == true) {
					uni.showModal({
						title: '确定要取消喜欢吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://110.40.182.65:8080/strategy/cancel/' + this
										.strategyId +
										'/like',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.liked = !this.liked
								this.like = "喜欢"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/strategy/' + this.strategyId + '/like',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						}
					});
					this.liked = !this.liked
					this.like = "已喜欢"
				}

			},
			collectPost() {
				//原本是关注，要取消关注
				if (this.collected == true) {
					uni.showModal({
						title: '确定要取消收藏吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://110.40.182.65:8080/strategy/cancel/' + this
										.strategyId +
										'/collect',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.collected = !this.collected
								this.collect = "收藏帖子"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/strategy/' + this.strategyId + '/collect',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						}
					});
					this.collected = !this.collected
					this.collect = "已收藏"
				}
			},
		}
	}
</script>

<style>
	@import '@/colorui/main.css';
	@import '@/colorui/icon.css';

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}

	.container {
		margin-left: 15px;
		margin-right: 15px
	}
</style>