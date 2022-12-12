const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')


const bot = new Telegraf(process.env.BOT_TOKEN)


bot.on((ctx) => console.log(ctx.message))
bot.start((ctx) => ctx.replyWithSticker('CAACAgIAAxkBAAEGrZtjjJQ4tULqEm8Oq4gzz6IR-HHJ1gACcRIAAuKKkEpQfmU3XqesKSsE') + ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!` + ' Я могу поделиться с тобой информацией, которая поможет тебе изучить парочку интересных языков программирования'));
bot.help((ctx) => ctx.reply(text.commands))


bot.command('education', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Курсы, которые тебе помогут начать свой путь в программировании</b>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Python', 'btn_1'), Markup.button.callback('C#', 'btn_2'), Markup.button.callback('JavaScript', 'btn_3')]
			]
		))
	} catch (e) {
		console.error(e)
	}
})


bot.command('download_materials', async (ctx) => {
	try {
		await ctx.replyWithHTML('<i>Файлы с книгамии по программированию</i>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Python book', 'btn_4'), Markup.button.callback('C# book', 'btn_5'), Markup.button.callback('JavaScript book', 'btn_6')]
			]
		))
	} catch (e) {
		console.error(e)
	}
})


function addActionBot(name, src, text) { 
	bot.action(name, async (ctx) => {
		try {
			await ctx.answerCbQuery()
			if (src !== false) {
				await ctx.replyWithPhoto({
					source: src
				})
			}
			await ctx.replyWithHTML(text, {
				disable_web_page_preview: true
			})	
		} catch (e) {
			console.error(e)
		}
	})
}


bot.on('message', async ctx => {
	const msg = ctx.message.text.toLowerCase()
	for (var i = 0; i < text.arr1.length; i++) {
		if (text.arr1[i] === msg) {
			ctx.replyWithSticker('CAACAgIAAxkBAAEGvnZjkmiwbvNcsve4LWjqqsmEb7D2ogACMBUAApxukUpBQAq83jvidisE')
			ctx.replyWithSticker('CAACAgIAAxkBAAEGvnhjkmjCaJRc3ly0ArD3ogKzb1e28QACnxQAAgy2EUgXMgznnyPpyCsE')
		} 
	} 
})


addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', './img/3.jpg', text.text3)


addActionBot('btn_4', './img/4.jpg', text.text4)
addActionBot('btn_5', './img/5.jpg', text.text5)
addActionBot('btn_6', './img/6.jpg', text.text6)


bot.launch();


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));