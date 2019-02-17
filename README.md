> 基于 React, Redux, lib-flexible, Ant Design,webpack,react-script,网易云音乐 API,打造的一款可登陆网易云账号的移动端音乐播放器IMBX 👏

---

## 项目操作示范

![项目操作示范](https://user-gold-cdn.xitu.io/2019/2/17/168fa44893f0c3c9?w=750&h=1320&f=gif&s=1525012)

## 项目结构

![项目结构](https://user-gold-cdn.xitu.io/2019/2/17/168fa491cc3da274?w=518&h=1537&f=jpeg&s=83776)
> build—存放webpack编译后打包好的文件<br/>
> NeteaseCloudMusicApi-master-网易云音乐API<br/>
> public-存放项目图标(favicon.ico)、index.html、manifest.json、项目截图.png<br/>
> src<br/>
>> api-存放改装过的axios以及api<br/>
>> common-存放静态css、js、images<br/>
>> component-组件，主要有以下组成<br/>
>>> DrawerBox.js-音乐列表页更多蒙版<br/>
>>> Header.js-通用顶部导航<br/>
>>> InputBox.js-登陆输入框（含逻辑判断）<br/>
>>> MusicList.js-播放页面显示音乐列表蒙版<br/>
>>> MusicLyric.js-歌曲歌词组件<br/>
>>> MusicPlayer-之前项目没有重构时的主要播放器组件，但是因为逻辑和视图混乱，之后会去掉<br/>
>>> Player.js-纯音乐播放器组件（无逻辑判断），传入获取的音乐列表MusicList即可<br/>
>>> SearchHeader.js-搜索组件（之后完善）<br/>
>>> SingleMusic.js-单曲音乐组件，无逻辑判断，重写样式<br/>
>>> SongSheet.js-推荐歌单单曲组件样式，无逻辑判断<br/>

>> pages-页面组成<br/>
>>> Find.js-包括个性推荐和主播电台两个栏目<br/>
>>> Login.js-登陆页面<br/>
>>> LoginDetails.js-登陆内页<br/>
>>> Mrtj.js-每日推荐页<br/>
>>> PageDetails.js-播放主页，包括核心播放器、歌词显示以及音乐列表，但是这三个是分开的，没有关联<br/>
>>> SongSheet.js-推荐歌单块（之后写成通用的歌单组件）<br/>
>> store-Redux逻辑判断模块<br/>
>>> actionCreator.js-进行主要逻辑判断，包括上一首、下一首播放、点击歌曲播放逻辑控制等<br/>
>>> actionTypes.js-定义type常量<br/>
>>> index.js-连接React和Redux<br/>
>>> reducer.js-改变定义的全局state<br/>
>> App.js-Router路由控制<br/>
>> index.js-根节点，定义Provider存放store<br/>
>> config-overrides.js-使用antd组件的必要设置文件，如想详细学习请参考
https://ant.design/docs/react/use-with-create-react-app-cn<br/>
>> package.json-存放dependencies、proxy、scripts等，在这里修改为react-scripts启动<br/>

## 技术栈
> **客户端**
* React:"^16.7.0",

> 1.支持ES6语法，支持箭头函数<br/>

> 2.px2rem————使用atom插件px2rem-plus对750px设计图进行px->rem的转换，如果你使用的不是atom，可以网上搜搜如何使用，sublime插件名叫px2rem<br/>

> 3.sass预编译css语言<br/>

* Redux:"^4.0.1"
* react-redux:"^6.0.0"
* react-router:"^4.3.1"
* antd:"^3.12.2"
* axios:"^0.18.0"
* lyric-parser:"^1.0.1"
> 歌词核心组件
* react-scripts:"2.1.3"

> 1.使用webpack@3.11.0版本,webpack-dev-server@2.9.7，webpack-dev-server如果是3.x编译就会出错mmp......<br/>


> 2.支持热更新————react-app-rewired start<br/>


>> dev指令————package.json文件中webpack-dev-server --inline --progress --hot --config build/webpack.dev.conf.js<br/><br/><br/>

* lib-flexible

> 在index.js入口文件头部引入————import 'lib-flexible'<br/>

> 基本所有样式都按照750px设计图写，使用px2rem插件转成rem<br/>

> 字体单独定义<br/>

```
.font-dpr(@font-size){
    font-size: @font-size;

    [data-dpr="2"] & {
        font-size: @font-size * 2;
    }

    [data-dpr="3"] & {
        font-size: @font-size * 3;
    }
}
```
> **服务器端**
>> NeteaseCloudMusicApi-master-网易云音乐API
>> 3.4.0最新版本

## 使用方法
* cd NeteaseCloudMusicApi-master,然后输入命令npm start

* 打开新的控制台，cd IMBX,npm i

* npm run build

* npm start
