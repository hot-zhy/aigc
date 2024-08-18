<template>
	<view class="content">
		<flixedadd :backgroundColor="backgroundColor" :selectbackgroundColor="selectbackgroundColor" :color="color"
			:selectcolor="selectcolor" :addlistdata="addlistdata" @addlisttap="addlisttap"></flixedadd>


		<zero-waterfall :list="dataList">
			<!--  #ifdef  MP-WEIXIN -->
			<view v-for="(item, index) of dataList" :key="index" slot="slot{{item.postId}}">
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<template v-slot:default="item">
			</template>
			<!-- #endif -->
		</zero-waterfall>
		<!-- <uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more> -->
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

				arr: [],
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
				tabClick: false,

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
		onShow() {
			console.log(uni.getStorageSync('userId'));

			// uni.removeStorageSync('userId')
			if (!uni.getStorageSync('userId')) {
				console.log("没有登录");
				uni.navigateTo({
					url: '/pages/login/login',

				});
			}
			uni.request({
				url: 'http://110.40.182.65:8080/post/list',
				method: 'GET',
				success: (res) => {
					// this.arr = res.data.data
					// this.dataList = this.arr.slice(0, 5)
					this.dataList = res.data.data
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			// this.loadMore()
		},
		onTabItemTap(e) {
			if (e.index == 0 && this.tabClick) {
				//双击事件
				console.log(e);

				uni.request({
					url: 'http://110.40.182.65:8080/post/list',
					method: 'GET',
					success: (res) => {
						this.dataList = res.data.data
						plus.runtime.restart()
						// uni.pageScrollTo({
						// 	duration: 0,
						// 	scrollTop: 0
						// });
						// this.arr = res.data.data
						// this.dataList = this.arr.slice(0, 5)
						// plus.runtime.restart();
					},
					fail: (error) => {
						console.log(error);
					},
					complete: () => {}
				});
			}
			this.tabClick = true
			setTimeout(() => {
				this.tabClick = false // 200ms 内没有第二次点击，就当作单击
			}, 200)
		},
		onLoad() {
			console.log(uni.getStorageSync('userId'));
			// uni.removeStorageSync('userId')
			if (!uni.getStorageSync('userId')) {
				console.log("没有登录");
				uni.navigateTo({
					url: '/pages/login/login',

				});
			}
			uni.request({
				url: 'http://110.40.182.65:8080/post/list',
				method: 'GET',
				success: (res) => {
					// this.arr = res.data.data
					// this.dataList = this.arr.slice(0, 5)
					this.dataList = res.data.data
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});

			// this.loadMore()
		},
		onReachBottom() {
			if (this.dataList.length >= this.arr.length) {
				this.loadingStatus = 'noMore'
			} else {
				this.loadStatus = 'more';
				setTimeout(() => {
					this.loadMore();
					this.loadStatus = 'loadmore';
				}, 1000)
			}

		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search',

			});
		},
		methods: {
			chat() {
				console.log('111')
				uni.navigateTo({
					url: '/pages/chat/chat'
				})
			},
			// 模拟数据加载
			loadMore() {
				this.loadStatus = 'loading';
				this.page++
				this.dataList = this.dataList.concat(this.arr.slice(this.dataList.length, this.page * this.pageSize))
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

<style lang="scss" scoped>
	.container {
		background-color: #eeeeee;
	}
</style>