const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000;

// SVG图标
const icons = {
  pm: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#38bdf8" stroke-width="2"/><circle cx="24" cy="20" r="8" stroke="#38bdf8" stroke-width="2"/><path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#38bdf8" stroke-width="2"/></svg>`,
  solution: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#818cf8" stroke-width="2"/><path d="M24 12v12l8 8" stroke="#818cf8" stroke-width="2" stroke-linecap="round"/></svg>`,
  flow: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="4" stroke="#c084fc" stroke-width="2"/><path d="M16 24h16M28 18l6 6-6 6" stroke="#c084fc" stroke-width="2" stroke-linecap="round"/></svg>`,
  prd: `<svg viewBox="0 0 48 48" fill="none"><path d="M12 8h24v32H12V8z" stroke="#f472b6" stroke-width="2"/><path d="M16 16h16M16 24h12M16 32h8" stroke="#f472b6" stroke-width="2" stroke-linecap="round"/></svg>`,
  rm: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="6" width="32" height="36" rx="3" stroke="#34d399" stroke-width="2"/><path d="M16 16h16M16 24h12M16 32h8" stroke="#34d399" stroke-width="2" stroke-linecap="round"/></svg>`,
  da: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="28" width="10" height="14" rx="2" stroke="#a78bfa" stroke-width="2"/><rect x="19" y="18" width="10" height="24" rx="2" stroke="#a78bfa" stroke-width="2"/><rect x="32" y="8" width="10" height="34" rx="2" stroke="#a78bfa" stroke-width="2"/></svg>`,
  ur: `<svg viewBox="0 0 48 48" fill="none"><circle cx="20" cy="20" r="12" stroke="#fbbf24" stroke-width="2"/><path d="M28 28l10 10" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>`,
  dev: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="3" stroke="#f87171" stroke-width="2"/><path d="M18 28l-6-6 6-6M30 16l6 6-6 6" stroke="#f87171" stroke-width="2" stroke-linecap="round"/></svg>`
};

app.get('/health', (req, res) => res.status(200).send('OK'));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>梅式指挥中心</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { 
      font-family: "Microsoft YaHei", "微软雅黑", sans-serif; 
      background: linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #1a0f2e 100%); 
      height: 100vh;
      overflow: hidden;
    }
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 24px;
    }
    .container {
      width: 100%;
      max-width: 1100px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 10px;
      gap: 6px;
    }
    .header {
      text-align: center;
      flex-shrink: 0;
      margin-bottom: 4px;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 700;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2px;
      letter-spacing: 2px;
    }
    .header p {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 1px;
    }
    .header .hint {
      font-size: 10px;
      color: #64748b;
    }

    /* 产品小梅大卡片 */
    .main-card {
      width: 100%;
      background: rgba(30, 41, 59, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 16px;
      padding: 12px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
    .main-card:hover {
      background: rgba(30, 41, 59, 0.75);
      border-color: rgba(148, 163, 184, 0.25);
      transform: translateY(-3px);
      box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5);
    }
    .main-card .icon-wrapper {
      width: 48px;
      height: 48px;
      margin: 0 auto 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(56, 189, 248, 0.1);
      border-radius: 12px;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .main-card .icon-wrapper svg {
      width: 28px;
      height: 28px;
    }
    .main-card .alias {
      font-size: 11px;
      color: #64748b;
      font-family: monospace;
      margin-bottom: 4px;
    }
    .main-card .name {
      font-size: 22px;
      font-weight: 700;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2px;
    }
    .main-card .role {
      font-size: 13px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .main-card .desc {
      font-size: 13px;
      color: #cbd5e1;
      margin-bottom: 12px;
    }

    /* 子卡片 */
    .sub-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .sub-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 12px;
      padding: 14px 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .sub-card:hover {
      background: rgba(15, 23, 42, 0.7);
      border-color: rgba(148, 163, 184, 0.2);
      transform: translateY(-2px);
    }
    .sub-card .icon-wrapper {
      width: 36px;
      height: 36px;
      margin: 0 auto 6px;
      border-radius: 10px;
    }
    .sub-card .icon-wrapper svg {
      width: 20px;
      height: 20px;
    }
    .sub-card .alias {
      font-size: 10px;
      color: #64748b;
      font-family: monospace;
      margin-bottom: 3px;
    }
    .sub-card .name {
      font-size: 14px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 3px;
    }
    .sub-card .desc {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.3;
    }

    /* 团队卡片 */
    .team-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      flex-shrink: 0;
    }
    .team-card {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 14px;
      padding: 16px 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .team-card:hover {
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(148, 163, 184, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.4);
    }
    .team-card .icon-wrapper {
      width: 40px;
      height: 40px;
      margin: 0 auto 8px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .team-card .icon-wrapper svg {
      width: 24px;
      height: 24px;
    }
    .team-card .alias {
      font-size: 10px;
      color: #64748b;
      font-family: monospace;
      margin-bottom: 3px;
    }
    .team-card .name {
      font-size: 16px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 2px;
    }
    .team-card .role {
      font-size: 11px;
      color: #818cf8;
      margin-bottom: 5px;
    }
    .team-card .desc {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.4;
    }

    .footer {
      font-size: 10px;
      color: #475569;
      text-align: center;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .toast {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(30, 41, 59, 0.95);
      border: 1px solid rgba(52, 211, 153, 0.3);
      border-radius: 50px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .toast.show { opacity: 1; }
    .toast-icon {
      width: 20px;
      height: 20px;
      background: rgba(52, 211, 153, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #34d399;
      font-size: 12px;
    }
    .toast-text { font-size: 13px; color: #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏢 梅式指挥中心</h1>
      <p>8只专业龙虾，一套完整的产品研发体系</p>
      <p class="hint">点击卡片复制召唤指令</p>
    </div>

    <div class="main-card" onclick="copyText('@产品梅')">
      <div class="icon-wrapper">${icons.pm}</div>
      <div class="alias">@产品梅</div>
      <div class="name">产品小梅</div>
      <div class="role">产品经理</div>
      <div class="desc">需求分析、统筹产品方案</div>
      <div class="sub-cards">
        <div class="sub-card" onclick="event.stopPropagation(); copyText('@方案小小梅')">
          <div class="icon-wrapper" style="background: rgba(129, 140, 248, 0.1); border: 1px solid rgba(129, 140, 248, 0.2);">${icons.solution}</div>
          <div class="alias">@方案小小梅</div>
          <div class="name">方案小小梅</div>
          <div class="desc">输出需求解决方案</div>
        </div>
        <div class="sub-card" onclick="event.stopPropagation(); copyText('@流程小小梅')">
          <div class="icon-wrapper" style="background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2);">${icons.flow}</div>
          <div class="alias">@流程小小梅</div>
          <div class="name">流程小小梅</div>
          <div class="desc">绘制用户系统流程图</div>
        </div>
        <div class="sub-card" onclick="event.stopPropagation(); copyText('@PRD小小梅')">
          <div class="icon-wrapper" style="background: rgba(244, 114, 182, 0.1); border: 1px solid rgba(244, 114, 182, 0.2);">${icons.prd}</div>
          <div class="alias">@PRD小小梅</div>
          <div class="name">PRD小小梅</div>
          <div class="desc">输出开发可识别PRD</div>
        </div>
      </div>
    </div>

    <div class="team-grid">
      <div class="team-card" onclick="copyText('@管理梅')">
        <div class="icon-wrapper" style="background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2);">${icons.rm}</div>
        <div class="alias">@管理梅</div>
        <div class="name">管理小梅</div>
        <div class="role">需求管理员</div>
        <div class="desc">汇总需求清单、区分优先级</div>
      </div>
      <div class="team-card" onclick="copyText('@分析梅')">
        <div class="icon-wrapper" style="background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2);">${icons.da}</div>
        <div class="alias">@分析梅</div>
        <div class="name">分析小梅</div>
        <div class="role">数据分析师</div>
        <div class="desc">分析数据、指导需求决策</div>
      </div>
      <div class="team-card" onclick="copyText('@调研梅')">
        <div class="icon-wrapper" style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2);">${icons.ur}</div>
        <div class="alias">@调研梅</div>
        <div class="name">调研小梅</div>
        <div class="role">市场调研员</div>
        <div class="desc">用户调研、竞品分析</div>
      </div>
      <div class="team-card" onclick="copyText('@开发梅')">
        <div class="icon-wrapper" style="background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.2);">${icons.dev}</div>
        <div class="alias">@开发梅</div>
        <div class="name">开发小梅</div>
        <div class="role">开发工程师</div>
        <div class="desc">技术实现、代码落地</div>
      </div>
    </div>

    <div class="footer">梅式指挥中心 · 让产品研发更高效</div>
  </div>

  <div class="toast" id="toast">
    <div class="toast-icon">✓</div>
    <div class="toast-text" id="toast-text"></div>
  </div>

  <script>
    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        document.getElementById('toast-text').textContent = '已复制 ' + text;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    }
  </script>
</body>
</html>`);
});

app.listen(PORT, '0.0.0.0', () => console.log('🦞 Server: http://0.0.0.0:' + PORT));
