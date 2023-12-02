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

        // Получаем href используя page.evaluate
        const hrefValue = await page.evaluate(() => {
            const elements = document.getElementsByClassName('_93444fe79c--link--eoxce');
            if (elements.length > 0) {
                return elements[0].href;
            }
            return null;
        });

        // Если элемент с заданным классом не найден
        if (!hrefValue) {
            console.error('Element not found with the given class.');
            return;
        }

        // Сравниваем с предыдущими значениями и отправляем в Telegram, если значение отличается или если массив пуст
        if (!sentLinks.length || !sentLinks.includes(hrefValue)) {
            sentLinks.push(hrefValue); // Добавляем новую ссылку в массив
            await sendToTelegram(bot, chatId, hrefValue);
            console.log(`Отправлено в Telegram: ${hrefValue}`);
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
  const url = 'https://www.cian.ru/cat.php?currency=2&deal_type=rent&engine_version=2&is_by_homeowner=1&maxprice=27000&min_room_area=14&minprice=16000&offer_type=flat&region=1&room0=1&rooms_count%5B0%5D=2&type=4';
  const botToken = '5885184228:AAHWdBoxm-jIn-1xwyGWudn4IDqm3pACRrI'; // ВАЖНО: Никогда не делайте свои ключи доступными в открытом виде
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

