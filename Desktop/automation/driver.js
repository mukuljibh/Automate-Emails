const { startEmailListener } = require('./service.js')
const { GMAIL_CONFIG, OUTLOOK_CONFIG } = require('./config');

const bootstrap = async () => {

    setTimeout(async () => {
        console.log('Fetching the newly send mail', new Date().toString());
        await startEmailListener(GMAIL_CONFIG, 'Gmail');
        await startEmailListener(OUTLOOK_CONFIG, 'Outlook');
    });
};

bootstrap();