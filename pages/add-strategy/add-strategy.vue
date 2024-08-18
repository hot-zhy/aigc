<template>
	<view class="publish">



		<!-- 选择优惠券弹出层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')" @click="choose">
			<scroll-view class="scrolls" scroll-y>
				<zero-waterfall-jump :list="dataList">
					<!--  #ifdef  MP-WEIXIN -->
					<view v-for="(item, index) of dataList" :key="index" slot="slot{{item.postId}}">
					</view>
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<template v-slot:default="item">
					</template>
					<!-- #endif -->
				</zero-waterfall-jump>

			</scroll-view>
		</view>
		<view class="main_body">
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
				:placeholder='placeholder'></biner-input-tags>
		</view>


		<view v-if="!postId" class="" style="width: 100%; display: flex;" @click="opencoupon()">
			<view style="margin-left: auto; display: flex; align-items: center;margin-right: 25rpx;">
				<image style="width: 40rpx; height:40rpx" src="../../static/choose.png" />
				<view style="margin-left: 10rpx;">选择关联帖子</view>
			</view>
		</view>

		<view v-else class="" style="width: 100%; display: flex;">
			<view style="margin-left: auto; display: flex; align-items: center;margin-right: 25rpx;">
				<image style="width: 40rpx; height:40rpx" src="../../static/chosen.png" />
				<view style="margin-left: 10rpx;" @click="opencoupon()">重新选择</view>
			</view>
		</view>
		<!-- 		<button v-if="!postId" style="background-color: #fbfde4;border-radius: 40rpx;width: 95%;"
			@click="opencoupon()">选择关联帖子</button>
		<view v-else @tap="relate" style="margin-left:20rpx;margin-top: 20rpx;border-radius: 40rpx;">已选择关联帖子</view> -->

		<!-- <view style="height: 150rpx;"></view> -->
		<button style="margin-top: 20rpx;background-color: #6A5DAC;color: white;border-radius: 40rpx;width: 95%;"
			@click="submit">发布攻略</button>
	</view>
</template>

<script>
	import binerInputTags from '@/components/biner-input-tags/biner-input-tags'
	import zeroWaterfallJump from '@/components/zero-waterfall-jump/components/zero-waterfall/zero-waterfall.vue'
	export default {
		components: {
			binerInputTags,
			zeroWaterfallJump
		},
		data() {
			return {

				strategyInfo: {}, // 存储获取到的数据,
				//图片列表
				show: true,

				videoData: "https://img1.baidu.com/it/u=2775377376,69094478&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689786000&t=574ec349c13717f468097f23b78c25a1",
				disabled: false, //不禁用
				// 默认的数组 不填默认的是空数组
				topicList: [],
				// 默认提示
				placeholder: '请输入话题并回车',

				strategySets: [],
				strategyDesc: "",
				strategyTitle: "",
				day: 1,
				postId: null,


				couponshow: false,

				arr: [],
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
				tabClick: false,

				backgroundColor: "#d4237a",
				selectbackgroundColor: "#ffffff",
				color: "#ffffff",
				selectcolor: "#228B22",
				addlistdata: [{
						title: "发布帖子",
						src: "/static/images/post_selected.png"
					},
					{
						title: "发布攻略",
						src: "/static/images/stragety_selected.png"
					}
				]
			}
		},
		onLoad(options) {
			// 获取 URL 参数中的 strategyInfo
			const strategyInfo = options.strategyInfo;
			// 将字符串转换为对象
			if (strategyInfo) {
				this.strategyInfo = JSON.parse(decodeURIComponent(strategyInfo));
			}
			this.strategySets = this.strategyInfo

			console.log(this.strategySets)

			this.postId = options.postId
			console.log(this.postId)
		},
		watch: {
			obj: {
				deep: true, //true为进行深度监听,false为不进行深度监听
				handler(newVal) {
					console.log(newVal);
					if (newVal.title && newVal.content && newVal.chooseImags.length) {
						this.show = true;
					} else {
						this.show = false;
					}
				}
			}
		},
		onShow() {
			console.log(uni.getStorageSync('userId'));

			// uni.removeStorageSync('userId')
			if (!uni.getStorageSync('userId')) {
				console.log("没有登录");
				uni.navigateTo({
					url: '/pages/login/login',
					
				});
			}
			let userId = uni.getStorageSync('userId')
			console.log(userId)
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/post/list',
				method: 'GET',
				success: (res) => {
					this.dataList = res.data.data
					console.log(res)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
		},
		methods: {
			choose() {
				console.log(uni.getStorageSync('choosePostId'))
				uni.showToast({
					title: '选择成功',
					icon: 'none'
				}, 2000)
				this.postId = uni.getStorageSync('choosePostId')
				this.couponshow = false
			},
			// 打开优惠券弹框 
			opencoupon() {
				this.couponshow = true
			},
			// 关闭优惠券弹框 
			hidecoupon() {
				this.couponshow = false
			},

			submit() {
				uni.request({
					url: 'http://110.40.182.65:8080/strategy/publish',
					method: 'POST',
					data: {
						"strategyTitle": this.strategyTitle,
						"strategyDesc": this.strategyDesc,
						"topicList": this.topicList.map(item => item.title),
						"strategySets": this.strategySets,
						"day": this.strategySets.length,
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
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>