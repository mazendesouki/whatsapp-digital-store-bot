const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.json');

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = config.verify_token;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.post('/webhook', async (req, res) => {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    const from = message?.from;
    const text = message?.text?.body.toLowerCase();

    if (text && from) {
        let reply = "مرحباً بك في متجر المنتجات الرقمية! اختر نوع المنتج:
1. كتب
2. دورات
3. تصميمات
4. تسويق
5. دعم فني";

        if (text.includes("1") || text.includes("كتب")) {
            reply = "كتاب: أساسيات التسويق الرقمي
رابط التحميل: https://example.com/book";
        } else if (text.includes("2") || text.includes("دورات")) {
            reply = "دورة: بناء متجرك الرقمي في 5 أيام
رابط الدورة: https://example.com/course";
        } else if (text.includes("3") || text.includes("تصميمات")) {
            reply = "حزمة: تصاميم سوشيال ميديا للمسوقين
رابط التحميل: https://example.com/designs";
        } else if (text.includes("4") || text.includes("تسويق")) {
            reply = "خدمة: إعداد حملات إعلانية ممولة
للتفاصيل: https://example.com/marketing";
        } else if (text.includes("5") || text.includes("دعم")) {
            reply = "يمكنك التواصل مع الدعم عبر: https://example.com/support";
        }

        await axios.post(`https://graph.facebook.com/v19.0/${config.phone_number_id}/messages`, {
            messaging_product: "whatsapp",
            to: from,
            text: { body: reply },
        }, {
            headers: {
                "Authorization": `Bearer ${config.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    res.sendStatus(200);
});

app.listen(3000, () => console.log('Bot is running on port 3000'));
