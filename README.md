### Data-asset Management Platform


#### Directory

```
├── build
├── config
├── scripts
├── src
│   ├── index.js
│   ├── Router.jsx
│   ├── api
│   ├── assets
│       ├── normalize.scss
│       ├── Rewrite.antd.scss
│   ├── components
│   ├── config
│   ├── utils
│   ├── pages
│   │   
│   └── store
│       ├── action-types
│       ├── actions
│       ├── index.js
│       ├── reducers
│       └── sagas   
├── package.json     
└── yarn.lock

```

#### Develop Rules

* run in dev mode
```
yarn start
```
* checkout a new branch from dev

```
 git checkout -b [branch]
```

* merge your branch into dev when developed

```
git checkout dev && git merge [branch]
```


* make a build for test environment ( test branch )


```
 npm run testbuild
```

* make a build for prod environment ( release branch )

```
npm run build
```





