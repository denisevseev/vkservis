const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(stealthPlugin());
const TelegramBot = require('node-telegram-bot-api');

// Функция для ожидания
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для отправки сообщения в Telegram
async function sendToTelegram(bot, chatId, message) {
  try {
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("Ошибка отправки сообщения в Telegram:", error);
  }
}

// Функция для загрузки страницы и отправки ссылки в Telegram
async function loadPageAndSendLink(page, url, bot, chatId, sentLinks) {
  page.setDefaultNavigationTimeout(120000); // Увеличиваем таймаут до 120 секунд

  try {
    // Пытаемся загрузить страницу несколько раз
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 120000 });
        await page.waitForSelector('a[itemprop="url"]', { timeout: 60000 });
        break; // Если загрузка успешна, выходим из цикла
      } catch (error) {
        console.error(`Попытка ${attempt + 1}: Не удалось загрузить страницу:`, error);
        if (attempt === 2) throw error; // Если последняя попытка, выбрасываем ошибку
        await sleep(10000); // Ожидание перед повторной попыткой
      }
    }

    // Получение всех ссылок на объявления
    const hrefs = await page.$$eval('a[itemprop="url"]', links => links.map(link => link.href));
    if (hrefs.length > 0 && !sentLinks.includes(hrefs[0])) {
      sentLinks.push(hrefs[0]); // Добавляем новую ссылку в массив
      await sendToTelegram(bot, chatId, hrefs[0]);
      console.log(`Отправлено в Telegram: ${hrefs[0]}`);
    }
  } catch (error) {
    console.error("Ошибка загрузки страницы:", error);
    // await sendToTelegram(bot, chatId, "Произошла ошибка при загрузке страницы.");
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
  // const url = 'https://www.avito.ru/moskva/komnaty/sdam/na_dlitelnyy_srok-ASgBAgICAkSQA74QqAn2YA?f=ASgBAQECA0SQA74QqAn2YPbiDqzx2wIDQIAIFPJSwr4NFMDKNfjiDhSw8dsCA0X8BxV7ImZyb20iOjE0LCJ0byI6bnVsbH2GLhR7ImZyb20iOjUsInRvIjpudWxsfcaaDBl7ImZyb20iOjE2MDAwLCJ0byI6MjYwMDB9&s=104';
  const url = 'https://www.avito.ru/moskva/komnaty/sdam/na_dlitelnyy_srok-ASgBAgICAkSQA74QqAn2YA?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyt1JKTixJzMlPV7KuBQQAAP__dhSE3CMAAAA&f=ASgBAgECAkSQA74QqAn2YAFFxpoMFXsiZnJvbSI6MCwidG8iOjI2MDAwfQ&s=104&user=1';
  const botToken = '5885184228:AAHWdBoxm-jIn-1xwyGWudn4IDqm3pACRrI';
  const chatId = '5761109418';

  // Инициализация Telegram бота
  const bot = new TelegramBot(botToken);

  const sentLinks = []; // Массив для хранения отправленных ссылок

  // Запуск браузера
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Первоначальная загрузка страницы и отправка ссылки в Telegram
  await loadPageAndSendLink(page, url, bot, chatId, sentLinks);

  // Запуск цикла с интервалом 10 секунд
  const intervalId = setInterval(async () => {
    if (isWithinAllowedTimeRange()) {
      await loadPageAndSendLink(page, url, bot, chatId, sentLinks);
    }
  }, 10000); // Интервал 10 секунд

  process.on('SIGINT', async () => {
    clearInterval(intervalId);
    await browser.close();
    console.log('Браузер закрыт.');
    process.exit();
  });
}

main();
