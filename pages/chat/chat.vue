<template>
	<view class="container">
		<popup-layer style="z-index: 1001;" ref="popupRef" :direction="'left'" v-model="boolShow">
			<view class="sidebar-content" style="z-index: 9999;">
				<view class="sidebar-buttons" v-for="(item, index) in promptList" :key="index">
					<button @click="food(item)" type="error" plain :text="item.name">{{item.name}}</button>
				</view>
			</view>
		</popup-layer>
		<shinn-xSlideButton @click="open" left="20rpx" top="80%" margin="20rpx" style="z-index: 1000;">
			<view @click="open" class="repository-header">提示词仓库

			</view>
		</shinn-xSlideButton>
		<view class="cg-chat-content">
			<view v-for="(item, index) in chatList" :key="index">
				<block>
					<!-- 左侧模板 -->
					<view class="cg-chat-left" v-if="item.userId == 'gpt'">
						<image src="/static/jixiang.png" class="cg-user-pic cg-right"></image>
						<view class="cg-chatbox cg-chatbox-left">
							<text
								class="reply">{{ (index == chatList.length -1 && index != 0) ? reply : item.text}}</text>
						</view>
					</view>
					<!-- 右侧模板 -->
					<view class="cg-chat-right" v-if="item.userId != 'gpt'">

						<view class="cg-chatbox cg-chatbox-right">
							<text class="reply">{{item.text}}</text>
						</view>
						<image style="border-radius: 100%;" :src="randomAvatar()" class="cg-user-pic cg-left"></image>
					</view>
				</block>
			</view>
		</view>


		<view class="cg-reply-tabbar" :style="{ marginBottom: `${keyboardHeight}px` }">
			<view class="cg-chat-tabbar">
				<textarea :hold-keyboard="false" auto-height class="cg-chat-input" @input="inputReply" :fixed="true"
					:adjust-position="true" maxlength="300" :value="content" :placeholderClass="placeholderClass"
					:class="textareaClass" @tap.stop="showKeyBoard(1)" @blur="blurText" @focus="focusText"
					ref="textarea" :placeholder="placeholder"></textarea>
			</view>

			<view class="cg-send-box" @click="sendMsg">
				<image src="/static/send.png" style="width: 60rpx;height: 60rpx;"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	export default {
		components: {
			popupLayer
		},

		data() {
			return {
				promptList: [],
				boolShow: false,
				jixiangwu: "../../../../../static/jixiang.png",
				promptList: [],
				userId: 0,
				token: '',
				loadding: false,
				show: false,
				bottom: 0,
				keyboardHeight: 0,
				replyContainerH: uni.upx2px(500),
				platFormUserId: '1', //用户标识
				roleDesc: '',
				content: '',
				isShow: false,
				textareaClass: "",
				placeholderClass: "",
				placeholder: "请输入内容",
				sendText: "发送",
				reply: '',
				chatList: [{
					type: 1, //1-文字 2-图片 3-语音，4-时间 5-提醒 ...
					userId: "gpt", //用户标识 不一定是userid
					text: '我是您的旅行小助手，我可以帮你回答景点的相关问题，包括历史背景和发展进程，请尽情提问~',
					src: ''
				}],
				place: ""
			};
		},
		onLoad: function(options) {
			uni.request({
				url: 'http://110.40.182.65:8080/post/assistant',
				method: 'GET',
				data: {
					'limit': 5
				},
				success: (res) => {
					console.log(res);
					this.promptList = res.data.data
				},
				fail: (err) => {

				}
			});
			this.content = options.title
			this.place = options.title
			// this.sendMsg()
			this.userId = uni.getStorageSync('userId')
			let safeH = this.isPhoneX() ? 34 : 0;
			// 获取tabbar高度,单位px
			uni.getSystemInfo({
				success: (res) => {
					this.bottom = res.screenHeight - res.windowHeight - res.statusBarHeight;
					this.keyboardHeight = this.bottom / 2;
				}
			});
			// 监听键盘高度变化
			uni.onKeyboardHeightChange(res => {
				let h = res.height - safeH;
				console.log('键盘高度', h);
				this.keyboardHeight = h > 0 ? h : this.bottom / 2;
				//去除 完成那一栏高度影响
				setTimeout(() => {
					if (this.showIndex == 1 && this.keyboardHeight != 0) {
						this.replyContainerH = this.keyboardHeight;
					}
				}, 100);
			});
		},
		onShow: function() {
			// 获取token
			var token = uni.getStorageSync('token')
			if (token) {
				this.token = token
			}
		},
		methods: {
			open() {
				this.$refs.popupRef.show(); // 或者 boolShow = rue
			},
			close() {
				this.$refs.popupRef.close(); // 或者 boolShow = false
			},
			food(item) {
				this.content = item.prompt + '。具体的地点是：' + this.place
				this.sendMsg()
			},
			randomAvatar() {
				return "../../static/user-avatar/" + (this.userId % 5 + 1) + '.jpg'
			},
			isPhoneX() {
				const res = uni.getSystemInfoSync();
				let iphonex = false;
				let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
				const model = res.model.replace(/\s/g, "").toLowerCase()
				if (models.includes(model)) {
					iphonex = true;
				}
				return iphonex;
			},
			blurText() {

			},
			focusText() {

			},
			sendMsg() {
				if (!this.content) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					});
					return;
				}
				var temp = this.content;
				// 清空输入框
				this.content = '';
				// 发送消息
				this.chatList.push({
					toId: 'gpt',
					type: 1,
					userId: "",
					text: temp,
					src: ''
				});
				setTimeout(() => {
					// 定位到聊天最底部
					this.toBottom();
				}, 0);

				uni.showLoading({
					title: '小助手正在思考中...'
				});

				// 请求接口
				uni.request({
					url: 'http://110.40.182.65:8080/post/query',
					method: 'POST',
					data: {
						'queryText': '你是一个助手，需要回答并整理用户提供的地点的历史背景和发展进程，并包含一个有趣的小故事。回复需要生动有趣，简洁有逻辑。地点：' + temp
					},
					success: (res) => {
						console.log(res);
						uni.hideLoading();

						this.chatList.push({
							type: 1,
							userId: "gpt",
							text: res.data.data,
							src: ''
						});
						console.log(res.data.data);
						this.showReply(res.data.data);
					},
					fail: (err) => {
						uni.hideLoading();
						console.log(err);
					}
				});

			},
			inputReply(e) {
				this.content = e.detail.value;
			},
			showKeyBoard(index) {},
			// 内容逐字显示，每个字显示间隔为0.1秒，并识别换行符
			showReply(content) {
				console.log(content);
				let reply = content
				let replyArr = reply.split('')
				let replyStr = ''
				let i = 0
				let timer = setInterval(() => {
					if (i < replyArr.length) {
						if (replyArr[i] == '\n') {
							replyStr += '\n'
						} else {
							replyStr += replyArr[i]
						}
						this.reply = replyStr
						i++
						// 定位到聊天最底部
						this.toBottom();
					} else {
						clearInterval(timer)
					}
				}, 100)

				// 判断是否显示完毕
				setTimeout(() => {
					this.isShow = true
				}, replyArr.length * 100)
			},

			toBottom() {
				this.$nextTick(() => {
					setTimeout(() => {
						uni.createSelectorQuery().select(".cg-chat-content").boundingClientRect(function(
							res) { //定位到你要的class的位置
							uni.pageScrollTo({
								scrollTop: res.height,
								duration: 0
							});
						}).exec()
					}, 0)
				})
			},
		},
		onPageScroll(e) {
			if (e.scrollTop == 0 && !this.loadding) {
				this.loadding = true;
				setTimeout(() => {
					this.show = true;
					this.loadding = false;
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.repository-header {
		background-color: #8d19ad;
		/* 背景色 */
		color: #fff;
		/* 文字颜色 */
		font-size: 25rpx;
		/* 字体大小 */
		/* 字体加粗 */
		padding-left: 10rpx;
		padding-right: 10rpx;
		/* 内边距 */
		border-radius: 8rpx;
		/* 圆角 */
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
		/* 阴影 */
		text-align: center;
		/* 文字居中 */
		margin-bottom: 20rpx;
		/* 下边距 */
	}

	.container {
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 146rpx;
		box-sizing: border-box;
	}

	/*chatbox*/
	.cg-chat-content {
		width: 100%;
	}

	.cg-chatbox {
		max-width: 66%;
		border-radius: 10rpx;
		position: relative;
		padding: 20rpx 22rpx;
		font-size: 32rpx;
		color: #333;
		word-break: break-all;
		word-wrap: break-word;
	}

	.cg-chatbox::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		top: 20rpx;
		border: 16rpx solid;
	}

	.cg-chatbox-left {
		background: #fff5d9;
		border: 1rpx solid #fff5d9;
		display: inline-block;
	}

	.cg-chatbox-left::before {
		right: 100%;
		border-color: transparent #fff5d9 transparent transparent;
	}

	.cg-chatbox-right {
		background: #a0d5f3;
		border: 1rpx solid #a0d5f3;
	}

	.cg-chatbox-right::before {
		left: 100%;
		border-color: transparent transparent transparent #a0d5f3;
	}

	/*chatbox*/

	.cg-chat-left,
	.cg-chat-right {
		display: flex;
		align-items: flex-start;
		padding-top: 36rpx;
	}

	.cg-user-pic {
		width: 80rpx;
		height: 80rpx;
		flex-shrink: 0;
		display: block;
	}

	.cg-left {
		margin-left: 26rpx;
	}

	.cg-right {
		margin-right: 26rpx;
	}

	.cg-chat-right {
		justify-content: flex-end;
	}

	.cg-chat-center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 28rpx;
		font-size: 28rpx;
		color: #666;
		padding-top: 36rpx;
	}

	.cg-label {
		display: inline-block;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-size: 24rpx;
		line-height: 24rpx;
		margin-top: 36rpx;
		padding: 12rpx 16rpx;
		text-align: center;
		border-radius: 8rpx;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	.cg-img-chatbox {
		position: relative;
	}

	.cg-img-chatbox::after {
		content: "";
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1rpx solid #eaeef1;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 20rpx;
	}

	.cg-chat-img {
		max-width: 200rpx;
		/* min-height: 80rpx; */
		display: block;
		border-radius: 10rpx;
	}

	.cg-chat-flex {
		display: flex;
		align-items: center;
	}

	.cg-flex-center {
		display: flex;
		align-items: center;
	}

	.cg-chat-voice {
		width: 40rpx;
		height: 40rpx;
		display: block;
		flex-shrink: 0;
	}

	.cg-rotate {
		transform: rotate(180deg);
	}

	.cg-chat-fail {
		width: 50rpx;
		height: 50rpx;
		display: block;
		flex-shrink: 0;
	}

	.cg-send-box {
		width: 10%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.cg-mr {
		margin-right: 16rpx;
	}

	.cg-ml {
		margin-left: 16rpx;
	}

	.cg-flex-end {
		justify-content: flex-end;
	}

	.cg-flex-reverse {
		flex-direction: row-reverse;
	}

	.reply_view {
		background-color: #fff5d9;
		padding: 20rpx;
		width: 80%;
	}

	.reply {
		font-size: 24rpx;
		color: #333;
		line-height: 50rpx;
		/* 设置字间距 */
		letter-spacing: 2rpx;
	}

	.cg-reply-tabbar2 {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 150rpx;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		z-index: 999;
	}

	.cg-reply-tabbar {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		z-index: 999;

		.cg-chat-tabbar {
			width: 90%;
			background-color: $uni-bg-color-grey;
			display: flex;
			align-items: flex-end;
			padding: 16rpx 24rpx;
			box-sizing: border-box;

			&::after {
				content: " ";
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				border-top: 1rpx solid $uni-text-color-placeholder;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}

			.cg-chat-input {
				flex: 1;
				/* #ifndef MP-WEIXIN */
				min-height: 46rpx;
				padding: $uni-spacing-col-base 0;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				min-height: 78rpx;
				/* #endif */
				background-color: $uni-bg-color;
				border-radius: 8rpx;
				margin: 0;
				padding-left: 20rpx;
			}
		}
	}




	.cg-reply-sidebar {
		position: fixed;
		top: 0;
		right: 0;
		width: 200px;
		height: 100%;
		background: #ffffff;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
		transform: translateX(100%);
		transition: transform 0.3s;
	}

	.cg-reply-sidebar.is-open {
		transform: translateX(0);
	}

	.sidebar-content {
		padding: 10px;
	}

	.sidebar-buttons {
		display: flex;
		padding: 10px;
		flex-direction: column;
	}

	.sidebar-toggle {
		text-align: center;
		margin-top: 10px;
		cursor: pointer;
	}
</style>