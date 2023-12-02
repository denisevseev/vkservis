const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');

// Функция для ожидания
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для отправки сообщения в Telegram
async function sendToTelegram(bot, chatId, message) {
  await bot.sendMessage(chatId, message);
}

// Функция для загрузки страницы и отправки ссылки в Telegram
async function loadPageAndSendLink(url, bot, chatId, sentLinks) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await sleep(10000); // Ожидание 10 секунд

    const href = await page.$eval('div.iva-item-titleStep-pdebR a[data-marker="item-title"]', el => el.href);

    // Сравнение с предыдущими значениями и отправка в Telegram, если значение отличается
    if (!sentLinks.includes(href)) {
      sentLinks.push(href); // Добавляем новую ссылку в массив
      await sendToTelegram(bot, chatId, href);
      console.log(`Отправлено в Telegram: ${href}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    // Закрываем Puppeteer после использования
    await browser.close();
  }
}

// Функция для проверки времени
function isWithinAllowedTimeRange() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 23; // Возвращаем true, если текущее время в интервале с 8 до 22 часов
}

// Основная функция
async function main() {
  const url = 'https://www.avito.ru/moskva/komnaty/sdam/na_dlitelnyy_srok-ASgBAgICAkSQA74QqAn2YA?f=ASgBAQECA0SQA74QqAn2YPbiDqzx2wIDQIAIFPJSwr4NFMDKNfjiDhSw8dsCA0X8BxV7ImZyb20iOjE0LCJ0byI6bnVsbH2GLhR7ImZyb20iOjUsInRvIjpudWxsfcaaDBl7ImZyb20iOjE2MDAwLCJ0byI6MjYwMDB9&s=104';
  const botToken = '5885184228:AAHWdBoxm-jIn-1xwyGWudn4IDqm3pACRrI';
  const chatId = '5761109418';

  // Инициализация Telegram бота
  const bot = new TelegramBot(botToken);

  const sentLinks = []; // Массив для хранения отправленных ссылок

  // Первоначальная загрузка страницы и отправка ссылки в Telegram
  await loadPageAndSendLink(url, bot, chatId, sentLinks);

  // Запуск цикла с интервалом 10 секунд
  setInterval(async () => {
    if (isWithinAllowedTimeRange()) {
      await loadPageAndSendLink(url, bot, chatId, sentLinks);
    }
  }, 10000); // Интервал 10 секунд
}

// Запуск основной функции
main();

