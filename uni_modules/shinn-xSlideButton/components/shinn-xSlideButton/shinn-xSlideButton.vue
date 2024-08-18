<template>
	<view :animation="buttonAnimationData" :class="{
		button:true
	}" :style="{
		lineHeight:size,
		zIndex:zIndex,
		left:x,
		right:right,
		top:y,
		bottom:bottom,
		}" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
		<slot></slot>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				x: "",
				y: "",
				space: 0,
				width: 60,
				height: 60,
				screenWidth: 0,
				screenHeight: 0,
				buttonAnimationData: null,
				buttonAnimation: null,
			}
		},
		props: {
			//是否自动贴边
			side: {
				type: Boolean,
				default: true,
				required: false,
			},
			//按钮尺寸大小 支持rpx/px
			size: {
				type: String,
				default: "100rpx",
				required: false,
			},
			//z-index
			zIndex: {
				type: Number,
				default: 100,
				required: false,
			},
			//初始位置 距离屏幕顶端的位置 支持rpx px
			top: {
				type: String,
				default: undefined,
			},
			//初始位置 距离屏幕底端的位置 支持rpx px
			bottom: {
				type: String,
				default: undefined,
			},
			//初始位置 距离屏幕左端的位置 支持rpx px
			left: {
				type: String,
				default: undefined,
			},
			//初始位置 距离屏幕右端的位置 支持rpx px
			right: {
				type: String,
				default: undefined,
			},
			//与屏幕四边的距离 支持rpx px
			margin: {
				type: String,
				default: undefined,
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.screenWidth = res.screenWidth
					this.screenHeight = res.screenHeight
					this.x = this.left
					this.y = this.top

					if (this.size.endsWith("rpx")) {
						this.width = ~~this.size.replace(/[a-zA-Z]/g, '') * (this.screenWidth / 750)
						this.height = this.width;
					} else {
						this.width = ~~this.size.replace(/[a-zA-Z]/g, '')
						this.height = this.width;
					}
					if (this.margin.endsWith("rpx")) {
						this.space = ~~this.margin.replace(/[a-zA-Z]/g, '') * (this.screenWidth / 750)
					} else {
						this.space = ~~this.margin.replace(/[a-zA-Z]/g, '')
					}
				}
			});
		},
		methods: {
			touchstart(e) {
				this.buttonAnimation = uni.createAnimation({
					duration: 0,
					timingFunction: 'linear'
				})


				if (e.touches[0].clientX < this.width / 2 + this.space) {
					this.x = this.space + "px"
					this.buttonAnimationData = this.buttonAnimation.left(this.space)
						.step()
						.export();
				} else if (e.touches[0].clientX > this.screenWidth - this.width / 2 - this.space) {
					this.x = (this.screenWidth - this.width - this.space) + "px"
					this.buttonAnimationData = this.buttonAnimation.left(this.screenWidth - this.width - this.space)
						.step()
						.export();
				} else {
					this.x = (e.touches[0].clientX - this.width / 2) + "px"
					this.buttonAnimationData = this.buttonAnimation.left(e.touches[0].clientX - this.width / 2)
						.step()
						.export();
				}

				if (e.touches[0].clientY < this.height / 2 + this.space) {
					this.y = this.space + "px"
				} else if (e.touches[0].clientY > this.screenHeight - this.height / 2 - this.space) {
					this.y = (this.screenHeight - this.height - this.space) + "px"
				} else {
					this.y = (e.touches[0].clientY - this.height / 2) + "px"
				}
			},
			touchend(e) {
				this.buttonAnimation = uni.createAnimation({
					duration: 100,
					timingFunction: 'linear'
				})

				if (this.side)
					if (e.changedTouches[0].clientX > this.screenWidth / 2) {
						//屏幕右侧
						this.buttonAnimationData = this.buttonAnimation.left(this.screenWidth - this.width -
							this.space).step().export();
					} else {
						//屏幕左侧
						this.buttonAnimationData = this.buttonAnimation.left(this.space).step().export();
					}
			},
			touchmove(e) {
				if (e.touches[0].clientX + this.width / 2 > this.screenWidth - this.space)
					this.x = (this.screenWidth - this.width - this.space) + "px"
				else if (e.touches[0].clientX - this.width / 2 < this.space)
					this.x = this.space + "px"
				else
					this.x = (e.touches[0].clientX - this.width / 2) + "px"

				if (e.touches[0].clientY + this.height / 2 > this.screenHeight - this.space)
					this.y = (this.screenHeight - this.height - this.space) + "px"
				else if (e.touches[0].clientY - this.height / 2 < this.space)
					this.y = this.space + "px"
				else
					this.y = (e.touches[0].clientY - this.height / 2) + "px"
			}
		}
	}
</script>
<style scoped lang="css">
	.button {
		cursor: pointer;
		text-align: center;
		position: fixed;
		overflow: hidden;
	}
</style>