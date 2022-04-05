
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/learn/learn","pages/my/my","pages/login/login","pages/find-password/find-password","pages/bind-phone/bind-phone","pages/userinfo/userinfo","pages/order/order","pages/setting/setting","pages/update-password/update-password","pages/coupon/coupon","pages/course-detail/course-detail","pages/column-detail/column-detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","bounce":"none"},"tabBar":{"color":"#b0abb3","selectedColor":"#00000","backgroundColor":"#f8f8f8","borderStyle":"white","fontSize":"11px","height":"52px","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"/static/tabbar/index.png","selectedIconPath":"/static/tabbar/index_selected.png"},{"pagePath":"pages/learn/learn","text":"学习","iconPath":"/static/tabbar/learn.png","selectedIconPath":"/static/tabbar/learn_selected.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"/static/tabbar/my.png","selectedIconPath":"/static/tabbar/my_selected.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-app在线教育","compilerVersion":"3.3.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-app","titleNView":false}},{"path":"/pages/learn/learn","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"学习","enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/find-password/find-password","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/bind-phone/bind-phone","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"编辑资料","enablePullDownRefresh":false}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"订单","enablePullDownRefresh":false}},{"path":"/pages/setting/setting","meta":{},"window":{"navigationBarTitleText":"我的设置","enablePullDownRefresh":false}},{"path":"/pages/update-password/update-password","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/coupon/coupon","meta":{},"window":{"navigationBarTitleText":"我的优惠券","enablePullDownRefresh":false}},{"path":"/pages/course-detail/course-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/column-detail/column-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
