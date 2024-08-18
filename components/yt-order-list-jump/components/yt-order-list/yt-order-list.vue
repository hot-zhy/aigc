<template>
	<view class="mx-2">
		<view class="order" v-for="(item,index) in orderList" :key="index" @click="openStragetyDetail(item.strategyId)">
			<view class="order-number">
				<view class="number-left">
					<image class="avatar" :src="randomAvatar(item.userId)" mode="widthFix"></image>
					<text>{{ item.userName }}</text>
				</view>
				<view class="number-right" :class="item.status == 3 ? 'green':item.status == 2?'blue':'red'">
					{{ item.day }}天
				</view>
			</view>
			<view class="mx-2">
				<view class="mt-1">
					<text style="font-size: 32rpx; color: #000000;" class="row1">{{ item.strategyTitle }}</text>
				</view>
				<view class="mt-2 mb-1">
					<text style="color: dimgrey;font-size: 28rpx;">{{ item.strategyDesc }}</text>
				</view>
				<view class="order-item">
					<!-- <text style="color:dimgrey">发布时间：</text> -->
					<text style="color:dimgrey">{{ item.time }}</text>
				</view>
			</view>
			<view class="order-bom">
				<view style="width: 100%;height: 50rpx;">
					<view style="width: 100%;height: 50rpx;" v-for=" (item,index) in item.topicList" :index=index>
						<view class="order-bom-left">#{{ item.topicName }}</view>
					</view>
				</view>
				<view class="order-bom-right">
					<!-- <view class="box1" @click="Transfer(item.orderId)">转派</view> -->
					<view class="box2" style="display: flex;align-content: center;align-items: center;jus">

						<image style="width: 40rpx;height: 40rpx;" src="../../../../static/like.png" />

						<view style="color: #626262;margin-left: 5rpx">{{item.strategyLikeCount}}</view>
					</view>
					<view class="box3" style="display: flex;align-content: center;align-items: center;">
						<image style="width: 40rpx;height: 40rpx;" src="../../../../static/collect.png" />

						<view style="color: #626262;margin-left: 5rpx;">{{item.strategyCollectCount}}</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "yt-order-list",
		props: {
			orderList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			openStragetyDetail(id) {
				uni.setStorageSync('chooseStrategyId', id)
			},
			randomAvatar(userId) {
				return "../../../../../static/user-avatar/" + (userId % 5 + 1) + '.jpg'
			},
		}
	}
</script>

<style lang="scss">
	.avatar {
		width: 65rpx;
		height: 65rpx;
		border-radius: 100%;
		margin-right: 10px;
	}

	.green {
		color: green;
	}

	.red {
		color: red;
	}

	.blue {
		color: #4b5eeb;
	}

	.order {
		width: 100%;
		// height: 200rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		padding: 15rpx;
		box-sizing: border-box;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		margin-top: 10rpx;
		margin-bottom: 15rpx;

		.order-number {
			width: 100%;
			color: #6A5DAC;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #f3f3f3;
			padding-bottom: 20rpx;

			.number-left {
				display: flex;
				align-items: center;
				font-weight: bold;

				// image {
				// 	width: 30rpx;
				// 	height: 30rpx;
				// 	margin-right: 15rpx;
				// }

				text {
					font-size: 30rpx;
					letter-spacing: 3rpx;
				}
			}

			.number-right {
				font-size: 26rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				padding-right: 5rpx;
				box-sizing: border-box;
				color: #6A5DAC
			}

		}

		.order-item {
			width: 100%;
			display: flex;
			align-items: center;
			height: 50rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 15rpx;
			}

			text {
				font-size: 24rpx;
				color: rgba(0, 0, 0, 0.8);
			}
		}

		.order-bom {
			border-radius: 30rpx;
			width: 100%;
			height: 60rpx;

			display: flex;
			align-items: center;
			justify-content: space-between;

			.order-bom-left {
				color: rgba(0, 0, 0, 0.5);
				font-size: 24rpx;
				padding-left: 40rpx;
				height: 100%;
				border-radius: 30rpx;
				// text-align: center;
				align-content: center;
				box-sizing: border-box;
				background-color: #f5f5f5;
			}

			.order-bom-right {
				// width: 150rpx;
				height: 100%;
				display: flex;
				// color: #ffffff;
				font-size: 26rpx;

				.box1 {
					height: 100%;
					line-height: 60rpx;
					background-color: #e5a84a;
					padding: 0 30rpx;
					box-sizing: border-box;
					border-radius: 30rpx;
					margin-right: 10rpx;
				}

				.box2 {
					height: 100%;
					// line-height: 60rpx;
					// background-color: #ffe5f5;
					padding: 0 30rpx;
					box-sizing: border-box;
					border-radius: 10rpx;
					margin-right: 10rpx;
				}

				.box3 {
					height: 100%;
					// line-height: 60rpx;
					// background-color: #b9c5fc;
					padding: 0 30rpx;
					box-sizing: border-box;
					border-radius: 10rpx;
					// margin-right: 10rpx;
				}
			}
		}
	}
</style>