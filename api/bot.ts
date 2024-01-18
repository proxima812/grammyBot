import { Bot, InlineKeyboard, webhookCallback } from "grammy"

const token = process.env.TOKEN
if (!token) throw new Error("TOKEN is unset")

const bot = new Bot(token)

bot.command("start", ctx => {
	const keyboard = new InlineKeyboard()
		.text("Интернет", "internet")
		.text("Алкоголь", "alcohol")

	ctx.reply("Выберите опцию:", {
		reply_markup: keyboard,
	})
})

bot.callbackQuery("internet", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply("*Hi\\!* _Welcome_ to [grammY](https://grammy.dev)\\.", {
		parse_mode: "MarkdownV2",
	})
})

bot.callbackQuery("alcohol", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply("[текст ссылки](https://t.me/)", { parse_mode: "MarkdownV2" })
})

export default webhookCallback(bot, "https")
