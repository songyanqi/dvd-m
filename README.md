### 项目运行方法


首先切换私有源，参考 http://wiki.bravetime.net/pages/viewpage.action?pageId=20381771    

然后在项目跟目录运行 
```shell
npm install
```

安装完成后运行 即可构建代码
```shell
npm run start
```

万能清除法 after伪类 清浮动（现在主流方法，推荐使用）

.float_div:after{
	content:".";
	clear:both;
	display:block;
	height:0;
	overflow:hidden;
	visibility:hidden;
}
.float_div{
	zoom:1
} 


配置charles代理，才可在本地查看效果
配置方法 http://wiki.bravetime.net/pages/viewpage.action?pageId=20381779
