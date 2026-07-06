import { Star, ShieldCheck, Users, Milestone, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReviewSection() {
  const reviews = [
    {
      id: 1,
      author: "أبو فهد العتيبي",
      car: "جيلي توجيلا 2022",
      rating: 5,
      text: "كانت عندي شاشة التوجيلا معلقة تظهر سوداء والمكيف فصل بالكامل، مريت أكثر من ورشة قالوا لي لازم تغير شاشة بـ 7 آلاف ريال! مريت مركز الرشود وسووا لي برمجة وتحديث للسوفتوير وخلال ساعة اشتغل كل شيء بامتياز وبتكلفة بسيطة جداً. أنصح بالتعامل معهم وبقوة.",
      date: "أمس"
    },
    {
      id: 2,
      author: "م. محمد الحربي",
      car: "شانجان CS95 2023",
      rating: 5,
      text: "توضيب القير وصيانة التيربو عندهم على مستوى عالي من الاحترافية. وفروا لي قطع الغيار الأصلية وعطوني ضمان معتمد 6 شهور على توضيب قير الـ DCT المزدوج والحمد لله الموتر الحين ناعم جداً والتبديلات ممتازة كأنه جديد.",
      date: "قبل أسبوع"
    },
    {
      id: 3,
      author: "سلطان الدوسري",
      car: "هافال H6 2021",
      rating: 5,
      text: "سويت عندهم سمكرة صدمة بالرفرف الخلفي الأيمن مع تعديل الباب ورش بالفرن. دقة مطابقة اللون غريبة جداً، مستحيل أحد يكتشف أن الموتر مرشوش، الشغل نظيف وخالي من التموجات والسعر كان منافس مقارنة بالوكالة.",
      date: "قبل أسبوعين"
    },
    {
      id: 4,
      author: "خالد الشمري",
      car: "شيري تيجو 8 برو",
      rating: 5,
      text: "فحص الكمبيوتر عندهم متطور يظهر لك العطل بالضبط بالأكواد وبدون فلسفة زائدة. فحصوا لي لمبة الماكينة وطلع المشكلة بسيطة بحساس الشكمان وتم التنظيف والبرمجة وراحت اللمبة وتوفر علي تغيير قطع غالية. مهندسين محترفين.",
      date: "قبل شهر"
    }
  ];

  const stats = [
    { icon: <Milestone className="w-8 h-8 text-red-500" />, count: "+12,000", label: "سيارة صينية تم صيانتها" },
    { icon: <Users className="w-8 h-8 text-red-500" />, count: "99.4%", label: "نسبة رضا العملاء" },
    { icon: <Award className="w-8 h-8 text-red-500" />, count: "+15 عام", label: "خبرة في الأنظمة الذكية" },
    { icon: <ShieldCheck className="w-8 h-8 text-red-500" />, count: "100%", label: "قطع غيار مضمونة وضمان حقيقي" }
  ];

  return (
    <section id="reviews" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Workshop statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-slate-900/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl text-center relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-2xl md:text-4xl font-black text-white font-mono">{stat.count}</h3>
              <p className="text-slate-400 text-xs md:text-sm mt-2 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="text-red-500 font-bold tracking-wider text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            آراء وتجارب عملائنا
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            ماذا يقول عملاؤنا عن تجربة الصيانة؟
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg">
            فخورون بالثقة الكبيرة التي يبنيها عملاؤنا معنا في الرياض والمناطق المجاورة. هذه بعض تقييماتهم الموثقة لمستويات الدقة والخدمة.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              className="bg-slate-900/20 border border-slate-800/80 p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-red-500/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                <div>
                  <h4 className="text-white font-bold text-sm">{rev.author}</h4>
                  <p className="text-[11px] text-red-500 font-bold mt-1">السيارة: {rev.car}</p>
                </div>
                <div className="bg-slate-950 px-2 py-1 rounded text-[10px] text-slate-500 font-semibold border border-slate-850">
                  عميل موثق ✓
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
