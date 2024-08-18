# cc-defineCoupon

#### 使用方法 
```使用方法
<!-- 选择优惠券弹出层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')">
			<scroll-view class="scrolls" scroll-y>
				<!-- colors:按钮颜色 couponList:优惠卷列表数据  @onReceive：领取或立即使用按钮事件 -->
				<cc-defineCoupon colors="#fa436a" :couponList="couponList" @onReceive="onReceive"></cc-defineCoupon>

			</scroll-view>
		</view>

          // 打开优惠券弹框 
			opencoupon() {
				this.couponshow = true
			},
			// 关闭优惠券弹框 
			hidecoupon() {
				this.couponshow = false
			},
			//领取优惠券 立即使用事件
			onReceive(item, index) {
				console.log(item, index)
				if (item.status == 1) {
					// 立即使用 事件


				} else {
					this.couponList[index].status = 1 //领取成功
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					})
				}
			},

					


```

#### HTML代码实现部分
```html
<template>
	<view class="content">

		<button style="margin-top: 38px;" @click="opencoupon()">弹出优惠券</button>


		<!-- 选择优惠券弹出层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px':'')">
			<scroll-view class="scrolls" scroll-y>
				<!-- colors:按钮颜色 couponList:优惠卷列表数据  @onReceive：领取或立即使用按钮事件 -->
				<cc-defineCoupon colors="#fa436a" :couponList="couponList" @onReceive="onReceive"></cc-defineCoupon>

			</scroll-view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

				couponshow: false,
				couponList: [ //优惠券列表
					{
						money: 100,
						reduce: 10,
						date: '2023-05-09 2023-10-02',
						id: 1,
						status: 0,
						condition: ['新人专享', '通用卷']
					}, {
						money: 100,
						reduce: 20,
						date: '2023-02-09 2023-10-02',
						id: 2,
						status: 0,
						condition: ['会员专享', '通用卷']
					}, {
						money: 100,
						reduce: 30,
						date: '2023-02-09 2023-10-02',
						id: 3,
						status: 0,
						condition: ['数码产品可用', '不可与其他产品共享']
					}, {
						money: 100,
						reduce: 40,
						date: '2023-02-09 2023-10-02',
						id: 4,
						status: 0,
						condition: ['新人专享', '可与其他产品共享']
					}, {
						money: 100,
						reduce: 50,
						date: '2023-02-09 2023-10-02',
						id: 5,
						status: 0,
						condition: ['新人专享', '仅在支付时使用']
					}
				],

			}
		},


		methods: {
			// 打开优惠券弹框 
			opencoupon() {
				this.couponshow = true
			},
			// 关闭优惠券弹框 
			hidecoupon() {
				this.couponshow = false
			},
			//领取优惠券 立即使用事件
			onReceive(item, index) {
				console.log(item, index)
				if (item.status == 1) {
					// 立即使用 事件


				} else {
					this.couponList[index].status = 1 //领取成功
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;

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
		z-index: 500;
	}
</style>


```