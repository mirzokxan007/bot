import express from 'express'
import  cors  from "cors";
import TelegramBot  from 'node-telegram-bot-api'
import dotenv from "dotenv";
import ProductRoute from './routers/product.js'
import Category from './routers/category.js'
const app = express();
app.use(express.json());
app.use(cors());

let port = process.env.PORT || 3030;


dotenv.config()

const bot = new TelegramBot(process.env.TOKEN,{polling:true})
const webAppUrl = "https://just-orpin.vercel.app";

try {
  bot.onText(/start/, async (msg) => {
    console.log(msg.chat);
    bot.sendMessage(
      msg.chat.id,
`Assalomu alaykum ${msg.chat.first_name}!
Xush kelibsiz! Men Mini-ning rasmiy botiman.
Bu erda siz menyu bilan tanishishingiz va uyga 
buyurtma berishingiz mumkin!
Mahsulotlarni 🥄 Menu bo'limidan tanlang`,
          {
          reply_markup: JSON.stringify({
          keyboard: [[{ text: "Telefon raqamni jo'natish", request_contact: true }]],
          resize_keyboard: true,
        }),
      }
  );
});
bot.on("contact", (msg) => {
  bot.sendMessage(msg.chat.id, `Пожалуйста отправьте геопозицию`, {
    reply_markup: JSON.stringify({
      keyboard: [[{ text: "Отправить геопозицию", request_location: true }]],
      resize_keyboard: true,
    }),
  });
});

bot.on("location", (msg) => {
  let { latitude, longitude } = msg.location;

  bot.sendMessage(
    msg.chat.id,
    `Отлично! Для выбора товара нажмите на кнопку "Меню"`,
    {
      reply_markup: JSON.stringify({
        keyboard: [[{ text: `Меню`, web_app: { url: webAppUrl } }]],
        resize_keyboard: true,
      }),
    }
  );
});

bot.on("message", async (msg) => {
  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);

      await bot.sendMessage(
        msg.chat.id,
        `Sizning zakaz:
       ${data.map((p) => {
         return p.name;
       })}`
      );
      await bot.sendMessage(msg.chat.id, "Zakaz qabul qilindi");
    } catch (error) {
      console.log(error);
    }
  }
});

bot.on("message", async (msg) => {
  console.log(msg);
  if (msg?.web_app_data?.data) {
    await bot.sendMessage(
      msg.chat.id,
      `Buyurtma bersh uchun mahsulotlarni menu dan tanlang`,
      {
        reply_markup: JSON.stringify({
          keyboard: [[{ text: "Отправить контакт", request_contact: true }]],
          resize_keyboard: true,
        }),
      }
    );
  }
});


app.use('/lavash',ProductRoute);
app.use('/category',Category);

app.listen(port, () => {
console.log(port);
});
} catch (error) {
  console.log(error);
}
