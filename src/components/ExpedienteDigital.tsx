import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  X, 
  Check, 
  Printer, 
  Trash2, 
  Shield, 
  FileCheck
} from 'lucide-react';

interface ExpedienteItem {
  id: string;
  t: string;
  d: string;
  v: string;
}

const COMMON_ITEMS: Omit<ExpedienteItem, 'id'>[] = [
  { t: 'Libro de Accionistas / Libro de Socios / Libro Asociados', d: 'Registro actualizado de la composición del capital social.', v: 'Permanente' },
  { t: 'Acta de Asamblea de cada año', d: 'Aprobación de balances de fin de ejercicio.', v: 'Anual' },
  { t: 'Registro RUB', d: 'Reporte de Beneficiarios Finales actualizado.', v: 'Anual / Cambios' },
  { t: 'Informe de Gestión', d: 'Presentación de resultados por la administración.', v: 'Anual' },
  { t: 'Estados Financieros NIIF', d: 'Preparación bajo estándares internacionales.', v: 'Anual' },
  { t: 'Dictamen de Revisor Fiscal: Si cumple condiciones específicas.', d: 'Certificación obligatoria según parámetros legales o estatutarios.', v: 'Anual' },
  { t: 'Actas de Junta Directiva-Consejos de administración', d: 'Registro oficial de decisiones.', v: 'Vigente' },
  { t: 'Cumplimiento SAGRILAFT- solo si cumplen condiciones específicas', d: 'Prevención de lavado de activos.', v: 'Vigente' },
  { t: 'Registro RUT: Registro Único Tributario', d: 'Documento de identificación tributaria actualizado.', v: 'Vigente' }
];

const SECTIONS: Record<string, { label: string; title: string; items: ExpedienteItem[] }> = {
  SAS: { 
    label: 'S.A.S.', title: 'Sociedad Acciones Simplificada', 
    items: [
      ...COMMON_ITEMS.map((it, idx) => ({ ...it, id: `sas_${idx}` })),
      { id: 'sas_9', t: 'Títulos de Acciones', d: 'Expedición de certificados de propiedad.', v: 'Permanente' }
    ] 
  },
  SA: { 
    label: 'S.A.', title: 'Sociedad Anónima', 
    items: [
      ...COMMON_ITEMS.map((it, idx) => ({ ...it, id: `sa_${idx}` })),
      { id: 'sa_9', t: 'Títulos de Acciones', d: 'Certificados físicos obligatorios.', v: 'Permanente' },
      { id: 'sa_10', t: 'Reserva Legal', d: 'Verificación del 10% de utilidades líquidas (Obligatorio SA).', v: 'Anual' }
    ] 
  },
  LIMITADA: { 
    label: 'LIMITADA', title: 'Sociedad Ltda.', 
    items: [
      ...COMMON_ITEMS.map((it, idx) => ({ ...it, id: `lt_${idx}` })),
      { id: 'lt_9', t: 'Reserva Legal', d: 'Cálculo del 10% sobre utilidades líquidas.', v: 'Anual' }
    ] 
  },
  ESAL: { 
    label: 'ESAL', title: 'Entidad Sin Ánimo de Lucro', 
    items: [
      ...COMMON_ITEMS.map((it, idx) => ({ ...it, id: `es_${idx}` })),
      { id: 'es_9', t: 'Calificación RTE', d: 'Permanencia en Régimen Especial.', v: 'Anual' },
      { id: 'es_10', t: 'Acta de Reinversión de excedentes', d: 'Documentación sobre el destino de los beneficios obtenidos.', v: 'Anual' }
    ] 
  }
};

interface ExpedienteDigitalProps {
  onClose: () => void;
}

export default function ExpedienteDigital({ onClose }: ExpedienteDigitalProps) {
  const [currentSection, setCurrentSection] = useState(() => {
    try {
      return (typeof window !== 'undefined' ? localStorage.getItem('exp_last_tab') : 'SAS') || 'SAS';
    } catch (e) {
      return 'SAS';
    }
  });
  
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('exp_2026_matrix_data') : null;
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [auditorName, setAuditorName] = useState(() => {
    try {
      return (typeof window !== 'undefined' ? localStorage.getItem('exp_auditor') : '') || '';
    } catch (e) {
      return '';
    }
  });

  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    localStorage.setItem('exp_last_tab', currentSection);
  }, [currentSection]);

  useEffect(() => {
    localStorage.setItem('exp_2026_matrix_data', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('exp_auditor', auditorName);
  }, [auditorName]);

  const items = useMemo(() => SECTIONS[currentSection].items, [currentSection]);
  
  const completedCount = useMemo(() => 
    items.filter(item => checkedItems[item.id]).length
  , [items, checkedItems]);

  const progressPercentage = Math.round((completedCount / items.length) * 100);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetData = () => {
    if (confirm("¿Borrar progreso?")) {
      setCheckedItems({});
      localStorage.removeItem('exp_2026_matrix_data');
    }
  };

  const currentSectionData = SECTIONS[currentSection];

  return (
    <div className="max-w-xl mx-auto font-sans text-left pb-16 bg-white md:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
      {/* BRANDING HEADER */}
      <div className="bg-indigo-950 p-8 text-white relative border-b-4 border-emerald-500">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors z-20 no-print"
          aria-label="Cerrar"
        >
          <X size={24} className="text-white" />
        </button>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2 leading-tight">
          <FileText size={28} className="shrink-0" />
          👉 “Expediente Seguro: Detecta Fallas Legales Antes de que Te Cuesten Dinero”
        </h1>
        <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest italic">Evita Multas y Sanciones Ocultas</p>
      </div>

      {/* WARNING BOX */}
      <div className="bg-red-50 border border-red-200 p-6 m-6 rounded-xl text-center shadow-sm">
        <p className="text-red-700 font-black text-lg mb-2">
          ⚠️ Un expediente incompleto no es desorden…
        </p>
        <p className="text-red-900 text-sm font-bold leading-relaxed">
          Es una puerta abierta a sanciones, demandas o bloqueos legales que pueden costarte dinero sin previo aviso.
        </p>
      </div>

      {/* PROFILE SELECTOR */}
      <div className="bg-slate-50 border-b border-slate-200 p-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest italic">Tipo de Persona Jurídica:</p>
          <button 
            onClick={resetData}
            className="text-[10px] text-red-700 font-black uppercase hover:underline"
          >
            Limpiar Checklist
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(SECTIONS).map(key => (
            <button
              key={key}
              onClick={() => setCurrentSection(key)}
              className={`px-2 py-3 rounded-xl text-[10px] font-black border-2 transition-all ${
                currentSection === key 
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' 
                  : 'bg-white text-slate-900 border-slate-300 hover:border-slate-400'
              }`}
            >
              {SECTIONS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* AUDITOR IDENTIFICATION */}
      <div className="px-8 pt-6">
        <label className="text-[10px] font-black text-slate-900 uppercase tracking-tighter block mb-1">Nombre del Auditor / Responsable:</label>
        <input 
          type="text" 
          placeholder="Ej: Juan Pérez - Revisor Fiscal" 
          value={auditorName}
          onChange={(e) => setAuditorName(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
        />
      </div>

      {/* PROGRESS TRACKER */}
      <div className="px-8 pt-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-indigo-950 font-black text-xl">{currentSectionData.title}</h2>
            <p className="text-[10px] text-slate-900 uppercase tracking-widest font-bold">
              {completedCount} de {items.length} requisitos verificados
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-indigo-600">{progressPercentage}%</span>
          </div>
        </div>
        <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner border border-slate-300">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
        </div>
      </div>

      {/* CHECKLIST ITEMS */}
      <div className="p-8 space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => toggleItem(item.id)}
            className={`flex gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              checkedItems[item.id] 
                ? 'border-emerald-500 bg-emerald-50 shadow-sm' 
                : 'bg-white border-slate-300'
            }`}
          >
            <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              checkedItems[item.id] 
                ? 'bg-emerald-500 text-white border-emerald-600' 
                : 'text-transparent border-slate-400'
            }`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900">{item.t}</h4>
              <p className="text-[11px] text-[#0f172a] font-bold">{item.d}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 pt-2">
        <button 
          onClick={() => setShowReport(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl"
        >
          👉 "Detectar Riesgos Legales AHORA"
        </button>
      </div>

      {/* REPORT MODAL */}
      <AnimatePresence>
        {showReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReport(false)}
              className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-900 p-6 text-white flex justify-between items-center no-print">
                <h3 className="font-bold text-sm uppercase tracking-wider">Reporte de Cumplimiento</h3>
                <button onClick={() => setShowReport(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 bg-white text-slate-900">
                {/* IMPACT MESSAGE */}
                <div className="bg-red-100 border border-red-300 p-5 rounded-xl text-center mb-6 no-print">
                  <p className="text-red-800 font-black text-sm">
                    ⚠️ Este resultado no es teoría.
                    Cada “RIESGO DETECTADO” puede convertirse en una multa real o una demanda laboral.
                  </p>
                </div>

                <div className="border-4 border-double border-slate-300 p-8">
                  {/* WARNING IN REPORT */}
                  <div className="bg-red-50 border border-red-200 p-4 mb-4 rounded-xl text-center">
                    <p className="text-red-700 font-black text-sm">
                      ⚠️ Cada ítem pendiente es un posible punto de sanción o problema legal.
                    </p>
                  </div>

                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-indigo-950 uppercase mb-1">Acta de Verificación</h2>
                    <p className="text-[10px] text-slate-900 font-bold uppercase tracking-widest">
                      CORTE: {new Date().toLocaleDateString('es-CO')}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8 text-sm">
                    <div className="flex justify-between border-b border-slate-300 pb-2">
                      <span className="font-bold text-slate-900">Entidad:</span>
                      <span className="font-black text-indigo-900">{currentSectionData.title}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-300 pb-2">
                      <span className="font-bold text-slate-900">Auditor:</span>
                      <span className="font-black text-indigo-900">{auditorName || "No especificado"}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    {items.map((i) => {
                      const isChecked = checkedItems[i.id];
                      return (
                        <div key={i.id} className="flex flex-col border-b border-slate-300 py-3">
                          <span className="text-[10px] uppercase font-bold text-slate-900">{i.t}</span>
                          <span className={`text-[12px] font-black ${isChecked ? 'text-emerald-700' : 'text-red-700'}`}>
                            👉 {isChecked ? 'CUMPLE (SIN RIESGO)' : 'RIESGO DETECTADO'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 no-print">
                <button 
                  onClick={() => window.print()} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={20} />
                  IMPRIMIR DOCUMENTO
                </button>
                
                <a 
                  href="https://wa.me/573113355169?text=Hola,%20acabo%20de%20detectar%20varios%20riesgos%20en%20mi%20expediente.%0AQuiero%20saber%20exactamente%20d%C3%B3nde%20me%20pueden%20sancionar%20y%20c%C3%B3mo%20evitarlo." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 bg-slate-900 text-white text-center py-4 rounded-xl font-black hover:bg-black transition-colors shadow-lg"
                >
                  👉 “Quiero auditoría para evitar multas”
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
