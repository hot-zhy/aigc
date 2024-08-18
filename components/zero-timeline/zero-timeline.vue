<template>
	<view class="zero-timeline">
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')" @click="choose">
			<scroll-view class="scrolls" scroll-y>
				<yt-order-list-jump :orderList="myStragetyList"></yt-order-list-jump>

			</scroll-view>
		</view>
		<view v-for="(item, index) in dataList" :key="index" class="item"
			:style="{'--color':item.color||'#0396FF','--bgcolor':item.color?item.color+'1a':'#0396FF1a','--gap':gap,'--left':leftWidth}">
			<view class="left" v-if="showLeft">
				<view class="content">
					<view class="title">
						{{ item.leftTitle}}
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
							{{ item.time}}
						</view>
						<view class="content" style="width: 100%;">
							<view class="" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
								<view class="title" style="flex-grow: 1; text-align: left;">
									{{ item.title }}
								</view>
								<view class="" style="flex-shrink: 0;">
									<image src="../../static/query.png" style="width:50rpx;height:50rpx;margin-left: auto;" @tap="chat(item.title)" />
								</view>
							</view>
							<view class="Express" style="width: 100%;">
								<view class="info">
									<view style="width: 100%;" v-if="item.content!==''" :class="{hide:!iSinfo}" class="sub">
										{{item.content}}
									</view>
									<view style="width: 100%;" :class="{hide:!iSinfo}" class="sub" v-else>暂时没有详细介绍哦~可以编辑一下为这个旅游景点增加简短的介绍哦~</view>
								</view>
								<!-- <text @tap="showinfo" v-if="iSinfo" class="hidebtn">收起</text> -->
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
				couponshow: false,
			}
		},
		methods: {

			convertToRGBA(rgb, opacity) {
				// 从"rgb(x, y, z)"形式转换为"rgba(x, y, z, opacity)"
				return rgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
			},
			showinfo(content) {
				this.selectedContent = content; // 更新选中的内容
				uni.showModal({
					content: this.selectedContent,
					showCancel: false // 只显示确认按钮
				});
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
	.Express {
		display: flex;
		// width: 100%;
		flex-direction: column;
		// background-color: #fff;
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
				// background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
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
		// overflow: scroll;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		// -webkit-line-clamp: 2; //此处为上限行数
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
					// padding: 5rpx 0;
				}

				.sub {
					width:100%;
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
</style>