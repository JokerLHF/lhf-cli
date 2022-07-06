cli 模版，参考资料 https://juejin.cn/post/7021097811491946503#heading-8

# 本地调试：
- link 到全局：
  - cd lhf-front-cli
  - npm link

- 查看全局 link
  - npm ls --global
- 查看全局 link 是否安装某软件包
  - npm ls --global

- 卸载全局提供的 packageName 包:
  - npm rm ｜ uninstall --global packageName

- 创建项目
  - lhf-local create xxx

# 线上调试
- cd lhf-front-cli
- npm run build
- npm link
- lhf create xxx

# 发布线上
- npm publish
