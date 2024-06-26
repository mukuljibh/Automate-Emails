const { OpenAI } = require('openai');

const config = {
    apiKey: 'sk-proj-jlTruisbtq5Pj0aP6KqoT3BlbkFJYs3MIJeeOCxm7kMIHDto'
}

const openai = new OpenAI(config);


async function run() {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": "essay on water" }],
    })
    console.log(res)
}
run()