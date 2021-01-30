const Discord = require('discord.js')
const { response, json } = require('express')
const config = require('./config.json')
const fetch = require('node-fetch')
const client = new Discord.Client()


const prefix = '!'

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(prefix)) return

    const commandBody = msg.content.slice(prefix.length)
    const args = commandBody.slice(' ')
    const command = args.toLowerCase()
    const urlApi = `https://api.coingecko.com/api/v3/simple/price?ids=${command}&vs_currencies=usd&include_24hr_change=true`
    
    fetch(urlApi)
        .then(response => response.json())
        .then(json => {
            let cripto = Object.keys(json)
            //let criptoValues = Object.values(json)
            msg.reply(`El precio de ${cripto[0]} es ${json[cripto[0]].usd}, la variacion fue de las ultimas 24hs ${json[cripto[0]].usd_24h_change.toFixed(2)}%`)            
        })
})

client.login(config.BOT_TOKEN)