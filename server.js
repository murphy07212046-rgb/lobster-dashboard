const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 静态文件
app.use(express.static(path.join(__dirname, 'build')));

// 所有路由返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🦞 梅式指挥中心已启动: http://0.0.0.0:${PORT}`);
});
