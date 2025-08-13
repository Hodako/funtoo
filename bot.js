require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

const products = [
  { id: 1, name: 'Laptop', price: 1200, delivery: '3-5 days', description: 'Powerful laptop for all your needs.' },
  { id: 2, name: 'Mouse', price: 25, delivery: '1-2 days', description: 'Ergonomic wireless mouse.' },
  { id: 3, name: 'Keyboard', price: 75, delivery: '2-3 days', description: 'Mechanical keyboard with RGB lighting.' },
  { id: 4, name: 'Monitor', price: 300, delivery: '3-5 days', description: '27-inch 4K monitor.' },
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Welcome to our e-commerce bot! How can I help you today?`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'View Products', web_app: { url: 'https://funtoo.onrender.com' } }],
        [{ text: 'Talk to AI Assistant', callback_data: 'ai_assistant' }]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;
  if (data === 'ai_assistant') {
    bot.sendMessage(chatId, 'Hello! I am your AI assistant. Ask me anything about our products or services.');
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text.startsWith('/')) {
    return;
  }
  try {
    const prompt = `User query: ${text}
npm
Based on the following products, answer the user's query. If the query is not related to products, provide a general helpful response.

Products: ${JSON.stringify(products)}

AI Assistant:`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    bot.sendMessage(chatId, aiResponse);
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    bot.sendMessage(chatId, 'Sorry, I am having trouble connecting to the AI assistant right now. Please try again later.');
  }
});

app.get('/', (req, res) => {
  res.send('Bot is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Bot is running...');
});
