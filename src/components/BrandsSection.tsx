import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CarBrand } from '../types';
import { CheckCircle, ShieldAlert, Settings, Cpu } from 'lucide-react';

export default function BrandsSection() {
  const brands: CarBrand[] = [
    {
      id: 'changan',
      name: 'شانجان',
      englishName: 'Changan',
      logo: 'https://1000logos.net/wp-content/uploads/2021/03/changan-logo.png',
      description: 'أكبر مصنعي السيارات الصينية الذكية. نتميز ببرمجة وتعديل أنظمة راداراتها والتحكم بقير الـ Aisin المعتمد لديهم.',
      commonModels: ['UNI-K', 'UNI-T', 'CS95', 'CS75 Plus', 'Eado Plus']
    },
    {
      id: 'geely',
      name: 'جيلي',
      englishName: 'Geely',
      logo: 'https://1000logos.net/wp-content/uploads/2020/04/Geely-Logo-2014.png',
      description: 'شريك فولفو وصانع سيارة توجيلا الرياضية. نمتلك الأكواد البرمجية الأصلية لفحص وصيانة محركات 3 سلندرات تيربو والـ DCT الهجين.',
      commonModels: ['Tugella', 'Monjaro', 'Coolray', 'Emgrand', 'Okavango']
    },
    {
      id: 'haval',
      name: 'هافال',
      englishName: 'Haval',
      logo: 'https://1000logos.net/wp-content/uploads/2020/10/Haval-Logo-2013.png',
      description: 'المتخصصة في سيارات SUV والدفع الرباعي من مجموعة جريت وول. نوفر فحصاً مخصصاً لأنظمة الدبل، الدفع الذكي، وحساسات التوجيه.',
      commonModels: ['H6', 'Dargo', 'Jolion', 'H9']
    },
    {
      id: 'chery',
      name: 'شيري',
      englishName: 'Chery',
      logo: 'https://1000logos.net/wp-content/uploads/2020/04/Chery-Logo.png',
      description: 'رائدة سيارات التيجو وتكنولوجيا محركات الأكتيكو. متخصصون في برمجة قير الـ CVT وإعادة تهيئة حساسات المناخ والمحرك.',
      commonModels: ['Tiggo 8 Pro', 'Tiggo 7 Pro', 'Arrizo 6 Pro', 'Tiggo 4']
    },
    {
      id: 'byd',
      name: 'بي واي دي',
      englishName: 'BYD',
      logo: 'https://1000logos.net/wp-content/uploads/2020/07/BYD-Logo.png',
      description: 'عملاق السيارات الهجينة والكهربائية بالكامل. نوفر فحص خلايا بطاريات بليد (Blade Battery) والتحكم بالمحركات الكهربائية المتطورة.',
      commonModels: ['Han EV', 'Atto 3', 'Song Plus', 'Qin Plus']
    },
    {
      id: 'mg',
      name: 'إم جي',
      englishName: 'MG',
      logo: 'https://1000logos.net/wp-content/uploads/2021/10/MG-Logo-2010.png',
      description: 'السيارات البريطانية الأصل بإدارة صينية متطورة (SAIC). نتميز بإصلاح مشاكل التيربو الساخن والبرمجة الكاملة لكمبيوتر الماكينة.',
      commonModels: ['MG 6', 'MG RX8', 'MG HS', 'MG ZS', 'MG GT']
    },
    {
      id: 'jetour',
      name: 'جيتور',
      englishName: 'Jetour',
      logo: 'https://1000logos.net/wp-content/uploads/2023/12/Jetour-Emblem.png',
      description: 'الفرع الفاخر من شيري المصمم للرحلات العائلية والرفاهية. متخصصون في صيانة تعليقها الهوائي والأنظمة الترفيهية الفخمة.',
      commonModels: ['Dashing', 'X70 Plus', 'X90 Plus', 'T2']
    },
    {
      id: 'exeed',
      name: 'إكسيد',
      englishName: 'Exeed',
      logo: 'https://1000logos.net/wp-content/uploads/2023/12/Exeed-Logo.jpg',
      description: 'البراند الرياضي الفخم فائق الأداء والذكاء. نوفر برمجة أنظمة القيادة الذاتية الفائقة (ADAS) وصيانة قير الـ 7DCT المتطور.',
      commonModels: ['RX', 'VX', 'TXL', 'LX']
    }
  ];

  const [activeBrandId, setActiveBrandId] = useState<string>('changan');
  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0];

  return (
    <section id="brands" className="py-20 bg-slate-900 border-t border-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="text-red-500 font-bold tracking-wider text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            رواد صيانة العلامات الصينية
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            العلامات الصينية التي نتخصص بصيانتها
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            لسنا ورشة عامة؛ نحن متخصصون بعمق في الخصائص الهندسية والبرمجيات الخاصة بكل مصنع صيني لتشخيص وعلاج دقيق.
          </p>
        </div>

        {/* Brand selection grid/scroll */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-8 gap-3 sm:gap-4 mb-10 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
          {brands.map((brand) => {
            const isActive = brand.id === activeBrandId;
            return (
              <button
                key={brand.id}
                onClick={() => setActiveBrandId(brand.id)}
                className={`py-4 px-3 sm:py-5 sm:px-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0 w-[120px] sm:w-auto snap-center ${
                  isActive 
                    ? 'bg-red-600/15 border-red-500 text-white shadow-lg shadow-red-600/5' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
                id={`brand-tab-${brand.id}`}
              >
                {brand.logo.startsWith('http') ? (
                  <div className="h-8 flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="h-8 w-auto object-contain filter brightness-100" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <span className="text-2xl">{brand.logo}</span>
                )}
                <span className="font-bold text-sm">{brand.name}</span>
                <span className="text-[10px] uppercase font-mono opacity-60 tracking-wider">{brand.englishName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Brand Dashboard Detail */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBrand.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Info: description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  {activeBrand.logo.startsWith('http') ? (
                    <div className="h-12 w-20 flex items-center justify-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <img 
                        src={activeBrand.logo} 
                        alt={activeBrand.name} 
                        className="h-full w-full object-contain" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <span className="text-4xl">{activeBrand.logo}</span>
                  )}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                      {activeBrand.name} <span className="text-sm font-mono text-slate-500 font-normal">({activeBrand.englishName})</span>
                    </h3>
                    <p className="text-xs text-red-500 font-semibold mt-1">✓ قسم هندسي مجهز بالبرمجيات الرسمية</p>
                  </div>
                </div>

                <p className="text-slate-300 text-base leading-relaxed">
                  {activeBrand.description}
                </p>

                {/* Grid of specifications and special diagnostic checks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 flex gap-3">
                    <Cpu className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs font-bold">أنظمة البرمجة الحصرية</h4>
                      <p className="text-slate-400 text-[11px] mt-1">تحديث وتصحيح سوفتوير القير والمحرك، برمجيات الرادارات ومطابقة الكودات.</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 flex gap-3">
                    <Settings className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs font-bold">قطع الغيار والدعم الفني</h4>
                      <p className="text-slate-400 text-[11px] mt-1">نوفر قطع غيار أصلية أو OEM مستوردة من الموردين المعتمدين في الصين والوكلاء المحليين.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Info: Common models they work on */}
              <div className="lg:col-span-5 bg-slate-900/40 p-6 md:p-8 rounded-xl border border-slate-800/60">
                <h4 className="text-white font-bold text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  الموديلات الأكثر شيوعاً في صيانة المركز:
                </h4>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {activeBrand.commonModels.map((model, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 hover:border-red-500/30 py-2.5 px-4 rounded-lg text-slate-200 text-xs font-bold text-center font-mono tracking-wide transition-all"
                    >
                      {model}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-3 bg-red-950/20 border border-red-900/30 rounded-lg flex gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <strong>ملاحظة فنية:</strong> السيارات الصينية تحتوي على شبكات كمبيوتر معقدة (CAN-BUS) وحساسات حساسة جداً للكهرباء؛ أي خطأ بسيط في ورشة غير متخصصة قد يتسبب في تعطيل الشاشات أو كمبيوتر الماكينة بشكل دائم.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
