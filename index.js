const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is Running! Syed Bhai Zindabad');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
  console.log('QR RECEIVED');
});

client.on('ready', () => {
  console.log('Client is ready! Syed Bhai ka bot chal gaya!');
});

client.on('message', async msg => {
  if(msg.body.toLowerCase() === 'salam' || msg.body.toLowerCase() === 'hi') {
    msg.reply('Walaikum Salam Syed Bhai! Bot Hazir Hai ❤️');
  }
  if(msg.body.toLowerCase() === 'bot') {
    msg.reply('G Syed Bhai Hukam Karain!');
  }
});

client.initialize();
