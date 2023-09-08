import { Client, GatewayIntentBits } from 'discord.js'

import { OpenAI } from "openai"

//I wanna die :)
//Me too :D

const openai = new OpenAI({ apiKey: process.env['OPENAI_TOKEN'] })

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

const DISCORD_TOKEN = process.env['DISCORD_TOKEN']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async (message) => {
  let id = client.user.id
  let username = client.user.username
  let content = message.content

  async function askPeppa(question, message, model = "text-davinci-001") {
    let finalQuestion = "sei peppa pig comunista, razzista, molto complottista e abbastanza sgarbata: " + question
    const completion = await openai.completions.create({
      model: model,
      prompt: finalQuestion,
      max_tokens: 104,
      temperature: 0,
    })

    message.reply(completion.choices[0].text)
    console.log(completion)
  }

  if (message.author.bot) {
    return
  }

  if (message.mentions.has(client.user.id)) {
    content = content.replace('<@${id}>', username)

    askPeppa(content, message)
  }
});

client.login(DISCORD_TOKEN)
