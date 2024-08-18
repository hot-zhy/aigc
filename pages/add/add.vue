<template>
	<view class="publish">
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')">
			<scroll-view class="scrolls" scroll-y>
				<Tabs :TabList="tabNav" :currentTab="current" @tabs="tabsChange">
					<TabPane v-for="(dayData, i) in dataList" :key='i'>
						<view class="wrap m-1 pt-2 zerotimeline-class">
							<ZeroTimeline ref="zeroTimeline" :dataList='dayData' gap='30px' :show-left="true">
							</ZeroTimeline>
						</view>
					</TabPane>
				</Tabs>
				<view class="" style="display: flex;margin-left: 10rpx;margin-right:10rpx">
					<button
						style="margin-right:10rpx;margin-top: 10rpx;background-color: #b6b6b6;color: white;border-radius: 40rpx;width: 95%;"
						@click="ok">确认</button>
					<button
						style="margin-top: 10rpx;background-color: #6A5DAC;color: white;border-radius: 40rpx;width: 95%;"
						@click="regenerateLLM">重新生成</button>
				</view>

			</scroll-view>
		</view>


		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow2 == true" @tap="hidecoupon2"></view>
		<view class="coupon" :style="'bottom:' + (couponshow2 == true ? '0px':'')" @click="choose">
			<scroll-view class="scrolls" scroll-y>
				<view class="" v-if="postList.length!==0">
					<view class="" style="width: 100%;font-size: 20px;text-align: center;margin-top:20px;">您还没有发布帖子哦~快去发布一条贴子吧~</view>
					<image src="../../static/images/nothing.png" mode="widthFix"
							style="justify-content: center;margin: 0 auto;display: block;width: 60%;"></image>
				</view>
<!-- 				<zero-waterfall-jump :list="postList">
					<view v-for="(item, index) of postList" :key="index" slot="slot{{item.postId}}">
					</view>
					<template v-slot:default="item">
					</template>
				</zero-waterfall-jump> -->
			</scroll-view>
		</view>


		<!-- 攻略信息 -->
		<view class="" style="width: 100%; display: flex;justify-content: center;margin-bottom: 20rpx;">
			<view class="" style="width:100%;border-radius: 20rpx;">
				<view class="" style="border-radius: 20rpx;">
					<view class="main_body" style="">
						<view class="character">
							<input v-model="strategyTitle" type="text" placeholder="请输入攻略标题">
						</view>
						<view class="textarea">
							<textarea v-model="strategyDesc" placeholder="更多介绍"></textarea>
						</view>


					</view>


					<!-- 添加话题 -->
					<view class="talking">
						<view>
							<text># 添加话题</text>
							<text>让更多人看到</text>
						</view>
						<biner-input-tags @change="change" :selectlist='topicList' :disabled='disabled'
							placeholder='请输入话题后回车'></biner-input-tags>
					</view>


					<view v-if="!postId" class="" style="width: 100%; display: flex;" @click="opencoupon2()">
						<view style="margin-left: auto; display: flex; align-items: center;margin-right: 25rpx;">
							<image style="width: 40rpx; height:40rpx" src="../../static/choose.png" />
							<view style="margin-left: 10rpx;">选择关联帖子</view>
						</view>
					</view>

					<view v-else class="" style="width: 100%; display: flex;">
						<view style="margin-left: auto; display: flex; align-items: center;margin-right: 25rpx;">
							<image style="width: 40rpx; height:40rpx" src="../../static/chosen.png" />
							<view style="margin-left: 10rpx;" @click="opencoupon2()">重新选择</view>
						</view>
					</view>

				</view>


			</view>
		</view>


		<!-- 攻略生成 -->
		<view class="" style="width: 100%; display: flex;justify-content: center;">
			<view class="information-card" style="">
				<view class="main_body" style="width: 100%;">
					<view class="character2" style="display: flex;align-items: center;line-height: 0.7;">
						<view class="">
							<image src="../../static/route.png" style="width: 32px;height:32px" mode=""></image>
						</view>
						<view class="" style="font-size: 1.2em;color: #6A5DAC;font-weight: 900;margin-left: 10rpx;">攻略生成
						</view>

					</view>
					<view class="character">
						<input v-model="place" type="text" placeholder="请输入你想去的地点">
					</view>
					<view class="character">
						<input v-model="day" type="number" placeholder="你想去几天？">
					</view>
					<view class="character">
						<input v-model="budget" type="number" placeholder="你的预算是多少？">
					</view>
					<!-- 			<view class="textarea">
						<textarea v-model="strategyDesc" placeholder="更多介绍"></textarea>
					</view> -->


				</view>



				<!-- 标签列表 -->
				<!-- 			<view class="flex" style="display: flex;align-content: center;align-items: center;">
						<view style="margin-right: 5px;font-size: 15px;">必去地点</view>
						<biner-input-tags @change="change" :selectlist='selectedList' :disabled='disabled'
							:placeholder='placeholder'></biner-input-tags>
					</view> -->
				<view class="talking">
					<view>
						<text># 必去地点</text>
						<text>你最想去的地点</text>
					</view>
					<biner-input-tags @change="change" :selectlist='selectedList' :disabled='disabled'
						:placeholder='placeholder'></biner-input-tags>
				</view>


				<view class="" style="display: flex;width: 100%;justify-content: right;align-items: center;">
					<u-button @click="check" class="" type="info"
						style="margin-left: 20rpx;border-radius: 20rpx;">查看生成的攻略</u-button>
					<view class=""
						style="margin-top: 20rpx;background-color: #7a6cc8;color: white;border-radius: 20rpx;display:flex;justify-content: right;align-content: center;align-items: center;line-height: 0.7;padding-left: 15rpx;padding-right: 15rpx;padding-top: 5rpx;padding-bottom:5rpx;margin: 20rpx;"
						@click="submitForm">
						<view class="" style="margin-left: 5rpx;">
							<image src="../../static/arrow.png" style="width:32px;height:35px" mode=""></image>
						</view>
					</view>
				</view>

			</view>
		</view>

		<button style="margin-top: 20rpx;background-color: #6A5DAC;color: white;border-radius: 40rpx;width: 95%;"
			@click="submit">发布攻略</button>


	</view>

</template>

<script>
	import binerInputTags from '@/components/biner-input-tags/biner-input-tags'
	import ZeroTimeline from "@/components/zero-timeline/zero-timeline.vue"
	import Tabs from '@/components/wiszx-tabs/tabs.vue'
	import TabPane from '@/components/wiszx-tabs/tabPane.vue'
	import zeroWaterfallJump from '@/components/zero-waterfall-jump/components/zero-waterfall/zero-waterfall.vue'

	export default {
		components: {
			binerInputTags,
			ZeroTimeline,
			Tabs,
			TabPane,
			zeroWaterfallJump
		},
		data() {
			return {
				strategyTitle: "",
				strategyDesc: "",
				topicList: [],
				postList: [],
				day: '',
				strategyInfo: {},
				disabled: false,
				place: '',
				budget: '',
				selectedList: [],
				placeholder: '请输入必去地点后回车',
				couponshow: false,
				couponshow2: false,
				days: 0,


				current: 0,
				tabNav: [],
				dataList: [],
				postId: 0,

			}
		},
		methods: {
			check() {
				this.opencoupon()
			},
			submit() {
				uni.request({
					url: 'http://110.40.182.65:8080/strategy/publish',
					method: 'POST',
					data: {
						"strategyTitle": this.strategyTitle,
						"strategyDesc": this.strategyDesc,
						"topicList": this.topicList.map(item => item.title),
						"strategySets": this.strategyInfo,
						"day": this.strategyInfo.length,
						"postId": this.postId
					},
					success: (res) => {
						console.log(res);
						uni.navigateTo({
							url: '/pages/my/my'
						})
						plus.runtime.restart();
					},
					fail: (err) => {
						console.error("Strategy publish retry failed:", err);
						// Handle retry failure if needed
					}
				});
			},
			choose() {
				console.log(uni.getStorageSync('choosePostId'))
				uni.showToast({
					title: '选择成功',
					icon: 'none'
				}, 2000)
				this.postId = uni.getStorageSync('choosePostId')
				this.couponshow2 = false
			},
			ok() {
				this.hidecoupon()
			},
			regenerateLLM() {
				this.hidecoupon()
				this.submitForm()
			},

			// 打开优惠券弹框 
			opencoupon() {
				this.couponshow = true
			},
			// 关闭优惠券弹框 
			hidecoupon() {
				this.couponshow = false
			},
			// 打开优惠券弹框
			opencoupon2() {
				let userId = uni.getStorageSync('userId')
				console.log(userId)
				uni.request({
					url: 'http://110.40.182.65:8080/user/' + userId + '/post/list',
					method: 'GET',
					success: (res) => {
						this.postList = res.data.data
						console.log(res)
					},
					fail: (error) => {
						console.log(error);
					},
					complete: () => {}
				});
				this.couponshow2 = true

			},
			// 关闭优惠券弹框 
			hidecoupon2() {
				this.couponshow2 = false
			},
			submitForm() {
				uni.showLoading({
					title: '生成攻略中...'
				})
				uni.request({
					url: 'http://110.40.182.65:8080/strategy/recommend',
					method: 'POST',
					data: {
						"days": this.day,
						"place": this.place,
						"budget": this.budget,
						"mustGo": this.selectedList.map(item => item.title)
					},
					success: (res) => {
						console.log(res);
						this.strategyInfo = res.data.data
						console.log(this.strategyInfo)
						this.days = this.strategyInfo.length
						console.log(this.days)
						for (let i = 0; i < this.days; i++) {
							this.tabNav.push({
								title: '第' + (i + 1) + '天'
							})
						}
						this.dataList = []
						this.dataList = this.strategyInfo.map(day => [{
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
						console.log(this.dataList)
						this.opencoupon()
						// plus.runtime.restart();
					},
					fail: (error) => {
						uni.showToast({
							title: '请求失败，请重新生成',
							icon: 'none',
							duration: 2000 // 显示时长为2秒
						});
					},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			retryStrategyPublish() {
				uni.request({
					url: 'http://110.40.182.65:8080/strategy/publish',
					method: 'POST',
					data: this.strategyInfo,
					success: (res) => {
						console.log(res);
						uni.navigateTo({
							url: '/pages/add-strategy/add-strategy?strategyInfo=' + encodeURIComponent(
								JSON.stringify(res.data.data))
						});
					},
					fail: (err) => {
						console.error("Strategy publish retry failed:", err);
						// Handle retry failure if needed
					}
				});
			},
			change(arr) {
				console.log(JSON.stringify(arr))
			},
			tabsChange(index) {
				this.current = index
			},
			getRandomColor() {
				const red = Math.floor(Math.random() * 256);
				const green = Math.floor(Math.random() * 256);
				const blue = Math.floor(Math.random() * 256);
				return `rgb(${red}, ${green}, ${blue})`;
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f0f1f1;
	}

	.information-card {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: center;
		border-radius: 20px;
		box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
		background-color: #ffffff;
		width: 100%;
		margin-left: 10px;
		margin-right: 10px
	}

	.information-card2 {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: center;
		border-radius: 20px;
		box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
		background-color: #ffe2f6;
		width: 100%;
		margin-left: 10px;
		margin-right: 10px
	}

	.mask {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 900;
		opacity: 0.7;
	}

	/* 优惠券 */
	.coupon {
		background-color: #fff;
		border-radius: 10upx 10upx 0 0;
		position: fixed;
		left: 0;
		bottom: -1000upx;
		z-index: 999;
		transition: all 0.3s;
	}

	.scrolls {
		width: 100vw;
		height: 60vh;
		padding-top: 10upx;
		z-index: 500;
	}

	.cu-avatar {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: #ccc;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 64upx;
		height: 64upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}

	.cu-avatar {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: #ccc;
		color: #ffffff;
		white-space: nowrap;
		position: relative;
		width: 64upx;
		height: 64upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
	}

	// 
	.publish {
		height: 100%;
		background: #f0f1f1;

		.main_body {
			padding: 24rpx;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;

			0 .character {
				border-bottom: 2rpx solid #e8e8e8;
				padding: 22rpx 0;
			}

			.character2 {

				padding: 22rpx 0;
			}

			.textarea {
				padding: 22rpx 0;
				border-bottom: 2rpx solid #e8e8e8;

				textarea {
					width: 100%;
					font-size: 28rpx;
				}
			}
		}

		.frequency {
			position: relative;
			width: 260rpx;
			height: 390rpx;

			.video {
				width: 260rpx !important;
				height: 390rpx !important;
				border-radius: 16rpx;

				.suspend {
					position: absolute;
					left: 106rpx;
					top: 162rpx;
					z-index: 100;
					width: 54rpx;
					height: 54rpx;
					border-radius: 100rpx;
				}

				.covers {
					position: absolute;
					width: 100%;
					bottom: 24rpx;
					z-index: 100;

					text {
						display: inline-block;
						width: 200rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 30rpx;
						color: #4D5EFF;
						background-color: #fff;
						border-radius: 8rpx;
					}
				}
			}

			.modal_box {
				position: absolute;
				background-color: rgba(0, 0, 0, 0.2);
				width: 260rpx;
				height: 390rpx;
				left: 0;
				top: 0;
				border-radius: 16rpx;
			}
		}


		.picture_list {
			display: flex;
			flex-wrap: wrap;

			.delete {
				position: absolute;
				right: 5px;
				z-index: 10;
				top: 5px;
				width: 16px;
				height: 16px;
				border-radius: 2px;
			}

			view {
				width: 154rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				height: 154rpx;
				position: relative;

				.cover {
					position: absolute;
					height: 44rpx;
					line-height: 44rpx;
					background: rgba(0, 0, 0, 0.4);
					bottom: 0;
					left: 0;
					font-size: 24rpx;
					margin: 0 !important;
					border-bottom-left-radius: 12rpx;
					border-bottom-right-radius: 12rpx;
				}

				image,
				.view {
					width: 154rpx;
					height: 154rpx;
					border-radius: 12rpx;
				}
			}
		}

		.delete_img {
			position: absolute;
			right: 10rpx;
			z-index: 10;
			top: 10rpx;
			width: 32rpx;
			height: 32rpx;
			border-radius: 4rpx;
		}

		.Upload_module {
			margin-top: 40rpx;

			.uploadImg {
				width: 150rpx;
				height: 150rpx;
				border: 2rpx solid #dfdfdf;
				border-radius: 12rpx;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: center;

				.image {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						margin-left: 16rpx;
						margin-top: 20rpx;
						width: 60rpx;
						height: 60rpx;
					}
				}
			}

			.layout {
				display: flex;
				align-items: center;
			}
		}



		.btn_bottom {
			height: 160rpx;
			padding: 12rpx 32rpx;
			background-color: #fafbfb;
			margin-top: 100rpx;

			.bnt1 {
				width: 100%;
				color: #fff;
				background: #4d5eff;
				height: 88rpx;
				line-height: 88rpx;
			}

			.bnt2 {
				width: 100%;
				color: #a4a4b0;
				background: #e9eafb;
				height: 88rpx;
				line-height: 88rpx;
			}
		}

		.talking {
			padding: 24rpx;
			border-radius: 6rpx;
			margin-top: 10rpx;

			&>view:nth-child(1) {
				&>text:nth-child(1) {
					font-size: 28rpx;
					color: #3D3D3D;
				}

				&>text:nth-child(2) {
					font-size: 24rpx;
					background-color: #e9eafb;
					color: #4d5eff;
					margin-left: 24rpx;
					padding: 4rpx 6rpx;
					border-radius: 12rpx;
				}
			}

			&>view:nth-child(2) {
				background: #fff;
				padding: 24rpx;
				margin-top: 16rpx;

				&>text {
					margin-right: 16rpx;
					color: #000;
				}
			}
		}

	}
</style>