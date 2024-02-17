require("dotenv").config()
import { Bot, InlineKeyboard, webhookCallback } from "grammy"
const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const token = process.env.TOKEN
if (!token) throw new Error("TOKEN is unset")

const bot = new Bot(token)

const categoryTexts = {
	life: `
  *Анонимные Алкоголики* 🗓 10 июня 1935 года

*Анонимные Наркоманы* 🗓 5 октября 1953 года

*Анонимные Никотинозависимые* 🗓 1982 году

*Анонимные Химические Зависимые* 🗓 первая группа 1997 год

*Анонимные Таблеточники* 🗓 основана в 1972 году
_(Люди ищущие выздоровление от зависимости от рецептурных лекарств)_

*Анонимные Кокаинисты* 🗓 в 1982 году

*Анонимные Адреналиновые Наркоманы*`,
	moms: `
*Ал-Анон* 🗓 1951 год

*Анонимные Созависимые*

*Алатин* 🗓 1951 год
_(Алатин – это точно такой же Ал-Анон, только для детей и подростков из семей, в которых есть или были алкогольные проблемы.)_

*Нар-Анон* 🗓 1971 год

*И-Анон*
_(И-Анон - это общество мужчин и женщин, на чьи жизни влияет проблема игромании близких.)_

*Анонимные Семьи Химически Зависимых*
    `,
	eda: `
*Анонимные Переедающие* 🗓 1960 года

*Анонимные Компульсивно Переедающие* 

*Анонимные с Расстройством Пищевого Поведения* 
    `,
	work: `
  *Анонимные Прокрастинаторы* 

*Анонимные Трудоголики* 🗓 1983 году 
  `,
	money: `
  *Анонимные Должники* 🗓 1971

*Анонимные Недозарабатывающие* 

*Анонимные Бизнес Должники*
  `,
	soul: `
*Анонимные Эмоционалы*

*Анонимные Депрессивные*`,
	sex: `
  *Анонимные Сексоголики* 🗓 1979 году

*Анонимные Любовнозависимые* 🗓 1976 году

*Анонимные Сексуально Восстанавливающие* 🗓 1993 году

*Анонимные Сексуальные Компульсивные Личности* 🗓 1982 году
  `,
	world: `
  *Анонимные Интернет Зависимые*

*Анонимные Компьютерные Игроки*

*Анонимные Медия Зависимые*
`,
	azart: `
  *Анонимные Игроки* 🗓 1957 году
  `,
	tra: `
  *Взрослых Детей из алкогольных/ Дисфункциональных семей* 🗓 1978 году
  `,
	art: `
  *Анонимные Художники* 🗓 1985 году
  `,
	dream: `
  *Анонимных Дейдримеров* 🗓 2008 году
  `,
	bol: `
  *Анонимные Онголики*
  `,
}

function buildMainMenuKeyboard() {
	return new InlineKeyboard()
		.text("🍾 Вещества", "life")
		.row()
		.text("🫂 Родственикам", "moms")
		.text("🧒 Травмы", "tra")
		.row()
		.text("🙏 Болезни", "bol")
		.text("🎂 Переедание", "eda")
		.text("💼 Работа", "work")
		.row()
		.text("💶 Деньги", "money")
		.text("🎭 Эмоции", "soul")
		.text("❤️ Отношения", "sex")
		.row()
		.text("🌐 Интернет", "world")
		.text("🎲 Азарт", "azart")
		.text("🌅 Творчество", "art")
		.row()
		.text("🎆 Мечтатели", "dream")
}

const mainMsg = `
Более 60 анонимных *12-ти шаговых* сообществ.
[Ссылки и контакты этих сообществ](https://t.me/all12_contacts)
`

bot.command("start", ctx => {
	const keyboard = buildMainMenuKeyboard()
	ctx.reply(mainMsg, {
		reply_markup: keyboard,
		parse_mode: "Markdown",
	})
})

async function fetchData() {
	const { data, error } = await supabase.from("tgBotMsg").select("message") // Извлекаем только колонку message

	if (error) {
		console.error("Ошибка при запросе данных:", error)
		throw error // Передаем ошибку дальше, чтобы ее можно было обработать в блоке catch
	}

	return data
}

bot.command("sb", async ctx => {
	try {
		const data = await fetchData()
		if (data.length === 0) {
			// Отправляем сообщение, если в таблице нет данных
			await ctx.reply("В базе данных нет сообщений.")
		} else {
			// Формируем строку из сообщений для отправки пользователю
			const messages = data
				.map((item, index) => `${index + 1}: ${item.message}`)
				.join("\n")
			await ctx.reply(`Данные из Supabase:\n${messages}`)
		}
	} catch (error) {
		console.error("Ошибка при получении данных:", error)
		await ctx.reply("Произошла ошибка при получении данных.")
	}
})

bot.callbackQuery("back_main", async ctx => {
	await ctx.answerCallbackQuery()
	const keyboard = buildMainMenuKeyboard()
	ctx.editMessageText(mainMsg, {
		reply_markup: keyboard,
		parse_mode: "Markdown",
	})
})

bot.on("callback_query", async ctx => {
	const callbackData = ctx.callbackQuery.data
	await ctx.answerCallbackQuery() // Всегда отвечайте на callback-запросы

	// Проверяем, есть ли текст для данной категории
	if (categoryTexts[callbackData]) {
		const backKeyboard = new InlineKeyboard().text("⬅️ Назад", "back_main")
		await ctx.editMessageText(categoryTexts[callbackData], {
			reply_markup: backKeyboard,
			parse_mode: "Markdown",
		})
	} else if (callbackData === "back_main") {
		// Обработка кнопки "Назад"
		// Здесь ваш код для возвращения к исходному сообщению
	} else {
		await ctx.reply("Категория не найдена.")
	}
})

export default webhookCallback(bot, "https")
