
#  uniApp  yt-order-list 好用的订单列表



## 使用说明 

在 template 中：

```vue
<template>
	<view >
		<yt-order-list :orderList="orderList" @Transfer="Transfer" @jieOrder="jieOrder" @callUser="callUser"></yt-order-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
					orderId: '20240407',
					title: '大唐不夜城现场拍摄',
					status: 2, //3:已完成 2:进行中 否则待接单
					cAddress: '陕西省西安市雁塔区',
					mAddress: '陕西省西安市新城区',
					time: '2024.4.7 14:00',
					km: '0.6km'
				},
				{
					orderId: '20240407',
					title: '大唐不夜城现场拍摄',
					status: 1,
					cAddress: '陕西省西安市雁塔区',
					mAddress: '陕西省西安市新城区',
					time: '2024.4.7 14:00',
					km: '0.6km'
				}],
			}
		},
		methods: {
			/**
			 * @method Transfer
			 * 订单转派
			 * @param {Object} id
			 */
			Transfer(id){
				console.log("转派",id);
			},
			/**
			 * @method jieOrder
			 * 接单
			 * @param {Object} id
			 */
			jieOrder(id){
				console.log("接单",id);
			},
			/**
			 * @method callUser
			 * 联系
			 * @param {Object} id
			 */
			callUser(id){
				console.log("联系",id);
			}
		}
	}
</script>

```

## 状态说明（根据项目实际要求自行改正）
```javascript
if (state == 3) {
	return '已完成'
} else if (state == 2) {
	return '进行中'
} else {
	return '待接单'
}
```

## 属性说明

| 属性		| 是否必填	|  值类型	| 默认值	| 说明			|
| --------- | -------- 	| -----: 	| --: 	| :------------:|
| orderList    |	是  		| Array 	| () =>[]	| 订单列表数组	|
| @Transfer    |	否  		| Function 	| --	| 转派的点击事件	|
| @jieOrder    |	否  		| Function 	| --	| 接单的点击事件	|
| @callUser    |	否  		| Function 	| --	| 联系的点击事件	|
 
| `QQ交流群(906392632)`  |

|<p><img align=top src="https://7072-prod-4gapv4gl33a8a0ff-1305990777.tcb.qcloud.la/%E9%87%8D%E8%A6%81%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/Snipaste_2023-11-06_16-50-56.png?sign=ed27f09cfeabb33e24835fecdd4108db&t=1699260686" width="500px" height="auto"></p>|
| QQ群号：906392632      |

## 温馨提示
	
* 文件上传
0. 如说明表达还不够清楚，不清楚怎么使用可加入群聊一起交流	
1. 若能帮到你还请点亮5颗小星星以作鼓励哈~
2. 若能帮到你还请点亮5颗小星星以作鼓励哈~
3. 若能帮到你还请点亮5颗小星星以作鼓励哈~