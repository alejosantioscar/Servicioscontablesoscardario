import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import EstrategiaDeUtilidades from './components/EstrategiaDeUtilidades';
import ChecklistCumplimiento from './components/ChecklistCumplimiento';
import EscannerRiesgoLaboral from './components/EscannerRiesgoLaboral';
import ExpedienteDigital from './components/ExpedienteDigital';
import { 
  Calculator, 
  ShieldCheck, 
  FileText, 
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin,
  TrendingUp,
  Search,
  Rocket,
  Coins,
  X,
  ClipboardCheck,
  ShieldAlert,
  FolderLock
} from 'lucide-react';

// Reliable Image Fallbacks - Using your newly uploaded files
const logoFallbacks = [
  "/logo-actualizado.jpeg",
  "/Logo actualizado.jpeg",
  "https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/Logo%20actualizado.jpeg"
];

const imagenFallbacks = [
  "/Imagen.png",
  "/imagen.png",
  "https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/Imagen.png"
];

const SmartImage = ({ fallbacks, alt, className }: { fallbacks: string[], alt: string, className?: string }) => {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [timestamp] = useState(Date.now());

  const handleError = () => {
    console.warn(`Failed to load image: ${fallbacks[index]}`);
    if (index < fallbacks.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      console.error(`All fallbacks failed for: ${alt}`);
      setError(true);
    }
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-400 p-2 rounded-xl text-[10px] border border-slate-200 ${className}`}>
        <div className="text-center">
          <p>Imagen no disponible</p>
          <p className="text-[8px] opacity-50">Error de carga</p>
        </div>
      </div>
    );
  }

  const currentSrc = fallbacks[index].startsWith('/') 
    ? `${fallbacks[index]}?v=${timestamp}` 
    : fallbacks[index];

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
};

interface Service {
  title: string;
  description: string;
  icon: any;
}

const SERVICES: Service[] = [
  { title: 'Asesoría Financiera', description: 'Gestión integral de libros oficiales, reportes financieros y Estados Financieros', icon: Calculator },
  { title: 'Revisoría Fiscal', description: 'Control y vigilancia para el cumplimiento legal.', icon: ShieldCheck },
  { title: 'Auditoría', description: 'Examen crítico y sistemático de sus finanzas.', icon: Search },
  { title: 'Gestión Tributaria', description: 'Optimización y cumplimiento de obligaciones fiscales.', icon: FileText },
];

const INTERACTIVE_TOOLS = [
  { 
    title: '💰 Calcula el costo real de tu nómina y detecta sobrecostos ocultos', 
    subtitle: '👉 "¿Cuánto dinero estás regalando en impuestos?" Descúbrelo en 3 minutos con este simulador.',
    icon: Coins,
    color: 'text-brand-900'
  },
  { 
    title: '📋 ¿Tu nómina tiene errores que pueden costarte multas?', 
    subtitle: '👉 "Esto puede multarte (y no lo sabes)" Checklist GRATIS para evitar sanciones laborales.',
    icon: ClipboardCheck,
    color: 'text-indigo-500'
  },
  { 
    title: '🚨 Escáner de Multas Laborales', 
    subtitle: '👉 "Tu negocio podría tener fallas legales ocultas" Detecta riesgos antes de que la DIAN lo haga.',
    icon: ShieldAlert,
    color: 'text-red-500'
  },
  { 
    title: '📁 Expediente Seguro: Detecta Fallas Legales Antes de que Te Cuesten Dinero', 
    subtitle: '👉 "Tu negocio podría tener fallas legales ocultas" Detecta riesgos antes de que la DIAN lo haga.',
    icon: FolderLock,
    color: 'text-indigo-600'
  },
];

const EXPERIENCE_LOGOS = [
  { 
    name: 'Sociedad de San Vicente de Paúl', 
    fallbacks: [
      '/2.png', 
      'https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/2.png'
    ] 
  },
  { 
    name: 'OINSTEC', 
    fallbacks: [
      '/3.png', 
      'https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/3.png'
    ] 
  },
  { 
    name: 'Propiedad Horizontal', 
    fallbacks: [
      '/4.png', 
      'https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/4.png'
    ] 
  },
  { 
    name: 'COREDI', 
    fallbacks: [
      '/5.png', 
      'https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/5.png'
    ] 
  },
  { 
    name: 'Sonsón TV', 
    fallbacks: [
      '/7.png', 
      'https://raw.githubusercontent.com/alejosantioscar/Servicios-Financieros-/main/public/7.png'
    ] 
  }
];

const BLOG_POSTS = [
  {
    id: 'errores-empresarios-contabilidad',
    title: '7 errores que pueden hacerte pagar multas sin darte cuenta',
    summary: '',
    icon: AlertTriangle,
    color: 'rose',
    content: `
      <div class="space-y-6 text-slate-800 leading-relaxed text-justify">
        <p class="font-bold text-lg text-brand-900">Muchos empresarios ven la contabilidad como una obligación externa, cuando en realidad es el motor de decisión de su negocio. Estos son los errores más críticos:</p>
        
        <div class="space-y-4">
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">1</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Toma de decisiones subjetivas</p>
              <p class="text-slate-700 text-sm">Decidir basándose en percepciones y no en datos reales sobre la evolución económica.</p>
            </div>
          </div>
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">2</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Proyecciones poco confiables</p>
              <p class="text-slate-700 text-sm">Falta de información financiera sólida para planear el futuro del negocio.</p>
            </div>
          </div>
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">3</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Riesgos de sanciones</p>
              <p class="text-slate-700 text-sm">Posibles emplazamientos de la DIAN por falta de claridad en las declaraciones o registros.</p>
            </div>
          </div>
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">4</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Falta de control operativo</p>
              <p class="text-slate-700 text-sm">Dificultad para optimizar recursos y minimizar gastos al no tener un seguimiento riguroso.</p>
            </div>
          </div>
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">5</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Sin fuerza probatoria</p>
              <p class="text-slate-700 text-sm">Carencia de pruebas fidedignas ante terceros o entidades jurídicas en situaciones legales.</p>
            </div>
          </div>
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">6</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Incertidumbre de resultados</p>
              <p class="text-slate-700 text-sm">Desconocer si el negocio está generando utilidad o pérdida real al finalizar el ciclo.</p>
            </div>
          </div>
          <div class="flex gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 items-start">
            <span class="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">7</span>
            <div>
              <p class="text-slate-900 font-bold mb-1">Información desactualizada</p>
              <p class="text-slate-700 text-sm">Conocimiento nulo o poco confiable en tiempo real de la situación financiera del negocio.</p>
            </div>
          </div>
        </div>

        <div class="bg-brand-50 p-6 rounded-3xl border border-brand-100 mt-8">
          <p class="text-brand-900 font-medium italic text-center">
            "La contabilidad no es un gasto, es el mapa que le indica si su barco va directo a puerto o hacia un arrecife."
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'hechos-perdida-negocio',
    title: '7 señales de que estás perdiendo dinero sin darte cuenta',
    summary: '',
    icon: ShieldAlert,
    color: 'amber',
    content: `
      <div class="space-y-6 text-slate-800 leading-relaxed text-justify">
        <p class="font-bold text-lg text-brand-900">Detectar a tiempo que un negocio no es rentable es la diferencia entre el cierre y la quiebra. Estas señales son advertencias directas:</p>
        
        <div class="grid grid-cols-1 gap-4">
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">1</span>
            <div>
              <p class="text-slate-700 font-bold">Gastos superiores al precio de venta:</p>
              <p class="text-slate-600">Cuando producir o prestar el servicio cuesta más de lo que se cobra.</p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">2</span>
            <div>
              <p class="text-slate-700 font-bold">Descuentos excesivos:</p>
              <p class="text-slate-600">Cuando los descuentos por volumen superan el ahorro por producción en serie.</p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">3</span>
            <div>
              <p class="text-slate-700 font-bold">Financiación no reconocida:</p>
              <p class="text-slate-600">Pagos tardíos de clientes sin pactar intereses por el tiempo de espera.</p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">4</span>
            <div>
              <p class="text-slate-700 font-bold">Cuentas incobrables:</p>
              <p class="text-slate-600">Falta de gestión de cobro que obliga a castigar cartera de difícil recaudo.</p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">5</span>
            <div>
              <p class="text-slate-700 font-bold">Omisión de costos indirectos:</p>
              <p class="text-slate-600">Cuando el precio solo cubre costos directos, ignorando gastos administrativos y de ventas.</p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">6</span>
            <div>
              <p class="text-slate-700 font-bold">Disminución de ventas:</p>
              <p class="text-slate-600">Una caída progresiva y constante en el volumen de negocio.</p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 items-start">
            <span class="bg-orange-600 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs">7</span>
            <div>
              <p class="text-slate-700 font-bold">Márgenes mínimos:</p>
              <p class="text-slate-600">Rentabilidad tan baja que no permite el crecimiento o la reinversión.</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
];

const BLOG_COLORS: Record<string, string> = {
  sky: '#0ea5e9',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  indigo: '#6366f1'
};

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <AnimatePresence>
        {activeArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl relative p-8 md:p-20 custom-scrollbar"
            >
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X size={24} strokeWidth={3} />
              </button>
              
              <div className="max-w-2xl mx-auto">
                <div className="mb-12">
                  <div className="bg-brand-50 w-fit p-4 rounded-2xl mb-6 text-brand-900 border border-brand-100">
                    <activeArticle.icon size={40} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                    {activeArticle.title}
                  </h2>
                  <div className="h-1.5 w-24 bg-brand-900 rounded-full mb-8"></div>
                </div>
                
                <div className="article-content" dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
                
                <div className="mt-16 pt-8 border-t border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Autor del artículo</p>
                      <p className="text-brand-900 font-black text-lg">Oscar Darío Ramírez Valencia</p>
                      <p className="text-slate-500 font-bold text-sm">Contador Público Especialista en Revisoría Fiscal</p>
                    </div>
                    <a 
                      href="https://wa.me/573113355169" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-brand-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-2"
                    >
                      Solicitar Asesoría Directa
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTool === '💰 Calcula el costo real de tu nómina y detecta sobrecostos ocultos' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTool(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[40px] shadow-2xl relative"
            >
              <EstrategiaDeUtilidades onClose={() => setActiveTool(null)} />
            </motion.div>
          </motion.div>
        )}

        {activeTool === '📋 ¿Tu nómina tiene errores que pueden costarte multas?' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTool(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[40px] shadow-2xl relative"
            >
              <ChecklistCumplimiento onClose={() => setActiveTool(null)} />
            </motion.div>
          </motion.div>
        )}

        {activeTool === '🚨 Escáner de Multas Laborales' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTool(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[40px] shadow-2xl relative"
            >
              <EscannerRiesgoLaboral onClose={() => setActiveTool(null)} />
            </motion.div>
          </motion.div>
        )}

        {activeTool === '📁 Expediente Seguro: Detecta Fallas Legales Antes de que Te Cuesten Dinero' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTool(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[40px] shadow-2xl relative"
            >
              <ExpedienteDigital onClose={() => setActiveTool(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

{/* Navigation */}
<nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">

      <div className="flex items-center gap-2 cursor-pointer">
        <SmartImage fallbacks={logoFallbacks} alt="Logo Cuentas Conmigo" className="h-12 w-auto" />
      </div>

      <div className="flex items-center gap-4">
        <a
                href="https://wa.me/573113355169" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-brand-950 transition-all shadow-sm flex items-center gap-2"
              >
                <Phone size={16} />
                Hablemos de tu caso
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <motion.div
          key="landing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hero Section */}
              <section className="relative py-12 md:py-24 overflow-hidden bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
                      >
                        ¿Estás perdiendo dinero con tu contabilidad sin saberlo?
                      </motion.h1>
                      <p className="text-lg text-slate-800 font-medium max-w-xl mb-10 leading-relaxed text-justify">
                        Detecta errores y riesgos en menos de 15 minutos — GRATIS
                      </p>
                      
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-full order-first lg:order-last mb-8 lg:mb-0"
                    >
                      <div className="absolute -inset-4 bg-brand-900/5 rounded-[40px] -z-10 blur-2xl" />
                      <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
                        <SmartImage 
                          fallbacks={imagenFallbacks} 
                          alt="Contabilidad Profesional"
                          className="w-full h-[400px] md:h-[500px] object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Interactive Tools Section */}
              <section className="py-20 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">👉 ¿Tu Empresa Está en Riesgo y No lo Sabes?</h2>
                    <p className="text-slate-800 font-medium">👉 Usa estas herramientas para descubrir fallas legales que pueden costarte dinero hoy.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                    {INTERACTIVE_TOOLS.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={(e) => {
                          e.preventDefault();
                          const interactiveTools = [
                            '💰 Calcula el costo real de tu nómina y detecta sobrecostos ocultos', 
                            '📋 ¿Tu nómina tiene errores que pueden costarte multas?',
                            '🚨 Escáner de Multas Laborales',
                            '📁 Expediente Seguro: Detecta Fallas Legales Antes de que Te Cuesten Dinero'
                          ];
                          if (interactiveTools.includes(tool.title)) {
                            setActiveTool(tool.title);
                          }
                        }}
                        className={`p-6 rounded-[32px] border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full items-center text-center group cursor-pointer`}
                      >
                        <div className="mb-4 flex flex-col items-center">
                          <div className={`${tool.color} mb-4 p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform`}>
                            <tool.icon size={32} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3">{tool.title}</h3>
                          <p className="text-slate-800 text-sm font-medium leading-relaxed mb-4">{tool.subtitle}</p>
                        </div>
                        <div className={`flex-grow w-full min-h-[100px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 transition-colors ${
                          ['💰 Calcula el costo real de tu nómina y detecta sobrecostos ocultos', '📋 ¿Tu nómina tiene errores que pueden costarte multas?', '🚨 Escáner de Multas Laborales', '📁 Expediente Seguro: Detecta Fallas Legales Antes de que Te Cuesten Dinero'].includes(tool.title)
                            ? 'border-brand-200 bg-brand-50/50 text-brand-900' 
                            : 'border-slate-100 bg-slate-50/50 text-slate-400 group-hover:border-brand-200'
                        }`}>
                          {['💰 Calcula el costo real de tu nómina y detecta sobrecostos ocultos', '📋 ¿Tu nómina tiene errores que pueden costarte multas?', '🚨 Escáner de Multas Laborales', '📁 Expediente Seguro: Detecta Fallas Legales Antes de que Te Cuesten Dinero'].includes(tool.title) ? (
                            <>
                              <TrendingUp size={24} className="mb-2 text-brand-600" />
                              <p className="font-bold text-xs uppercase tracking-wider">Abrir Simulador</p>
                            </>
                          ) : (
                            <>
                              <Calculator size={20} className="mb-2 opacity-10" />
                              <p className="italic text-[10px] leading-relaxed">Módulo interactivo en desarrollo</p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Experience Logos Section - Social Proof */}
              <section className="py-16 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Empresas que ya corrigieron riesgos antes de ser multadas</h2>
                    <p className="text-slate-900 font-medium text-base">Lo que para ellos era “orden”, resultó ser exposición legal.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-16 items-center justify-items-center">
                    {EXPERIENCE_LOGOS.map((logo, index) => (
                      <div key={index} className="w-full h-24 md:h-32 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                        <SmartImage 
                          fallbacks={logo.fallbacks} 
                          alt={logo.name} 
                          className="max-w-full max-h-full object-contain drop-shadow-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Why Choose Us Section */}
              <section className="py-24 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight max-w-xl">
                        Tu contabilidad puede estar ocultando errores que ya te están costando dinero… y ni siquiera lo sabes. <span className="text-brand-900">Yo los convierto en decisiones</span> que protegen y hacen crecer tu negocio.
                      </h2>
                      <p className="text-slate-800 font-medium mb-8 leading-relaxed text-justify">
                        Muchos creen que su contabilidad está bien… hasta que aparece una multa o una pérdida que no vieron venir. <br/><br/>
                        Aquí detectamos lo que te puede salir caro antes de que pase.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-brand-900/5 rounded-3xl -z-10 blur-2xl" />
                      <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-sm">
                        <div className="space-y-8">
                          {[
                            { 
                              title: '“Más de 10 años evitando multas que nacen de errores invisibles”', 
                              desc: '👉 “No es lo que ves… es lo que estás dejando pasar.”' 
                            },
                            { 
                              title: 'Errores invisibles que ya le han costado dinero a otros empresarios', 
                              desc: '👉 Lo peligroso no es equivocarte… es no saber dónde lo estás haciendo.' 
                            },
                            { 
                              title: 'Errores que no aparecen… pero sí se pagan', 
                              desc: 'Lo que no ves en tu contabilidad… es lo que más te cuesta' 
                            }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-5">
                              <div className="mt-1 bg-brand-900 p-1.5 rounded-full text-white h-fit shrink-0">
                                <CheckCircle2 size={18} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h4>
                                <p className="text-slate-800 font-medium leading-relaxed text-justify">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* General Services Section */}
              <section id="servicios" className="py-24 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES.map((service, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col items-center text-center">
                        <service.icon className="text-brand-400 mb-4" size={32} />
                        <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                        <p className="text-slate-400 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Blog/Articles Section */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Errores que pueden estar costándote dinero ahora mismo</h2>
                    <p className="text-slate-900 font-bold max-w-2xl mx-auto text-lg leading-relaxed italic">Si no los detectas a tiempo, los pagas después.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {BLOG_POSTS.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setActiveArticle(post)}
                        className="bg-slate-50 rounded-[32px] p-8 border border-slate-200 hover:border-brand-200 hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full ring-1 ring-slate-100 hover:ring-brand-100 shadow-sm"
                      >
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                          <div style={{ color: BLOG_COLORS[post.color || 'indigo'] }}>
                            <post.icon size={28} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-brand-900 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 font-medium text-sm mb-8 flex-grow leading-relaxed">
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-3 text-brand-900 font-black text-xs uppercase tracking-widest pt-6 border-t border-slate-200/50">
                          <span>VER DÓNDE ESTOY PERDIENDO DINERO</span>
                          <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* No placeholders - showing the 5 completed articles */}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-20 bg-brand-900 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">Hablemos de tu caso</h2>
                  <a 
                    href="https://wa.me/573113355169" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Phone size={20} />
                    Hablar por WhatsApp
                  </a>
                </div>
              </section>
            </motion.div>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-transparent border-t border-blue-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Cuentas Conmigo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
