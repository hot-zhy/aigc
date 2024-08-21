<template>
	<view class="zero-timeline">
		<view v-for="(item, index) in dataList" :key="index" class="item"
			:style="{'--color':item.color||'#0396FF','--bgcolor':item.color?item.color+'1a':'#0396FF1a','--gap':gap,'--left':leftWidth}"
			style="width: 100%;">
			<view class="left" v-if="showLeft" style="width: 10vw;">
				<view class="content">
					<input v-model="item.leftTitle" class="title" />
					<input v-model="item.leftContent" class="sub" />
				</view>
			</view>
			<view class="line">
				<view class="dot">
				</view>
			</view>
			<view class="right" :style="'background-color:'+ convertToRGBA(item.color, 0.16)">
				<view class="content" style="width: 100%;">
					<input v-model="item.title" class="title" style="font-size: 35rpx;" />
					<textarea v-model="item.content" class="sub" style="font-size: 25rpx;height: 100rpx;"></textarea>
					
					<view @tap="chooseImages(index)" style="display: flex;flex-wrap: wrap;margin-top:20rpx">
						<image src="../../static/upload.png" mode="widthFix"
							style="width: 120rpx;height: 120rpx;"></image>
						<view v-for="(item1, index1) in item.imageList.split(',')" :key="index1" v-if="item1" class="image-container">
						  <image :src="item1" mode="aspectFill"
						    style="width: 120rpx; height: 120rpx; border-radius: 20rpx; margin-left: 20rpx;">
						  </image>
						  <view class="delete-btn" @tap.stop="removeImage(index, item1)">X</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zero-timeline",
		props: {
			dataList: {
				type: Array,
				default: () => []
			},
			i: {
				type: Number,
				required: true
			},
			showLeft: {
				type: Boolean,
				default: true
			},
			leftWidth: {
				type: String,
				default: '150rpx'
			},
			gap: {
				type: String,
				default: '20rpx'
			}
		},
		methods: {
			chooseImages(index) {
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					success: res => {
						const item = this.dataList[index];
						const newImagePaths = res.tempFilePaths;
						const existingImageList = new Set(item.imageList.split(','));

						newImagePaths.forEach((filePath, i) => {
							uni.uploadFile({
								url: 'http://110.40.182.65:8080/post/upload',
								filePath: filePath,
								name: 'file',
								header: {
									'Content-Type': 'multipart/form-data'
								},
								success: (uploadRes) => {
									const uploadedImage = JSON.parse(uploadRes.data).message;
									if (!existingImageList.has(uploadedImage)) {
										existingImageList.add(uploadedImage);
									}
									if (i === newImagePaths.length - 1) {
										item.imageList = Array.from(existingImageList).join(',');
									}
								},
								fail: (error) => {
									console.log(error);
								}
							})
						});
					}
				});
			},
			removeImage(index, image) {
				const item = this.dataList[index];
				let imageList = item.imageList.split(',').filter(img => img !== image);
				item.imageList = imageList.join(',');
			},
			convertToRGBA(rgb, opacity) {
				return rgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
			},
			updateDataList() {
				this.$emit('updateDataList', [this.dataList, this.i]);
			}
		},
		watch: {
			dataList: {
				handler(newVal, oldVal) {
					this.updateDataList();
				},
				deep: true
			}
		}
	};
</script>

<style lang="scss" scoped>
	.zero-timeline {
		position: relative;
		padding: 10rpx;
		display: flex;
		flex-direction: column;

		.item {
			display: flex;
		}

		.left {
			width: var(--left);
			overflow: hidden;
			margin-bottom: var(--gap);
			text-align: right;
			white-space: pre-wrap;
			word-wrap: break-word;
			word-break: break-all;
			flex-shrink: 0;

			.content {
				input {
					width: 100%;
				}
			}
		}

		.line {
			margin: 2px 10px 0px 10px;
			width: 2px;
			background: #838383;
			position: relative;
			flex-shrink: 0;
			flex-grow: 0;

			.dot {
				position: absolute;
				top: 0px;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				align-items: center;
				width: 8px;
				height: 8px;
				background: var(--color);
				box-shadow: 0 0 3px 1px var(--color);
				border-radius: 50%;
			}
		}

		.right {
			border-radius: 10px;
			flex: 1;
			margin-bottom: var(--gap);

			.content {
				padding: 20rpx 30rpx;
				min-height: 50rpx;
				background: var(--bgcolor);
				border-radius: 10rpx;
				white-space: pre-wrap;
				word-wrap: break-word;
				word-break: break-all;

				input,
				textarea {
					width: 100%;
				}
			}
		}

		.item:last-child {
			.line {
				background: transparent;
			}
		}

		.image-container {
			position: relative;
			.image-container {
				.image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 20rpx;
					margin-left: 20rpx;
				}
			}
			.delete-btn {
				position: absolute;
				top: 0;
				right: 0;
				background: rgba(255, 0, 0, 0.5);
				color: #fff;
				width: 30rpx;
				height: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				cursor: pointer;
			}
		}
	}
</style>
