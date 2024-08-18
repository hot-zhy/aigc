# 使用说明

### 简介

支持在元素样式自定义(Slot)自定义，支持自动根据所在位置贴边，也支持保持在任意位置


### 引入

默认为easycom模式，可直接键入`<shinn-xSlideButton>`标签。

### 例子

```html
<shinn-xSlideButton left="20rpx" top="50%" margin="20rpx">
	<view style="color:#fff;background-color: #007aff;">按钮</view>
</shinn-xSlideButton>
```

### 参数列表

```javascript
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
```

### 未来开发功能

支持菜单多方向展开，收起，样式自定义等