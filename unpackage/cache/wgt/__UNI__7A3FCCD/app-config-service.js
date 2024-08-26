
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/register/register","pages/map/index","pages/my/my","pages/search/search","pages/my-note/my-note","pages/my-collect/my-collect","pages/note-desc/note-desc","pages/follow-list/follow-list","pages/fan-list/fan-list","pages/my-address/my-address","pages/search-list/search-list","pages/edit-post/edit-post","pages/user_info/user_info","pages/user-follow-list/user-follow-list","pages/user-fan-list/user-fan-list","pages/user-note/user-note","pages/user-collect/user-collect","pages/user-address/user-address","pages/place-post/place-post","pages/add/add","pages/stragety/stragety","pages/message/message","pages/stragety-detail4/stragety-detail4","pages/add-strategy/add-strategy","pages/chat/chat","pages/search-strategy/search-strategy","pages/search-strategy-list/search-strategy-list","pages/editST/editST","pages/relate-strategy/relate-strategy"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"borderStyle":"none","color":"#B5B5B5","selectedColor":"#6A5DAC","backgroundColor":"#fffdff","fontSize":"15","list":[{"pagePath":"pages/index/index","text":"帖子","iconPath":"static/images/post.png","selectedIconPath":"static/images/post_selected.png"},{"pagePath":"pages/stragety/stragety","text":"攻略","iconPath":"static/images/strategy.png","selectedIconPath":"static/images/strategy_selected.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/images/my.png","selectedIconPath":"static/images/my_selected.png"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"TripMap","compilerVersion":"4.24","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"TripMap","navigationBarBackgroundColor":"#6A5DAC","bounce":"none","titleNView":{"searchInput":{"align":"center","placeholder":"点击搜索帖子","borderRadius":"50upx","backgroundColor":"#fff","disabled":true}}}},{"path":"/pages/login/login","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/register/register","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/map/index","meta":{"isNVue":true},"window":{"navigationBarTitleText":"周围地点推荐","scrollIndicator":"none"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#6A5DAC","navigationBarTitleText":""}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索帖子","enablePullDownRefresh":false}},{"path":"/pages/my-note/my-note","meta":{},"window":{"navigationBarTitleText":"我的帖子","enablePullDownRefresh":false}},{"path":"/pages/my-collect/my-collect","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":false}},{"path":"/pages/note-desc/note-desc","meta":{},"window":{"navigationBarTitleText":"帖子详情","enablePullDownRefresh":false}},{"path":"/pages/follow-list/follow-list","meta":{},"window":{"navigationBarTitleText":"关注列表","enablePullDownRefresh":false}},{"path":"/pages/fan-list/fan-list","meta":{},"window":{"navigationBarTitleText":"粉丝列表","enablePullDownRefresh":false}},{"path":"/pages/my-address/my-address","meta":{},"window":{"navigationBarTitleText":"我的收藏地址","enablePullDownRefresh":false}},{"path":"/pages/search-list/search-list","meta":{},"window":{"navigationBarTitleText":"搜索结果","enablePullDownRefresh":false,"navigationBarBackgroundColor":"white"}},{"path":"/pages/edit-post/edit-post","meta":{},"window":{"navigationBarTitleText":"发布帖子","enablePullDownRefresh":false,"navigationBarBackgroundColor":"white"}},{"path":"/pages/user_info/user_info","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#6A5DAC","navigationBarTitleText":"他的信息"}},{"path":"/pages/user-follow-list/user-follow-list","meta":{},"window":{"navigationBarTitleText":"TA的关注","enablePullDownRefresh":false}},{"path":"/pages/user-fan-list/user-fan-list","meta":{},"window":{"navigationBarTitleText":"TA的粉丝","enablePullDownRefresh":false}},{"path":"/pages/user-note/user-note","meta":{},"window":{"navigationBarTitleText":"TA的帖子","enablePullDownRefresh":false}},{"path":"/pages/user-collect/user-collect","meta":{},"window":{"navigationBarTitleText":"TA的收藏帖子","enablePullDownRefresh":false}},{"path":"/pages/user-address/user-address","meta":{},"window":{"navigationBarTitleText":"TA的收藏地点","enablePullDownRefresh":false}},{"path":"/pages/place-post/place-post","meta":{},"window":{"navigationBarTitleText":"与地点相关的帖子","enablePullDownRefresh":false}},{"path":"/pages/add/add","meta":{},"window":{"navigationBarTitleText":"发布攻略","enablePullDownRefresh":false}},{"path":"/pages/stragety/stragety","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"TripMap","navigationBarBackgroundColor":"#6A5DAC","bounce":"none","titleNView":{"searchInput":{"align":"center","placeholder":"点击搜索攻略","borderRadius":"50upx","backgroundColor":"#fff","disabled":true}}}},{"path":"/pages/message/message","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/stragety-detail4/stragety-detail4","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/add-strategy/add-strategy","meta":{},"window":{"navigationBarTitleText":"新建攻略","enablePullDownRefresh":false}},{"path":"/pages/chat/chat","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/search-strategy/search-strategy","meta":{},"window":{"navigationBarTitleText":"搜索攻略","enablePullDownRefresh":false}},{"path":"/pages/search-strategy-list/search-strategy-list","meta":{},"window":{"navigationBarTitleText":"搜索攻略结果","enablePullDownRefresh":false}},{"path":"/pages/editST/editST","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/relate-strategy/relate-strategy","meta":{},"window":{"navigationBarTitleText":"选择关联帖子","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
