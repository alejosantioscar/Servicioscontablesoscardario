import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  Plus, 
  X, 
  Pencil, 
  Check, 
  MessageSquare,
  AlertCircle,
  AlertOctagon
} from 'lucide-react';

const STORAGE_KEY = 'checklist_cumplimiento_data_v2';

interface ItemCheck {
  id: string;
  category: string;
  label: string;
  weight: number;
}

const CHECKLIST_ITEMS: ItemCheck[] = [
    { id: 'c1', category: 'Contratación Legal', label: 'Contrato firmado por ambas partes', weight: 15 },
    { id: 'c2', category: 'Contratación Legal', label: 'Funciones y horario especificados', weight: 10 },
    { id: 'c3', category: 'Contratación Legal', label: 'Exámenes médicos de ingreso realizados', weight: 5 },
    { id: 's1', category: 'Seguridad Social', label: 'Afiliación completa (Salud EPS, Riesgos ARL y Pensión)', weight: 20 },
    { id: 's2', category: 'Seguridad Social', label: 'Pagos sobre salario real', weight: 15 },
    { id: 's3', category: 'Seguridad Social', label: 'Afiliación a Caja de Compensación Familiar', weight: 5 },
    { id: 'p1', category: 'Pagos y Comprobantes', label: 'Desprendibles de pago con trazabilidad', weight: 10 },
    { id: 'p2', category: 'Pagos y Comprobantes', label: 'Pago de horas extra y recargos', weight: 10 },
    { id: 'h1', category: 'Seguridad y Salud en el Trabajo', label: 'Entrega de dotación legal', weight: 5 },
    { id: 'h2', category: 'Seguridad y Salud en el Trabajo', label: 'Sistema SG-SST implementado', weight: 5 }
];

interface Employee {
  id: number;
  name: string;
  checks: Record<string, boolean>;
}

interface ChecklistCumplimientoProps {
  onClose: () => void;
}

export default function ChecklistCumplimiento({ onClose }: ChecklistCumplimientoProps) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      return saved ? JSON.parse(saved) : [{ id: 1, name: 'Empleado 1', checks: {} }];
    } catch (e) {
      return [{ id: 1, name: 'Empleado 1', checks: {} }];
    }
  });
  
  const [selectedId, setSelectedId] = useState(employees[0]?.id || 1);
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const currentEmployee = useMemo(() => {
    return employees.find(e => e.id === selectedId) || employees[0];
  }, [employees, selectedId]);

  const calculateScore = useCallback((checks: Record<string, boolean>) => {
    if (!checks) return 0;
    return CHECKLIST_ITEMS.reduce((acc, item) => acc + (checks[item.id] ? item.weight : 0), 0);
  }, []);

  const averageScore = useMemo(() => {
    if (employees.length === 0) return 0;
    const total = employees.reduce((acc, emp) => acc + calculateScore(emp.checks), 0);
    return Math.round(total / employees.length);
  }, [employees, calculateScore]);

  const addEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newEmp = { id: Date.now(), name: newName, checks: {} };
    setEmployees(prev => [...prev, newEmp]);
    setSelectedId(newEmp.id);
    setNewName('');
  };

  const updateEmployeeName = (id: number, nextName: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, name: nextName } : emp
    ));
  };

  const deleteEmployee = (id: number) => {
    if (employees.length <= 1) return;
    const nextEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(nextEmployees);
    if (selectedId === id) setSelectedId(nextEmployees[0].id);
  };

  const toggleCheck = (itemId: string) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        return { ...emp, checks: { ...emp.checks, [itemId]: !emp.checks[itemId] } };
      }
      return emp;
    }));
  };

  const resetAllData = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar todos los datos?")) {
      const defaultData = [{ id: 1, name: 'Empleado 1', checks: {} }];
      setEmployees(defaultData);
      setSelectedId(1);
    }
  };

  const getStatus = (score: number) => {
    if (score >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', label: 'Cumplimiento Óptimo' };
    if (score >= 70) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500', label: 'Riesgo Moderado' };
    return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500', label: 'Riesgo Crítico' };
  };

  const currentScore = calculateScore(currentEmployee.checks);
  const currentStatus = getStatus(currentScore);
  const globalStatus = getStatus(averageScore);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans">
      <div className="flex justify-between items-start mb-8">
        <header className="flex flex-col items-center flex-grow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-4 shadow-lg">
            <AlertOctagon className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center uppercase leading-tight max-w-sm">
            ¿Tu nómina tiene errores que pueden costarte multas?
          </h1>
          <p className="text-slate-900 text-sm font-bold text-center mt-3 max-w-xs leading-relaxed">
            Revísalo en 3 minutos antes de que se convierta en un problema real
          </p>
        </header>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors absolute top-4 right-4 md:static"
        >
          <X size={24} />
        </button>
      </div>

      {/* Dashboard Principal */}
      <div className={`mb-4 p-6 rounded-3xl border-2 shadow-sm transition-all duration-500 ${globalStatus.bg} ${globalStatus.border} text-center`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 text-center w-full">
            Nivel de riesgo legal en tu nómina
          </span>
        </div>
        <div className="flex items-baseline justify-center gap-2 mb-3">
          <h2 className={`text-6xl font-black ${globalStatus.text}`}>{averageScore}%</h2>
        </div>
        <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden shadow-inner border border-white/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${averageScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${globalStatus.bar}`}
          />
        </div>
        <div className={`text-center mt-3 text-[10px] font-black uppercase tracking-widest ${globalStatus.text}`}>
          Estado: {globalStatus.label}
        </div>
      </div>

      {/* Bloque de Advertencia Dinámico */}
      {averageScore < 70 && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
              <p className="text-red-700 font-bold text-sm mb-1 line-flex items-center gap-2">
                  <AlertCircle size={14} /> Alto riesgo detectado
              </p>
              <p className="text-red-600 text-xs font-medium">
                  Tu nómina podría exponerte a sanciones o demandas. Esto no es un detalle menor.
              </p>
          </div>
      )}

      {averageScore >= 70 && averageScore < 90 && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-left">
              <p className="text-amber-700 font-bold text-sm mb-1 inline-flex items-center gap-2">
                  <AlertCircle size={14} /> Hay puntos que pueden convertirse en problema
              </p>
              <p className="text-amber-600 text-xs font-medium">
                  No estás en riesgo crítico, pero hay errores que podrían costarte dinero si no se corrigen.
              </p>
          </div>
      )}

      {averageScore >= 90 && averageScore < 100 && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-left">
              <p className="text-emerald-700 font-bold text-sm mb-1 inline-flex items-center gap-2">
                  <Check size={14} /> Buen nivel de cumplimiento
              </p>
              <p className="text-emerald-600 text-xs font-medium">
                  Estás en el camino correcto, pero aún puedes optimizar y blindarte al 100%.
              </p>
          </div>
      )}

      {averageScore === 100 && (
          <div className="mb-8 p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-left">
              <p className="text-emerald-800 font-bold text-sm mb-1 inline-flex items-center gap-2">
                  <Check size={14} /> ¡Felicidades! Cumplimiento perfecto
              </p>
              <p className="text-emerald-700 text-xs font-medium">
                  Tu nómina está blindada. Mantén este estándar y cuenta con nosotros para cualquier auditoría futura.
              </p>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <form onSubmit={addEmployee} className="relative group">
            <input 
              type="text" 
              placeholder="Nombre..." 
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 outline-none shadow-sm transition-all"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-black transition-colors shadow-md">
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {employees.map(emp => (
              <div key={emp.id} className="relative group">
                <button 
                  onClick={() => { setSelectedId(emp.id); setIsEditing(false); }}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all ${selectedId === emp.id ? 'border-slate-900 bg-white shadow-md' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}
                >
                  <div className="font-black text-slate-900 text-[10px] uppercase truncate pr-6">{emp.name}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mr-2">
                      <div className={`h-full ${getStatus(calculateScore(emp.checks)).bar}`} style={{ width: `${calculateScore(emp.checks)}%` }}></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">{calculateScore(emp.checks)}%</span>
                  </div>
                </button>
                {employees.length > 1 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteEmployee(emp.id); }}
                    className="absolute top-4 right-3 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-start mb-8 gap-4">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input 
                    autoFocus
                    type="text"
                    value={currentEmployee.name}
                    onChange={(e) => updateEmployeeName(currentEmployee.id, e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    className="text-xl font-black text-slate-900 uppercase tracking-tight bg-slate-50 border-b-2 border-slate-900 outline-none w-full"
                  />
                ) : (
                  <div onClick={() => setIsEditing(true)} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight truncate">{currentEmployee.name}</h3>
                    <Pencil className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}
                <div className="mt-1 flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${currentStatus.bar}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${currentStatus.text}`}>{currentStatus.label}</span>
                </div>
              </div>
              <div className="shrink-0 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-lg">
                <div className="text-2xl font-black">{currentScore}%</div>
              </div>
            </div>

            <div className="space-y-3">
              {CHECKLIST_ITEMS.map((item) => (
                <label 
                  key={item.id} 
                  className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all ${currentEmployee.checks[item.id] ? 'bg-slate-50 border-slate-900' : 'bg-white border-slate-50 hover:border-slate-200'}`}
                >
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={!!currentEmployee.checks[item.id]}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 mt-0.5 mr-4 flex items-center justify-center shrink-0 ${currentEmployee.checks[item.id] ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-300'}`}>
                    {currentEmployee.checks[item.id] && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-black mb-1 leading-none">{item.category}</div>
                    <div className={`text-sm leading-snug ${currentEmployee.checks[item.id] ? 'text-slate-900 font-bold' : 'text-slate-600 font-medium'}`}>{item.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-center text-white shadow-2xl relative overflow-hidden">
            <h4 className="font-black text-xl mb-2 relative z-10 uppercase tracking-tight">¿Tu puntaje es bajo?</h4>
            <p className="text-xs text-slate-300 mb-8 relative z-10 max-w-[220px] mx-auto leading-relaxed text-center">Cada ítem sin marcar es una posible sanción.</p>
            <a 
              href={`https://wa.me/573113355169?text=Hola,%20acabo%20de%20hacer%20el%20checklist%20y%20quiero%20saber%20si%20mi%20nómina%20tiene%20riesgos%20legales%20o%20posibles%20multas.%20Mi%20resultado%20fue%20${averageScore}%.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center bg-white text-slate-900 px-6 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-xl uppercase text-sm"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Quiero saber si estoy en riesgo ahora
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center pb-8 border-t border-slate-100 pt-8">
        <button onClick={resetAllData} className="text-[9px] font-black text-slate-300 hover:text-red-400 uppercase tracking-widest transition-colors mb-4">Borrar todos los datos</button>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Auditoría Preventiva de Nómina © 2026</p>
      </footer>
    </div>
  );
}
