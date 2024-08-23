<template>
	<view>
		<flixedadd :backgroundColor="backgroundColor" :selectbackgroundColor="selectbackgroundColor" :color="color"
			:selectcolor="selectcolor" :addlistdata="addlistdata" @addlisttap="addlisttap"></flixedadd>
		<shinn-xSlideButton left="20rpx" top="90%" margin="20rpx" @click="chat">
			<image :src="jixiangwu" @click="chat" style="width: 60px;height:60px" />
			<!-- <view style="color:#fff;background-color: #007aff;" >小助手</view> -->
		</shinn-xSlideButton>
		<yt-order-list :orderList="orderList"></yt-order-list>
	</view>
</template>


<script>
	import flixedadd from "@/components/xiaosikaifa-flixedadd/xiaosikaifa-flixedadd.vue"
	export default {
		components: {
			flixedadd
		},
		data() {
			return {
				jixiangwu: "../../../../../static/jixiang.png",
				orderList: [],
				backgroundColor: "#6A5DAC",
				selectbackgroundColor: "#ffffff",
				color: "#ffffff",
				selectcolor: "#6A5DAC",
				addlistdata: [{
						title: "发布帖子",
						src: "/static/images/post_selected.png"
					},
					{
						title: "发布攻略",
						src: "/static/images/strategy_selected.png"
					}
				]
			}
		},
		onNavigationBarSearchInputClicked() {
			// console.log(searea)
			uni.navigateTo({
				url: '/pages/search-strategy/search-strategy'
			});
		},
		onShow() {
			uni.request({
				url: 'http://110.40.182.65:8080/strategy/list',
				method: 'GET',
				success: (res) => {
					console.log(res)
					this.orderList = res.data.data
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
		},
		methods: {
			chat() {
				uni.navigateTo({
					url: '/pages/chat/chat'
				})
			},
			addlisttap: function(index) {
				/*第一个序列为0,第二个为1,以此类推;当值为-1代表点击的是遮慕层*/
				console.log(index)
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/add/add'
					})
				} else {
					uni.navigateTo({
						url: '/pages/edit-post/edit-post'
					})
				}
			}
		}
	}
</script>

<style>
</style>