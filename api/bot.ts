import { Bot, InlineKeyboard, webhookCallback } from "grammy"

const token = process.env.TOKEN
if (!token) throw new Error("TOKEN is unset")

const bot = new Bot(token)

bot.command("start", ctx => {
  const keyboard = new InlineKeyboard()
		.text("🍾 Вещества", "life")
		.row()
		.text("🫂 Родственикам", "moms")
		.row()
		.text("🧒 Травмы", "tra").row()
		.text("🙏 Болезни", "bol").row()
		.text("🎂 Переедание", "eda").row()
		.text("💼 Работа", "work").row()
		.text("💶 Деньги", "money").row()
		.text("🎭 Эмоции", "soul").row()
		.text("❤️ Отношения", "sex").row()
		.text("🌐 Интернет", "world").row()
		.text("🎲 Азарт", "azart").row()
		.text("🌅 Творчество", "art").row()
		.text("🎆 Мечтатели", "dream")
  

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
*Анонимные Алкоголики* 🗓 10 июня 1935 года

*Анонимные Наркоманы* 🗓 5 октября 1953 года

*Анонимные Никотинозависимые* 🗓 1982 году

*Анонимные Химические Зависимые* 🗓 первая группа 1997 год

*Анонимные Таблеточники* 🗓 основана в 1972 году
_(Люди ищущие выздоровление от зависимости от рецептурных лекарств)_

*Анонимные Кокаинисты* 🗓 в 1982 году

*Анонимные Адреналиновые Наркоманы*
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
*Ал-Анон* 🗓 1951 год

*Анонимные Созависимые*

*Алатин* 🗓 1951 год
_(Алатин – это точно такой же Ал-Анон, только для детей и подростков из семей, в которых есть или были алкогольные проблемы.)_


*Нар-Анон* 🗓 1971 год

*И-Анон*
_(И-Анон - это общество мужчин и женщин, на чьи жизни влияет проблема игромании близких.)_

*Анонимные Семьи Химически Зависимых*
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("eda", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Переедающие* 🗓 1960 года

*Анонимные Компульсивно Переедающие* 

*Анонимные с Расстройством Пищевого Поведения* 
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("work", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Прокрастинаторы* 

*Анонимные Трудоголики* 🗓 1983 году 
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("money", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Должники* 🗓 1971

*Анонимные Недозарабатывающие* 

*Анонимные Бизнес Должники*
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("soul", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Эмоционалы*

*Анонимные Депрессивные*
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("sex", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Сексоголики* 🗓 1979 году

*Анонимные Любовнозависимые* 🗓 1976 году

*Анонимные Сексуально Восстанавливающие* 🗓 1993 году

*Анонимные Сексуальные Компульсивные Личности* 🗓 1982 году
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("world", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Интернет Зависимые*

*Анонимные Компьютерные Игроки*

*Анонимные Медия Зависимые*  


  `,
		{ parse_mode: "Markdown" },
	)
})
bot.callbackQuery("azart", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Игроки* 🗓 1957 году
  `,
		{ parse_mode: "Markdown" },
	)
})
bot.callbackQuery("tra", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Взрослых Детей из алкогольных/ Дисфункциональных семей* 🗓 1978 году
  `,
		{ parse_mode: "Markdown" },
	)
})

bot.callbackQuery("art", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Художники* 🗓 1985 году
  `,
		{ parse_mode: "Markdown" },
	)
})
bot.callbackQuery("dream", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимных Дейдримеров* 🗓 2008 году
  `,
		{ parse_mode: "Markdown" },
	)
})
bot.callbackQuery("bol", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		`
*Анонимные Онголики*
  `,
		{ parse_mode: "Markdown" },
	)
})
// bot.callbackQuery("", async ctx => {
// 	await ctx.answerCallbackQuery()
// 	ctx.reply(
// 		`

//   `,
// 		{ parse_mode: "Markdown" },
// 	)
// })

// bot.callbackQuery("eda", async ctx => {
// 	await ctx.answerCallbackQuery()
// 	ctx.reply(
// 		`

//   `,
// 		{ parse_mode: "Markdown" },
// 	)
// })

export default webhookCallback(bot, "https")
