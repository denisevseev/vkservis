const easyvk = require('easyvk');
const fs = require('fs');
const axios = require('axios');
const Rucaptcha = require('rucaptcha-client');

// const client = new Rucaptcha.Client('7d6172ce4b21ca313b6b4f9a843b0c21');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkAndCleanAccounts(proxyConfig) {
    const filePath = 'acc.txt';
    let accounts = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    let validAccounts = [];

    for (const account of accounts) {
        const [login, password] = account.split(':');

        try {
            await autorizeAndGetToken(login, password, proxyConfig);
            validAccounts.push(account);
        } catch (error) {
            console.log(`Аккаунт ${login} заблокирован или не может быть проверен.`);
        }
    }
    fs.writeFileSync(filePath, validAccounts.join('\n'));
    console.log('Список аккаунтов обновлен.');
}

async function changeProxyIP() {
    try {
        const res = await axios.get('https://proxy.onedash.net/f1f8803370f027f6c51bb8f253757253/0b96b29b');
        console.log(`IP прокси был изменен: ${JSON.stringify(res.data)}`);
    } catch (error) {
        console.error('Ошибка при смене IP прокси:', error);
    }
}


async function solveCaptcha(captchaImg) {
    const apiKey = '7d6172ce4b21ca313b6b4f9a843b0c21';

    try {
        const response = await axios.post('http://rucaptcha.com/in.php', {
            key: apiKey,
            method: 'base64',
            body: captchaImg.toString('base64'),
        });

        if (response.data.status === 1) {
            // Капча успешно отправлена, ожидаем ее решения
            const captchaId = response.data.request;

            // Дождитесь решения капчи (вам нужно будет добавить логику ожидания)
            await new Promise(resolve => setTimeout(resolve, 15000)); // Пауза 15 секунд (может потребоваться больше времени)

            // Теперь проверьте результат
            const resultResponse = await axios.get(`http://rucaptcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}`);

            if (resultResponse.data.status === 1) {
                return resultResponse.data.request;
            } else {
                console.error('Ошибка при получении решения капчи:', resultResponse.data.request);
                return null;
            }
        } else {
            console.error('Ошибка при отправке капчи:', response.data.request);
            return null;
        }
    } catch (error) {
        console.error('Ошибка при решении капчи:', error);
        return null;
    }
}


async function autorizeAndGetToken(login, password, proxyConfig) {
    let vk = await easyvk({
        username: login,
        password: password,
        reauth: true,
        config: {
            proxyUrl: `http://${proxyConfig.auth.username}:${proxyConfig.auth.password}@${proxyConfig.host}:${proxyConfig.port}`
        }
    });

    return vk.session.access_token;
}

async function fetchVkUsers(token, offset, proxyConfig) {
    const vk = await easyvk({
        token: token,
        config: {
            proxyUrl: `http://${proxyConfig.auth.username}:${proxyConfig.auth.password}@${proxyConfig.host}:${proxyConfig.port}`
        }
    });

    const response = await vk.call('users.search', {
        city: 1, // ID города Сочи
        sex: 1, // Женский пол
        age_from: 18,
        age_to: 18,
        count: 20, // Порция из 20 пользователей
        fields: 'id', // Получение ID пользователей
        offset: offset // Смещение для поиска следующих пользователей
    });

    let existingIds = new Set();
    if (fs.existsSync('user_list.txt')) {
        const data = fs.readFileSync('user_list.txt', 'utf8');
        existingIds = new Set(data.split('\n'));
    }

    const newUsers = response.items.filter(user => !existingIds.has(user.id.toString()));

    if (newUsers.length > 0) {
        return newUsers;
    }

    offset += 20; // Перемещаемся к следующей порции пользователей
    return [];
}

async function sendMessageAndSave(vk, users) {
    let sentCount = 0;
    for (const user of users) {
        if (sentCount >= 19) break;

        try {
            await vk.call('messages.send', {
                user_id: user.id,
                message: 'Привет, меня знакомый попросил найти ему девушку .. он ищет спутницу для постоянных встреч, готов платить 20к за встречу. он хорошо зарабатывает но занятой напиши ему в тг magiclife67',
                random_id: easyvk.randomId()
            });

            fs.appendFileSync('user_list.txt', `${user.id}\n`);
            sentCount++;

            await delay(4000); // Задержка 4 секунды только после успешной отправки сообщения
        } catch (error) {
            if (error.error_code === 902) {
                await delay(1000)
            }
            if (error.error_code != 902 && error.error_code != 9) {
                function isJSON(obj) {
                    try {
                        JSON.parse(JSON.stringify(obj));
                        return true;
                    } catch (e) {
                        return false;
                    }
                }

                let errorData = isJSON(error.message)
                if (errorData) {
                    const captchaKey = await solveCaptcha(error.captcha_img);
                    if (captchaKey) {
                        // Повторите запрос с ключом капчи
                        await vk.call('messages.send', {
                            user_id: user.id,
                            message: 'Привет, меня знакомый попросил найти ему девушку .. он ищет спутницу для постоянных встреч, готов платить 20к за встречу. он хорошо зарабатывает но занятой напиши ему https://vk.com/id561062604',
                            random_id: easyvk.randomId(),
                            captcha_sid: error.captcha_sid,
                            captcha_key: captchaKey
                        });

                        fs.appendFileSync('user_list.txt', `${user.id}\n`);
                        sentCount++;
                    }
                }

            } else {
                await delay(1000);
                console.error(`Ошибка при отправке сообщения пользователю с ID ${user.id}:`, error);
            }
        }
    }
}

async function main() {
    const proxyConfig = {
        host: '95.165.14.53',
        port: 47458,
        auth: {
            username: 'c80773',
            password: '2cfc28'
        }
    };
    await changeProxyIP();
    await checkAndCleanAccounts(proxyConfig);

    const accounts = fs.readFileSync('acc.txt', 'utf8').trim().split('\n');

    for (const account of accounts) {
        await changeProxyIP();

        const [login, password] = account.split(':');

        try {
            const token = await autorizeAndGetToken(login, password, proxyConfig);
            if (!token) {
                console.log(`Аккаунт ${login} заблокирован или токен не получен`);
                continue;
            }

            const vk = await easyvk({
                token: token,
                config: {
                    proxyUrl: proxyConfig
                }
            });

            let offset = 0;
            let users;

            do {
                users = await fetchVkUsers(token, offset, proxyConfig);
                if (users.length === 0) break;
                await sendMessageAndSave(vk, users);
                await delay(1000)
                offset += 20;
            } while (users.length > 0);
        } catch (error) {
            console.error(`Ошибка при работе с аккаунтом ${login}:`, error);
            await delay(1000);
            continue;
        }
    }
}

main();
