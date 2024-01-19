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

bot.on("message:new_chat_members", ctx => {
	ctx.reply("Приветствуем нового участника!")
})

bot.on("message:left_chat_member", ctx => {
	ctx.reply("Участник покинул группу.")
})

bot.on("message", ctx => {
	if (!ctx.message.text || ctx.message.text.startsWith("/")) return
	ctx.reply(`Сообщение получено: ${ctx.message.text}`)
})

bot.callbackQuery("internet", async ctx => {
	await ctx.answerCallbackQuery()
	ctx.reply(
		"Анонимные Далбаебы\n\nКраткая информация:\n()\n\nКонтакты:\n[https://t.me/](https://t.me/)",
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
