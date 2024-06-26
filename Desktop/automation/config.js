const dotenv = require("dotenv");

dotenv.config({ path: "credential.env" });
const e = "mukulbhardwaj966@gmail.com"

module.exports.GMAIL_CONFIG = {
    imap: {
        user: process.env.gmailUsername,
        password: process.env.gmailPassword,
        host: 'imap.gmail.com',
        port: 993,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },

    },
};
module.exports.OUTLOOK_CONFIG = {
    imap: {
        user: process.env.outlookUsername,
        password: process.env.outlookPassword,
        host: 'outlook.office365.com',
        port: 993,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
    },
};