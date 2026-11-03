# 郭涛歌 · Personal branding website

浅蓝 Y2K 风格个人网站。纯 HTML + CSS，无依赖、无构建步骤、无外部字体请求，可部署至 GitHub Pages。适配桌面和手机，支持键盘操作与减少动态效果偏好。

## 文件

- `index.html`：个人介绍、三组项目经历、教育与工作经历、联系入口。
- `style.css`：所有视觉样式与响应式规则。
- `assets/star.svg`：网站图标。
- `.nojekyll`：静态部署标识。

## 本地预览

直接用浏览器打开 index.html，或在此目录执行：

```sh
python3 -m http.server 8080
```

然后访问 http://localhost:8080 。

## 上传 GitHub

新建 repository，将本目录内的文件上传到仓库根目录（不要把外层 personal-branding 文件夹一同套入）。在仓库 Settings → Pages 中选择 Deploy from a branch，分支 main，目录 / (root)，保存。部署成功后的地址以 GitHub Pages 页面显示为准。项目站点通常为 https://用户名.github.io/仓库名/ 。所有资源采用相对路径，支持项目站点子路径。

也可在本目录运行以下命令，将最后一行中的地址替换为你的真实仓库地址：

```sh
git init
git add .
git commit -m "Create personal branding website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

若仓库已有内容，请先克隆该仓库，再复制网页文件，不要强制推送覆盖历史。

## 后续补充作品

在 assets/ 下放入图片（建议使用英文文件名），将对应 article 内的 project-visual 替换为带准确 alt 文本的 img 元素，并在 style.css 中设置宽度与 object-fit。当前封面仅为 CSS 主题插画，不代表真实项目物料。项目经历详情使用原生 details 元素，可直接编辑其中的文字。

## 内容说明

内容依据用户提供的《郭涛歌-品牌策划-2年.docx》整理；数字沿用简历口径，未进行第三方核验。未上传简历原文件、电话与出生日期。联系按钮使用简历邮箱；站点公开后该邮箱也会公开。工作经历“至今”按简历保留，后续请及时更新。
