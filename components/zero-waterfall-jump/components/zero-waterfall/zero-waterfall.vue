<template>
	<view class="container" style="">
		<view class="waterfall_left">
			<view class="waterfall_item" v-for="(item,index) in listLeft" :key="index" @click="openDetail(item.postId)">
				<view class="item_img" v-if="item.postImageList">
					<!-- <image :src="item.url" mode="widthFix" @load="considerPush"></image> -->
					<zero-lazy-load :image="item.postImageList+'?imageView2/2/w/540/image/webp.webp'" :imgMode='imgMode'
						@load='considerPush' @error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info">
					<view class="item_info_title">{{item.postTitle}}</view>
					<view class="item_info_note">{{item.postDesc}}</view>
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
					<zero-lazy-load :image="item.postImageList+'?imageView2/2/w/540/image/webp.webp'" :imgMode='imgMode'
						@load='considerPush' @error='considerPush'>
					</zero-lazy-load>
				</view>
				<view class="item_info">
					<view class="item_info_title">{{item.postTitle}}</view>
					<view class="item_info_note">{{item.postDesc}}</view>
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

		methods: {
			openDetail(postId) {
				uni.setStorageSync('choosePostId', postId)
			},
			// 触发重新排列
			init() {
				this.newList = [...this.list];
				this.listLeft = [];
				this.listRight = [];
				if (this.newList.length != 0) {
					this.listLeft.push(this.newList.shift()); //触发排列
					this.listRight.push(this.newList[1]); //触发排列
				}

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
				if (this.newList.length === 0) return; // 没有数据了

				// 从新列表中依次取出数据，交替添加到左右列表中
				while (this.newList.length > 0) {
					// 将下一个数据添加到左边列表
					this.listLeft.push(this.newList.shift());
					// 如果还有数据，将下一个数据添加到右边列表
					if (this.newList.length > 0) {
						this.listRight.push(this.newList.shift());
					}
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
		padding: 10rpx;
		// background-color: #dddddd;
	}

	.waterfall_left,
	.waterfall_right {
		width: 47%;
	}

	.waterfall_item {
		width: 100%;
		margin-bottom: 25rpx;
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