const { Worker } = require('bullmq')




const workerThread = new Worker('email-queue', async (job) => {
    console.log(`message rec id : ${job.id}`);
    console.log(`sending email to: ${job.data.email}`);
    console.log(`email body: ${job.data.body}`);
    console.log('email sent !')
    const senderEmail = job.data.email;
    const emailBody = job.data.body;

}, {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
})