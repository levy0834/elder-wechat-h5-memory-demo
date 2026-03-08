# elder-wechat-h5-memory-demo

一个适合老年人体验的微信 H5 小游戏 Demo：**福气翻翻乐**。

## 特点

- 字大、按钮大、颜色对比明显
- 规则简单，几秒就能理解
- 无倒计时催促，不拼手速
- 纯静态 HTML / CSS / JS，适合微信里直接打开

## 玩法

- 点开两张卡牌
- 如果文字一样，就配对成功
- 6 组全部配对完成即通关

## 本地运行

直接打开 `index.html` 即可。

也可以：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`

## 部署

项目已包含 GitHub Pages 工作流 `.github/workflows/deploy.yml`。
推送到 GitHub 后，在仓库 Pages 设置里选择 **GitHub Actions** 即可自动部署。
