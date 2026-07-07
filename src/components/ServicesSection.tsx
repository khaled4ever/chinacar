import { useState, useEffect } from 'react';
import { Cpu, Zap, Settings, Paintbrush, Clock, ShieldCheck, HelpCircle, Compass, Link, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { WorkshopService } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [copiedServiceId, setCopiedServiceId] = useState<string | null>(null);

  const services: WorkshopService[] = [
    {
      id: 'computer',
      title: 'فحص وتشخيص بالكمبيوتر البرمجي',
      description: 'فحص شامل وحصري لجميع كودات الأعطال والكمبيوترات الفرعية للسيارات الصينية بأحدث الأجهزة المعيارية.',
      icon: 'Cpu',
      details: [
        'قراءة وتحليل أكواد الأعطال (DTC) لجميع الأنظمة الإلكترونية',
        'برمجة الحساسات وإعادة ضبط كمبيوتر السيارة الرئيسي (ECU)',
        'برمجة قير السيارات الصينية (تعريف وتحديث الكلتشات والبرمجيات)',
        'فحص حزمة البطاريات والمحركات للسيارات الصينية الهجينة والكهربائية (EV/Hybrid)'
      ],
      estimatedTime: '30 - 45 دقيقة',
      basePrice: 'تبدأ من 150 ريال',
      image: 'https://i.postimg.cc/Fs5SyRM2/Chat-GPT-Image-13-mayw-2026-12-17-10-s.png'
    },
    {
      id: 'electrical',
      title: 'صيانة وتصليح الكهرباء والأنظمة الإلكترونية',
      description: 'إصلاح دقيق لشبكات الحساسات المعقدة، التكييف، الشاشات التفاعلية، والضفائر في السيارات الصينية.',
      icon: 'Zap',
      details: [
        'تشخيص وإصلاح ضفائر الكهرباء والتماسات الحساسة للسيارات الصينية',
        'صيانة نظام التكييف الذكي وإعادة شحن الفريون مع كشف التسريب الإلكتروني',
        'إصلاح وبرمجة الشاشات التفاعلية والعدادات الرقمية وكاميرات 360 درجة',
        'تغيير وبرمجة بطاريات التشغيل والأنظمة المساعدة وبصمة الدخول الذكي'
      ],
      estimatedTime: '1 - 3 ساعات',
      basePrice: 'حسب الفحص والتشخيص',
      image: 'https://i.postimg.cc/pr37P9Ln/fhs-alnzam-alkhrbayy-llsyart.png'
    },
    {
      id: 'mechanical',
      title: 'صيانة الميكانيكا والمحركات الحديثة',
      description: 'توظيب وصيانة محركات التيربو الحديثة ونواقل الحركة (القير) المزدوجة والمقود والفرامل.',
      icon: 'Settings',
      details: [
        'صيانة وتوضيب محركات التيربو الصغيرة الحديثة (1.5T & 2.0T)',
        'إصلاح وصيانة قير الـ DCT المزدوج الـكلتشات وقير الـ CVT والمساعدات',
        'تغيير الزيوت المعتمدة والفلاتر الاستهلاكية بمواصفات المصنع الصيني',
        'إصلاح مشاكل تهريب السوائل، والفرامل الإلكترونية (EPB)، والمساعدات'
      ],
      estimatedTime: 'ساعتين - يومين',
      basePrice: 'تعتمد على نوع قطع الغيار',
      image: 'https://i.postimg.cc/P5QPbZKh/Chat-GPT-Image-5-mayw-2026-08-24-35-m.png'
    },
    {
      id: 'paint',
      title: 'السمكرة الفاخرة والدهان بالفرن الحراري',
      description: 'إعادة سيارتك لحالة الوكالة باستخدام أحدث تقنيات تعديل الصدمات ومطابقة الألوان إلكترونياً.',
      icon: 'Paintbrush',
      details: [
        'تعديل الصدمات بدون دهان (PDR) بأحدث الأجهزة اليدوية والمغناطيسية',
        'رش كامل أو جزئي داخل فرن حراري متطور لضمان النعومة واللمعان',
        'مطابقة وتوليف درجات الألوان بالكمبيوتر بدقة 100% لمختلف درجات اللؤلؤ والميتاليك',
        'معالجة وتلميع الخدوش السطحية ووضع طبقات النانو سيراميك لحماية الطلاء'
      ],
      estimatedTime: 'يوم - 5 أيام',
      basePrice: 'تخضع لمعاينة الفني المباشرة',
      image: 'https://i.postimg.cc/GhsVqjXt/samkra.png'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-8 h-8 text-red-500" />;
      case 'Zap': return <Zap className="w-8 h-8 text-yellow-500" />;
      case 'Settings': return <Settings className="w-8 h-8 text-blue-500" />;
      case 'Paintbrush': return <Paintbrush className="w-8 h-8 text-purple-500" />;
      default: return <Settings className="w-8 h-8 text-red-500" />;
    }
  };

  const getSmallIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-red-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'Settings': return <Settings className="w-4 h-4 text-blue-500" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4 text-purple-500" />;
      default: return <Settings className="w-4 h-4 text-red-500" />;
    }
  };

  const scrollToService = (id: string) => {
    const element = document.getElementById(`service-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Update hash in URL silently
      if (window.location.hash !== `#service-${id}`) {
        window.history.pushState(null, '', `#service-${id}`);
      }

      // Temporary highlight effect
      element.classList.add('ring-2', 'ring-red-500/50', 'border-red-500/50', 'shadow-[0_0_20px_rgba(239,68,68,0.2)]');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-red-500/50', 'border-red-500/50', 'shadow-[0_0_20px_rgba(239,68,68,0.2)]');
      }, 2000);
    }
  };

  const handleCopyLink = (serviceId: string) => {
    const link = `${window.location.origin}${window.location.pathname}#service-${serviceId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedServiceId(serviceId);
      setTimeout(() => {
        setCopiedServiceId(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  };

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#service-')) {
        const id = hash.replace('#service-', '');
        setTimeout(() => {
          scrollToService(id);
        }, 600);
      }
    };

    // Run on mount
    checkHash();

    window.addEventListener('hashchange', checkHash);
    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="text-red-500 font-bold tracking-wider text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            تخصص واحترافية متكاملة
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-black text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            أقسام صيانة سيارتك الصينية
          </motion.h2>
          <motion.p 
            className="text-slate-400 mt-4 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            نجمع بين عمق التخصص بالسيارات الصينية الحديثة وأحدث أجهزة التكنولوجيا لنضمن لك خدمة ترتقي لتطلعاتك وتحافظ على ضمان سيارتك.
          </motion.p>
        </div>

        {/* Quick Navigation Links */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 bg-slate-900/30 border border-slate-900/80 p-4 rounded-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm font-bold text-slate-400 shrink-0 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-red-500 animate-spin-slow" />
            انتقل سريعاً إلى القسم:
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToService(service.id)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-red-500/40 text-slate-300 hover:text-white rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-sm hover:shadow-red-500/5 hover:-translate-y-0.5 active:translate-y-0"
              >
                {getSmallIcon(service.icon)}
                <span className="font-semibold">{service.title}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-red-500/30 transition-all duration-300 relative group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              id={`service-card-${service.id}`}
            >
              {/* Card background glowing gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600/10 to-transparent rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Service Image Section */}
              <div className="w-full md:w-44 h-44 shrink-0 rounded-xl overflow-hidden relative border border-slate-800">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 p-2 rounded-lg">
                  {getIcon(service.icon)}
                </div>
              </div>

              {/* Service Details Section */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-500 transition-colors duration-300 leading-snug">
                    {service.title}
                  </h3>
                  <button
                    onClick={() => handleCopyLink(service.id)}
                    title="نسخ رابط الخدمة المباشر"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/60 hover:bg-slate-900 border border-slate-800/80 hover:border-red-500/40 text-slate-400 hover:text-white rounded-xl text-xs transition-all duration-300 cursor-pointer shrink-0 shadow-sm"
                  >
                    {copiedServiceId === service.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[10px] font-bold text-green-400">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">نسخ الرابط</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Sub-details list */}
                <ul className="mt-4 space-y-2">
                  {service.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start text-xs text-slate-300 gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Info Bar & Booking Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      الزمن: {service.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      {service.basePrice}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 cursor-pointer hover:shadow-lg hover:shadow-red-600/20"
                    id={`btn-select-${service.id}`}
                  >
                    حجز الموعد الآن
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
