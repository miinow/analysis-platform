### 数据资产管理平台

所有spa都放在/src/pages下，单独建文件夹，状态管理在store下建相应文件夹

#### 目录结构

```
├── build   打包结果文件
├── config    webpack配置
├── scripts   npm scripts脚本
├── src         开发的主目录
│   ├── index.js
│   ├── Router.jsx  路由
│   ├── api     pi配置
│   ├── assets        通用文件
│       ├── normalize.scss
│       ├── Rewrite.antd.scss  用来重写antd的样式
│   ├── components  通用组件
│   ├── config         通用配置
│   ├── utils   工具
│   ├── pages 页面
│   │   
│   └── store   状态管理(以页面为文件夹)
│       ├── action-types
│       ├── actions
│       ├── index.js
│       ├── reducers
│       └── sagas   
├── package.json     
└── yarn.lock

```

#### 开发

yarn start

开发从dev checkout一个私有分支进行开发

```
 git checkout -b [branch]
```

开发完成后合并到dev

```
git checkout dev && git merge [branch]
```

测试环境 test分支

```
 npm run testbuild
```

生产环境 release分支

```
npm run build
```

### 组件


