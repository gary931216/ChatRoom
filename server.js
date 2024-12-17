const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const { json } = require('stream/consumers');

const serverOptions = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

const users = new Map();
const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5500', // 只允許來自這個來源的請求
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.get('/checkUser', (req, res) => {
  const username = req.query.username;
  if (user == null && user == "" && users.has(username)) {
    return res.status(200).json({ exists: true });
  }
  users.set(username)
  res.status(200).json({ exists: false });
});

const httpsServer = https.createServer(serverOptions, app);
const wss = new WebSocket.Server({ server: httpsServer });

wss.on('connection', (ws) => {
  console.log('有用戶連接到聊天室');

  ws.on('message', (message) => {
    message = message.toString()
    console.log(message)
    try {
      const jsonMessage = JSON.parse(message);  // 將收到的 JSON 字串解析為物件
      if(jsonMessage.type == "add user") {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            ob = {
              type: "add user",
              message: `歡迎 ${jsonMessage.user} 加入聊天室`,
            }
            client.send(JSON.stringify(ob));
          }
        });
      }else {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            ob = {
              type: "send",
              user: jsonMessage.user,
              message: jsonMessage.message,
            }
            client.send(JSON.stringify(ob));
          }
        });
      }
      console.log('收到訊息:', jsonMessage);
    }catch{
      console.error('無法解析訊息:', error);
    }
  });

  ws.on('close', () => {
    console.log('用戶斷開連接');
  });
});

httpsServer.listen(8000, () => {
  console.log('安全的 WebSocket 聊天室伺服器啟動於 https://localhost:8000');
});
