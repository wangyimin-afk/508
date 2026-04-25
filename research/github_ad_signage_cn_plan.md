# GitHub 开源广告机（数字标牌）方案调研（Windows 上位机 + Android 下位机）

## 你的核心需求（已对齐）
- 上位机要能在 **Windows** 电脑部署（管理端/CMS/控制端）。
- 下位机以 **Android 设备** 为主（例如 RK3568 / RK3588 一类主板）。
- 需要覆盖不同屏幕尺寸、分辨率、横竖屏。
- 希望尽量中文化（至少可二次汉化）。

## 我筛出的 GitHub 开源项目（优先级从高到低）

### 1) Xibo CMS（成熟度高，生态最完整）
- GitHub: https://github.com/xibosignage/xibo-cms
- 特点：开源 CMS，生态成熟，文档和社区相对完善。
- 匹配度：
  - Windows 上位机：✅（Web CMS 可在 Windows 服务器/容器环境部署）
  - Android 下位机：⚠️（官方说明 Android Player 为商业选项，开源核心是 CMS）
  - 多屏适配：✅（属于数字标牌主流方案）
- 适合你：如果你要“全面性”，Xibo 是非常稳妥的基线。

### 2) Garlic-Hub（新但方向对：CMS + 设备管理）
- GitHub: https://github.com/garlic-signage/garlic-hub
- 特点：强调设备管理 + 内容管理，路线图清晰。
- 匹配度：
  - Windows 上位机：✅（Web 形态，部署灵活）
  - Android 下位机：✅（项目目标覆盖多种播放端）
  - 多屏适配：✅（面向标准数字标牌场景）
- 适合你：作为“可深度二开”的候选，值得并行评估。

### 3) Screenlite（MIT 许可，二开友好）
- GitHub: https://github.com/screenlite/screenlite
- 组织页（含 Android 相关仓库）：https://github.com/screenlite
- 特点：MIT 许可；官方组织下能看到 web-kiosk / sdm-android 等仓库。
- 匹配度：
  - Windows 上位机：✅（Web 管理端可部署在 Windows 环境）
  - Android 下位机：✅（存在 Android 相关子仓库）
  - 多屏适配：✅（Web/播放器模式普遍支持）
- 适合你：若你计划深改并商业化，MIT 成本更低。

### 4) LibreSignage（老牌、轻量）
- GitHub: https://github.com/eerotal/LibreSignage
- 特点：轻量、历史较久、社区星标较高。
- 匹配度：
  - Windows 上位机：✅（文档提到可在 Docker/多系统运行）
  - Android 下位机：⚠️（Android 生态支持不如前两者鲜明）
  - 多屏适配：✅
- 适合你：可作“轻量备选”或参考其架构。

## 关于“全部汉化为中文”
现实上，以上项目大多并非“默认全中文”。更可行做法：
1. 先选主方案（建议 Xibo / Screenlite 二选一作为主线）。
2. 统一 i18n 机制（前端 JSON / 后端 locale 文件）。
3. 先覆盖运营高频页面（排期、素材、设备、日志、告警）。
4. 再逐步补全深层设置与错误提示。

## RK3568 / Android 下位机匹配建议
- 建议 Android 10+，确保硬解码（H.264/H.265）与 WebView 版本可控。
- 播放端做“设备能力探测”：分辨率、旋转、解码能力、可用存储。
- 模板引擎按比例/断点适配（16:9、9:16、超宽屏）。
- 对接 RK 平台时优先验证：开机自启、看门狗、断网重连、定时开关机。

## 当前环境执行结果（关键说明）
我在本环境尝试直接 `git clone` 从 GitHub 拉取源码，但网络出口对 GitHub 返回 403（CONNECT tunnel failed），因此**无法在当前容器里实际下载**。

你可以在你本地 Windows 机器直接执行下面脚本完成下载：
- `scripts/clone_signage_repos.sh`

