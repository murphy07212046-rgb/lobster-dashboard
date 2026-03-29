const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000;

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
  <title>梅式指挥中心 🦞</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          animation: {
            'fade-in': 'fadeIn 0.5s ease-out',
            'slide-up': 'slideUp 0.5s ease-out',
          },
          keyframes: {
            fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
            slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', 'Noto Sans SC', sans-serif; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); min-height: 100vh; }
    .glass-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(148, 163, 184, 0.1); transition: all 0.3s ease; }
    .glass-card:hover { background: rgba(30, 41, 59, 0.85); border-color: rgba(148, 163, 184, 0.2); transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.1); }
    .gradient-text { background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .sub-card { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.08); transition: all 0.3s ease; }
    .sub-card:hover { background: rgba(15, 23, 42, 0.8); border-color: rgba(56, 189, 248, 0.2); }
    .toast { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); z-index: 50; animation: fadeIn 0.3s ease; }
  </style>
</head>
<body class="text-slate-200">
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const { useState, useEffect } = React;

    const lobsters = {
      pm: {
        id: 'pm', name: '产品小梅', alias: '@产品梅', icon: '🦞', role: '产品经理',
        description: '需求分析、统筹产品方案',
        subordinates: [
          { id: 'solution', name: '方案小小梅', alias: '@方案小小梅', icon: '💡', description: '输出需求解决方案' },
          { id: 'flow', name: '流程小小梅', alias: '@流程小小梅', icon: '📊', description: '画用户/系统流程图' },
          { id: 'prd', name: 'PRD小小梅', alias: '@PRD小小梅', icon: '📝', description: '输出开发可识别PRD' }
        ]
      },
      team: [
        { id: 'rm', name: '管理小梅', alias: '@管理梅', icon: '📋', role: '需求管理员', description: '需求清单、优先级、定期推送' },
        { id: 'da', name: '分析小梅', alias: '@分析梅', icon: '📈', role: '数据分析师', description: '数据分析、用户行为、业务指标' },
        { id: 'ur', name: '调研小梅', alias: '@调研梅', icon: '🔍', role: '市场调研员', description: '用户调研、市场分析、竞品研究' },
        { id: 'dev', name: '开发小梅', alias: '@开发梅', icon: '💻', role: '开发工程师', description: '技术实现、代码落地、技术评估' }
      ]
    };

    const copyToClipboard = async (text) => {
      try { await navigator.clipboard.writeText(text); return true; }
      catch (err) { return false; }
    };

    const Toast = ({ message, isVisible, onClose }) => {
      useEffect(() => { if (isVisible) { const t = setTimeout(onClose, 2000); return () => clearTimeout(t); } }, [isVisible, onClose]);
      if (!isVisible) return null;
      return (
        <div className="toast">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
            <span className="text-emerald-400">✓</span>
            <span className="text-sm font-medium text-slate-200">{message}</span>
          </div>
        </div>
      );
    };

    const SubCard = ({ data, onClick }) => (
      <button onClick={() => onClick(data.alias)} className="sub-card rounded-xl p-4 text-left w-full">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{data.icon}</span>
          <span className="text-xs font-mono text-slate-500">{data.alias}</span>
        </div>
        <h4 className="font-semibold text-slate-200 mb-1">{data.name}</h4>
        <p className="text-xs text-slate-400">{data.description}</p>
      </button>
    );

    const App = () => {
      const [toast, setToast] = useState({ message: '', isVisible: false });
      const handleCopy = async (alias) => {
        const ok = await copyToClipboard(alias);
        setToast({ message: ok ? \`已复制 \${alias}\` : '复制失败', isVisible: true });
      };

      return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          <Toast message={toast.message} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
          <header className="max-w-6xl mx-auto mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-2">🏢 梅式指挥中心</h1>
            <p className="text-slate-400">8只专业龙虾，一套完整的产品研发体系</p>
            <p className="text-slate-500 text-sm mt-1">点击卡片复制召唤指令</p>
          </header>
          <main className="max-w-6xl mx-auto space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl">{lobsters.pm.icon}</span>
                <div>
                  <span className="text-xs font-mono text-slate-500">{lobsters.pm.alias}</span>
                  <h3 className="text-2xl font-bold gradient-text">{lobsters.pm.name}</h3>
                  <p className="text-sm text-slate-400">{lobsters.pm.role}</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">{lobsters.pm.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {lobsters.pm.subordinates.map(s => <SubCard key={s.id} data={s} onClick={handleCopy} />)}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lobsters.team.map(m => (
                <button key={m.id} onClick={() => handleCopy(m.alias)} className="glass-card rounded-2xl p-5 text-left">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-4xl">{m.icon}</span>
                    <div>
                      <div className="text-xs font-mono text-slate-500">{m.alias}</div>
                      <h3 className="text-lg font-bold text-slate-200">{m.name}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{m.role}</p>
                  <p className="text-sm text-slate-300">{m.description}</p>
                </button>
              ))}
            </div>
          </main>
          <footer className="max-w-6xl mx-auto mt-12 text-center text-slate-600 text-sm">
            <p>梅式指挥中心 · 让产品研发更高效 🌸</p>
          </footer>
        </div>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🦞 梅式指挥中心已启动: http://0.0.0.0:' + PORT);
});
