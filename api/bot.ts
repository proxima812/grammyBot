import { Bot, webhookCallback } from "grammy"

const token = process.env.TOKEN
if (!token) throw new Error("BOT_TOKEN is unset")

const bot = new Bot(token)

// Handle the /start command.
bot.command("start", ctx => ctx.reply("Welcome! Up and running."))
// Handle other messages.
bot.on("message", ctx => ctx.reply("Got another message!"))

export default webhookCallback(bot, "https")
