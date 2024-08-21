<template>
	<view class="mx-2">
		<view class="order p-2" v-for="(item,index) in orderList" :key="index" @click="openStragetyDetail(item.strategyId)">
			<view class="order-number">
				<view class="number-left">
					<text v-if="item.strategyTitle!==''">{{ item.strategyTitle }}</text>
					<text v-else>暂无标题</text>
				</view>
				<view class="number-right" :class="item.status == 3 ? 'green':item.status == 2?'blue':'red'">
					{{ item.day }}天
				</view>
			</view>
			<view>
				<view class="mt-1" style="display: flex;align-items: center;align-content:center">
					<image class="avatar" :src="randomAvatar(item.userId)" mode="widthFix"></image>
					<text style="font-size: 25rpx; color: #000000;">{{ item.userName }}</text>
				</view>
<!-- 				<view class="order-item">
					<text style="color:dimgrey">发布时间：</text>
					<text style="color:dimgrey">{{ item.time }}</text>
				</view> -->
			</view>
			<view class="mt-2 mb-1" style="overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 3;
			    -webkit-box-orient: vertical;">
				<text style="color: dimgrey;font-size: 25rpx;">{{ item.strategyDesc }}</text>
				<text style="color: #0004ff;font-size: 25rpx;" v-for=" (item2,index2) in item.topicList" :index=index>
					#{{ item2.topicName }}
				</text>
			</view>
			<view class="order-bom">
				<view style="width: 100%;" class="order-bom-left">
					<view style="width: 100%">
						<view class="order-bom-left">
							<ff-partner :participants="item.team"></ff-partner>
						</view>
					</view>
				</view>
				<view class="order-bom-right">
					<!-- <view class="box1" @click="Transfer(item.orderId)">转派</view> -->
					<view class="box2" style="display: flex;align-content: center;align-items: center;jus">

						<image style="width: 35rpx;height: 35rpx;" src="../../../../static/like.png" />

						<view style="color: #626262;margin-left: 5rpx">{{item.strategyLikeCount}}</view>
					</view>
					<view class="box3" style="display: flex;align-content: center;align-items: center;">
						<image style="width: 35rpx;height: 35rpx;" src="../../../../static/collect.png" />

						<view style="color: #626262;margin-left: 5rpx;">{{item.strategyCollectCount}}</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import ffPartner from '@/uni_modules/ff-partner/components/ff-partner/ff-partner.vue'
	export default {
		components:{
			ffPartner
		},
		name: "yt-order-list",
		props: {
			orderList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				participants: [{
						"avatar": "https://img2.baidu.com/it/u=2767001996,1988683889&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300",
					}, 
					{
						"avatar": "https://img2.baidu.com/it/u=2767001996,1988683889&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300",
					}, 
					{
						"avatar": "https://img2.baidu.com/it/u=2767001996,1988683889&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300",
					},
					{
						"avatar": "https://img2.baidu.com/it/u=2767001996,1988683889&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300",
					},
				]
			};
		},
		methods: {
			openStragetyDetail(id) {
				uni.navigateTo({
					url: '/pages/stragety-detail4/stragety-detail4?id=' + id
				})
			},
			randomAvatar(userId) {
				return "../../../../../static/user-avatar/" + (userId % 5 + 1) + '.jpg'
			},
		}
	}
</script>

<style lang="scss">
	.avatar {
		width: 20px;
		height: 20px;
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
		height: auto;
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
				padding-left: 10px;
				padding-right: 10px;
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
			height: auto;

			display: flex;
			align-items: center;
			justify-content: space-between;

			.order-bom-left {
				height: 100%;
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