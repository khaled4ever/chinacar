import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Phone, Car, FileText, CheckCircle2, Trash2, ShieldCheck, Ticket } from 'lucide-react';
import { Booking } from '../types';

interface BookingFormProps {
  preFilledBrand: string;
  preFilledModel: string;
  preFilledServiceId: string;
  preFilledNotes: string;
  onClearPreFill: () => void;
}

export default function BookingForm({ 
  preFilledBrand, 
  preFilledModel, 
  preFilledServiceId, 
  preFilledNotes,
  onClearPreFill
}: BookingFormProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [carBrand, setCarBrand] = useState('شانجان');
  const [carModel, setCarModel] = useState('');
  const [serviceId, setServiceId] = useState('computer');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [notes, setNotes] = useState('');

  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const brands = ['شانجان', 'جيلي', 'هافال', 'شيري', 'بي واي دي', 'إم جي', 'جيتور', 'إكسيد', 'أخرى'];
  const services = [
    { id: 'computer', name: 'فحص وتشخيص بالكمبيوتر (OBD2)' },
    { id: 'electrical', name: 'صيانة الكهرباء والإلكترونيات الشاملة' },
    { id: 'mechanical', name: 'صيانة ميكانيكا ومحركات التيربو وقير الـ DCT' },
    { id: 'paint', name: 'السمكرة الفنية والدهان الحراري بالفرن' }
  ];

  const times = [
    '08:30 ص', '09:30 ص', '10:30 ص', '11:30 ص', 
    '04:00 م', '05:00 م', '06:00 م', '07:00 م', '08:00 م'
  ];

  // Load existing bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rashood_workshop_bookings');
    if (saved) {
      try {
        setActiveBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing bookings:", e);
      }
    }
  }, []);

  // Sync pre-fills
  useEffect(() => {
    if (preFilledBrand) setCarBrand(preFilledBrand);
    if (preFilledModel) setCarModel(preFilledModel);
    if (preFilledServiceId) setServiceId(preFilledServiceId);
    if (preFilledNotes) setNotes(preFilledNotes);
  }, [preFilledBrand, preFilledModel, preFilledServiceId, preFilledNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!clientName || !clientPhone || !bookingDate || !bookingTime) {
      setFormError("الرجاء إكمال كافة الحقول الإلزامية.");
      return;
    }

    // Google Ads Policy Compliance: check that phone looks like a valid number
    const phoneRegex = /^(05|5|\+9665|009665)\d{8}$/;
    if (!phoneRegex.test(clientPhone.replace(/\s+/g, ''))) {
      setFormError("الرجاء إدخال رقم جوال سعودي صحيح (مثال: 0500000000)");
      return;
    }

    const newBooking: Booking = {
      id: `ROSHOOD-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientPhone,
      carBrand,
      carModel,
      serviceId,
      bookingDate,
      bookingTime,
      notes,
      status: 'confirmed', // Instantly confirm for user convenience
      createdAt: new Date().toLocaleDateString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedBookings = [newBooking, ...activeBookings];
    setActiveBookings(updatedBookings);
    localStorage.setItem('rashood_workshop_bookings', JSON.stringify(updatedBookings));
    
    setSuccessBooking(newBooking);
    
    // Reset form fields
    setClientName('');
    setClientPhone('');
    setCarModel('');
    setNotes('');
    onClearPreFill();
  };

  const handleDeleteBooking = (id: string) => {
    setDeletingId(id);
  };

  const confirmDeleteBooking = (id: string) => {
    const filtered = activeBookings.filter(b => b.id !== id);
    setActiveBookings(filtered);
    localStorage.setItem('rashood_workshop_bookings', JSON.stringify(filtered));
    setDeletingId(null);
  };

  const cancelDeleteBooking = () => {
    setDeletingId(null);
  };

  return (
    <section id="booking" className="py-20 bg-slate-900 border-t border-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="text-red-500 font-bold tracking-wider text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-block mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            حجز موعد صيانة فوري
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            احجز موعدك في دقيقة واحدة
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg">
            قم بجدولة زيارتك لتتجنب الانتظار. سيقوم الفني المختص باستقبال سيارتك فور وصولك للبدء في الفحص المباشر.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Booking Form Card */}
          <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            {successBooking ? (
              // Success invoice panel
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-500/15 border border-green-500 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">تم تأكيد حجز موعدك بنجاح!</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                  سعداء لخدمتك في مركز الرشود. تم توليد بطاقة الحجز الرسمية بنجاح، ويسعدنا استقبالك في الوقت المحدد.
                </p>

                {/* Booking Receipt Details */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 text-right max-w-md mx-auto space-y-4 mb-6 relative overflow-hidden">
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-red-600/10 rounded-full filter blur-xl" />
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-xs text-slate-400 font-bold">رمز الحجز:</span>
                    <span className="text-sm font-bold font-mono text-red-500">{successBooking.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">اسم العميل:</span>
                    <span className="text-white font-bold">{successBooking.clientName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">السيارة:</span>
                    <span className="text-white font-bold">{successBooking.carBrand} {successBooking.carModel || "عام"}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">الخدمة المطلوبة:</span>
                    <span className="text-white font-bold">{services.find(s => s.id === successBooking.serviceId)?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">التاريخ والوقت:</span>
                    <span className="text-white font-bold font-mono bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[11px]">{successBooking.bookingDate} | {successBooking.bookingTime}</span>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setSuccessBooking(null)}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition"
                  >
                    حجز موعد آخر
                  </button>
                  <a
                    href="#active-bookings"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition"
                  >
                    عرض حجوزاتي المجدولة
                  </a>
                </div>
              </motion.div>
            ) : (
              // The form
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs font-bold text-center"
                  >
                    ⚠️ {formError}
                  </motion.div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      اسم العميل ثلاثي <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: خالد العجمان"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-bold"
                      required
                    />
                  </div>

                  {/* Client Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-red-500" />
                      رقم الجوال النشط <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="مثال: 05xxxxxxx"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-mono font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Car Brand */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-red-500" />
                      نوع العلامة الصينية <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={carBrand}
                      onChange={(e) => setCarBrand(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-bold cursor-pointer"
                    >
                      {brands.map(b => (
                        <option key={b} value={b} className="bg-slate-950">{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Car Model / Year */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-red-500" />
                      موديل وسنة الصنع
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: Coolray 2023"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-bold"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    نوع الصيانة المطلوبة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-bold cursor-pointer"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id} className="bg-slate-950">{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      التاريخ المفضل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-mono font-bold cursor-pointer"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      الوقت المفضل <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-bold cursor-pointer"
                      required
                    >
                      <option value="" className="bg-slate-950">اختر موعداً مناسباً</option>
                      {times.map(t => (
                        <option key={t} value={t} className="bg-slate-950">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    ملاحظات فنية أو تفاصيل العطل (اختياري)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="مثال: يرجى فحص القير عند التعشيق في الثالث، أو يوجد تهريب هواء خفيف..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition leading-relaxed placeholder-slate-600"
                  />
                </div>

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs py-3.5 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-red-600/20 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  تأكيد حجز موعد الصيانة
                </button>
              </form>
            )}
          </div>

          {/* Bookings Tracker & Workshop details (5 Cols) */}
          <div id="active-bookings" className="lg:col-span-5 space-y-6">
            {/* Scheduled Appointments Panel */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-6 md:p-8 rounded-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-red-500" />
                حجوزاتي المجدولة في المركز ({activeBookings.length})
              </h3>
              
              {activeBookings.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {activeBookings.map((b) => (
                    <motion.div
                      key={b.id}
                      className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex flex-col gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-start justify-between gap-4 w-full">
                        <div className="space-y-1.5 text-right flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">{b.id}</span>
                            <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded">مؤكد ومحجوز</span>
                          </div>
                          <h4 className="text-white text-xs font-bold leading-none pt-1">
                            {b.carBrand} {b.carModel || "عام"}
                          </h4>
                          <p className="text-[10px] text-slate-400">
                            القسم: {services.find(s => s.id === b.serviceId)?.name}
                          </p>
                          <p className="text-[10px] font-mono font-bold text-slate-300">
                            📅 {b.bookingDate} | ⏰ {b.bookingTime}
                          </p>
                        </div>
                        {deletingId !== b.id && (
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="text-slate-500 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition cursor-pointer shrink-0"
                            title="إلغاء الموعد"
                            id={`btn-cancel-booking-${b.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {deletingId === b.id && (
                        <div className="bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg flex items-center justify-between gap-2">
                          <span className="text-[10px] text-red-400 font-bold">هل أنت متأكد من إلغاء الموعد؟</span>
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => confirmDeleteBooking(b.id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-2.5 py-1 rounded transition cursor-pointer"
                            >
                              نعم، إلغاء
                            </button>
                            <button 
                              onClick={cancelDeleteBooking}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] px-2.5 py-1 rounded transition cursor-pointer"
                            >
                              تراجع
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-xs text-slate-500">لا توجد حجوزات نشطة حالياً لجهازك.</p>
                  <p className="text-[10px] text-slate-600 mt-1">عند حجز موعد، ستظهر بطاقتك التفصيلية هنا لمراجعتها أو إلغائها.</p>
                </div>
              )}
            </div>

            {/* Premium Guarantee Card */}
            <div className="bg-gradient-to-br from-red-950/20 to-slate-950 border border-red-900/20 p-6 rounded-2xl space-y-4">
              <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                ضمان الرشود الذهبي:
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✓</span>
                  <span><strong>ضمان شامل:</strong> نقدم ضماناً خطياً يتراوح بين 30 إلى 180 يوماً على جميع القطع المستبدلة وأجور اليد.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✓</span>
                  <span><strong>فحص كمبيوتر أولي:</strong> خصم خاص 50% على فحص الكمبيوتر لعملاء الموقع عند الحجز المسبق.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✓</span>
                  <span><strong>قطع الغيار الأصلية:</strong> قطع وكالة صينية مع توفير خيارات بديلة معتمدة لتقليل التكاليف دون المساومة على الجودة.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
