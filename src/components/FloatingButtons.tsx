import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingButtons() {
  const phoneNumber = "+966500000000"; // Generic placeholder number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("مرحباً، أود حجز موعد لصيانة سيارتي الصينية.")}`;
  const telUrl = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4 pointer-events-none">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 group"
        title="تواصل عبر الواتساب"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <span className="absolute right-16 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-800">
          راسلنا على الواتساب
        </span>
        <MessageCircle className="w-7 h-7 animate-pulse-slow" />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={telUrl}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:shadow-red-600/50 hover:scale-110 transition-all duration-300 group"
        title="اتصل بنا الآن"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <span className="absolute right-16 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-800">
          اتصل بنا هاتفياً
        </span>
        <Phone className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
