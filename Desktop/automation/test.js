const { OpenAI } = require('openai');



const openai = new OpenAI(config);


async function run() {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": "essay on water" }],
    })
    console.log(res)
}
run()