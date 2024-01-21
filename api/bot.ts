import { Bot, InlineKeyboard, webhookCallback } from "grammy"

const token = process.env.TOKEN
if (!token) throw new Error("TOKEN is unset")

const bot = new Bot(token)

bot.command("start", ctx => {
	const keyboard = new InlineKeyboard()
		.text("Интернет", "internet")
		.text("Алкоголь", "alcohol")

	ctx.reply("Более 60 анонимных 12-ти шаговых сообществ.", {
		reply_markup: keyboard,
		parse_mode: "Markdown",
	})
})

// \n

bot.callbackQuery("internet", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
    Анонимные Далбаебы
    Краткая информация:
    (привет)
    Контакты:
    [https://t.me/](https://t.me/)
    `,
		{
			parse_mode: "Markdown",
		},
	)
})

bot.callbackQuery("alcohol", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply("[текст ссылки](https://t.me/)", { parse_mode: "MarkdownV2" })
})

export default webhookCallback(bot, "https")
