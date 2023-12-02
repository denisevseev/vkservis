const easyvk = require('easyvk');

async function start() {
    let vk = await easyvk({
        username: '79153403785',
        password: 'sdfsd#sdDF4',
        utils: {
            bots: true
        }
    });

    let me = await vk.call('users.get', {});
    console.log(me); // Вывод информации о текущем пользователе

    let { vkr } = await vk.call('messages.send', {
        user_id: me[0].id,
        message: 'Привет, это тестовое сообщение!2',
        random_id: Math.random()
    });

    console.log(vkr); // Вывод результата отправки сообщения
}

start().catch(console.error);
