import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem } from '../types';

export default function FaqSection() {
  const faqs: FaqItem[] = [
    {
      question: "هل صيانة سيارتي الصينية لديكم تلغي ضمان الوكالة الرسمي؟",
      answer: "لا أبداً! بموجب لوائح وأنظمة وزارة التجارة في المملكة العربية السعودية، يحق لمالك السيارة إجراء الصيانة الدورية والبرمجية في المراكز المعتمدة دون أن يتأثر الضمان، بشرط استخدام زيوت وفلاتر مطابقة لمواصفات المصنع وموثقة بفواتير معتمدة، وهو ما نلتزم به تماماً في مركزنا."
    },
    {
      question: "لماذا تظهر لمبات التحذير (مثل التشيك انجن) والشاشات السوداء بشكل متكرر بالسيارات الصينية؟",
      answer: "تتميز السيارات الصينية الحديثة بالاعتماد الفائق على الأنظمة الرقمية والشاشات التفاعلية وشبكات الـ CAN-BUS المعقدة. أي تذبذب بسيط في جهد البطارية، أو تراكم غبار على حساسات الرادار، أو وجود برمجيات قديمة يؤدي لظهور اللمبات أو تجمّد الشاشات. علاجها يكمن في فحص الكمبيوتر OBD2 المتقدم وتحديث السوفتوير وإعادة الضبط البرمجي الذي نوفره بأحدث الأجهزة."
    },
    {
      question: "ما هي الفترة الموصى بها لتغيير زيت القير (الناقل) لسيارات شانجان وجيلي وشيري؟",
      answer: "تعتمد معظم السيارات الصينية على قير مزدوج الكلتشات (DCT) أو قير متغير مستمر (CVT). نوصي بشدة بتغيير زيت القير وفلتره الخاص كل 40,000 كم إلى 60,000 كم كحد أقصى لحماية تروس القير وتجنب النتعة أو تأخر الاستجابة، ونستخدم في المركز الزيوت والدرجات الدقيقة الموصى بها في دليل المصنع."
    },
    {
      question: "هل تتوفر لديكم قطع غيار السيارات الصينية أم يجب عليّ شراؤها بنفسي؟",
      answer: "نوفر في المركز فلاتر الزيت، فلاتر الهواء، أقمشة الفرامل (الفحمات)، والحساسات الشائعة بصفة مستمرة. وفي حال تطلب الأمر قطعاً خاصة للماكينة أو الهيكل، نملك شبكة موردين معتمدين لتوفير القطع الأصلية أو الكورية/اليابانية المعتمدة (OEM) بأسعار منافسة وبسرعة فائقة، كما نرحب بالقطع التي يجلبها العميل بنفسه."
    },
    {
      question: "هل يتوفر لديكم جهاز سحب الصدمات وتعديل الهيكل بدون دهان (PDR)؟",
      answer: "نعم بالتأكيد! نملك أحدث أدوات السمكرة الباردة وتعديل الصدمات بدون دهان (PDR) لسحب الصدمات الخفيفة والمتوسطة على الهيكل مع الحفاظ على صبغة الوكالة الأصلية، وفي حال تطلب الأمر دهاناً، نوفر رشاًّ كاملاً أو جزئياً داخل فرن حراري ألماني متطور لضمان النعومة واللمعان ومطابقة الألوان إلكترونياً."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-900 border-t border-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            className="text-red-500 font-bold tracking-wider text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            الأسئلة الشائعة والاستفسارات
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            استفسارات تهم أصحاب السيارات الصينية
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg">
            إليك إجابات شافية وموثوقة من كبار مهندسينا لحماية سيارتك واستثمارك.
          </p>
        </div>

        {/* Faq List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="bg-slate-950/60 border border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-right px-6 py-5 flex justify-between items-center gap-4 text-white hover:text-red-500 transition-colors cursor-pointer font-bold text-sm md:text-base"
                  id={`faq-btn-${index}`}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-red-500 shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-red-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-900/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
