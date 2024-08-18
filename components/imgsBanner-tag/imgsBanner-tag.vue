<template name='imgsBanner'>
	<view class="imgsBannerBox">
		<swiper class="imgsBanner_swiper" :autoplay='autoplay' :interval='Number(interval)' :duration='Number(duration)'
			:current='comCurrentImg' @change='changCurrent'>
			<swiper-item v-for="(item, index) in imgList" :key='index'>
				<image :src="item.imgSrc" mode="aspectFill" @longpress="onLongPressImage(item.imgSrc)"
					@click="onClickImg(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 图片位置 -->
		<view class="imgLength">{{(comCurrentImg + 1) + '/' + (imgList.length)}}</view>
		<scroll-view scroll-x="true" class="scrollImgBox" :scroll-left='scrollImgList' scroll-with-animation
			v-if="isShowSmallImgs">
			<view class="scrollImgList">
				<image :src="item.imgSrc" mode="aspectFill" v-for="(item, index) in imgList" :key='index'
					:class="comCurrentImg == index ? 'activeImageItem' : ''" @click="onClickImg(index)"
					:id="'item' + index"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'imgsBanner-tag',
		props: {
			imgList: {
				type: Array,
				default: () => []
			},
			currentImg: {
				type: Number,
				default: 0
			},
			isShowSmallImgs: { //是否需要展示小图
				type: Boolean,
				default: true
			},
			customizeDisplayField: { //自定义展示字段
				type: String,
				default: ''
			},
			// 是否循环
			autoplay: {
				type: Boolean,
				default: false
			},
			// 自动切换时间间隔
			interval: {
				type: [Number, String],
				default: 5000
			},
			// 滑动动画时长
			duration: {
				type: [Number, String],
				default: 500
			},
		},
		data() {
			return {
				comCurrentImg: 0,
				scrollImgList: 0,
				imgLeftList: [],
				recognizeResult: ''
			};
		},
		created() {
			this.comCurrentImg = this.currentImg;
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.imgList.forEach((i, v) => {
						let info = uni.createSelectorQuery().in(this);
						info.select("#item" + v).boundingClientRect((res) => {
							this.imgLeftList.push(res.left)
						}).exec()
					})
					this.imgListScroll(this.comCurrentImg)
				}
			});
		},
		methods: {
			getItemUrl(item) {
				let {
					customizeDisplayField
				} = this
				if (customizeDisplayField) {
					return customizeDisplayField.split('.').reduce((v, k) => v[k], item)
				} else {
					return item
				}
			},
			onClickImg(index) {
				const urls = this.imgList.map(item => item.imgSrc);
				uni.previewImage({
					current: urls[index],
					urls
				});
			},
			changCurrent(e) {
				this.comCurrentImg = e.target.current
				this.imgListScroll(e.target.current)
				this.$emit('change', this.imgList[e.target.current], e.target.current)
			},
			// 图片滑动
			imgListScroll(index) {
				if (index >= 2) {
					this.scrollImgList = this.imgLeftList[index - 2]
				} else {
					this.scrollImgList = 0
				}
			},
			onLongPressImage(imgSrc) {
				uni.showActionSheet({
					itemList: ['小助手识图', '保存图片'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.recognizeImage(imgSrc);
						} else if (res.tapIndex === 1) {
							this.saveImage(imgSrc);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			recognizeImage(imgSrc) {
				uni.showToast({
					title: '识图功能正在开发中...',
					icon: 'none'
				}, 2000)
				// uni.showLoading({
				// 	title: '正在识图中...'
				// });
				// // 请求接口
				// uni.request({
				// 	url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
				// 	method: 'POST',
				// 	data: {
				// 		model: 'GLM-4V',
				// 		messages: [{
				// 				role: 'system',
				// 				content: '你是一个小助手，请解释一下用户传来的图片，尽可能详细~'
				// 			},
				// 			{
				// 				role: 'user',
				// 				content: {
				// 					type: 'image_url',
				// 					url: imgSrc
				// 				}
				// 			}
				// 		]
				// 	},
				// 	header: {
				// 		'content-type': 'application/json', // 默认值
				// 		'Authorization': `Bearer 61d409be4ff4e1862a43b251b1c05b30.ZqYKEGyRqx1H0ZzY`
				// 	},
				// 	success: (res) => {
				// 		console.log(imgSrc)
				// 		console.log(res);

				// 		uni.hideLoading();
				// 		uni.showModal({
				// 			content: res.data.choices[0].message.content
				// 		})

				// 	},
				// 	fail: (err) => {
				// 		uni.hideLoading();
				// 		console.log(err);
				// 	}
				// });
			},
			saveImage(imgSrc) {
				uni.downloadFile({
					url: imgSrc,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									uni.showToast({
										title: '图片保存成功',
										icon: 'success'
									});
								},
								fail: () => {
									uni.showToast({
										title: '图片保存失败',
										icon: 'none'
									});
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.imgsBannerBox {
		position: relative;
	}

	.imgLength {
		position: absolute;
		top: 694rpx;
		right: 24rpx;
		background: rgba(0, 0, 0, 0.34);
		padding: 0 12rpx;
		line-height: 32rpx;
		font-size: 22rpx;
		border-radius: 16rpx;
		color: #fff;
	}

	.imgsBanner_swiper {
		width: 750rpx;
		height: 750rpx;
		margin-bottom: 24rpx;

		swiper-item {
			width: 750rpx;
			height: 100%;

			image {
				width: 750rpx;
				height: 750rpx;
			}
		}
	}

	.scrollImgBox {
		.scrollImgList {
			white-space: nowrap;

			image {
				width: 132rpx;
				height: 132rpx;
				margin-right: 16rpx;
				display: inline-block;
				border: 6rpx solid #fff;
			}

			image:last-child {
				margin-right: 0;
			}

			.activeImageItem {
				border: 6rpx solid #F57341;
			}
		}
	}
</style>