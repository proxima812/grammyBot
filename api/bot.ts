import { Bot, InlineKeyboard, webhookCallback } from "grammy"

const token = process.env.TOKEN
if (!token) throw new Error("TOKEN is unset")

const bot = new Bot(token)

bot.command("start", ctx => {
	const keyboard = new InlineKeyboard()
		.text("Вещества", "life")
		.text("Родственикам", "moms")

	ctx.reply("Более 60 анонимных 12-ти шаговых сообществ.", {
		reply_markup: keyboard,
		parse_mode: "Markdown",
	})
})

// \n

bot.callbackQuery("life", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Алкоголики* (10 июня 1935 года)

*Анонимные Наркоманы* (5 октября 1953 года)

*Анонимные Химические Зависимые* (первая группа 1997 год)

*Анонимные Таблеточники* (основана в 1972 году)
**(Люди ищущие выздоровление от зависимости от рецептурных лекарств)**

*Анонимные Кокаинисты* (в 1982 году)
    `,
		{
			parse_mode: "Markdown",
		},
	)
})

bot.callbackQuery("moms", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply("[текст ссылки](https://t.me/)", { parse_mode: "MarkdownV2" })
})

export default webhookCallback(bot, "https")
