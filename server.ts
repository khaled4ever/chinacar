import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// System Prompt for Chinese Cars Diagnostics
const SYSTEM_INSTRUCTION = `
أنت كبير المهندسين والتقنيين في "مركز الرشود لصيانة السيارات الصينية". لديك خبرة تزيد عن 15 عاماً في صيانة السيارات الصينية الحديثة بمختلف أنواعها (شيري Chery، جيلي Geely، شانجان Changan، هافال Haval، بي واي دي BYD، إم جي MG، جيتور Jetour، إكسيد Exeed، هافال، جيلي توجيلا، إلخ).

وظيفتك هي تقديم نصائح تشخيصية ذكية، ودقيقة، وودية للعملاء باللغة العربية بأسلوب احترافي ومطمئن.

عند تشخيص مشكلة بناءً على نوع السيارة وموديلها والأعراض:
1. رحّب بالعميل واذكر اسم سيارته بفخر واهتمام.
2. حدد الأسباب المحتملة للمشكلة بوضوح، مقسمة إلى:
   - مشاكل كهربائية وحساسات (مثل حساسات الشكمان، كمبيوتر الماكينة، حساس الهواء، ضفيرة الكهرباء - وهي شائعة في السيارات الصينية).
   - مشاكل ميكانيكية (الماكينة، القير، الفرامل، المساعدات).
   - مشاكل برمجية وتحتاج إعادة ضبط (Reset).
3. حدد درجة خطورة المشكلة:
   - 🔴 حرجة (يجب التوقف فوراً ونقل السيارة بسطحة لتجنب تلف الماكينة أو القير).
   - 🟡 متوسطة (يمكن قيادتها بحذر للمركز لإجراء فحص الكمبيوتر).
   - 🟢 خفيفة (مشكلة بسيطة أو برمجية أو استهلاكية).
4. انصح العميل دائماً بأهمية إجراء "فحص الكمبيوتر OBD2" في مركزنا لتحديد الكود الدقيق للمشكلة وتوفير وقت وجهد التخمين.
5. حافظ على إيجابية الرد واختتم بتقديم دعوة لزيارة الورشة لحل المشكلة مع كادرنا المتخصص، مع إعطاء نبذة سريعة عن دقة أجهزة الفحص لدينا والضمان الذي نقدمه.

تنبيه هام: اكتب ردك بتنسيق Markdown جذاب ومقروء مع استخدام الرموز التعبيرية المناسبة لإضافة طابع تفاعلي، ولا تستخدم مصطلحات معقدة جداً دون شرحها البسيط.
`;

// Diagnostic API Endpoint
app.post("/api/diagnostic", async (req, res) => {
  try {
    const { brand, carModel, symptom, history } = req.body;

    if (!brand || !symptom) {
      return res.status(400).json({ error: "الرجاء تحديد نوع السيارة ووصف العطل" });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful error fallback if API key is not configured yet
      return res.json({
        response: `### 🔧 تشخيص أولي مؤقت (بانتظار تفعيل الذكاء الاصطناعي):
أهلاً بك يا صاحب سيارة **${brand} ${carModel || ""}** العزيز! 

يبدو أنك تواجه عطلاً يتعلق بـ: **${symptom}**.

بشكل عام، السيارات الصينية الحديثة تعتمد بشكل كبير على الأنظمة الإلكترونية والحساسات الذكية. ننصحك بالخطوات التالية فوراً:
1. **فحص الكمبيوتر (OBD2)**: هو الخطوة الأساسية لتحديد الكود الدقيق للعطل (Fault Code) وتجنب تغيير قطع الغيار بشكل عشوائي.
2. **فحص الفيوزات والريلاي**: في حال وجود مشكلة كهربائية مفاجئة.
3. **فحص السوائل والزيوت**: إذا كان العطل ميكانيكياً أو يتعلق بحرارة المحرك أو ناقل الحركة (القير).

**توصية المركز**: يرجى الضغط على زر **الاتصال الهاتفي** أو **الواتساب** العائم لحجز موعد فوري مع مهندسينا لإجراء فحص دقيق للكمبيوتر وحل المشكلة بأحدث الأجهزة والضمان المعتمد!`
      });
    }

    const userPrompt = `لدي سيارة من نوع ${brand} وموديل ${carModel || "غير محدد"}. المشكلة أو العرض الذي أواجهه هو: "${symptom}". الرجاء تشخيص المشكلة وتقديم النصائح الفنية والخطوات القادمة وتحديد درجة الخطورة.`;

    // Construct contents including chat history if provided
    let contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ response: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "حدث خطأ أثناء معالجة تشخيص العطل. يرجى المحاولة لاحقاً." });
  }
});

// Start Server & Handle Vite Server Configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
