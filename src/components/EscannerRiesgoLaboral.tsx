import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  X, 
  MessageCircle,
  RotateCcw
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  weight: number;
}

const QUESTIONS: Question[] = [
  { id: 1, text: '¿Tiene contratos de trabajo firmados por escrito para todos sus trabajadores?', weight: 15 },
  { id: 2, text: '¿Cumple con el pago oportuno de la seguridad social (Salud, Pensión y ARL) de todo su personal?', weight: 20 },
  { id: 3, text: '¿Realiza provisiones cada mes para prestaciones sociales?', weight: 12 },
  { id: 4, text: '¿Lleva un registro claro de horas extras y recargos nocturnos pagados?', weight: 12 },
  { id: 5, text: '¿Cuenta con un Reglamento Interno de Trabajo actualizado y publicado?', weight: 10 },
  { id: 6, text: '¿Tiene implementado el SG-SST (Sistema de Gestión de la Seguridad y Salud en el Trabajo)?', weight: 15 },
  { id: 7, text: '¿Entrega y registra formalmente la dotación de ley (para quienes ganan hasta 2 SMMLV)?', weight: 8 },
  { id: 8, text: '¿Tiene conformado el Comité de Convivencia Laboral?', weight: 8 }
];

interface EscannerRiesgoLaboralProps {
  onClose: () => void;
}

export default function EscannerRiesgoLaboral({ onClose }: EscannerRiesgoLaboralProps) {
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>(() => {
    try {
      const saved = localStorage.getItem('escaner_laboral_v26');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    localStorage.setItem('escaner_laboral_v26', JSON.stringify(answers));
  }, [answers]);

  const completedCount = Object.keys(answers).length;
  const progress = Math.round((completedCount / QUESTIONS.length) * 100);
  
  const score = useMemo(() => {
    return QUESTIONS.reduce((acc, q) => answers[q.id] === 'yes' ? acc + q.weight : acc, 0);
  }, [answers]);

  const resetApp = () => {
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const isPerfect = score === 100;
    const waMessage = isPerfect 
      ? `👉 Hola Oscar Darío, saqué 100%, pero quiero confirmar que no haya errores ocultos que puedan costarme dinero más adelante..`
      : `Hola Oscar Darío, mi empresa sacó ${score}% en el escáner. DIME DÓNDE ME VAN A MULTAR.`;

    return (
      <div className="w-full max-w-xl mx-auto p-4 md:p-0">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-slate-900 overflow-hidden">
          <div className="bg-slate-900 p-8 md:p-12 text-center relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-white font-black uppercase tracking-widest text-xs mb-4">Estado de Vulnerabilidad</h2>
            <div className={`inline-block px-8 py-3 rounded-xl border-2 font-black text-2xl bg-white ${isPerfect ? 'text-emerald-600 border-emerald-600' : 'text-red-600 border-red-600'}`}>
              {isPerfect ? 'CUMPLIMIENTO TOTAL' : 'RIESGO ELEVADO'}
            </div>
          </div>
          
          <div className="p-8 md:p-12 text-center space-y-10">
            <div>
              <div className="text-[100px] md:text-[120px] font-black text-slate-900 leading-none tracking-tighter">{score}%</div>
              <p className="text-slate-900 font-black uppercase text-xs tracking-widest mt-4 leading-tight text-center">
                {isPerfect ? 'Fortaleza de Cumplimiento Normativo' : 'Riesgo de pérdida económica'}
              </p>
            </div>

            <div className={`${isPerfect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'} p-6 md:p-8 rounded-3xl border-2 font-black text-lg leading-tight shadow-sm text-center`}>
              {isPerfect 
                ? "EXCELENTE! Tu empresa cumple con los estándares. Contacta a Oscar Darío para mantener y optimizar tus beneficios fiscales."
                : "ALERTA: Podrías estar perdiendo dinero o exponiéndote a multas fuertes sin darte cuenta."}
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => window.open(`https://wa.me/573113355169?text=${encodeURIComponent(waMessage)}`, '_blank')}
                className="flex flex-col items-center justify-center w-full py-6 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-600 transition-all active:scale-95 uppercase text-lg px-6 text-center leading-tight">
                <span className="text-sm opacity-90">
                  {isPerfect ? 'Oscar Darío: QUIERO CONFIRMAR ERRORES OCULTOS.' : 'Oscar Darío: DIME DÓNDE ME VAN A MULTAR.'}
                </span>
              </button>
              <button onClick={resetApp} className="text-slate-900 text-xs font-black uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:text-red-600 transition-colors mx-auto flex items-center gap-2">
                <RotateCcw size={14} /> Reiniciar Escáner
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4 md:p-0">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-slate-900 overflow-hidden text-left">
        <div className="bg-slate-900 p-8 md:p-12 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">Escáner de <span className="text-red-500">Multas</span> Laborales</h1>
          <p className="text-white text-base font-bold italic opacity-90">“Descubre cuánto dinero podrías perder por errores que hoy no estás viendo”</p>
        </div>
        <div className="h-4 w-full bg-slate-100 border-b-2 border-slate-900">
          <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="p-6 md:p-10">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 md:p-8 flex items-start gap-5 mb-12">
            <AlertTriangle className="text-red-600 shrink-0" size={24} />
            <p className="text-red-900 text-sm font-black leading-snug uppercase">Cada ‘NO’ es un punto donde te pueden multar o demandar.</p>
          </div>
          <div className="space-y-16">
            {QUESTIONS.map((q, idx) => (
              <div key={q.id}>
                <div className="flex items-start gap-5 mb-8">
                  <span className="bg-slate-900 text-white font-black text-xs w-8 h-8 flex items-center justify-center rounded-xl shrink-0">{idx + 1}</span>
                  <p className="text-slate-900 font-black text-xl leading-tight">{q.text}</p>
                </div>
                <div className="grid grid-cols-2 gap-6 pl-4 md:pl-12">
                  <button 
                    onClick={() => setAnswers({...answers, [q.id]: 'yes'})} 
                    className={`py-5 rounded-2xl font-black border-4 transition-all ${answers[q.id] === 'yes' ? 'bg-emerald-500 border-slate-900 text-white shadow-lg scale-95' : 'bg-white border-slate-100 text-slate-900'}`}
                  >
                    SÍ
                  </button>
                  <button 
                    onClick={() => setAnswers({...answers, [q.id]: 'no'})} 
                    className={`py-5 rounded-2xl font-black border-4 transition-all ${answers[q.id] === 'no' ? 'bg-red-600 border-slate-900 text-white shadow-lg scale-95' : 'bg-white border-slate-100 text-slate-900'}`}
                  >
                    NO
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 pt-10 border-t-4 border-slate-900 text-center">
            {completedCount === QUESTIONS.length ? (
              <button 
                onClick={() => { setShowResult(true); }} 
                className="w-full py-8 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-lg active:scale-95"
              >
                VER MI RIESGO FINANCIERO
              </button>
            ) : (
              <div className="py-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-400 text-center">
                <p className="text-slate-900 font-black uppercase text-xs tracking-widest">Responda todas las preguntas ({completedCount}/8)</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-50 p-8 md:p-12 text-center border-t-4 border-slate-900">
          <button 
            onClick={() => window.open(`https://wa.me/573113355169?text=Hola%20Oscar%20Darío,%20necesito%20saber%20dónde%20me%20pueden%20sancionar.`, '_blank')}
            className="text-sm font-black text-slate-900 hover:text-emerald-600 uppercase tracking-[0.1em] block mb-4 inline-block border-b-2 border-slate-900 pb-1 transition-colors mx-auto flex items-center gap-2"
          >
            <MessageCircle size={16} /> Oscar Darío: Quiero saber dónde me pueden sancionar
          </button>
          <div className="text-xs text-slate-900 font-black uppercase tracking-widest opacity-60">Auditoría y Protección Patrimonial</div>
        </div>
      </div>
    </div>
  );
}


