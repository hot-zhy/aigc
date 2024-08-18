<template>
	<view class="zero-timeline">
		<view v-for="(item, index) in dataList" :key="index" class="item"
			:style="{'--color':item.color||'#0396FF','--bgcolor':item.color?item.color+'1a':'#0396FF1a','--gap':gap,'--left':leftWidth}"
			style="width: 100%;">
			<view class="left" v-if="showLeft" style="width: 10vw;">
				<view class="content">
					<input v-model="item.leftTitle" class="title" />
					<input v-model="item.leftContent" class="sub" />
				</view>
			</view>
			<view class="line">
				<view class="dot">
				</view>
			</view>
			<view class="right" :style="'background-color:'+ convertToRGBA(item.color, 0.16)">
				<view class="content" style="width: 100%;">
					<input v-model="item.title" class="title" />
					<textarea v-model="item.content" class="sub"></textarea>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zero-timeline",
		props: {
			dataList: {
				type: Array,
				default: () => []
			},
			i: {
				type: Number,
				required: true
			},
			showLeft: {
				type: Boolean,
				default: true
			},
			leftWidth: {
				type: String,
				default: '150rpx'
			},
			gap: {
				type: String,
				default: '20rpx'
			}
		},
		onShow() {
			console.log(this.i)
		},
		methods: {
			convertToRGBA(rgb, opacity) {
				return rgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
			},
			updateDataList() {
				this.$emit('updateDataList', [this.dataList, this.i]);
			},
		},
		watch: {
			dataList: {
				handler(newVal, oldVal) {
					// console.log("DataList modified:");
					// console.log("Old value:", oldVal);
					// console.log("New value:", newVal);
					this.updateDataList();
				},
				deep: true // 用于监听对象内部值的变化
			}
		}
	};
</script>

<style lang="scss" scoped>
	.zero-timeline {
		position: relative;
		padding: 10rpx;
		display: flex;
		flex-direction: column;

		.item {
			display: flex;
		}

		.left {
			width: var(--left);
			overflow: hidden;
			margin-bottom: var(--gap);
			text-align: right;
			white-space: pre-wrap;
			word-wrap: break-word;
			word-break: break-all;
			flex-shrink: 0;

			.content {
				input {
					width: 100%;
				}
			}
		}

		.line {
			margin: 2px 10px 0px 10px;
			width: 2px;
			background: #838383;
			position: relative;
			flex-shrink: 0;
			flex-grow: 0;

			.dot {
				position: absolute;
				top: 0px;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				align-items: center;
				width: 8px;
				height: 8px;
				background: var(--color);
				box-shadow: 0 0 3px 1px var(--color);
				border-radius: 50%;
			}
		}

		.right {
			border-radius: 10px;
			flex: 1;
			margin-bottom: var(--gap);

			.content {
				padding: 20rpx 30rpx;
				min-height: 50rpx;
				background: var(--bgcolor);
				border-radius: 10rpx;
				white-space: pre-wrap;
				word-wrap: break-word;
				word-break: break-all;

				input,
				textarea {
					width: 100%;
				}
			}
		}

		.item:last-child {
			.line {
				background: transparent;
			}
		}
	}
</style>