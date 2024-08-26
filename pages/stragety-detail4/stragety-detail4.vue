<template>
	<view class="container">
		<!-- 图片弹出框 -->
		<!-- 		<view v-if="showImagePopup" class="image-popup">
			<view class="image-popup-mask" @tap="hideImagePopup"></view>
			<view class="image-popup-content">
				<scroll-view scroll-y>
					<view v-for="(image, idx) in currentImageList" :key="idx" class="image-item">
						<image :src="image" mode="aspectFill" class="image"></image>
					</view>
				</scroll-view>
			</view>
		</view> -->


		<view class="mask" catchtouchmove="preventTouchMove" v-if="showImagePopup == true" @tap="hideImagePopup"></view>
		<view class="coupon" :style="'bottom:' + (showImagePopup == true ? '0px':'')">
			<scroll-view class="scrolls" scroll-y>
				<imgsBanner-tag v-if="showImagePopup==true" :imgList='currentImageList' autoplay duration='500'
					interval="5000" :isShowSmallImgs='true' customizeDisplayField='url'></imgsBanner-tag>


			</scroll-view>
		</view>





		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')" @click="choose">
			<scroll-view class="scrolls" scroll-y>
				<me-select ref="meSelect" @change="change" @finish="finish" @itemClick="itemClick"
					:datalist="followUserList" :options="inviteOptions">
					<template v-slot="{ item, index }">
						<view class="item">
							<view class="" style="display: flex;align-items: center;align-content: center;">
								<view class="">
									<image :src="randomAvatar(item.userId)" mode="widthFix"
										style="width: 50rpx;height:50rpx;border-radius: 100%;"></image>
								</view>
								<view style="margin-left: 20rpx;">{{ item.userNickname }}</view>
							</view>
						</view>
					</template>
				</me-select>
				<button @click="invite" style="background-color: #6A5DAC ;color:white;border-radius: 20rpx;">邀请</button>

			</scroll-view>
		</view>

		<view class="cu-bar bg-transparent search">
			<view class="cu-avatar round " @click.stop="userDetail(descTotal.userId)">
				<image :src="randomAvatar(descTotal.userId)" mode="widthFix" class="round"></image>
			</view>
			<view class="text-left padding" @click.stop="userDetail(descTotal.userId)">
				{{descTotal.userNickName}}
			</view>
			<view class="action" @click="followUser">
				<view class="padding-xs">
					<view class='cu-tag round light' :class="followed==true?'bg-grey':'bg-red'">{{follow}}</view>
				</view>
			</view>
		</view>
		<!-- 可以编辑的人是自己和被邀请的人 -->
		<Tabs :TabList="tabNav" :currentTab="current" @tabs="tabsChange">
			<TabPane v-for="(dayData, i) in dataList" :key='i'>
				<view class="wrap m-1 pt-2 zerotimeline-class">
					<ZeroTimeline ref="zeroTimeline" :dataList='dayData' gap='30px' :show-left="true"
						@show-popup="handleShowImagePopup">
					</ZeroTimeline>
				</view>
				<view>
					<button style="background-color: #6A5DAC ;color:white;border-radius: 20rpx;" @tap="editST"
						v-if="currentUserId==descTotal.userId||participantIds.includes(Number(currentUserId))">编辑</button>
				</view>
			</TabPane>

		</Tabs>
		<!-- 共同编辑人 -->
		<!-- 只有是自己的帖子才可以邀请别人共同编辑 -->
		<view class="" v-if="currentUserId==descTotal.userId" @click="inviteTeams">
			<view class="" style="padding: 10px;">
				<view class="invite-btn" @click="inviteFriends">
					<view class="" style="">
						<image style="width: 50rpx;height:50rpx;" src="../../static/invite.png" mode=""></image>
						<view style="font-size: 25rpx;">邀请好友</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="participants.length!==0" class="" style="text-align: center;margin-bottom: 10px;font-size: 25rpx;">
			共同编辑者</view>
		<view class="card-list" v-if="participants.length!==0">
			<view class="card" v-for="friend in participants" :key="friend.id">
				<image class="card-avatar" :src="randomAvatar(friend.userId)"></image>
				<text class="card-name">{{ friend.userNickname }}</text>
			</view>
		</view>
		<view v-if="currentUserId==descTotal.userId" class=""
			style="text-align: center;margin-top: 10px;font-size: 25rpx" v-else>邀请好友共同编辑吧~</view>

		<view style="padding: 40rpx;">
			<!-- 标题 -->
			<h2>{{descTotal.strategyTitle}}·<text style="color:blue">{{descTotal.day}}天</text></h2>
			<!-- 主体内容 -->
			<view style="padding-top: 20rpx;line-height: 1.5;">{{descTotal.strategyDesc}}
			</view>
			<!-- 话题 -->
			<view style="display: flex;justify-content: space-between;" v-for="(item,index) in descTotal.topicList"
				:key="index">
				<view class="" style="color: blue;margin-bottom: 20rpx;margin-top: 20rpx;">#{{item.topicName}} </view>
			</view>
			<!-- 点赞 收藏帖子 收藏地点 -->
			<view class="flex justify-between" style="margin-top: 20rpx;">
				<view class="action" @click="likePost">
					<view class="padding-xs">
						<view class='cu-tag round light' :class="liked==true?'bg-grey':'bg-purple'">
							<view class="iconfont icon-shoucang" style="padding: 10rpx;font-size: 25rpx;">{{like}}
							</view>
						</view>
					</view>
				</view>

				<view class="action" @click="collectPost">
					<view class="padding-xs">
						<view class='cu-tag round light' :class="collected==true?'bg-grey':'bg-purple'">
							<view class="iconfont icon-shoucang" style="padding: 10rpx;font-size: 25rpx;">{{collect}}
							</view>
						</view>
					</view>
				</view>
				<view class="action" @click="relate" v-if="descTotal.postId">
					<view class="padding-xs">
						<view class='cu-tag round light bg-purple'>
							<view class="iconfont icon-shoucang" style="padding: 10rpx;font-size: 25rpx;">查看关联帖子
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import meSelect from '@/components/me-select/me-select.vue'
	import ZeroTimeline from "@/components/zero-timeline/zero-timeline.vue"
	import Tabs from '@/components/wiszx-tabs/tabs.vue'
	import TabPane from '@/components/wiszx-tabs/tabPane.vue'
	import imgsBannerTag from '@/components/imgsBanner-tag/imgsBanner-tag.vue';
	export default {
		components: {
			ZeroTimeline,
			Tabs,
			TabPane,
			meSelect,
			imgsBannerTag
		},
		data() {
			return {
				friends: [],
				showImagePopup: false,
				showPlacesPopup: false,
				currentImageList: [],
				// 
				inviteIds: [],
				inviteOptions: {
					flags: ['id'], //设置需要返回的参数这个参数必须在 dataList 中的item中存在（不配置默认全部返回）
					itemCanSelect: true //是否开启点击列表页选择配置
				},
				inviteList: [{
						id: "1",
						select: false
					},
					{
						id: "2",
						select: false
					},
					{
						id: "3",
						select: false
					},
				],
				// 邀请
				couponshow: false,
				userIntergration: 0,
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
				],
				currentUserId: 0,
				current: 0,
				tabNav: [{
						title: '商品介绍'
					},
					{
						title: '规格参数'
					},
					{
						title: '售后保障'
					},
					{
						title: '售后保障'
					}
				],
				collected: false,
				collect: "收藏帖子",
				liked: false,
				like: "已喜欢",
				TabCur: 0,
				scrollLeft: 0,
				mainHeight: 400, //全屏或者局部滑动设置的高度
				tabNav: [],
				list: [], //中间数组
				descTotal: {},
				dataList: [],
				strategyId: 0,
				desc: {
					userAvatar: "https://gd-hbimg.huaban.com/71cdd3cc1126caa5b4f346640ade2a58c275517a117083-zgsUvQ_fw236",
					userNickName: "Extrovert",
					stragetyTitle: "五一去杭州玩的攻略",
					stragetyDesc: "计划五一假期去杭州旅行是一个非常好的选择，因为杭州不仅有美丽的自然风光，还有丰富的文化遗产。下面是一个为期四天的杭州旅游攻略，涵盖了杭州的主要景点和一些实用的旅行小贴士。",
					topicList: [{
							topicName: "拍照",
						},
						{
							topicName: "打卡",
						},
						{
							topicName: "五一",
						}
					],
					publishTime: "2024.4.24"

				},
				follow: "关注",
				followed: false,
				collected: false,
				collect: 11,
				liked: false,
				like: 11,
				days: 4,
				optionid: 0,
				followUserList: [],
				participantIds: [],
				place: ''
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.optionid = options.id
			uni.request({
				url: 'http://110.40.182.65:8080/strategy/' + options.id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					//TODO participant获取
					this.participants = res.data.data.team
					this.place = res.data.data.place
					this.participantIds = this.participants.map(item => item.userId)
					this.descTotal = res.data.data
					this.currentUserId = uni.getStorageSync('userId')
					this.userId = this.descTotal.userId

					// 该用户是否被本用户关注
					this.followed = this.descTotal.followed
					this.collected = this.descTotal.collected
					this.liked = this.descTotal.liked
					// console.log(this.swiperList);
					if (this.followed) {
						this.follow = "已关注"
					} else {
						this.follow = "关注ta"
					}
					if (this.collected) {
						this.collect = "已收藏"
					} else {
						this.collect = "收藏攻略"
					}
					if (this.liked) {
						this.like = "已喜欢"
					} else {
						this.like = "喜欢"
					}
					this.descTotal.publishTime = this.dayjs(this.descTotal.publishTime).format(
						"YYYY-MM-DD HH:mm:ss");
					this.strategyId = this.descTotal.strategyId
					console.log(this.descTotal.publishTime)
					this.days = this.descTotal.day
					console.log(this.days)
					for (let i = 0; i < this.days; i++) {
						this.tabNav.push({
							title: '第' + (i + 1) + '天' // 修改为从“第1天”开始而不是“第0天”
						});
					}
					this.dataList = []
					console.log(this.descTotal.strategySets)
					this.dataList = this.descTotal.strategySets.map(day => [{
							title: day.morning,
							content: day.morningDesc,
							sub: '补充内容',
							leftTime: '上午',
							leftTitle: '上午',
							leftContent: day.morningPlayTime + '小时',
							color: this.getRandomColor(),
							imageList: day.morningImageList
						},
						{
							title: day.lunch,
							content: day.lunchDesc,
							sub: '补充内容',
							leftTime: '中午',
							leftTitle: '午餐',
							leftContent: day.lunchTime + '小时',
							color: this.getRandomColor(),
							imageList: day.lunchImageList
						},
						{
							title: day.afternoon,
							content: day.afternoonDesc,
							sub: '补充内容',
							leftTime: '下午',
							leftTitle: '下午',
							leftContent: day.afternoonPlayTime + '小时',
							color: this.getRandomColor(),
							imageList: day.afternoonImageList
						},
						{
							title: day.dinner,
							content: day.dinnerDesc,
							sub: '补充内容',
							leftTime: '晚上',
							leftTitle: '晚餐',
							leftContent: day.dinnerTime + '小时',
							color: this.getRandomColor(),
							imageList: day.dinnerImageList
						},
						{
							title: day.night,
							content: day.nightDesc,
							sub: '补充内容',
							leftTime: '深夜',
							leftTitle: '晚上',
							leftContent: day.nightPlayTime + '小时',
							color: this.getRandomColor(),
							imageList: day.nightImageList
						}
					])
				},
				fail: () => {},
				complete: () => {}
			});

			this.init()
			console.log(this.dataList)
			// 首次加载先将notice数组赋值给中间数组,否则刚打开页面是没有内容显示的
			this.list = this.notice
			this.tabCur = []

		},
		mounted() {
			this.updateMainHeight();
		},
		methods: {
			//地图点击事件
			markertap(e) {
				console.log("===你点击了标记点===", e)
				console.log(e.target.markerId);
				let placeName = "";
				// 查找该标记点的名字
				for (let i = 0; i < this.placeList.length; i++) {
					if (this.placeList[i].placeId == e.target.markerId) {
						placeName = this.placeList[i].placeAddress
					}
				}
				//查询与该地点相关的帖子
				uni.request({
					url: 'http://110.40.182.65:8080/post/find/' + e.target.markerId + '/post',
					method: 'GET',
					success: res => {
						let item = encodeURIComponent(JSON.stringify(res.data.data))
						uni.showModal({
							title: '你点击了 ' + placeName,
							content: '经度:' + e.target.latitude + '   纬度:' + e.target.longitude,
							showCancel: true,
							cancelText: '关闭',
							confirmText: '查看相关帖子',
							success: res => {
								if (res.confirm == true) {
									uni.navigateTo({
										url: '/pages/place-post/place-post?item=' + item,

									});
								}
							},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//地图点击事件
			callouttap(e) {
				console.log('地图点击事件', e)
			},
			handleShowImagePopup(data, index) {
				if (index === 0) {
					let imageList = data
					this.currentImageList = imageList
						.split(",")
						.map(d => d.trim()) // 去除每个图片路径前后的空白字符
						.filter(d => d)
						.map(item => ({
							'imgSrc': item
						}))
					this.showImagePopup = true;
				} else {
					this.showPlacesPopup = true;
					let totalPlace = this.place + '-' + data
					uni.navigateTo({
						url: `/pages/map/index?place=${totalPlace}`
					})
				}


				console.log(this.showPlacesPopup)
			},
			hideImagePopup() {
				this.showImagePopup = false;
				this.showPlacesPopup = false;
			},
			hidePlacesPopup() {
				this.showPlacesPopup = false;
			},
			itemClick(e) {
				console.log('列表点击了：', e)
			},
			finish(e) {
				console.log('所有的选择：', e)
			},
			change(e) {
				console.log('发生改变了：', e)
				this.inviteIds = e
			},
			// 打开优惠券弹框
			opencoupon() {
				this.couponshow = true
			},
			// 关闭优惠券弹框 
			hidecoupon() {
				this.couponshow = false
			},
			invite() {
				console.log(this.inviteIds);
				this.inviteIds = this.inviteIds.map(item => item.userId);

				// 调用邀请接口
				uni.request({
					url: 'http://110.40.182.65:8080/strategy/invite',
					method: 'POST',
					data: {
						'strategyId': this.optionid,
						'inviteUserIds': this.inviteIds
					},
					success: (res) => {
						console.log(res);

						this.couponshow = false;
						// 刷新页面
						uni.request({
							url: 'http://110.40.182.65:8080/strategy/' + this.optionid,
							method: 'GET',
							data: {},
							success: (res1) => {
								console.log(res1);
								this.participants = res1.data.data.team;
								this.hidecoupon();
								uni.showToast({
									title: '邀请成功',
									icon: 'none'
								})
							},
							fail: (err) => {
								console.log(err);
							},
							complete: () => {}
						});
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			inviteTeams() {
				console.log(this.currentUserId)
				this.opencoupon()
				uni.request({
					url: 'http://110.40.182.65:8080/user/' + this.currentUserId + '/follow/list',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						this.followUserList = res.data.data
						this.followUserList = this.followUserList.map(item => {
							return {
								...item, // 保留原有的属性
								select: this.participantIds.includes(item
									.userId) // 检查 userId 是否在 participants 列表中
							};
						});
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			followUser() {
				//原本是关注，要取消关注
				if (this.followed == true) {
					uni.showModal({
						title: '确定要取消关注吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消关注
								uni.request({
									url: 'http://110.40.182.65:8080/user/cancel/follow/' + this.userId,
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.followed = !this.followed
								this.follow = "关注ta"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/user/follow/' + this.userId,
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						},
						fail: () => {
							uni.showToast({
								title: '关注失败',
								icon: "error"
							});
						},
						complete: () => {}
					});
					this.followed = !this.followed
					this.follow = "已关注"
				}
			},
			userDetail(id) {
				console.log('进入详情');
				console.log(id);
				uni.navigateTo({
					url: '/pages/user_info/user_info?userId=' + id,

				});

			},
			relate() {
				uni.request({
					url: 'http://110.40.182.65:8080/post/' + this.descTotal.postId,
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
			editST() {
				// console.log('11')
				uni.navigateTo({
					url: '/pages/editST/editST?id=' + this.optionid
				})
			},
			tabsChange(index) {
				this.current = index

			},
			randomAvatar(userId) {
				return "../../../../../static/user-avatar/" + (userId % 5 + 1) + '.jpg'
			},
			updateMainHeight() {
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.zerotimeline-class').boundingClientRect(rect => {
						if (rect) {
							this.mainHeight = rect.height
							this.mainHeight = this.mainHeight
						}
					}).exec();
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// 根据当前TabCur的值判断把哪个数组赋值给list
				this.list = this.TabCur == 0 ? this.notice : this.TabCur == 1 ? this.policy : this.news
				// Math.max(0, index - 1);
			},
			SwiperChange(e) {
				this.TabCur = e.detail.current
				this.scrollLeft = (e.detail.current - 1) * 60
				this.list = this.TabCur == 0 ? this.notice : this.TabCur == 1 ? this.policy : this.news
			},
			init() {
				// for (let i = 0; i < 5; i++) {
				// 	const obj = {
				// 		// time: `2023-11-1${i}`,
				// 		title: `南京总统府景区`,
				// 		content: `完成功能完成功能完成功能完成功能`,
				// 		sub: `补充内容`,
				// 		leftTime: `2023-11-1${i}`,
				// 		leftTitle: `11月1${i}日`,
				// 		leftContent: `开始\n|\n结束`,
				// 		color: this.getRandomColor(),

				// 	}
				// 	this.dataList.push(obj)
				// }

			},
			getRandomColor() {
				const red = Math.floor(Math.random() * 256);
				const green = Math.floor(Math.random() * 256);
				const blue = Math.floor(Math.random() * 256);
				return `rgb(${red}, ${green}, ${blue})`;
			},
			followUser() {
				//原本是关注，要取消关注
				if (this.followed == true) {
					uni.showModal({
						title: '确定要取消关注吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消关注
								uni.request({
									url: 'http://110.40.182.65:8080/user/cancel/follow/' + this.userId,
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.followed = !this.followed
								this.follow = "关注ta"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					console.log(this.userId)
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/user/follow/' + this.userId,
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						},
						fail: () => {
							uni.showToast({
								title: '关注失败',
								icon: "error"
							});
						},
						complete: () => {}
					});
					this.followed = !this.followed
					this.follow = "已关注"
				}
			},
			likePost() {
				//原本是关注，要取消关注
				if (this.liked == true) {
					uni.showModal({
						title: '确定要取消喜欢吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://110.40.182.65:8080/strategy/cancel/' + this
										.strategyId +
										'/like',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.liked = !this.liked
								this.like = "喜欢"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/strategy/' + this.strategyId + '/like',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						}
					});
					this.liked = !this.liked
					this.like = "已喜欢"
				}

			},
			collectPost() {
				//原本是关注，要取消关注
				if (this.collected == true) {
					uni.showModal({
						title: '确定要取消收藏吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							console.log(res);
							if (res.confirm == true) {
								//取消收藏
								uni.request({
									url: 'http://110.40.182.65:8080/strategy/cancel/' + this
										.strategyId +
										'/collect',
									method: 'PUT',
									data: {},
									success: res => {
										console.log(res);
									}
								});
								this.collected = !this.collected
								this.collect = "收藏帖子"
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					//原本没关注，关注
					uni.request({
						url: 'http://110.40.182.65:8080/strategy/' + this.strategyId + '/collect',
						method: 'PUT',
						data: {},
						success: res => {
							console.log(res);
						}
					});
					this.collected = !this.collected
					this.collect = "已收藏"
				}
			},
		}
	}
</script>

<style>
	@import '@/colorui/main.css';
	@import '@/colorui/icon.css';

	.invite-btn {
		/* box-shadow: 3rpx 5rpx 30rpx 0rpx rgba(243, 170, 199, 0.4);
	  background: linear-gradient(to right, #fed6e6, #f3b9c9); */
		color: #5f9eef;
		padding: 10px;
		text-align: center;
		border-radius: 5px;
		/* margin-bottom: 10px; */
	}

	.card-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		/* 增加卡片之间的间隔 */
	}

	.card {
		width: calc(20% - 10px);
		/* 每行五个卡片，宽度为容器宽度的 20%，减去间隔 */
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;
		text-align: center;
	}

	.card-avatar {
		width: 60rpx;
		/* 调整头像大小 */
		height: 60rpx;
		/* 调整头像大小 */
		border-radius: 50%;
		object-fit: cover;
	}

	.card-name {
		margin-top: 5px;
		font-size: 20rpx;
		/* 调整字体大小 */
		white-space: nowrap;
		/* 防止换行 */
		overflow: hidden;
		/* 超出部分隐藏 */
		text-overflow: ellipsis;
		/* 显示省略号 */
		display: block;
		/* 确保 text-overflow 工作 */
	}


	.image-popup {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}

	.image-popup-mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.image-popup-content {
		padding: 20rpx;
		height: 70vh;
	}

	.image-item {
		margin-bottom: 10rpx;
	}

	.image {
		width: 100%;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}

	.container {
		margin-left: 15px;
		margin-right: 15px
	}



	.top-header {
		width: 100%;
		height: 50rpx;
	}

	.integration {
		box-shadow: 3rpx 5rpx 30rpx 0rpx rgba(243, 170, 199, 0.4);
		width: 700rpx;
		/* margin: 0rpx auto 0rpx; */
		border-radius: 30rpx;
		height: 180rpx;
		position: relative;
		background: linear-gradient(to right, #fed6e6, #f3b9c9);

	}

	.logo {
		position: absolute;
		top: -30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 80rpx;
		height: 80rpx;
	}

	.user-integration {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.num {
			color: #333;
			margin-top: 25rpx;
			font-size: 70rpx;
			font-weight: 600;
		}

		.tip {
			/* margin-top: 10rpx; */
			font-size: 20rpx;
		}
	}


	.mask {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 900;
		opacity: 0.7;
	}

	/* 优惠券 */
	.coupon {
		background-color: #fff;
		border-radius: 10upx 10upx 0 0;
		position: fixed;
		left: 0;
		bottom: -1000upx;
		z-index: 999;
		transition: all 0.3s;
	}

	.scrolls {
		width: 100vw;
		height: 60vh;
		padding-top: 10upx;
		z-index: 9999;
	}
</style>