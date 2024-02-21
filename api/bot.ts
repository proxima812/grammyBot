require("dotenv").config()
import { Bot, InlineKeyboard, webhookCallback } from "grammy"
const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Настройка
const adminId = 5522146122
const groupId = -1002037839412

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

// /start
bot.command("start", ctx => {
	const keyboard = buildMainMenuKeyboard()
	ctx.reply(mainMsg, {
		reply_markup: keyboard,
		parse_mode: "Markdown",
	})
})

// Функция для создания кнопок месяцев
function createMonthButtons() {
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
  ];
  let keyboard = new InlineKeyboard();
  months.forEach(month => {
    keyboard = keyboard.text(month, `month:${month}`).row();
  });
  return keyboard;
}

// Функция для создания кнопок дней в зависимости от месяца
function createDayButtons(month) {
  // Простая логика для определения количества дней в месяце
  const daysInMonth = {
    "yanvar": 31, "fevral": 28, "mart": 31, "aprel": 30, "may": 31, "iyun": 30,
    "iyul": 31, "avgust": 31, "sentyabr": 30, "oktyabr": 31, "noyabr": 30, "dekabr": 31
  };
  let keyboard = new InlineKeyboard();
  const days = daysInMonth[month];
  for (let day = 1; day <= days; day++) {
    keyboard = keyboard.text(day.toString(), `day:${month}:${day}`).row();
  }
  return keyboard;
}

// Команда старта
bot.command('ejik', (ctx) => {
  const keyboard = createMonthButtons();
  ctx.reply('Выберите месяц:', { reply_markup: keyboard });
});

// Обработка выбора месяца
bot.callbackQuery(/^month:(.+)$/, (ctx) => {
  const month = ctx.match[1];
  const keyboard = createDayButtons(month);
  ctx.editMessageText(`Выберите день в ${month}:`, { reply_markup: keyboard });
});

// Обработка выбора дня
bot.callbackQuery(/^day:(.+):(\d+)$/, async (ctx) => {
  const [, month, day] = ctx.match;
  // Загрузка данных из файла/хранилища
  // Предполагается, что вы загрузите данные здесь
  const data = {
    "dekabr": {
      "24": {
        "title": "24 декабря",
        "description": "Размышления АА на сегодня - 24 декабря",
        "id": "359",
        "content": "## «РАЗУМНАЯ И СЧАСТЛИВАЯ ЖИЗНЬ НА ПОЛЬЗУ ЛЮДЯМ»\n\n**Мы пришли к убеждению, что Он велит нам в мыслях быть с Ним рядом, в\nоблаках, но обеими ногами прочно стоять на земле. Там, внизу, все наши друзья,\nи там наша основная работа. Таковы реальности нашей жизни. Мы считаем, что\nинтенсивная духовная жизнь вполне совместима с разумной и счастливой жизнью, в\nкоторой мы стремимся приносить пользу другим.**\n\n**_Анонимные Алкоголики, с. 126  \nAlcoholics Anonymous, p. 130_**\n\nНикакие на свете молитвы и медитации не помогут мне до тех пор, пока они не\nбудут подтверждены моими действиями. Применяя принципы AA на практике, я\nощущаю заботу, которую Бог проявляет обо мне во всех сферах моей жизни. Бог\nвходит в мой мир тогда, когда я отхожу в сторону и позволяю Ему войти."
      },
    }
  }; // Замените это на загрузку данных
  const selectedData = data[month] && data[month][day];
  if (!selectedData) {
    await ctx.answerCallbackQuery('Данные за этот день отсутствуют.');
    return;
  }

  const message = `${selectedData.title}\n\n${selectedData.description}\n\n${selectedData.content}`;
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(message);
});

// Обработчик для любого текстового сообщения
bot.on("message:text", async ctx => {
	const messageText = ctx.message.text
	const fromUserId = ctx.message.from.id

	// Создаем inline клавиатуру с кнопками
	const inlineKeyboard = new InlineKeyboard()
		.text("Да, принять", `accept_${fromUserId}`)
		.text("Нет, отказ", `reject_${fromUserId}`)

	// Пересылаем сообщение администратору с кнопками
	await ctx.api.sendMessage(
		adminId,
		`Сообщение от пользователя ${fromUserId}: ${messageText}`,
		{
			reply_markup: inlineKeyboard,
		},
	)
})

// Функция для сохранения сообщения в базу данных
async function saveMessageToDb(messageText) {
	// Здесь должен быть ваш код для сохранения сообщения в базе данных
	// Например, для Supabase это может выглядеть так:
	const { data, error } = await supabase
		.from("tgBotMsg")
		.insert([{ message: messageText }])

	if (error) {
		throw new Error("Ошибка при сохранении сообщения в базу данных")
	}

	return data
}

// Обновленный обработчик нажатий на кнопки
bot.callbackQuery(/^accept_|reject_/, async ctx => {
	const action = ctx.callbackQuery.data.startsWith("accept_") ? "принято" : "отказано"
	const userId = ctx.callbackQuery.data.split("_")[1]
	const messageText = ctx.callbackQuery.message.text.split(":").slice(1).join(":").trim() // Извлекаем текст сообщения

	const messageId = ctx.callbackQuery.message.message_id // ID сообщения, которое нужно удалить
	const chatId = ctx.callbackQuery.message.chat.id // ID чата, из которого нужно удалить сообщение

	if (action === "принято") {
		try {
			// Сохраняем сообщение в базу данных
			await saveMessageToDb(messageText)

			// Отправляем сообщение в группу
			await ctx.api.sendMessage(groupId, `Новое сообщение: ${messageText}`)

			// Отправляем уведомление пользователю и администратору
			await ctx.answerCallbackQuery("Сообщение принято и сохранено в базе данных.")
			await ctx.api.sendMessage(
				userId,
				"Ваше сообщение было принято и отправлено в группу.",
			)
			await ctx.api.deleteMessage(chatId, messageId)
		} catch (error) {
			console.error("Ошибка:", error)
			await ctx.answerCallbackQuery("Произошла ошибка при обработке вашего запроса.")
		}
	} else {
		// Для отказа, отправляем уведомление пользователю
		await ctx.answerCallbackQuery("Вы отклонили запрос пользователя.")
		await ctx.api.sendMessage(userId, "Ваш запрос был отклонен администратором.")
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
