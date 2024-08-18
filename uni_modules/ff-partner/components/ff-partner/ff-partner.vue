<template>
	<view class="partner-wraper">
		<view class="partner-item"
			:style="{'padding-left':(index==0 ?marginLeft:0)+'px', 'margin-left':-marginLeft+'px'}"
			v-for="(item,index) in participants" :key="index">
			<view class="item">
				<view style="position: relative;">
					<image :src="item.avatar" class="avatar" :class="item.gender=='男'?'male':'women'"
						style="width: 30px;height: 30px;">
						<image v-if="item.gender=='男'" class="tag" src="../../static/male.png" mode="widthFix" />
						<!-- <image v-else class="tag" src="../../static/women.png" mode="widthFix" /> -->
					</image>
				</view>
<!-- 				<view v-if="showName" class="nickname">
					{{item.nickname}}
				</view> -->
			</view>
		</view>

	</view>

</template>
<script>
	export default {
		name: "ffFooter",
		props: {
			participants: {
				type: Array,
				default: []
			},
			size: {
				type: [String, Number],
				default: 50
			},
			min: {
				type: [String, Number],
				default: 0
			},
			max: {
				type: [String, Number],
				default: 1
			},

			showName: {
				type: Boolean,
				default: true
			},
			width: {
				type: [Number, String],
				default: 300
			},

			bottom: {
				type: Number,
				default: 50
			},
			backgroud: {
				type: String,
				default: "#FFFFFF"
			},
			/**
			 * 是否显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否开启点击遮罩关闭
			 */
			maskClose: {
				type: Boolean,
				default: true
			},
			/**
			 * 层级
			 */
			zIndex: {
				type: Number,
				default: 10
			},
			/**
			 * 动画时长，单位秒
			 */
			duration: {
				type: [String, Number],
				default: 0.3
			},
			/**
			 * 嵌入内容css类名
			 */
			contentStyle: {
				type: Object,
				default: () => {}
			},
			/**
			 * 动画类型（13种）：fadeInAndScaleUp、slideFromRight、slideFromBottom、newspaper、fall、sideAndFall、flipH3d、flipV3d、sign3d、superScale、slit3d、rotateFromBottom3d、rotateFromLeft3d
			 */
			aniType: {
				type: String,
				default: 'fadeInAndScaleUp'
			}
		},
		data() {
			return {
				isRm: false,
				marginLeft: 0,
			}
		},
		created() {

		},
		onLoad() {

		},
		watch: {
			participants: {
				handler(ptpLength) {
					if (ptpLength.length < 7) {
						this.marginLeft = "0px";
						return false;
					}
					let width = this.width;
					let paddingLeft = 0;
					this.marginLeft = (this.size - ((width - paddingLeft) / ptpLength.length));
				},
				immediate: true
			}
		},
		computed: {
			margin() {
				if (this.participants.length < 8) {
					return "0px";
				}
				return -(this.participants.length + 2) * 1 + 'px';
			}
		},
		filters: {
			toFixed(v) {
				return parseFloat(v).toFixed(0);
			},
			genderFilter(gender) {
				return gender == "男";
			}
		},
		methods: {
			// genderFilter(gender) {
			// 	return gender == "男";
			// },
			//遮罩点击
			click() {
				this.$emit("callback");
			}
		}
	}
</script>
<style scoped lang="scss">
	.partner-wraper {
		border-radius: 10px;
		padding: 5px 0px;
		display: flex;
		justify-content: flex-start;
		flex-wrap: nowrap;
		overflow: hidden;
		height: auto;
		overflow-wrap: inherit;
		margin: 1px 0px;
		direction: ltr;

	}

	.partner-item {
		&:first-child {
			padding-left: 0px;
		}

		.item {
			height: 30px;
			width: 30px;
			display: grid;
			justify-items: center;
			align-items: center;
		}
	}


	.avatar {
		border-radius: 30px;
		height: 30px;
		width: 30px;
	}

	.male {
		border: 3px solid #ffffff;
		// border: 3px solid #00aaff;
	}

	.women {
		border: 3px solid #ffffff;
		// border: 3px solid #ff557f;
	}

	.tag {
		position: absolute;
		bottom: 5px;
		right: 10px;
		width: 14px;
		height: 14px;
	}

	.nickname {
		font-size: 12px;
		color: #838383;
		width: 40px;
		margin: 0px 1px;
		padding: 0px 2px;
		overflow-x: hidden;
	}
</style>