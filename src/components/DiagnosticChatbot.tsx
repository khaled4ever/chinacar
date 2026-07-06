import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, AlertTriangle, Send, RefreshCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface DiagnosticChatbotProps {
  onPreFillBooking: (brand: string, model: string, serviceId: string, notes: string) => void;
}

export default function DiagnosticChatbot({ onPreFillBooking }: DiagnosticChatbotProps) {
  const [selectedBrand, setSelectedBrand] = useState('شانجان');
  const [carModel, setCarModel] = useState('');
  const [symptom, setSymptom] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [riskLevel, setRiskLevel] = useState<'none' | 'low' | 'medium' | 'high'>('none');
  const [diagnosticReport, setDiagnosticReport] = useState<string | null>(null);

  const reportEndRef = useRef<HTMLDivElement>(null);

  const brands = ['شانجان', 'جيلي', 'هافال', 'شيري', 'بي واي دي', 'إم جي', 'جيتور', 'إكسيد', 'أخرى'];

  const commonIssues = [
    {
      title: "تأخر أو نتعة في تبديل القير (كلتشات القير)",
      symptom: "نتعة قوية وقاسية وتأخر في التبديل بين السرعات الأولى، خاصة عند تسخين السيارة أو زحام المرور.",
      serviceId: "mechanical"
    },
    {
      title: "مكيف السيارة يقطع عند الوقوف والزحام",
      symptom: "المكيف يبرد بامتياز أثناء الحركة السريعة، لكن عند التوقف والوقوف في الإشارة يقل التبريد تماماً ويفصل مع ارتفاع خفيف في الحرارة.",
      serviceId: "electrical"
    },
    {
      title: "ظهور لمبة المحرك (Check Engine) مع تفتفة ورجفة",
      symptom: "لمبة المكينة الصفراء تومض في الطبلون، مع رجفة واضحة في المحرك وضعف شديد في عزم وتسارع السيارة.",
      serviceId: "computer"
    },
    {
      title: "صوت تصفير أو حنة عند ضغط دواسة الوقود (التيربو)",
      symptom: "صوت صفير هواء حاد ومزعج يشبه الرياح عند زيادة الضغط على دواسة الوقود، مع شعور بفقدان عزم التيربو.",
      serviceId: "mechanical"
    }
  ];

  const loadingMessages = [
    "جاري الاتصال بقاعدة بيانات التشخيص OBD2 للسيارات الصينية...",
    "المهندس الذكي يفحص كودات أعطال الحساسات وضفيرة الكهرباء...",
    "جاري مقارنة العرض مع الأعطال الشائعة لموديلات المصنع...",
    "يتم الآن صياغة التقرير الفني النهائي مع تحديد درجة الخطورة وتوصيات الصيانة..."
  ];

  // Loading simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Scroll to report when diagnostic is generated
  useEffect(() => {
    if (diagnosticReport) {
      reportEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Determine risk level based on keyword detection in report to color-code OBD scanner
      if (diagnosticReport.includes('🔴') || diagnosticReport.includes('حرجة') || diagnosticReport.includes('خطيرة')) {
        setRiskLevel('high');
      } else if (diagnosticReport.includes('🟡') || diagnosticReport.includes('متوسطة') || diagnosticReport.includes('تحذير')) {
        setRiskLevel('medium');
      } else {
        setRiskLevel('low');
      }
    }
  }, [diagnosticReport]);

  const handleSymptomSelect = (issue: typeof commonIssues[0]) => {
    setSymptom(issue.symptom);
  };

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !symptom.trim()) return;

    setIsLoading(true);
    setDiagnosticReport(null);
    setRiskLevel('none');

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: selectedBrand,
          carModel,
          symptom,
          history: chatHistory
        })
      });

      const data = await response.json();
      if (response.ok && data.response) {
        setDiagnosticReport(data.response);
        
        // Add to history
        setChatHistory(prev => [
          ...prev,
          { id: Date.now().toString(), sender: 'user', text: `سيارتي: ${selectedBrand} ${carModel}. العطل: ${symptom}`, timestamp: new Date() },
          { id: (Date.now() + 1).toString(), sender: 'assistant', text: data.response, timestamp: new Date() }
        ]);
      } else {
        throw new Error(data.error || "خطأ في الاتصال بالخادم الذكي");
      }
    } catch (err) {
      console.error(err);
      setDiagnosticReport(`### ⚠️ عذراً، تعذر الاتصال بمستشار الأعطال الذكي حالياً.
لكن لا تقلق! بناءً على وصفك لسيارة **${selectedBrand}**، ننصحك بما يلي:
1. يرجى تجنب القيادة لمسافات طويلة في حال كانت لمبة المحرك تومض باللون الأحمر أو الأصفر.
2. اتصل بمهندسينا فوراً بالضغط على الأزرار العائمة بالأسفل (واتساب أو اتصال مباشر).
3. فحص الكمبيوتر لدينا هو الخطوة المثلى لمعالجة العطل بدقة وحماية الضمان.`);
      setRiskLevel('medium');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDiagnostic = () => {
    setSymptom('');
    setCarModel('');
    setDiagnosticReport(null);
    setRiskLevel('none');
  };

  // Robust Custom Markdown Parser for Diagnostic Report
  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white bg-slate-800/60 px-1 py-0.5 rounded">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const parseMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      let cleanLine = line.trim();
      
      if (cleanLine.startsWith('### ')) {
        return <h4 key={i} className="text-base md:text-lg font-bold text-red-400 mt-4 mb-2 border-r-4 border-red-500 pr-2 pb-0.5">{cleanLine.substring(4)}</h4>;
      }
      if (cleanLine.startsWith('## ')) {
        return <h3 key={i} className="text-lg md:text-xl font-extrabold text-white mt-5 mb-2 border-b border-slate-800 pb-1">{cleanLine.substring(3)}</h3>;
      }
      if (cleanLine.startsWith('# ')) {
        return <h2 key={i} className="text-xl md:text-2xl font-black text-white mt-6 mb-3">{cleanLine.substring(2)}</h2>;
      }
      
      // Check for bullet lists
      if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
        const bulletText = cleanLine.substring(2);
        return (
          <li key={i} className="list-none flex items-start gap-2 text-slate-300 text-xs md:text-sm my-1.5 pr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
            <span>{parseBoldText(bulletText)}</span>
          </li>
        );
      }
      
      // Check for numbered lists
      const numMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        return (
          <div key={i} className="flex items-start gap-2 text-slate-300 text-xs md:text-sm my-1.5 pr-2">
            <span className="font-mono text-red-500 font-bold shrink-0">{numMatch[1]}.</span>
            <span>{parseBoldText(numMatch[2])}</span>
          </div>
        );
      }
      
      if (cleanLine === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-slate-300 text-xs md:text-sm leading-relaxed my-2">{parseBoldText(cleanLine)}</p>;
    });
  };

  const handleFillBookingForm = () => {
    let serviceId = 'computer'; // Default to computer diagnostics
    if (diagnosticReport) {
      if (diagnosticReport.includes('ميكانيك') || diagnosticReport.includes('قير') || diagnosticReport.includes('محرك')) serviceId = 'mechanical';
      else if (diagnosticReport.includes('كهرب') || diagnosticReport.includes('تكييف') || diagnosticReport.includes('حساس')) serviceId = 'electrical';
      else if (diagnosticReport.includes('سمكر') || diagnosticReport.includes('دهان') || diagnosticReport.includes('صدم')) serviceId = 'paint';
    }
    
    onPreFillBooking(selectedBrand, carModel, serviceId, `تم تشخيص المشكلة مسبقاً عبر مستشار الأعطال الذكي. العرض: ${symptom}`);
  };

  return (
    <section id="ai-diagnostics" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Decorative background grids & shapes */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-red-500 font-bold tracking-wider text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
              حصرياً في مركز الرشود
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            مستشار الأعطال الذكي للسيارات الصينية
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg">
            وفر وقتك وجهدك! حدد نوع سيارتك ووصف العطل، وسيقوم نظامنا المدعم بالذكاء الاصطناعي بتحليل المشكلة وتقديم تقرير تشخيصي فوري مع درجة الخطورة وتوصيات الصيانة قبل زيارتك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Diagnostic Inputs Panel (7 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-red-500" />
              أدخل بيانات السيارة والتشخيص
            </h3>

            <form onSubmit={handleDiagnose} className="space-y-5">
              {/* Brand Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">نوع السيارة الصينية:</label>
                <div className="grid grid-cols-3 gap-2">
                  {brands.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`py-2 px-3 text-xs rounded-lg border font-bold transition-all duration-200 cursor-pointer text-center ${
                        selectedBrand === b
                          ? 'bg-red-600 border-red-500 text-white shadow-md'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model & Year */}
              <div>
                <label htmlFor="car-model" className="block text-xs font-semibold text-slate-300 mb-2">الموديل وسنة الصنع (اختياري):</label>
                <input
                  id="car-model"
                  type="text"
                  placeholder="مثال: UNI-K موديل 2023"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-bold placeholder-slate-600"
                />
              </div>

              {/* Symptom Input */}
              <div>
                <label htmlFor="symptom-desc" className="block text-xs font-semibold text-slate-300 mb-2">صف المشكلة أو العرض بالتفصيل:</label>
                <textarea
                  id="symptom-desc"
                  rows={4}
                  placeholder="مثال: لمبة المحرك تومض مع رعشة في المحرك عند الوقوف والسرعات المنخفضة، والمكيف يقل تبريده..."
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-all placeholder-slate-600 leading-relaxed"
                  required
                />
              </div>

              {/* Submit Diagnosis Button */}
              <button
                type="submit"
                disabled={isLoading || !symptom.trim()}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-slate-800 disabled:to-slate-800 text-white font-bold text-xs py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-600/20 shadow-md"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>جاري تشخيص العطل بالذكاء الفني...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>ابدأ الفحص والتشخيص الفوري الآن</span>
                  </>
                )}
              </button>
            </form>

            {/* Common issues templates to pre-fill */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 mb-3">أعطال شائعة جاهزة للتشخيص السريع:</h4>
              <div className="space-y-2">
                {commonIssues.map((issue, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSymptomSelect(issue)}
                    className="w-full text-right bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 p-2.5 rounded-lg text-[11px] text-slate-300 font-bold transition-all block truncate"
                  >
                    💡 {issue.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Display Monitor (7 Cols) - styled like an advanced OBD2 handheld diagnostic tool */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Top diagnostic bar */}
            <div className="bg-slate-900 border-b border-slate-850 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-yellow-400' : 'bg-green-400'}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`} />
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300">OBD-II DIGITAL SCANNER V3.5</span>
              </div>
              <div className="flex gap-1.5">
                {/* Risk Indicators */}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskLevel === 'high' ? 'bg-red-950 text-red-500 border border-red-900/50' : 'bg-slate-900 text-slate-600'}`}>H</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskLevel === 'medium' ? 'bg-yellow-950 text-yellow-500 border border-yellow-900/50' : 'bg-slate-900 text-slate-600'}`}>M</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskLevel === 'low' ? 'bg-green-950 text-green-500 border border-green-900/50' : 'bg-slate-900 text-slate-600'}`}>L</span>
              </div>
            </div>

            {/* Diagnostic Content Body */}
            <div className="p-6 md:p-8 min-h-[420px] max-h-[500px] overflow-y-auto bg-slate-950/90 relative flex flex-col justify-between">
              {/* If loading */}
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <RefreshCw className="w-12 h-12 text-red-500 animate-spin mb-6" />
                    <h4 className="text-lg font-bold text-white mb-2">جاري فحص أنظمة السيارة...</h4>
                    <p className="text-xs text-red-400 max-w-sm font-semibold h-8 animate-pulse">
                      {loadingMessages[loadingStep]}
                    </p>
                    <div className="w-48 bg-slate-900 h-1 rounded-full overflow-hidden mt-6">
                      <div className="bg-red-600 h-1 rounded-full animate-[loading_5s_infinite]" style={{ width: '60%' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Diagnosis Output Screen */}
              <div>
                {diagnosticReport ? (
                  <div className="space-y-2 prose prose-invert max-w-none text-slate-300">
                    {parseMarkdown(diagnosticReport)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
                    <AlertTriangle className="w-14 h-14 text-slate-800 mb-4 animate-bounce" />
                    <h4 className="text-white text-base font-bold mb-1">الشاشة بانتظار بدء الفحص</h4>
                    <p className="text-xs text-slate-500 max-w-md leading-relaxed px-4">
                      املأ نموذج الأعطال بالجانب الأيسر واضغط على "ابدأ الفحص" لتقوم وحدة المساعدة الذكية بإجراء تشخيص وتوليد تقرير OBD2 متكامل ومكتوب ومراجع من المهندس الآلي.
                    </p>
                  </div>
                )}
              </div>

              {/* Anchoring point for scrolling */}
              <div ref={reportEndRef} />
            </div>

            {/* Footer Panel of the OBD Device */}
            {diagnosticReport && (
              <div className="bg-slate-900/90 border-t border-slate-850 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-slate-300 font-bold">تم الانتهاء من صياغة تقرير التشخيص الأولي.</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={resetDiagnostic}
                    className="flex-1 sm:flex-none text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold px-4 py-2 rounded-lg transition-all"
                  >
                    فحص جديد
                  </button>
                  <button
                    onClick={handleFillBookingForm}
                    className="flex-1 sm:flex-none text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-red-600/10 cursor-pointer"
                  >
                    احجز صيانة فورية لحل العطل
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
