import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  ShieldCheck, 
  X,
  MessageCircle,
  Wallet,
  Shield,
  Strikethrough,
  Home,
  TrendingUp,
  Umbrella,
  Info
} from 'lucide-react';

interface EstrategiaDeUtilidadesProps {
  onClose: () => void;
}

export default function EstrategiaDeUtilidades({ onClose }: EstrategiaDeUtilidadesProps) {
  const [aplicaExoneracion, setAplicaExoneracion] = useState(true);

  const res = useMemo(() => {
    const s = 1750905;
    const auxT = 249095; 
    
    const saludPatrono = aplicaExoneracion ? 0 : 148826.93;
    const sena = aplicaExoneracion ? 0 : 35018.10;
    const icbf = aplicaExoneracion ? 0 : 52527.15;
    
    const pensionPatrono = 210108.60;
    const arl = 9139.72; 
    const caja = 70036.20;

    const cesantias = 166600.00;
    const intereses = 20000.00;
    const prima = 166600.00;
    const vacaciones = 72925.19;

    const totalMensual = s + auxT + saludPatrono + pensionPatrono + arl + caja + sena + icbf + prima + cesantias + intereses + vacaciones;
    const ahorroTotal = 148826.93 + 35018.10 + 52527.15;

    return {
      s, auxT, saludPatrono, pensionPatrono, arl, caja, sena, icbf,
      prima, cesantias, intereses, vacaciones,
      totalMensual, ahorroTotal
    };
  }, [aplicaExoneracion]);

  const fmt = (v: number) => new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    maximumFractionDigits: 0 
  }).format(v);

  const itemsTabla = [
    { label: "Salario + Auxilio transporte", val: res.s + res.auxT, icon: Wallet, highlight: true, visible: true },
    { label: "Pensión y arl (Patronal)", val: res.pensionPatrono + res.arl, icon: Shield, visible: true },
    { label: "Salud, sena e icbf", val: res.saludPatrono + res.sena + res.icbf, icon: Strikethrough, visible: !aplicaExoneracion },
    { label: "Caja de compensación (4%)", val: res.caja, icon: Home, visible: true },
    { label: "Cesantías e intereses", val: res.cesantias + res.intereses, icon: TrendingUp, visible: true },
    { label: "Prima y vacaciones", val: res.prima + res.vacaciones, icon: Umbrella, visible: true }
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-10">
        <div className="text-center md:text-left flex-grow">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100 mb-4">
            <ShieldCheck size={14} /> Diagnóstico de riesgo financiero
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
            ¿Estás perdiendo dinero con tu nómina sin darte cuenta?
          </h2>
          <p className="text-slate-600 font-extrabold text-xl md:text-2xl leading-snug max-w-2xl">
            Interactúa con los valores y detecta si estás pagando de más sin saberlo
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0 absolute top-6 right-6 md:static"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Lado Izquierdo: Configuración */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
            <label className="block text-xs font-black text-slate-400 uppercase mb-3">Salario de referencia</label>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
              <input
                type="text"
                value="1.750.905"
                readOnly
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-2xl font-black text-slate-800 outline-none cursor-default"
              />
            </div>
            
            <div 
              className={`flex items-center justify-between p-6 rounded-3xl border-4 cursor-pointer hover:scale-[1.02] transition-all ${
                aplicaExoneracion 
                  ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                  : 'border-amber-500 bg-amber-50 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
              }`}
              onClick={() => setAplicaExoneracion(!aplicaExoneracion)}
            >
              <div className="flex-1 text-left">
                <p className={`text-sm font-black uppercase mb-1 ${aplicaExoneracion ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {aplicaExoneracion ? "¿CUMPLE LEY 1607?" : "¿NO CUMPLE LEY 1607?"}
                </p>
                <p className={`text-[11px] font-bold uppercase leading-tight ${aplicaExoneracion ? 'text-emerald-600/70' : 'text-amber-600/70'}`}>
                  EXONERACIÓN DE SALUD, SENA E ICBF
                </p>
              </div>
              <div className={`w-14 h-8 rounded-full relative transition-colors shadow-inner flex items-center ${aplicaExoneracion ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                <div className={`absolute w-6 h-6 bg-white rounded-full transition-all shadow-md ${aplicaExoneracion ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          </div>

          {aplicaExoneracion && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-[24px] text-white shadow-xl shadow-emerald-200"
            >
              <p className="text-emerald-100 text-xs font-bold uppercase mb-1">Ahorro mensual proyectado</p>
              <div className="text-3xl font-black">{fmt(res.ahorroTotal)}</div>
              <p className="mt-2 text-xs font-bold opacity-100 text-emerald-50">Utilidad retenida gracias a la gestión estratégica de beneficios.</p>
            </motion.div>
          )}
        </div>

        {/* Lado Derecho: Resultados */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-900 p-8 text-white border-b border-white/10">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="text-left">
                  <p className="text-amber-400 text-xs font-black uppercase mb-2 tracking-wider flex items-center gap-1">
                    ⚠️ Esto es lo que realmente te cuesta tu nómina
                  </p>
                  <h3 className="text-4xl font-black text-white">{fmt(res.totalMensual)}</h3>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-slate-400 text-xs font-black uppercase">Impacto anual (posible dinero mal optimizado)</p>
                  <p className="text-2xl font-black text-indigo-400">{fmt(res.totalMensual * 12)}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-1">
                {itemsTabla.filter(item => item.visible).map((row, i) => (
                  <div key={i} className={`flex justify-between items-center p-3 rounded-xl ${row.highlight ? 'bg-slate-50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <row.icon size={16} className='text-slate-400' />
                      <span className="text-sm font-semibold text-slate-700">{row.label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{fmt(row.val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="mt-8 bg-slate-100 border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm text-left">
        <div className="bg-slate-900 text-white p-2 rounded-lg shrink-0">
          <Info size={18} />
        </div>
        <div>
          <p className="text-slate-800 text-sm font-black uppercase leading-tight mb-2">
            Nota: Otros costos asociados a la nómina a cargo del empleador que no son mensuales
          </p>
          <ul className="text-slate-700 text-sm font-bold leading-relaxed space-y-1">
            <li>1. Examen médico de ingreso</li>
            <li>2. Examen médico periódicos</li>
            <li>3. Examen médico de retiro</li>
            <li>4. Dotación: calzado y vestido de labor, cada cuatro meses para quienes devengan hasta 2 smmlv</li>
          </ul>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center p-10 bg-indigo-50/50 border-2 border-dashed border-indigo-100 rounded-[40px]">
        <p className="text-indigo-900 italic font-bold text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Muchos negocios descubren tarde que estaban pagando más de lo necesario… sin saber exactamente por qué.
        </p>
        <button 
          onClick={() => window.open('https://wa.me/573113355169?text=Hola,%20acabo%20de%20usar%20la%20herramienta%20y%20quiero%20saber%20si%20estoy%20pagando%20de%20más%20en%20mi%20nómina.', '_blank')}
          className="bg-slate-950 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center gap-4 mx-auto shadow-2xl transition-all hover:bg-slate-900 hover:-translate-y-1"
        >
          <MessageCircle size={28} className="text-emerald-400" />
          Quiero saber si estoy pagando de más
        </button>
      </div>
    </div>
  );
}
