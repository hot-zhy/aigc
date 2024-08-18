<template>
	<view>
		<view class="preview" style="background-color: #efedee;">
			<view class="title" style="margin-bottom: 30px;color: #333;">凸起舵式切换效果</view>
			<helang-tab-bar-bulge :fixed-bottom="false"></helang-tab-bar-bulge>
		</view>
	</view>
</template>

<script>
	import tabBarBulge from "@/uni_modules/helang-tabBar/components/helang-tabBar/tab-bar-bulge";

	export default {
		components: {
			"helang-tab-bar-bulge": tabBarBulge
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.preview{
	margin-bottom: 24px;
	padding: 32px 8px;
	
	.title{
		font-weight: 32rpx;
		margin-bottom: 20rpx;
		padding-left: 10px;
		color: #fff;
	}
}
</style>
