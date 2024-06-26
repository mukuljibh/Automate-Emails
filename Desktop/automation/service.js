const imaps = require('imap-simple');
const { convert } = require('html-to-text');
const moment = require('moment');
const emailQueue = require('./producer')
const checkForNewEmails = async (connection) => {

    try {
        const box = await connection.openBox('INBOX', false);
        console.log("inbox has been opened")
        const searchCriteria = ['UNSEEN', ['SINCE', moment().startOf('day').toDate()]];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            struct: true,
        };
        console.log('CHECKING FOR NEW EMAILS', new Date().toString());
        const results = await connection.search(searchCriteria, fetchOptions);
        connection.on('mail', () => {
            connection.search(searchCriteria, fetchOptions, async (err, results) => {
                if (results.length > 0) {
                    results.forEach(async (res) => {
                        const text = res.parts.filter((part) => {
                            return part.which === 'TEXT';
                        });
                        const targetAddress = res.parts[1].body.from
                        let emailHTML = text[0].body;
                        let emailText = convert(emailHTML);
                        let uid = res.attributes.uid;
                        connection.addFlags(uid, ['\\Seen'], (err) => {
                            if (err) {
                                console.log("error while marking mail to seen having id : ", uid)
                            }
                            else {
                                console.log("Marked as Seen !")
                            }
                        })
                        //push it in the queue
                        emailQueue.startService(targetAddress, emailText);
                    });
                }
                else {
                    console.log("NO NEW EMAILS!")
                }
            });
        })

    } catch (error) {
        console.log(error)
    }
};
const startEmailListener = async (config, configType) => {
    try {
        const connection = await imaps.connect(config);
        let account = '';
        configType == 'Gmail' ? account = "Gmail" : account = "Outlook"


        console.log(`CONNECTION SUCCESSFUL to ${account} ACCOUNT`, new Date().toString());
        const checkInterval = 500000; // 5 minutes

        // Initial check
        await checkForNewEmails(connection);
        // Set interval to check for new emails every 5 minutes
        setInterval(() => {
            console.log("Snooping again in the inbox....")
        }, checkInterval)

    } catch (error) {
        console.log('ERROR OCCURRED', error);
    }
}

module.exports = {
    startEmailListener,
};




