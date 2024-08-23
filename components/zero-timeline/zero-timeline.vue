<template>
	<view class="zero-timeline">
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')">
			<scroll-view class="scrolls" scroll-y>
				<yt-order-list-jump :orderList="myStragetyList"></yt-order-list-jump>
			</scroll-view>
		</view>

		<view v-for="(item, index) in dataList" :key="index" class="item"
			:style="{'--color':item.color||'#0396FF','--bgcolor':item.color?item.color+'1a':'#0396FF1a','--gap':gap,'--left':leftWidth}">
			<view class="left" v-if="showLeft">
				<view class="content">
					<view class="title">
						{{ item.leftTitle }}
					</view>
					<view class="sub">
						{{ item.leftContent }}
					</view>
				</view>
			</view>
			<view class="line">
				<view class="dot">
				</view>
			</view>
			<view class="right" :style="'background-color:'+ convertToRGBA(item.color, 0.16)">
				<view class="" style="display: flex;">
					<view class="">
						<view class="time">
							{{ item.time }}
						</view>
						<view class="content" style="width: 100%;">
							<view class=""
								style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
								<view class="title" style="flex-grow: 1; text-align: left;">
									{{ item.title }}
								</view>
								<view class="" style="flex-shrink: 0;">
									<image src="../../static/query.png"
										style="width:50rpx;height:50rpx;margin-left: auto;" @tap="chat(item.title)" />
								</view>
							</view>
							<view class="Express" style="width: 100%;">
								<view class="info">
									<view style="width: 100%;" v-if="item.content !== ''" :class="{ hide: !iSinfo }"
										class="sub">
										{{ item.content }}
									</view>
									<view style="width: 100%;" :class="{ hide: !iSinfo }" class="sub" v-else>
										暂时没有详细介绍哦~可以编辑一下为这个旅游景点增加简短的介绍哦~
									</view>
								</view>
								<view class="" style="width: 100%; display: flex;">
									<button v-if="item.imageList.split(',').map(d=>d.trim()).filter(d=>d).length !== 0"
										class="view-images-btn"
										:style="{ backgroundColor: convertToRGBA(item.color, 0.26), flex: 1 }"
										@click="notifyParent(item,0)">
										查看关联图片
									</button>
									<view class="view-images-btn" style="justify-content: center;justify-items: center;"
										:style="{ flex: 1, borderRadius: '20px', display: 'flex', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }"
										@click="notifyParent(item,1)">
										<image src="../../static/daka.png" mode="" style="width: 75rpx; height: 75rpx;">
										</image>
									</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ytOrderListJump from '@/components/yt-order-list-jump/components/yt-order-list/yt-order-list.vue'
	export default {
		components: {
			ytOrderListJump
		},
		name: "zero-timeline",
		props: {
			dataList: {
				type: Array,
				default: () => []
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
		data() {
			return {
				iSinfo: false,
				selectedContent: '',
				couponshow: false
			}
		},
		methods: {
			convertToRGBA(rgb, opacity) {
				return rgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
			},
			notifyParent(item, index) {
				if (index === 0) {
					this.$emit('show-popup', item.imageList, index)
				} else {
					this.$emit('show-popup', item.title, index)
				}
				// this.$emit('show-image-popup', imageList);
			},
			chat(title) {
				console.log(title)
				uni.navigateTo({
					url: '/pages/chat/chat?title=' + title
				})
			}
		}
	};
</script>


<style lang="scss" scoped>
	.view-images-btn {
		// width:100%;
		margin-top: 5rpx;
		font-size: 25rpx;
		// background-color: #dbdde2;
		text-align: center;
		cursor: pointer;
		border: none;
		outline: none;
	}

	.Express {
		display: flex;
		flex-direction: column;
		position: relative;

		.info {
			display: flex;
			flex-direction: column;

			view {
				text-align: justify;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				word-break: break-word; //换行模式
			}

			text {
				width: 70px;
				font-size: 14px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #0078FF;
				position: absolute;
				bottom: 5upx;
				right: 0upx;
			}
		}
	}

	.hidebtn {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		color: #0078FF;
		font-size: 14px;
	}

	.hide {
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

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

			.time {
				font-size: 24rpx;
				color: #333333;
			}

			.content {
				.title {
					color: var(--color);
					font-size: 32rpx;
					font-weight: 500;
				}

				.sub {
					color: #999999;
					font-size: 24rpx;
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

			.time {
				font-size: 24rpx;
				color: #333333;
			}

			.content {
				padding: 20rpx 30rpx;
				min-height: 50rpx;
				background: var(--bgcolor);
				border-radius: 10rpx;
				white-space: pre-wrap;
				word-wrap: break-word;
				word-break: break-all;

				.title {
					font-weight: 650;
					color: var(--color);
					font-size: 33.5rpx;
				}

				.sub {
					width: 100%;
					color: #666666;
					font-size: 28rpx;
					padding: 5rpx 0;
				}

				.tips {
					color: #999999;
					font-size: 24rpx;
				}
			}
		}

		.item:last-child {
			.line {
				background: transparent;
			}
		}
	}

	// 图片弹出框样式
	.image-popup {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}

	.image-popup-mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.image-popup-content {
		padding: 20rpx;
		height: 70vh;
	}

	.image-item {
		margin-bottom: 10rpx;
	}

	.image {
		width: 100%;
		height: 200rpx;
		border-radius: 10rpx;
	}
</style>