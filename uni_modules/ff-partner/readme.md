# ff-partner


## footer 参与者列表
> **组件名：ff-partner**
> 代码块： `partner`


partner 列表一般在活动详情页，购买页等页面使用，用于展示参与者列表的功能等，

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

如需通过`npm`方式使用`uni-ui`组件，另见文档：[https://ext.dcloud.net.cn/plugin?id=55](https://ext.dcloud.net.cn/plugin?id=55)

### 基本用法

在 ``template`` 中使用组件
<view style="font-weight: bold;padding: 10px;">ff-patner组件示例</view>
		<view></view>
		<ff-partner backgroud="#55aaff" :participants="ppts"></ff-partner>
		<view style="text-align: center;width: 100%;">{{ppts.length}}个</view>
		<ff-partner backgroud="#55aa7f" :participants="ppts"></ff-partner>
		<view style="text-align: center;width: 100%;">{{participants.length}}个</view>
		<ff-partner backgroud="#eaeaea" :participants="participants"></ff-partner>
```html
<view style="font-weight: bold;padding: 10px;">ff-patner组件示例</view>
<view></view>
<ff-partner :participants="ppts"></ff-partner>
<ff-partner backgroud="#eaeaea" :participants="participants"></ff-partner>
 <ff-partner :participants="activity.participants"></ff-partner>


```


## API
## propertis

### prop 类型 Object

|属性名称		|说明			|类型		|参数	|
|:-:			|:-:			|:-:		|:-:	|
|size			|头像大小		|	Number	| 0		|
|max			|最大显示数量	|	Number	| 8		|
|participants	|参与者列表		|	[Object]|		|
|contentStyle	|内联样式		|	Object	| -		|
|background		|背景颜色		|	#ffffff	| -		|
|height			|按钮的高度		|	String	|		|
|showName		|是否显示名称	|	Bolean	|		|
### Badge Events

|事件名	|事件说明				|返回参数	|
|:-:	|:-:					|:-:		|
|@click	|点击 提交按钮 触发事件	| -			|




## 组件示例

点击查看：[https://ext.dcloud.net.cn/plugin?id=17796](https://ext.dcloud.net.cn/plugin?id=17796)




