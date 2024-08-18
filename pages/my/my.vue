<template>
	<view>
		<view class="profile-container">
			<view class="profile-header" style="z-index: -1;">
				<helang-blur class="bg-blur" :params="params"></helang-blur>
			</view>

			<view class="box" style="border-top: 60px;">
				<view class="box-hd">
					<view class="avator">
						<image :src="userAvatar" style="width: 160rpx;height: 160rpx;" mode="widthFix"></image>
					</view>
					<view class="phone-number" style="font-weight: 600;font-size: 40rpx;color: #515151;">
						{{userInfo.userNickname}}
					</view>
					<view class="" style="font-size: 23rpx;color: darkgrey;">Trip号:{{userInfo.userAccount}}</view>
				</view>
				<view class="box-bd">
					<view class="item" @click="followList" style="border-right: 1px solid #f1f1f1">
						<view class="" style="color: brown;">{{userInfo.userFollowCount}}</view>
						<view class="text" style="font-size: 23rpx;color: #5f5f5f;">关注</view>
					</view>
					<view class="item" @click="fanList" style="border-right: 1px solid #f1f1f1">
						<view class="" style="color: brown">
							{{userInfo.userFanCount}}
						</view>
						<view class="text" style="font-size: 23rpx;color: #5f5f5f;">粉丝</view>
					</view>
					<view class="item" @click="fanList">
						<view class="" style="color: brown">
							{{userInfo.userCollectPostCount+userInfo.userCollectStrategyCount}}
						</view>
						<view class="text" style="font-size: 23rpx;color: #5f5f5f;">获赞与收藏</view>
					</view>
					<view class="item" style="display: flex;align-items: center;align-content: center;">
						<!-- <view class="iconfont icon-wode" style="font-size: 40rpx;color: brown"></view> -->
						<view class="text"
							style="font-size:25rpx;text-align: center;color: initial;border-width: 0.1em;border-color: #515151;border-style: solid;border-radius: 40rpx;padding-top: 3rpx;padding-bottom: 3rpx;color:#515151;display: flex;justify-content: center;align-content: center;align-items: center;line-height:20rpx;width: 140rpx;height:50rpx">
							<view class="">编辑资料</view>
						</view>
					</view>

					<view class="item" @click="unlogin"
						style="display: flex;align-items: center;align-content: center;">
						<!-- <view class="iconfont icon-wode" style="font-size: 40rpx;color: brown"></view> -->
						<view class="text"
							style="font-size:25rpx;text-align: center;color: initial;border-width: 0.1em;border-color: #515151;border-style: solid;border-radius: 40rpx;color:#515151;display: flex;justify-content: center;align-content: center;align-items: center;line-height:20rpx;width: 100rpx;height:50rpx">
							<view class="">
								<image src="../../static/unlogin.png" style="width: 40rpx;height:40rpx" />
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>





		<view class="content">
			<view>
				<view class="selectItem detail" id="detail">
					<scroll-view class="scrollview title" id="title" :scroll-x="true">
						<view class="line" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'></view>
						<view id="item1" class="items" @click="clickItem('#item1',1)">
							<text :class="current_index==1?'selected':''">我的帖子</text>
						</view>
						<view id="item2" class="items" @click="clickItem('#item2',2)">
							<text :class="current_index==2?'selected':''">我的收藏</text>
						</view>
						<view id="item3" class="items" @click="clickItem('#item3',3)">
							<text :class="current_index==3?'selected':''">我的点赞</text>
						</view>
						<view id="item4" class="items" @click="clickItem('#item4',4)">
							<text :class="current_index==4?'selected':''">好友邀请</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<view id="itemAll" class="itemAll">
				<swiper class="swiper" :current="current" @change="change">
					<swiper-item>
						<scroll-view style="height: auto;" class="swiper-item1 component" scroll-y="true">
							<view class="one">
								<view class="body">
									<view class="contentA">
										<scroll-view class="scrollviewA" :scroll-x="true">
											<view class="lineA"
												:style='"transform:translateX("+isLeftA+"px);width:"+isWidthA+"px"'>
											</view>
											<view id="item1A" class="itemsA" @click="clickItemA('#item1A',1)">
												<text :class="currentA_index==1?'selected':''">攻略帖</text>
											</view>
											<view id="item2A" class="itemsA" @click="clickItemA('#item2A',2)">
												<text :class="currentA_index==2?'selected':''">打卡帖</text>
											</view>
										</scroll-view>
									</view>
									<view id="itemAllA" style="height: 100vh;" class="">
										<swiper class="swiper" :current="currentA" @change="changeA">
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view class="one">
														<yt-order-list :orderList="myStragetyList"></yt-order-list>
														<view class="" v-if="myStragetyList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
													</view>

												</scroll-view>
											</swiper-item>
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view>
														<view class="" v-if="myPostList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
														<zero-waterfall :list="myPostList">
															<!--  #ifdef  MP-WEIXIN -->
															<view v-for="(item, index) of myPostList" :key="index"
																slot="slot{{item.postId}}">
															</view>
															<!--  #endif -->

															<!-- #ifndef  MP-WEIXIN -->
															<template v-slot:default="item">
															</template>
															<!-- #endif -->
														</zero-waterfall>
													</view>
												</scroll-view>
											</swiper-item>

										</swiper>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="swiper-item1 component" scroll-y="true">
							<view class="one">
								<view class="body">
									<view class="contentA">
										<scroll-view class="scrollviewA" :scroll-x="true">
											<view class="lineA"
												:style='"transform:translateX("+isLeftA+"px);width:"+isWidthA+"px"'>
											</view>
											<view id="item1A" class="itemsA" @click="clickItemA('#item1A',1)">
												<text :class="currentA_index==1?'selected':''">攻略帖</text>
											</view>
											<view id="item2A" class="itemsA" @click="clickItemA('#item2A',2)">
												<text :class="currentA_index==2?'selected':''">打卡帖</text>
											</view>
										</scroll-view>
									</view>
									<view id="itemAllA" class="itemAllA">
										<swiper class="swiper" :current="currentA" @change="changeA">
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view class="one">
														<view class="" v-if="collectStragetyList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
														<yt-order-list :orderList="collectStragetyList"></yt-order-list>
													</view>
												</scroll-view>
											</swiper-item>
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view class="two">
														<view class="" v-if="collectPostList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
														<zero-waterfall :list="collectPostList">
															<!--  #ifdef  MP-WEIXIN -->
															<view v-for="(item, index) of dataList" :key="index"
																slot="slot{{item.postId}}">
															</view>
															<!--  #endif -->

															<!-- #ifndef  MP-WEIXIN -->
															<template v-slot:default="item">
															</template>
															<!-- #endif -->
														</zero-waterfall>
													</view>
												</scroll-view>
											</swiper-item>

										</swiper>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="swiper-item1 component" scroll-y="true">
							<view class="one">
								<view class="body">
									<view class="contentA">
										<scroll-view class="scrollviewA" :scroll-x="true">
											<view class="lineA"
												:style='"transform:translateX("+isLeftA+"px);width:"+isWidthA+"px"'>
											</view>
											<view id="item1A" class="itemsA" @click="clickItemA('#item1A',1)">
												<text :class="currentA_index==1?'selected':''">攻略帖</text>
											</view>
											<view id="item2A" class="itemsA" @click="clickItemA('#item2A',2)">
												<text :class="currentA_index==2?'selected':''">打卡帖</text>
											</view>
										</scroll-view>
									</view>
									<view id="itemAllA" class="itemAllA">
										<swiper class="swiper" :current="currentA" @change="changeA">
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view class="one">
														<view class="" v-if="likeStragetyList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
														<yt-order-list :orderList="likeStragetyList"></yt-order-list>
													</view>
												</scroll-view>
											</swiper-item>
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view class="two">
														<view class="" v-if="likePostList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
														<zero-waterfall :list="likePostList">
															<!--  #ifdef  MP-WEIXIN -->
															<view v-for="(item, index) of dataList" :key="index"
																slot="slot{{item.postId}}">
															</view>
															<!--  #endif -->

															<!-- #ifndef  MP-WEIXIN -->
															<template v-slot:default="item">
															</template>
															<!-- #endif -->
														</zero-waterfall>
													</view>
												</scroll-view>
											</swiper-item>

										</swiper>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					
					
					
					<swiper-item>
						<scroll-view class="swiper-item1 component" scroll-y="true">
							<view class="one">
								<view class="body">
<!-- 									<view class="contentA">
										<scroll-view class="scrollviewA" :scroll-x="true">
										</scroll-view>
									</view> -->
									<view id="itemAllA" class="itemAllA">
										<swiper class="swiper" :current="currentA" @change="changeA">
											<swiper-item>
												<scroll-view class="scroll-y" scroll-y="true">
													<view class="one">
														<view class="" v-if="inviteStrategyList.length==0">
															<image :src="nothing" mode="widthFix"
																style="justify-content: center;margin: 0 auto;display: block;width: 60%;">
															</image>
														</view>
														<yt-order-list :orderList="inviteStrategyList"></yt-order-list>
													</view>
												</scroll-view>
											</swiper-item>
		
					
										</swiper>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>

				</swiper>
			</view>

		</view>



	</view>
</template>
<script>
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	export default {
		components: {
			helangBlur
		},
		data() {
			return {
				nothing: "../../../../../static/images/nothing.png",
				params: {
					width: '100%',
					height: '40vh',
					image: "https://mydarling.gitee.io/uniapp-extend/static/images/douyin/4.jpg",
					blur: "m"
				},
				userAvatar: "",
				userId: 0,
				userInfo: {

				},
				isLeft: 0,
				isLeftA: 0,
				isWidth: 20,
				isWidthA: 20,
				current_index: 1,
				currentA_index: 1,
				player: null,
				playerId: 'videoDomId',
				buttonViewHeight: 0,
				titleHeight: 0, //选择标题的高度
				slide: true, //是否允许滑动
				pageWidth: 0, //页面宽度
				top: 0, //向滚动的位置
				currentIndex: 1, //当先选择
				current: 0, //当前所在滑块的 index
				currentA: 0, //当前所在滑块的 index
				myStragetyList: [],
				myPostList: [],
				collectStragetyList: [],
				collectPostList: [],
				likeStragetyList: [],
				likePostList: [],
				inviteStrategyList: []
			};
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			/* console.log("滚动距离为：" + e.scrollTop);
			console.log(this.getSystemMsg('windowHeight')); */
			if (e.scrollTop + this.navcHeight > this.topDistance) {
				if (this.slide == true) {
					this.slide = false;
				}

			} else {
				if (this.slide == false) {
					this.slide = true;
				}
			}
		},
		/*实例被挂载完成后执行的代码*/
		mounted() {
			this.clickItem('#item1', 1);
			this.clickItemA('#item1A', 1);
			this.getInfo();
		},
		destroyed() {
			this.player.pause();
			this.player.dispose();
			this.player = null
		},
		onShow() {
			console.log(uni.getStorageSync('userId'));
			this.userId = uni.getStorageSync('userId')
			this.userAvatar = this.randomAvatar(this.userId)
			this.params.image = this.userAvatar
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + this.userId,
				method: 'GET',
				success: res => {
					console.log(res);
					this.userInfo = res.data.data
					console.log(this.userInfo)
				},
				fail: (res) => {},
				complete: () => {}
			});
			console.log(this.userInfo);
			let userId = uni.getStorageSync('userId')
			console.log(userId)
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/post/list',
				method: 'GET',
				success: (res) => {
					this.myPostList = res.data.data
					console.log(res)
					console.log(this.myPostList)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/post/like/list',
				method: 'GET',
				success: (res) => {
					this.likePostList = res.data.data
					console.log(res)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/post/collect/list',
				method: 'GET',
				success: (res) => {
					this.collectPostList = res.data.data
					console.log(res)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/strategy/like/list',
				method: 'GET',
				success: (res) => {
					this.likeStragetyList = res.data.data
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/strategy/collect/list',
				method: 'GET',
				success: (res) => {
					this.collectStragetyList = res.data.data
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/strategy/list',
				method: 'GET',
				success: (res) => {
					this.myStragetyList = res.data.data
					console.log(this.myStragetyList)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
		},
		methods: {
			randomAvatar(userId) {
				return "../../static/user-avatar/" + (userId % 5 + 1) + '.jpg'
			},
			myNote() {
				uni.navigateTo({
					url: '/pages/my-note/my-note',
					
				});
			},
			getInfo() {
				let rectNavc = this.getViewRect('#topView'); //导航的位置
				this.top = rectNavc.bottom;
				this.navcHeight = rectNavc.height;
				let rectTitle = this.getViewRect('#title');
				this.topDistance = rectTitle.top;
				this.titleHeight = rectTitle.height;
				let rectDetail = this.getViewRect('#detail');
				this.pageWidth = rectDetail.width;
			},
			/*选择导航标题*/
			clickItem(id, index) {
				this.current = index - 1;
				this.current_index = index;
				let rectNavc = this.getViewRect(id); //导航的位置
				let contentNavc = this.getViewRect('#content');
				this.isLeft = rectNavc.left + rectNavc.width / 2.0 - this.isWidth / 2.0 - contentNavc.left;
			},
			clickItemA(id, index) {
				this.currentA = index - 1;
				this.currentA_index = index;
				let rectNavc = this.getViewRect(id); //导航的位置
				let contentNavc = this.getViewRect('#content');
				this.isLeftA = rectNavc.left + rectNavc.width / 2.0 - this.isWidthA / 2.0 - contentNavc.left;
			},
			unlogin() {
				// 显示确认对话框
				uni.showModal({
					title: '确认退出', // 对话框标题
					content: '您确定要退出登录吗？', // 对话框内容
					success: (res) => {
						if (res.confirm) {
							// 用户点击确认按钮
							console.log('用户点击确认');
							uni.removeStorageSync('userId'); // 清除本地存储的用户ID
							plus.runtime.restart(); // 重启应用
						} else if (res.cancel) {
							// 用户点击取消按钮
							console.log('用户点击取消');
						}
					}
				});
			},
			/*左右滑动事件*/
			change(e) {
				let current = e.detail.current;
				current++;
				this.clickItem(`#item${current}`, current);
			},
			/*左右滑动事件*/
			changeA(e) {
				let currentA = e.detail.current;
				currentA++;
				this.clickItemA(`#item${currentA}A`, currentA);
			},
			//获取页面坐标
			getViewRect: function(className) {
				// 注意：想要拿到元素实例，需要在实例已经挂载到页面上才可以
				var result = 0;
				const query = uni.createSelectorQuery().in(this);
				query.select(className).boundingClientRect(data => {
					// console.log(data)
					result = data;

				}).exec();
				return result;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeeeee;
	}

	.scroll-y {
		height: 83vh;
		// margin-top: 10rpx;
	}

	// page {
	// 	background-color: #f3f3f3;
	// 	font-size: 30upx;
	// }

	.header {
		background: #fff;
		height: 290upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 270upx;
			padding-top: 100upx;
			background-color: #6A5DAC;
		}
	}

	.box {
		width: 100%;
		height: 280upx;
		border-radius: 20upx;
		margin: auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

			}

			.phone-number {
				width: 100%;
				text-align: center;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				// border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx;
			}
		}
	}



	// page {
	// 	position: relative;

	// }

	.content {
		width: 100%;

		// margin: 90upx 0 0upx 0;

		// background-color: red;
		// display: flex;
		// justify-content: center;
		// justify-items: center;
		box-sizing: border-box;
	}

	.content .topView {
		width: auto;
		height: 90upx;

		display: flex;

		margin-bottom: 1upx;
		padding: 10upx;

		background-color: #fff;
	}

	.content .topView .topL {
		width: 80upx;
		height: 100%;

		// background-color: blue;
	}

	.content .topView .topL image {
		width: 80upx;
		height: 80upx;

		border-radius: 40upx;
	}

	.content .topView .topC {
		max-width: 320upx;
		height: auto;

		margin: 5upx 5upx 5upx 10upx;

		// background-color: yellow;

		display: flex;
		flex-flow: row wrap;
		align-content: space-between;

	}

	.content .topView .topC .title {
		width: 100%;
		height: 50%;

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		font-size: 30upx;

		color: #333;

	}

	.content .topView .topC .status {
		width: 100%;

		// background-color: red;

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		font-size: 27upx;

		color: #333;

	}

	.content .topView .topR {
		height: 100%;

		flex: 1;
		display: flex;
		align-items: center;
		flex-flow: row-reverse;

		// background-color: green;

	}

	.content .topView .attention {
		height: 60upx;
		line-height: 60upx;
		width: 110upx;

		text-align: center;

		font-size: 27upx;

		background-color: #6A5DAC;

		border-radius: 30upx;

		color: #fff;



	}

	.content .courseVideo {
		width: 100%;

		background-color: #fff;
		box-sizing: border-box;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.content .courseVideo .videoView {
		margin: 15upx;
		width: 100%;
		height: 300upx;
		box-sizing: border-box;

		background-color: #fff;

		display: flex;
	}

	.content .courseVideo .videoView .video-container {

		width: 100%;
		margin-left: 15upx;
		margin-right: 15upx;
		height: 100%;
		display: flex;

	}

	.content .courseVideo .videoView .video-container>image {
		width: 100%;
		height: 100%;
	}

	.content .selectItem {
		width: 100%;
		height: 100upx;

		background-color: #fff;
		display: flex;
		flex-direction: column;

	}

	.content .selectItem .scrollview {
		width: 100%;
		height: 100upx;
		background-color: #fff;
		border-bottom: 1upx #f2f2f2 solid;
		z-index: 100;

		// background-color: blue;
		// white-space: nowrap;

	}

	.content .selectItem .scrollview .line {
		background-color: #f74163;

		height: 10upx;

		border-radius: 5upx;

		position: absolute;
		bottom: 0upx;

		transition: .5s;
	}

	.content .selectItem .scrollview .items {
		
		height: 100%;
		line-height: 100upx;

		margin-left: 40upx;
		padding: 0 8upx;

		display: inline-block;
		// background-color: green;
	}

	.content .selectItem .scrollview .items>text {
		// background-color: red;
		font-size: 30upx;
	}

	.content .selectItem .scrollview .items .selected {
		color: #6A5DAC;
		font-weight: bold;
	}

	.content .itemAll .swiper {
		height: calc(100vh - 100upx);
		// background-color: red;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one {
		// margin: 15upx;
		height: auto;
		min-height: 400px;
		margin: 0upx;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body {
		width: 100%;
		display: flex;
		flex-direction: column;

	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.course {
		margin-bottom: 15upx;
		width: 100%;
		height: 100upx;
		background-color: #fff;
		padding: 15upx;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.course>.title {
		height: 60%;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.course>.title>text {
		font-size: 20upx;
		color: #333;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.course>.time {
		height: 40%;

	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.course>.time>text {
		font-size: 28upx;
		color: #999;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.contentA {
		width: 100%;
		height: 100upx;

		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.contentA>.scrollviewA {
		width: 100%;
		height: 100%;

		// background-color: blue;
		// white-space: nowrap;

	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.contentA>.scrollviewA .lineA {
		background-color: #f74163;

		height: 10upx;

		border-radius: 5upx;

		position: absolute;
		bottom: 0upx;

		transition: .5s;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.contentA>.scrollviewA .itemsA {
		height: 100%;
		line-height: 100upx;

		margin-left: 40upx;
		padding: 0 20upx;

		display: inline-block;
		// background-color: green;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.contentA>.scrollviewA .itemsA>text {
		// background-color: red;
		font-size: 28rpx;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.contentA>.scrollviewA .itemsA>.selected {
		border-bottom: 2px solid #6A5DAC;
		/* 添加下划线 */
		padding-bottom: 3px;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.itemAllA .swiper {
		height: calc(100vh - 100upx);
		// background-color: red;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.itemAllA .swiper swiper-item .swiper-item1 .one {
		margin: 15upx;
	}

	.content .itemAll .swiper swiper-item .swiper-item1 .one .body>.itemAllA .swiper swiper-item .swiper-item1 .two {
		margin: 15upx;
	}

	.content .itemAll .swiper swiper-item .swiper-item2 .two {
		margin: 15upx;
	}

	.content .itemAll .swiper swiper-item .swiper-item3 .three {
		margin: 15upx;
	}

	.content .itemAll .swiper swiper-item .swiper-item4 .four {
		margin: 15upx;
	}

	.botttomView {
		width: 100%;
		// height: 110upx;

		background-color: #ff;

		position: fixed;
		bottom: 0;

		border-top: 1upx #f2f2f2 solid;

		display: flex;
	}











	.profile-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.profile-header {
		position: relative;
		width: 100%;
		height: 30vh;
	}

	.profile-bg {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(8px);
	}

	.user-info {
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.user-avatar image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 2px solid white;
		margin-bottom: 10px;
	}

	.user-stats {
		display: flex;
		justify-content: space-around;
		width: 100%;
		color: white;
	}

	.user-stats view {
		align-items: center;
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// gap: 10px;
		padding: 6px;
	}

	.menu-item {
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: #f0f0f0;
		// padding: 20px;
		border-radius: 10px;
		font-size: 16px;
	}
</style>