const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000;

// SVG图标 - 统一风格
const icons = {
  pm: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="#38bdf8" stroke-width="2"/><circle cx="24" cy="20" r="8" stroke="#38bdf8" stroke-width="2"/><path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#38bdf8" stroke-width="2"/></svg>`,
  solution: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="#818cf8" stroke-width="2"/><path d="M24 12v12l8 8" stroke="#818cf8" stroke-width="2" stroke-linecap="round"/></svg>`,
  flow: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="32" height="32" rx="4" stroke="#c084fc" stroke-width="2"/><path d="M16 24h16M28 18l6 6-6 6" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  prd: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8h24v32H12V8z" stroke="#f472b6" stroke-width="2"/><path d="M16 16h16M16 24h12M16 32h8" stroke="#f472b6" stroke-width="2" stroke-linecap="round"/></svg>`,
  rm: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="6" width="32" height="36" rx="3" stroke="#34d399" stroke-width="2"/><path d="M16 16h16M16 24h12M16 32h8" stroke="#34d399" stroke-width="2" stroke-linecap="round"/><circle cx="34" cy="32" r="4" stroke="#34d399" stroke-width="2"/></svg>`,
  da: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="28" width="10" height="14" rx="2" stroke="#a78bfa" stroke-width="2"/><rect x="19" y="18" width="10" height="24" rx="2" stroke="#a78bfa" stroke-width="2"/><rect x="32" y="8" width="10" height="34" rx="2" stroke="#a78bfa" stroke-width="2"/></svg>`,
  ur: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="12" stroke="#fbbf24" stroke-width="2"/><path d="M28 28l10 10" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>`,
  dev: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="36" height="28" rx="3" stroke="#f87171" stroke-width="2"/><path d="M18 28l-6-6 6-6M30 16l6 6-6 6M22 30l4-12" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 主页面
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>梅式指挥中心</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: "Microsoft YaHei", "微软雅黑", sans-serif; 
      background: linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #1a0f2e 100%); 
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    .container {
      width: 100%;
      max-width: 1400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 42px;
      font-weight: 700;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
      letter-spacing: 2px;
    }
    .header p {
      font-size: 16px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .header .hint {
      font-size: 14px;
      color: #64748b;
    }
    .main-card {
      width: 100%;
      background: rgba(30, 41, 59, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 24px;
      padding: 48px;
      transition: all 0.4s ease;
    }
    .main-card:hover {
      background: rgba(30, 41, 59, 0.75);
      border-color: rgba(148, 163, 184, 0.25);
      transform: translateY(-6px);
      box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6), 0 0 40px rgba(96, 165, 250, 0.1);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
    }
    .icon-wrapper {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(56, 189, 248, 0.1);
      border-radius: 20px;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .icon-wrapper svg {
      width: 44px;
      height: 44px;
    }
    .card-title-area {
      flex: 1;
    }
    .card-alias {
      font-size: 14px;
      color: #64748b;
      font-family: monospace;
      margin-bottom: 6px;
    }
    .card-name {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    .card-role {
      font-size: 16px;
      color: #94a3b8;
    }
    .card-desc {
      font-size: 16px;
      color: #cbd5e1;
      line-height: 1.6;
      margin-bottom: 32px;
      padding-left: 104px;
    }
    .sub-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-left: 104px;
    }
    .sub-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 16px;
      padding: 28px;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .sub-card:hover {
      background: rgba(15, 23, 42, 0.7);
      border-color: rgba(148, 163, 184, 0.2);
      transform: translateY(-4px);
    }
    .sub-card .icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      margin-bottom: 16px;
    }
    .sub-card .icon-wrapper svg {
      width: 32px;
      height: 32px;
    }
    .sub-card .alias {
      font-size: 13px;
      color: #64748b;
      font-family: monospace;
      margin-bottom: 8px;
    }
    .sub-card .name {
      font-size: 20px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 10px;
    }
    .sub-card .desc {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.5;
    }
    .team-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    .team-card {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
      padding: 32px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
    }
    .team-card:hover {
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(148, 163, 184, 0.2);
      transform: translateY(-6px);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }
    .team-card .icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      margin-bottom: 20px;
    }
    .team-card .icon-wrapper svg {
      width: 36px;
      height: 36px;
    }
    .team-card .alias {
      font-size: 13px;
      color: #64748b;
      font-family: monospace;
      margin-bottom: 8px;
    }
    .team-card .name {
      font-size: 22px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 8px;
    }
    .team-card .role {
      font-size: 14px;
      color: #818cf8;
      margin-bottom: 12px;
    }
    .team-card .desc {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.6;
    }
    .footer {
      margin-top: 40px;
      font-size: 14px;
      color: #475569;
    }
    .toast {
      position: fixed;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(30, 41, 59, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(52, 211, 153, 0.3);
      border-radius: 50px;
      padding: 16px 28px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .toast.show {
      opacity: 1;
    }
    .toast-icon {
      width: 24px;
      height: 24px;
      background: rgba(52, 211, 153, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #34d399;
      font-size: 14px;
    }
    .toast-text {
      font-size: 15px;
      color: #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏢 梅式指挥中心</h1>
      <p>8只专业龙虾，一套完整的产品研发体系</p>
      <p class="hint">点击卡片复制召唤指令</p>
    </div>

    <!-- 产品小梅大卡片 -->
    <div class="main-card" onclick="copyText('@产品梅')">
      <div class="card-header">
        <div class="icon-wrapper">${icons.pm}</div>
        <div class="card-title-area">
          <div class="card-alias">@产品梅</div>
          <div class="card-name">产品小梅</div>
          <div class="card-role">产品经理</div>
        </div>
      </div>
      <div class="card-desc">需求分析、统筹产品方案，带领助手团完成从需求到PRD的完整流程</div>
      <div class="sub-cards">
        <div class="sub-card" onclick="event.stopPropagation(); copyText('@方案小小梅')">
          <div class="icon-wrapper" style="background: rgba(129, 140, 248, 0.1); border-color: rgba(129, 140, 248, 0.2);">${icons.solution}</div>
          <div class="alias">@方案小小梅</div>
          <div class="name">方案小小梅</div>
          <div class="desc">根据需求输出2-3个解决方案</div>
        </div>
        <div class="sub-card" onclick="event.stopPropagation(); copyText('@流程小小梅')">
          <div class="icon-wrapper" style="background: rgba(192, 132, 252, 0.1); border-color: rgba(192, 132, 252, 0.2);">${icons.flow}</div>
          <div class="alias">@流程小小梅</div>
          <div class="name">流程小小梅</div>
          <div class="desc">绘制用户流程图、系统流程图</div>
        </div>
        <div class="sub-card" onclick="event.stopPropagation(); copyText('@PRD小小梅')">
          <div class="icon-wrapper" style="background: rgba(244, 114, 182, 0.1); border-color: rgba(244, 114, 182, 0.2);">${icons.prd}</div>
          <div class="alias">@PRD小小梅</div>
          <div class="name">PRD小小梅</div>
          <div class="desc">输出开发可识别的PRD文档</div>
        </div>
      </div>
    </div>

    <!-- 团队卡片 -->
    <div class="team-grid">
      <div class="team-card" onclick="copyText('@管理梅')">
        <div class="icon-wrapper" style="background: rgba(52, 211, 153, 0.1); border-color: rgba(52, 211, 153, 0.2);">${icons.rm}</div>
        <div class="alias">@管理梅</div>
        <div class="name">管理小梅</div>
        <div class="role">需求管理员</div>
        <div class="desc">汇总需求清单、区分优先级、定期推送高优需求</div>
      </div>
      <div class="team-card" onclick="copyText('@分析梅')">
        <div class="icon-wrapper" style="background: rgba(167, 139, 250, 0.1); border-color: rgba(167, 139, 250, 0.2);">${icons.da}</div>
        <div class="alias">@分析梅</div>
        <div class="name">分析小梅</div>
        <div class="role">数据分析师</div>
        <div class="desc">分析用户行为数据、业务结果数据，指导需求决策</div>
      </div>
      <div class="team-card" onclick="copyText('@调研梅')">
        <div class="icon-wrapper" style="background: rgba(251, 191, 36, 0.1); border-color: rgba(251, 191, 36, 0.2);">${icons.ur}</div>
        <div class="alias">@调研梅</div>
        <div class="name">调研小梅</div>
        <div class="role">市场调研员</div>
        <div class="desc">进行用户调研、竞品分析、市场研究</div>
      </div>
      <div class="team-card" onclick="copyText('@开发梅')">
        <div class="icon-wrapper" style="background: rgba(248, 113, 113, 0.1); border-color: rgba(248, 113, 113, 0.2);">${icons.dev}</div>
        <div class="alias">@开发梅</div>
        <div class="name">开发小梅</div>
        <div class="role">开发工程师</div>
        <div class="desc">将产品方案落地为可运行的系统</div>
      </div>
    </div>

    <div class="footer">
      梅式指挥中心 · 让产品研发更高效
    </div>
  </div>

  <div class="toast" id="toast">
    <div class="toast-icon">✓</div>
    <div class="toast-text" id="toast-text">已复制</div>
  </div>

  <script>
    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('已复制 ' + text + '，快去使用吧！');
      }).catch(() => {
        showToast('复制失败，请手动复制: ' + text);
      });
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      toastText.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  </script>
</body>
</html>`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🦞 梅式指挥中心已启动: http://0.0.0.0:' + PORT);
});
