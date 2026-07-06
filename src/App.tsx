import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Paintbrush, 
  Settings, 
  ChevronDown, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';

import ServicesSection from './components/ServicesSection';
import BrandsSection from './components/BrandsSection';
import DiagnosticChatbot from './components/DiagnosticChatbot';
import BookingForm from './components/BookingForm';
import ReviewSection from './components/ReviewSection';
import FaqSection from './components/FaqSection';
import FloatingButtons from './components/FloatingButtons';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States to coordinate pre-filling of the booking form from chatbot or service cards
  const [preFillBrand, setPreFillBrand] = useState('');
  const [preFillModel, setPreFillModel] = useState('');
  const [preFillServiceId, setPreFillServiceId] = useState('');
  const [preFillNotes, setPreFillNotes] = useState('');

  const handlePreFillBooking = (brand: string, model: string, serviceId: string, notes: string) => {
    setPreFillBrand(brand);
    setPreFillModel(model);
    setPreFillServiceId(serviceId);
    setPreFillNotes(notes);
    
    // Smooth scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreFill = () => {
    setPreFillBrand('');
    setPreFillModel('');
    setPreFillServiceId('');
    setPreFillNotes('');
  };

  const handleSelectServiceFromCard = (serviceId: string) => {
    setPreFillServiceId(serviceId);
    
    // Smooth scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'خدماتنا', href: '#services' },
    { label: 'الفحص الذكي بالذكاء الاصطناعي', href: '#ai-diagnostics' },
    { label: 'العلامات التخصصية', href: '#brands' },
    { label: 'حجز موعد', href: '#booking' },
    { label: 'آراء العملاء', href: '#reviews' },
    { label: 'الأسئلة الشائعة', href: '#faq' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:bg-red-700 transition-colors">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white leading-none tracking-tight">مركز الرشود</h1>
              <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-widest">صيانة السيارات الصينية</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-red-500 font-semibold text-xs transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Call-to-Action button */}
          <div className="hidden lg:block">
            <a
              href="#booking"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-red-600/10 hover:shadow-red-600/20"
            >
              حجز موعد فوري
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-slate-950 border-b border-slate-900 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-3.5">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-red-500 font-bold text-xs py-1 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-lg text-center mt-2 block transition"
                >
                  حجز موعد فوري
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative py-24 md:py-32 overflow-hidden bg-slate-950 border-b border-slate-900">
        {/* Background Image with advanced overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/workshop_hero_1783345604221.jpg" 
            alt="Elite Workshop Hero" 
            className="w-full h-full object-cover opacity-25 object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text Contents */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <motion.div
              className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 px-3 py-1.5 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 font-black text-xs">أول مركز متخصص لصيانة السيارات الصينية بالرياض</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-black text-white leading-tight md:leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              وداعاً لحيرة صيانة <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-red-500 via-red-600 to-red-400">سيارتك الصينية الحديثة!</span>
            </motion.h1>

            <motion.p
              className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              كهرباء، ميكانيكا، فحص كمبيوتر دقيق، وسمكرة ودهان حراري. نملك كادراً هندسياً متخصصاً بالكامل في السيارات الصينية وأحدث برمجيات الوكالة (شانجان، جيلي، هافال، شيري، بي واي دي، إم جي).
            </motion.p>

            {/* Bullet features */}
            <motion.div 
              className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl">
                <Cpu className="w-4 h-4 text-red-500" />
                <span>فحص كمبيوتر وبرمجة قير</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>كهرباء وضفائر دقيقة</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl">
                <Settings className="w-4 h-4 text-blue-500" />
                <span>ميكانيكا وتوضيب محركات</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl">
                <Paintbrush className="w-4 h-4 text-purple-500" />
                <span>سمكرة تعديل PDR ودهان فرن</span>
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#booking"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-4 px-8 rounded-xl text-center transition shadow-lg shadow-red-600/10 hover:shadow-red-600/20 cursor-pointer"
              >
                حجز موعد صيانة الآن
              </a>
              <a
                href="#ai-diagnostics"
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-750 text-white font-bold text-xs py-4 px-8 rounded-xl text-center transition flex items-center justify-center gap-2"
              >
                <Cpu className="w-4 h-4 text-red-500 animate-spin" />
                افحص سيارتك بالذكاء الاصطناعي
              </a>
            </motion.div>
          </div>

          {/* Hero Badge Monitor mockup (5 Cols) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Highlight card */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg animate-float">
                ضمان خطي معتمد 🎖️
              </div>

              <h3 className="text-xl font-bold text-white mb-4">لماذا مركز الرشود؟</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">ضمان يصل إلى 6 شهور</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">ضمان حقيقي خطي على القطع والصيانة لحفظ حقوقك وتوفير الطمأنينة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">أحدث أكواد السوفتوير</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">برمجيات وحواسيب فحص مخصصة ومحدثة لربط سيارات Changan, Geely, Haval مباشرة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <Settings className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">كادر مدرب بالوكالات</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">مهندسون فلبينيون وعرب من ذوي الخبرة الطويلة بالأنظمة الإلكترونية والكهربائية الصينية.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE SECTIONS */}
      <ServicesSection onSelectService={handleSelectServiceFromCard} />
      
      {/* GEMINI AI DIAGNOSTICS */}
      <DiagnosticChatbot onPreFillBooking={handlePreFillBooking} />

      <BrandsSection />

      {/* INTERACTIVE BOOKING FORM */}
      <BookingForm 
        preFilledBrand={preFillBrand}
        preFilledModel={preFillModel}
        preFilledServiceId={preFillServiceId}
        preFilledNotes={preFillNotes}
        onClearPreFill={handleClearPreFill}
      />

      <ReviewSection />

      <FaqSection />

      {/* CONTACT / LOCATION MAP SECTION */}
      <section id="contact" className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Contact Information & Hours (6 Cols) */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-red-500 font-bold text-xs bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block mb-3">
                  تفضل بزيارتنا في الرياض
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">مركزنا مفتوح وجاهز لاستقبالك</h2>
                <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                  تفضل بزيارتنا في موقعنا المميز شمال الرياض لإجراء فحص الكمبيوتر أو الصيانة الدورية. يمكنك شرب القهوة في صالة الانتظار ريثما يتم تشخيص سيارتك.
                </p>
              </div>

              {/* Detail Points */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-red-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">العنوان والموقع:</h4>
                    <p className="text-xs text-slate-400 mt-1">المملكة العربية السعودية، الرياض، حي الياسمين - صناعية الشمال (مخرج 5)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-red-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">أوقات العمل المعتمدة:</h4>
                    <p className="text-xs text-slate-400 mt-1">السبت - الخميس: من 8:30 صباحاً حتى 12:30 ظهراً | من 4:00 عصراً حتى 9:00 مساءً</p>
                    <p className="text-xs text-red-500 font-bold mt-1">الجمعة: مغلق (إجازة أسبوعية)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-red-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">أرقام التواصل وحجز السطحة:</h4>
                    <p className="text-xs text-slate-400 mt-1">هاتف المركز: <span className="font-mono text-white font-bold">0500000000</span> (اتصال أو واتساب)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive map visualization (6 Cols) */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/5 rounded-full filter blur-xl pointer-events-none" />
                <h3 className="text-white font-bold text-base mb-4">خرائط جوجل المباشرة</h3>
                
                {/* Mock Map canvas with styled lines representing a city route */}
                <div className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
                  {/* Decorative background grid of roads */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute w-full h-0.5 bg-slate-800 top-1/3" />
                  <div className="absolute w-full h-0.5 bg-slate-800 top-2/3" />
                  <div className="absolute h-full w-0.5 bg-slate-800 right-1/4" />
                  <div className="absolute h-full w-0.5 bg-slate-800 right-2/4" />
                  
                  {/* Styled Route line */}
                  <div className="absolute w-1/2 h-1 bg-gradient-to-l from-red-600 to-red-400 right-1/4 top-1/3 rounded-full" />
                  <div className="absolute h-1/3 w-1 bg-gradient-to-t from-red-600 to-red-400 right-2/4 top-1/3 rounded-full" />
                  
                  {/* Pulse of location */}
                  <div className="absolute right-2/4 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
                    <span className="flex h-5 w-5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 border-2 border-white items-center justify-center">
                        <Wrench className="w-2.5 h-2.5 text-white" />
                      </span>
                    </span>
                  </div>

                  <div className="absolute text-center bg-slate-900/90 border border-slate-800 p-4 rounded-xl max-w-xs">
                    <p className="text-xs font-bold text-white">مركز الرشود لصيانة السيارات الصينية</p>
                    <p className="text-[10px] text-slate-400 mt-1">صناعية الشمال - حي الياسمين - الرياض</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-3 py-1.5 rounded mt-3 inline-block transition cursor-pointer"
                    >
                      افتح الموقع في خرائط جوجل 🧭
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs text-right mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Logo and brief */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-bold text-white">مركز الرشود لصيانة السيارات الصينية</h2>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              المركز الأول المجهز بالكامل بأحدث الأجهزة لخدمات الميكانيكا، الكهرباء، فحص الكمبيوتر المتقدم والبرمجة، وسمكرة ودهان السيارات الصينية الحديثة بالرياض.
            </p>
          </div>

          {/* Quick scroll links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-2">
            <a href="#services" className="hover:text-red-500 transition-colors">أقسام الصيانة</a>
            <a href="#ai-diagnostics" className="hover:text-red-500 transition-colors">مستشار الأعطال الذكي</a>
            <a href="#brands" className="hover:text-red-500 transition-colors">العلامات المدعومة</a>
            <a href="#booking" className="hover:text-red-500 transition-colors">جدولة موعد صيانة</a>
          </div>

          {/* Copyrights */}
          <div className="md:col-span-3 text-right space-y-1">
            <p className="text-slate-400 font-bold">اتصل بنا: 0500000000</p>
            <p className="text-[11px] text-slate-600">© {new Date().getFullYear()} مركز الرشود. جميع الحقوق محفوظة.</p>
            <p className="text-[10px] text-slate-600">مصمم بجودة واحترافية متناهية لخدمتكم.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING CONTACT BUTTONS */}
      <FloatingButtons />
    </div>
  );
}
