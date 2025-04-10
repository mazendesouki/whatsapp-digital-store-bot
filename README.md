# WhatsApp Digital Store Bot (Node.js)

بوت واتساب باستخدام WhatsApp Cloud API، مصمم لمتجر منتجات رقمية.

---

## المحتويات
- رد تلقائي حسب الكلمات المفتاحية (كتب - دورات - تصميمات - تسويق - دعم فني)
- كود جاهز للرفع على GitHub وRender
- ملف إعدادات `config.json`
- شرح متكامل لتشغيل البوت على Render

---

## طريقة التشغيل على Render

### 1. التسجيل في Render
- ادخل على [https://render.com](https://render.com)
- سجل الدخول بحساب GitHub أو بريدك

### 2. رفع المشروع إلى GitHub
- أنشئ مستودع جديد في GitHub
- ارفع ملفات المشروع (بعد فك الضغط)

### 3. إنشاء Web Service على Render
- اضغط "New" ثم "Web Service"
- اربط حسابك في GitHub واختر المشروع
- الإعدادات:

| الإعداد | القيمة |
|--------|--------|
| Build Command | `npm install` |
| Start Command | `node index.js` |
| Environment | Node |

- أضف رابط Webhook في إعدادات Meta:
```
https://your-service-name.onrender.com/webhook
```

- استخدم نفس `verify_token` الذي وضعته في config.json

---

## ملفات مهمة

### config.json
```json
{
    "verify_token": "your_verify_token",
    "token": "your_whatsapp_api_token",
    "phone_number_id": "your_phone_number_id"
}
```

### index.js
- يتعامل مع رسائل WhatsApp ويرد حسب نوع المنتج.

---

## رسائل المستخدم المقترحة

| الرسالة | الرد |
|--------|------|
| كتب | رابط تحميل كتاب |
| دورات | رابط دورة تدريبية |
| تصميمات | روابط التصميمات الجاهزة |
| تسويق | معلومات التسويق الرقمي |
| دعم | رابط الدعم الفني |

---

## ملاحظات
- روابط المنتجات تجريبية ويمكنك تعديلها.
- لا تنسَ ربط الرقم التجريبي في Meta.

