require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Store product data (for demonstration) - This data is also in webapp/script.js
const products = [
    { id: 1, name: 'Laptop', price: 1200, delivery: '3-5 days', description: 'Powerful laptop for all your needs. Features a high-resolution display and long battery life.' },
    { id: 2, name: 'Mouse', price: 25, delivery: '1-2 days', description: 'Ergonomic wireless mouse with precise tracking and customizable buttons.' },
    { id: 3, name: 'Keyboard', price: 75, delivery: '2-3 days', description: 'Mechanical keyboard with RGB lighting, satisfying key presses, and durable design.' },
    { id: 4, name: 'Monitor', price: 300, delivery: '3-5 days', description: '27-inch 4K monitor with vibrant colors and wide viewing angles, perfect for work and entertainment.' },
    { id: 5, name: 'Webcam', price: 50, delivery: '1-2 days', description: 'Full HD webcam for clear video calls and streaming.' },
    { id: 6, name: 'Headphones', price: 150, delivery: '2-3 days', description: 'Noise-cancelling over-ear headphones with superb audio quality.' },
    { id: 7, name: 'External SSD', price: 90, delivery: '2-4 days', description: 'Fast and portable external SSD for all your storage needs.' },
    { id: 8, name: 'Gaming Chair', price: 250, delivery: '5-7 days', description: 'Ergonomic gaming chair for long gaming sessions.' },
    { id: 9, name: 'Smartwatch', price: 180, delivery: '3-5 days', description: 'Feature-rich smartwatch with health tracking and notifications.' },
    { id: 10, name: 'USB Hub', price: 20, delivery: '1-2 days', description: '4-port USB 3.0 hub for expanding connectivity.' }
];

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Welcome to our e-commerce bot! Please view our products:`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'View Products', web_app: { url: 'https://funtoo.onrender.com' } }
                ]
            ]
        }
    });
});

console.log('Bot is running...');