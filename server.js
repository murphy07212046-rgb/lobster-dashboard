const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;
const AUTH_USER = process.env.AUTH_USER || 'admin';
const AUTH_PASS = process.env.AUTH_PASS || 'lobster2024';

// 基础HTTP鉴权中间件
const basicAuth = (req, res, next) => {
  // 健康检查不鉴权
  if (req.path === '/health') {
    return next();
  }
  
  const auth = req.headers.authorization;
  
  if (!auth) {
    res.set('WWW-Authenticate', 'Basic realm="梅式指挥中心"');
    return res.status(401).send('需要登录');
  }
  
  const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  const user = credentials[0];
  const pass = credentials[1];
  
  if (user === AUTH_USER && pass === AUTH_PASS) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="梅式指挥中心"');
    res.status(401).send('用户名或密码错误');
  }
};

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 应用鉴权
app.use(basicAuth);

// 静态文件
app.use(express.static(path.join(__dirname, 'build')));

// 所有路由返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🦞 梅式指挥中心已启动: http://0.0.0.0:${PORT}`);
  console.log(`登录账号: ${AUTH_USER}`);
});
