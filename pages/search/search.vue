<template>
	<view>
		<view class="mx-2"><liu-search-bar :mode="1" @confirm="confirm" @blur="blur" @input="input"
				:placeholder="请输入您想搜索的帖子"></liu-search-bar>
		</view>
		<template v-if=" searchList.length===0">
			<!-- 搜索历史 -->
			<uni-card title="搜索历史">
				<!-- 搜索历史列表 -->
				<view class="px-1 mb-2" v-if="list.length!==0">
					<view @click="clickSearchHistory(item)" hover-class="bg-light"
						class="px-2 py-1 border d-inline-block m-1" :style="getStyle"
						v-for="(item,index) in list.slice(0,20)" :key="index" style="border-radius: 20upx;">{{item}}
					</view>
				</view>
				<view v-if="list.length===0">
					还没有搜索历史~
				</view>
			</uni-card>
		</template>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue';
	import colorTag from '@/components/search/color-tag.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import liuSearchBar from '@/uni_modules/liu-search-bar/components/liu-search-bar/liu-search-bar.vue'
	export default {
		components: {
			card,
			colorTag,
			uniListItem,
			liuSearchBar
		},
		data() {
			return {
				searchText: "",
				scrollH: 600,
				// 搜索历史
				list: [],
				// 搜索结果
				searchList: [],
				userResult: [],
				placeResult: [],
				postResult: []
			}
		},
		onLoad() {
			if (this.list.length === 0) {
				this.list = JSON.parse(uni.getStorageSync('historySearchText'))
			}
		},
		// onNavigationBarSearchInputChanged(e) {
		// 	console.log(e);
		// 	this.searchText = e.text
		// },
		// onNavigationBarButtonTap() {
		// 	// 收起键盘
		// 	uni.hideKeyboard()
		// 	if (this.searchText !== "") {
		// 		// 加入搜索历史
		// 		let index = this.list.findIndex(v => v === this.searchText)
		// 		if (index !== -1) {
		// 			if (index !== 0) {
		// 				this.list.unshift(this.list.splice(index, 1)[0]);
		// 			}
		// 		} else {
		// 			this.list.unshift(this.searchText)
		// 		}
		// 		// 保存到本地存储
		// 		if (this.list.length !== 0) {
		// 			uni.setStorageSync('historySearchText', JSON.stringify(this.list))
		// 		}
		// 		// 处于加载中状态
		// 		uni.showLoading({
		// 			title: '加载中',
		// 			mask: false
		// 		});
		// 		// 请求搜索
		// 		uni.navigateTo({
		// 			url: '/pages/search-list/search-list?searchText=' + this.searchText,
		// 			
		// 		});
		// 	} else {
		// 		uni.showToast({
		// 			title: '请输入搜索内容',
		// 			icon: 'none'
		// 		});
		// 	}
		// },
		computed: {
			getStyle() {
				let color = {
					borderColor: ['#eea6aa', '#98d5d8', '#9dbe93', '#bccd99', '#EAD6BC'],
					background: ['#f8eae9', '#e8f6f6', '#e4f5e2', '#f2f6e8', '#FCE8CE'],

				}
				let index = Math.floor(Math.random() * color.borderColor.length)
				let borderColor = color.borderColor[index]
				let bgColor = color.background[index]
				return `background:${bgColor};border-color:${borderColor}`
			}
		},
		methods: {
			//点击搜索或者确定
			confirm(e) {
				console.log('confirm搜索内容：' + e)
				// 收起键盘
				uni.hideKeyboard()
				if (this.searchText !== "") {
					// 加入搜索历史
					let index = this.list.findIndex(v => v === this.searchText)
					if (index !== -1) {
						if (index !== 0) {
							this.list.unshift(this.list.splice(index, 1)[0]);
						}
					} else {
						this.list.unshift(this.searchText)
					}
					// 保存到本地存储
					if (this.list.length !== 0) {
						uni.setStorageSync('historySearchText', JSON.stringify(this.list))
					}
					// 处于加载中状态
					uni.showLoading({
						title: '加载中',
						mask: false
					});
					// 请求搜索
					uni.navigateTo({
						url: '/pages/search-list/search-list?searchText=' + this.searchText,
						
					});
				} else {
					uni.showToast({
						title: '请输入搜索内容',
						icon: 'none'
					});
				}
			},
			//blur事件
			blur(e) {
				console.log('blur搜索内容：' + e)
			},
			//inut事件
			input(e) {
				this.searchText = e
			},
			clickSearchHistory(item) {
				// 处于加载中状态
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				this.searchText = item
				// 请求搜索
				uni.navigateTo({
					url: '/pages/search-list/search-list?searchText=' + this.searchText,
					
				});
			}
		}
	}
</script>

<style>

</style>