<template>
	<view class="publish">
		<!-- 选择优惠券弹出层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')" @click="choose">
			<scroll-view class="scrolls" scroll-y>
				<yt-order-list-jump :orderList="myStragetyList"></yt-order-list-jump>

			</scroll-view>
		</view>
		<view class="main_body">
			<view class="character">
				<input v-model="title" type="text" placeholder="请输入帖子标题">
			</view>
			<view class="textarea">
				<textarea v-model="desc" placeholder="更多介绍"></textarea>
				<view class=""
					style="display: flex;text-align: center;justify-content: end;align-content: center;align-items: center;"
					@click="polish">
					<view class="">
						<image src="../../static/polish.png" mode="" style="width: 45rpx;height: 45rpx;"></image>
					</view>
					<view class="" style="color: #6A5DAC;">AI润色</view>
				</view>
			</view>


		</view>


		<!-- 添加话题 -->
		<view class="talking">
			<view>
				<text># 添加话题</text>
				<text>让更多人看到</text>
			</view>
			<biner-input-tags @change="change" :selectlist='topicList' :disabled='disabled'
				:placeholder='placeholder'></biner-input-tags>
		</view>

		<!-- 地点 -->
		<!-- <view
			style="display: flex;align-items: center;justify-items: center;justify-content: space-around;margin-top: 20rpx;">
			<view class="iconfont icon-didian">添加地点</view>
			<view class="">
				<superwei-combox :candidates="candidates" placeholder="请选择或输入一个地点" v-model="selectedItem">
				</superwei-combox>
			</view>
		</view> -->

		<!-- 添加图片 -->
		<view class="" @tap="chooseImages" style="display: flex;flex-wrap: wrap;margin-top:20rpx">
			<image src="https://api.myisre.cn/266fb204fc898feae46618edf.png" mode="widthFix"
				style="width: 150rpx;height: 150rpx;"></image>
			<view class="" v-for="(item,index) in imageList" :key="index">
				<image :src="item" mode=""
					style="width: 150rpx;height: 150rpx;border-radius: 20rpx;margin-left: 20rpx;"></image>
			</view>
		</view>
		<!-- 发布帖子 -->
		<view v-if="!strategyId" class="" style="width: 100%; display: flex;" @click="opencoupon()">
			<view style="margin-left: auto; display: flex; align-items: center;margin-right: 25rpx;">
				<image style="width: 40rpx; height:40rpx" src="../../static/choose.png" />
				<view style="margin-left: 10rpx;">选择关联攻略</view>
			</view>
		</view>

		<view v-else class="" style="width: 100%; display: flex;">
			<view style="margin-left: auto; display: flex; align-items: center;margin-right: 25rpx;">
				<image style="width: 40rpx; height:40rpx" src="../../static/chosen.png" />
				<view style="margin-left: 10rpx;" @click="opencoupon()">重新选择</view>
			</view>
		</view>
		<!-- 发布帖子 -->
		<button @tap="publish"
			style="margin-top: 20rpx;background-color: #6A5DAC;color: white;border-radius: 40rpx;width: 95%;">发布帖子</button>

	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js';
	import fuiButton from "@/components/fui-textarea/fui-textarea.vue";
	import binerInputTags from '@/components/biner-input-tags/biner-input-tags';
	import ytOrderListJump from '@/components/yt-order-list-jump/components/yt-order-list/yt-order-list.vue'
	export default {
		components: {
			fuiButton,
			binerInputTags,
			ytOrderListJump
		},
		data() {
			return {
				myStragetyList: [],
				couponshow: false,
				placeholder: '请输入话题并回车',
				topicList: [{

				}],
				selectedItem: '',
				selectedTopic: '',
				selectedTopic2: '',
				selectedTopic3: '',
				title: "",
				desc: "",
				place: "上海植物园",
				topicList: [{
						id: 0,
						name: "歌词"
					},
					{
						id: 1,
						name: "诗歌"
					}
				],
				imageList: [],
				topicList: [],
				strategyId: null
			}
		},
		onLoad() {
			let userId = uni.getStorageSync('userId')
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
			polish() {
				uni.showLoading({
					title: 'AI润色修改中'
				})
				uni.request({
					url: 'http://110.40.182.65:8080/post/polishing',
					method: 'POST',
					data: {
						"post": this.desc
					},
					success: (res) => {
						console.log(res);

						uni.showModal({
							title: 'AI修改后的内容',
							content: res.data.data,
							confirmText: '采用',
							cancelText: '重新生成',
							success: (res1) => { // 使用箭头函数
								if (res1.confirm) {
									this.desc = res.data.data
								} else if (res1.cancel) {
									this.polish()
								}
							}
						});
						// this.desc = res.data.data
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

			// 打开优惠券弹框
			opencoupon() {
				this.couponshow = true
			},
			// 关闭优惠券弹框 
			hidecoupon() {
				this.couponshow = false
			},
			choose() {
				uni.showToast({
					title: '选择成功',
					icon: 'none'
				})
				this.strategyId = uni.getStorageSync('chooseStrategyId')

				this.couponshow = false
			},
			publish() {
				uni.request({
					url: 'http://110.40.182.65:8080/post/publish',
					method: 'POST',
					data: {
						"postDesc": this.desc,
						"postImageList": this.imageList.join(","),
						"postTitle": this.title,
						// "recommendPlace": this.selectedItem,
						"topicList": this.topicList.map(item => item.title),
						"strategyId": this.strategyId
					},
					success: (res) => {
						console.log(res);
						uni.navigateTo({
							url: '/pages/my/my'
						});
						plus.runtime.restart();
					},
					fail: (error) => {
						console.log(error);
					},
					complete: () => {}
				});
			},
			chooseImages() {
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					success: res => {
						//上传图片
						console.log(res)
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							console.log(res.tempFilePaths[i])
							uni.uploadFile({
								url: 'http://110.40.182.65:8080/post/upload',
								filePath: res.tempFilePaths[i],
								name: 'file',
								header: {
									'Content-Type': 'multipart/form-data'
								},
								success: (res) => {
									console.log(res)
									console.log(JSON.parse(res.data).message);
									this.imageList.push(JSON.parse(res.data).message)
								},
								fail: (error) => {
									console.log(error);
								},
								complete: () => {
									if (this.imageList.length == res.tempFilePaths.length) {
										// 发布帖子
										console.log('发布帖子');
										console.log(this.imageList.join(","));
										// uni.request({
										// 	url: 'http://110.40.182.65:8080/post/publish',
										// 	method: 'GET',
										// 	data: {},
										// 	success: res => {},
										// 	fail: () => {},
										// 	complete: () => {}
										// });
									}
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
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
		background: #fafbfb;

		.main_body {
			margin-top: 24rpx;
			padding: 24rpx;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
			background-color: #ffffff;

			.character {
				border-bottom: 2rpx solid #e8e8e8;
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

	.content {
		display: flex;
		flex-direction: column;

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
</style>