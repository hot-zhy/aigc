<template>
	<view class="container" style="">
		<view class="waterfall_left">
			<view class="waterfall_item" v-for="(item,index) in listLeft" :key="index" @click="openDetail(item.postId)">
				<view class="item_img" v-if="item.postImageList">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load :image="item.postImageList" :imgMode='imgMode' @load='considerPush'
						@error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info">
					<view class="item_info_title">{{item.postTitle}}</view>
					<!-- <view class="item_info_note">{{item.postDesc}}</view> -->
					<view class="" style="display: flex;justify-content: space-between;">
						<view class="">
							<view style="display: flex; align-items: center; justify-content: center;">
								<image :src="item.userInfo.userAvatar"
									style="width: 35rpx; height: 35rpx; border-radius: 100%; margin-right: 10rpx;" />
								<text
									style="color: dimgrey; font-size: 23rpx; line-height: 35rpx;">{{item.userInfo.userName}}</text>
							</view>

						</view>
						<view class="" style="display: flex;align-items: center;align-content: center;">
							<image src="../../../../static/like.png"
								style="width:30rpx;height:30rpx;margin-right: 5rpx;" />
							<view class="" style="color: dimgrey;font-size: 23rpx;">{{item.postLikeCount}}</view>
						</view>
					</view>
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.postId}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="waterfall_right">
			<view class="waterfall_item" v-for="(item,index) in listRight" :key="index"
				@click="openDetail(item.postId)">
				<view class="item_img" v-if="item.postImageList">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load :image="item.postImageList" :imgMode='imgMode' @load='considerPush'
						@error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info">
					<view class="item_info_title">{{item.postTitle}}</view>
					<view class="" style="display: flex;justify-content: space-between;">
						<view class="">
							<view style="display: flex; align-items: center; justify-content: center;">
								<image :src="item.userInfo.userAvatar"
									style="width: 35rpx; height: 35rpx; border-radius: 100%; margin-right: 10rpx;" />
								<text
									style="color: dimgrey; font-size: 23rpx; line-height: 35rpx;">{{item.userInfo.userName}}</text>
							</view>

						</view>
						<view class="" style="display: flex;align-items: center;align-content: center;">
							<image src="../../../../static/like.png"
								style="width:30rpx;height:30rpx;margin-right: 5rpx;" />
							<view class="" style="color: dimgrey;font-size: 23rpx;">{{item.postLikeCount}}</view>
						</view>
					</view>
					<!-- <view class="item_info_note">{{item.postDesc}}</view> -->
					<!--  #ifdef  MP-WEIXIN -->
					<slot name="slot{{item.postId}}" />
					<!--  #endif -->

					<!-- #ifndef  MP-WEIXIN -->
					<slot v-bind="item" />
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		name: "zero-waterfall",
		props: {
			// 需要在使用页面 onPageScroll 传进来
			list: {
				type: Array,
				required: true,
				default: []
			},
			// 图片裁剪模式
			imgMode: {
				type: String,
				default: 'widthFix'
			},
		},
		data() {
			return {
				listLeft: [],
				listRight: [],
				newList: [],
				userId: 0,
				userInfo: {}
			}
		},
		watch: {
			list(newValue, oldValue) {
				this.newList = newValue.slice(oldValue.length);
				this.considerPush()
			},
		},

		mounted() {
			this.init()


		},
		onShow() {

		},

		methods: {
			getName(item, callback) {
				uni.request({
					url: 'http://110.40.182.65:8080/user/' + item.userId,
					method: 'GET',
					success: res => {
						if (res.data && res.data.data) {
							this.$set(item, 'userInfo', {
								userName: res.data.data.userNickname,
								userAvatar: this.randomAvatar(res.data.data.userId),
							});
						}
						callback();
					},
					fail: () => {
						// Default fallback for user info on failure
						this.$set(item, 'userInfo', {
							userName: 'Unknown',
							userAvatar: this.randomAvatar(),
						});
						callback();
					}
				});
			},
			randomAvatar(id) {
				return "../../../../../static/user-avatar/" + (id % 5 + 1) + '.jpg'
			},
			openDetail(postId) {
				console.log(postId);
				uni.request({
					url: 'http://110.40.182.65:8080/post/' + postId,
					method: 'GET',
					data: {

					},
					success: res => {
						console.log(res);
						let item = encodeURIComponent(JSON.stringify(res.data.data))

						uni.navigateTo({
							url: '/pages/note-desc/note-desc?item=' + item,
							
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 触发重新排列
			init() {
				this.newList = [...this.list];
				const requests = this.newList.map(item => {
					return new Promise((resolve) => {
						this.getName(item, resolve);
					});
				});

				Promise.all(requests).then(() => {
					this.newList.forEach((item, index) => {
						if (index % 2 === 0) {
							this.listLeft.push(item);
						} else {
							this.listRight.push(item);
						}
					});
				});
			},
			// 清空数据列表
			clear() {
				this.listLeft = [];
				this.listRight = [];
				// 同时清除父组件列表中的数据
				this.$emit('clear', []);
				this.newList = [];
			},

			// 计算排列
			considerPush() {
				if (this.newList.length === 0) return;

				const addItem = (item) => {
					if (this.listLeft.length <= this.listRight.length) {
						this.listLeft.push(item);
					} else {
						this.listRight.push(item);
					}
				};

				while (this.newList.length > 0) {
					let item = this.newList.shift();
					this.getName(item, () => {
						addItem(item);
					});
				}
				// console.log(this.newList.length);
				// console.log(this.newList)
				// if (this.newList.length == 0) return; // 没有数据了
				// let leftH = 0,
				// 	rightH = 0; // 左右高度
				// var query = uni.createSelectorQuery().in(this);

				// // 延迟执行排列逻辑
				// setTimeout(() => {
				// 	query.selectAll('.waterfall_left').boundingClientRect();
				// 	query.selectAll('.waterfall_right').boundingClientRect();
				// 	query.exec(res => {
				// 		// 确保选择器查询返回了正确的结果
				// 		if (res[0].length === 0 || res[1].length === 0) {
				// 			console.error('未找到左右容器');
				// 			return;
				// 		}
				// 		leftH = res[0][0].height; // 获取左边容器高度
				// 		rightH = res[1][0].height; // 获取右边容器高度
				// 		console.log('左边高度:', leftH, '右边高度:', rightH);

				// 		if (leftH <= rightH) {
				// 			// 左边高度小于等于右边，添加到左边
				// 			this.listLeft.push(this.newList.shift());
				// 			console.log('添加到左边:', this.listLeft);
				// 		} else {
				// 			// 右边高度小于左边，添加到右边
				// 			this.listRight.push(this.newList.shift());
				// 			console.log('添加到右边:', this.listRight);
				// 		}
				// 	});
				// }, 100); // 设置延迟时间，确保容器高度已经被正确获取
			}

		}

	}
</script>
<style lang="scss" scoped>
	.container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: flex-start;
		padding: 5rpx;
		// background-color: #dddddd;
	}

	.waterfall_left,
	.waterfall_right {
		width: 48.5%;
	}

	.waterfall_item {
		width: 100%;
		margin-bottom: 10rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		overflow: hidden;

		.item_img {
			width: 100%;

			image {
				width: 100%;
				overflow: hidden;
			}
		}

		.item_info {
			padding: 10rpx 20rpx;

			.item_info_title {
				font-size: 32rpx;
				padding: 10rpx 0;
				line-height: 1.5;
			}

			.item_info_note {
				color: #666666;
				font-size: 28rpx;
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				line-height: 1.5;
				padding-bottom: 10rpx;

			}
		}

	}
</style>