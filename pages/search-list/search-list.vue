<template>
	<view class="page" style="background-color: #dddddd;">
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			@clickItem="onClickItem"></tabControl>
		<!-- 使用 swiper 配合 滑动切换 -->
		<!-- 帖子 -->
		<swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
			<swiper-item>
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;">
					<view v-if="postResult">
						<zero-waterfall :list="postResult">
							<!--  #ifdef  MP-WEIXIN -->
							<view v-for="(item, index) of postResult" :key="index" slot="slot{{item.postId}}">
							</view>
							<!--  #endif -->

							<!-- #ifndef  MP-WEIXIN -->
							<template v-slot:default="item">
							</template>
							<!-- #endif -->
						</zero-waterfall>
					</view>
					<view class="" v-if="postResult.length==0">
						<image src="../../static/images/nothing.png" mode="widthFix"
							style="justify-content: center;margin: 0 auto;display: block;width: 60%;"></image>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>


<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import uniListItem from '@/components/uni-list/components/uni-list-item/uni-list-item.vue';
	import userHmFriendInformationCard from '@/components/user-hm-friend-information/index.vue';
	import hmNewsCard from '@/components/hm-news-card/index.vue';
	export default {
		components: {
			tabControl,
			uniListItem,
			userHmFriendInformationCard,
			hmNewsCard
		},
		data() {
			return {
				items: ['帖子'],
				current: 0,
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
				userResult: [],
				placeResult: [],
				postResult: [],
				searchText: ""
			}
		},
		onLoad(options) {
			console.log(options.searchText);
			this.searchText = options.searchText
			setTimeout(() => {
				// 调用搜索接口
				// uni.request({
				// 	url: 'http://110.40.182.65:8080/search/post',
				// 	method: 'GET',
				// 	data: {
				// 		"query": this.searchText,
				// 		"type": 1
				// 	},
				// 	success: res => {
				// 		this.userResult = res.data.data.user
				// 	}
				// });
				// uni.request({
				// 	url: 'http://110.40.182.65:8080/search',
				// 	method: 'GET',
				// 	data: {
				// 		"query": this.searchText,
				// 		"type": 2
				// 	},
				// 	success: res => {
				// 		this.placeResult = res.data.data.place

				// 	}
				// });
				uni.request({
					url: 'http://110.40.182.65:8080/search/post',
					method: 'GET',
					data: {
						"query": this.searchText
					},
					success: res => {
						console.log(res)
						this.postResult = res.data.data
					}
				});
				uni.hideLoading()
			}, 1000)
		},
		methods: {
			userDetail(id) {
				console.log('进入详情');
				console.log(id);
				uni.navigateTo({
					url: '/pages/user_info/user_info?userId=' + id,
					
				});
			},
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			},

			opendesc(id) {
				uni.navigateTo({
					url: '/pages/note-desc/note-desc',
					
				});
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.page {
		padding-top: 98rpx;
		height: 100%;
	}

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>