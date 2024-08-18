<template>
	<view class="content">


		<zero-waterfall-jump :list="dataList">
			<!--  #ifdef  MP-WEIXIN -->
			<view v-for="(item, index) of dataList" :key="index" slot="slot{{item.postId}}">
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<template v-slot:default="item">
			</template>
			<!-- #endif -->
		</zero-waterfall-jump>
		<!-- <uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more> -->
	</view>
</template>

<script>
	import zeroWaterfallJump from '@/components/zero-waterfall-jump/components/zero-waterfall/zero-waterfall.vue'
	export default {
		components: {
			zeroWaterfallJump
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

				backgroundColor: "#d4237a",
				selectbackgroundColor: "#ffffff",
				color: "#ffffff",
				selectcolor: "#228B22",
				addlistdata: [{
						title: "发布帖子",
						src: "/static/images/post_selected.png"
					},
					{
						title: "发布攻略",
						src: "/static/images/stragety_selected.png"
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
			let userId = uni.getStorageSync('userId')
			console.log(userId)
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/post/list',
				method: 'GET',
				success: (res) => {
					this.dataList = res.data.data
					console.log(res)
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
			// this.loadMore()
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
			let userId = uni.getStorageSync('userId')
			console.log(userId)
			uni.request({
				url: 'http://110.40.182.65:8080/user/' + userId + '/post/list',
				method: 'GET',
				success: (res) => {
					this.dataList = res.data.data
					console.log(res)
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
			choose(id) {
				uni.navigateBack({
					delta: 1, // 返回的页面数，1表示返回上一页
					success: function() {
						// 在成功返回上一页后，触发回调函数
						const pages = getCurrentPages(); // 获取当前页面栈
						const prevPage = pages[pages.length - 1]; // 获取上一个页面实例对象
						// 在上一个页面实例中设置传递的 id
						prevPage.setData({
							selectedId: id // 假设在上一个页面中有一个名为 selectedId 的变量用于存储传递的 id
						});
					}
				});
			},
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
		background-color: #dddddd;
	}
</style>