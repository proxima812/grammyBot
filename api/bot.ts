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
_(Люди ищущие выздоровление от зависимости от рецептурных лекарств)_

*Анонимные Кокаинисты* (в 1982 году)
    `,
		{
			parse_mode: "Markdown",
		},
	)
})

bot.callbackQuery("moms", async ctx => {
	await ctx.answerCallbackQuery()
  ctx.reply(
		`
Ал-Анон (1951 год)

Алатин (1951 год)
_(Алатин – это точно такой же Ал-Анон, только для детей и подростков из семей, в которых есть или были алкогольные проблемы.)_

Нар-Анон (1971 год)

И-Анон
_(И-Анон - это общество мужчин и женщин, на чьи жизни влияет проблема игромании близких.)_

Анонимные Семьи Химически Зависимых
  `,
		{ parse_mode: "Markdown" },
	)
})

export default webhookCallback(bot, "https")
