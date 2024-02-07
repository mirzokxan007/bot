import express from 'express'
import  cors  from "cors";
import TelegramBot  from 'node-telegram-bot-api'
import dotenv from "dotenv";
import parsePhoneNumber from 'libphonenumber-js';
const app = express();
app.use(express.json());
app.use(cors());

let port = process.env.PORT || 3030;



dotenv.config()

const bot = new TelegramBot(process.env.TOKEN,{polling:true})
const webAppUrl = "https://bright-concha-296851.netlify.app";
var res = []
var obj = {
  manzil:"",
  telefon:"",
  soni:"",
  jins:""
}

try {
 
  bot.onText(/start/, async (msg) => {
    bot.sendMessage(
      msg.chat.id,
`Assalomu alaykum ${msg.chat.first_name}!
Xush kelibsiz! Men sizga taxi topishda yordam beraman
 Haydovchimisiz yoki Yulovchi?`,
          {
          reply_markup: JSON.stringify({
          keyboard: [
            [{ text: "🚕Haydovchi",},
            { text: "🙋‍♂️/🙋‍♀️Yolovchi"}]
          ],
          
          resize_keyboard: true,
        }),
      }
  );
  
});
bot.on("message", async (msg) => {
    if (msg.text == "🚕Haydovchi") {
      bot.sendMessage(
        msg.chat.id,
        "Xurmatli Xaydovchi. Qo'qon Toshkent yo'nalishida zakaz olib ishlamoqchimisiz. @muhammad_m1rz0 Adminga murojat qiling. Sizga batafsil malumot beriladi."
        )
      }
});


bot.on("message", async (msg) => {
  if (msg.text == "🙋‍♂️/🙋‍♀️Yolovchi") {
    bot.sendMessage(
      msg.chat.id,
      ` Haydovchi topish uchun savollarga javob bering
      Qayerdan qayerga bormoqchisz?`,
      {
        reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "Qoqondan Toshkentga" ,callback_data:"Qoqondan_Toshkentga"}],
          [{ text: "Toshkentdan Qoqonga" ,callback_data:"Qoqondan Toshkentga"}]
        ],
        
        resize_keyboard: true,
      }),}
      )
    } 
});
bot.on("message", async (msg) => {
  if (msg.text == "Qoqondan Toshkentga" || msg.text == "Toshkentdan Qoqonga") {
    obj.manzil = msg.text
    bot.sendMessage(
      msg.chat.id,
      ` Nechta yo'lovchi bor yoki pochta?`,
      {
        reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "Pochta"}],
          [{ text: "1 kishi"},{ text: "2 kishi"}],
          [{ text: "3 kishi"},{ text: "4 kishi"}],
          [{ text: "Bekor qilish⏭️"}],
        ],
        
        resize_keyboard: true,
      }),}
      )
    } 
});

bot.on("message", async (msg) => {
  if (msg.text == "Bekor qilish⏭️") {
    bot.sendMessage(
      msg.chat.id,
      ` So'rovingizni bekor qildingiz.`,
      {
        reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "🚕Haydovchi",},
          { text: "🙋‍♂️/🙋‍♀️Yolovchi"}]
        ],
        
        resize_keyboard: true,
      }),}
      )
    } 
});

bot.on("message", async (msg) => {
  if (msg.text == "1 kishi" || msg.text == "2 kishi" || msg.text == "3 kishi" || msg.text == "4 kishi" || msg.text == "Pochta") {
    obj.soni = msg.text
    bot.sendMessage(
      msg.chat.id,
      `Ayol kishimi yoki erkak kishimi?`,
      {
        reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "Ayol"}],
          [{ text: "Erkak"}],
        ], 
        resize_keyboard: true,
      }),}
      )
    } 
});

bot.on("message", async (msg) => {
  if (msg.text == "Ayol"|| msg.text == "Erkak") {
    obj.jins = msg.text
    bot.sendMessage(
      msg.chat.id,
      `Telefon raqamingizni +998 bilan kiriting

      masalan: +998901235678`,
      {
        reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "Bekor qilish⏭️"}],
        ], 
        resize_keyboard: true,
      }),}
      )
    } 
});
var id = -4133575065
bot.on("message", async (msg) => {
  if (msg.text?.includes('9')) {
    if (isValidUzbekPhoneNumber(msg.text)) {
      obj.telefon = msg.text
      console.log(obj);
      bot.sendMessage(
        msg.chat.id,
        `📪So'rovingiz tekshirish uchun operatorga jo'natildi.

        Operatorlar tez orada aloqaga chiqishadi.
        
        Sizga TAXI xizmati zarur bo'lsa quyidagi raqamga murojaat qiling
        
        ☎️ +998916878975
        ☎️ +998911487775`,
        {
          reply_markup: JSON.stringify({
          keyboard: [
            [{ text: "Bekor qilish⏭️"}],
          ], 
          resize_keyboard: true,
        }),}
        )
        bot.sendMessage(id, `🙋Yolovchi : ${obj.jins}
1.Bormoqchi : ${obj.manzil}
2.Yolovchi yoki Pochta : ${obj.soni}
3.Telefon raqam : ${obj.telefon}`)
        .then(sentMessage => {
          console.log('Message sent successfully:', sentMessage);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    } else {
      bot.sendMessage(msg.chat.id,`Telefon raqamingizni tog'ri kiriting 
      Masalan: +998916878975`);
    }
  }
});

bot.on('message', (msg) => {
  var chatId = -4189760667
  const userId = msg.from.id;

  // Get information about the user's role in the chat
  bot.getChatMember(chatId, userId)
    .then((chatMember) => {
      // Check if the user is not an administrator
      if (chatMember.status !== 'administrator') {
        // Attempt to delete the user's message
        if (isAdmin(msg)) {
          console.log('Message sent by an administrator. No deletion necessary.');
          return;
        }
        bot.deleteMessage(chatId, msg.message_id)
          .then(() => {
            bot.getChatMember(chatId, userId) // replace with your channel username
            .then((chatMember) => {
              console.log('User Information:', chatMember.user);
            })
            .catch((error) => {
              console.error('Error getting user information:', error.message);
            });
            bot.sendMessage(id, `${msg.text} ${chatMember.user.username ?  `@${chatMember.user.username}` : chatMember.user.first_name}`)
        .then(sentMessage => {
          console.log('Message sent successfully:', sentMessage);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
          })
          .catch((error) => {
            console.error(`Error deleting message: ${error.message}`);
          });
      }
    })
    .catch((error) => {
      console.error(`Error getting chat member info: ${error.message}`);
    });
});


function isValidUzbekPhoneNumber(phoneNumber) {
  try {
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'UZ');
    return parsedPhoneNumber && parsedPhoneNumber.isValid();
  } catch (error) {
    return false; // An error occurred during parsing
  }
}
function isAdmin(message) {
  return message.from && message.from.id && message.chat && message.chat.id &&
    message.chat.all_members_are_administrators &&
    message.from.id === message.chat.id;
}
// bot.on("location", (msg) => {
//   let { latitude, longitude } = msg.location;

//   bot.sendMessage(
//     msg.chat.id,
//     `Отлично! Для выбора товара нажмите на кнопку "Меню"`,
//     {
//       reply_markup: JSON.stringify({
//         keyboard: [[{ text: `Меню`, web_app: { url: webAppUrl } }]],
//         resize_keyboard: true,
//       }),
//     }
//   );
// });

// bot.on("message", async (msg) => {
//   if (msg?.web_app_data?.data) {
//     try {
//       const data = JSON.parse(msg?.web_app_data?.data);

//       await bot.sendMessage(
//         msg.chat.id,
//         `Sizning zakaz:
//        ${data.map((p) => {
//          return p.name;
//        })}`
//       );
//       await bot.sendMessage(msg.chat.id, "Zakaz qabul qilindi");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

// bot.on("message", async (msg) => {
//   console.log(msg);
//   if (msg?.web_app_data?.data) {
//     await bot.sendMessage(
//       msg.chat.id,
//       `Buyurtma bersh uchun mahsulotlarni menu dan tanlang`,
//       {
//         reply_markup: JSON.stringify({
//           keyboard: [[{ text: "Отправить контакт", request_contact: true }]],
//           resize_keyboard: true,
//         }),
//       }
//     );
//   }
// });


// app.use('/lavash',ProductRoute);
// app.use('/category',Category);
app.listen(port, () => {
  console.log(`Server in ${port} port`);
});
} catch (error) {
  console.log(error);
}
