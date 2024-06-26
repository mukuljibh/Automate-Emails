const { Queue } = require('bullmq')

emailSendQueue = new Queue('email-queue', {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
})
function cleanStr(str) {
    let validEmailRegx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    let emailMatch = str.match(validEmailRegx);
    return emailMatch[0];
}

async function startService(targetAddress, emailBody) {

    const result = await emailSendQueue.add("email now being sending to the recipient", {
        email: cleanStr(...targetAddress),
        body: emailBody
    });
    console.log("job has been done successful added to the waiting Queue..", result.id)

}

module.exports = {
    startService
};
