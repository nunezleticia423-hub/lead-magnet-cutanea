import React, { useState } from 'react';
import { Camera, Heart, CheckCircle, Download, ArrowRight, Loader2, Sparkles } from 'lucide-react';

// === CONFIGURACIÓN DE TU PROYECTO ===
const S_URL = "https://ezcjpwxxsfieibfgblvf.supabase.co"; 
const S_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Y2pwd3h4c2ZpZWliZmdibHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDYyNzAsImV4cCI6MjA5MzMyMjI3MH0.XYzq2vXoLgVTSll20H4q8vycyz8zNPu84NNJb335XAg"; 
// ===================================

const InteligenciaCutaneaApp = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', observacion: '', sensacion: '' });

  const saveAndFinish = async (finalData) => {
    setLoading(true);
    try {
      const response = await fetch(`${S_URL}/rest/v1/leads_inteligencia_cutanea`, {
        method: 'POST',
        headers: {
          'apikey': S_KEY,
          'Authorization': `Bearer ${S_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email: finalData.email,
          observacion_visual: finalData.observacion,
          sensacion_fisica: finalData.sensacion
        })
      });

      if (!response.ok) throw new Error('Error al guardar');
      setStep(3);
    } catch (e) {
      console.error("Error guardando datos", e);
      alert("Hubo un problema al conectar con Supabase. Verifica que la tabla 'leads_inteligencia_cutanea' exista.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-[2rem] shadow-2xl border border-slate-100 font-sans min-h-[500px] flex flex-col justify-center">
      {/* Paso 0: Inicio / Captura de Email */}
      {step === 0 && (
        <div className="space-y-6 text-center animate-in fade-in">
          <Sparkles className="mx-auto text-amber-500" size={40} />
          <h1 className="text-2xl font-bold text-slate-800">Inteligencia Cutánea</h1>
          <p className="text-slate-600">Entrena tu mirada objetiva y recibe tu Manual de Usuario personalizado.</p>
          <input 
            type="email" placeholder="Tu correo electrónico"
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            onChange={(e) => setData({...data, email: e.target.value})}
          />
          <button onClick={() => setStep(1)} disabled={!data.email.includes('@')}
            className="w-full bg-teal-600 text-white p-4 rounded-2xl font-bold hover:bg-teal-700 transition-all disabled:opacity-50 shadow-lg shadow-teal-100">
            Comenzar Diagnóstico
          </button>
        </div>
      )}

      {/* Paso 1: Registro Visual (Módulo 1) */}
      {step === 1 && (
        <div className="space-y-6 animate-in slide-in-from-right">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-widest">
            <Camera size={14} /> Registro Visual
          </div>
          <h2 className="text-lg font-semibold text-slate-800 text-center">Frente al espejo con luz natural: ¿Cómo luce tu piel hoy?</h2>
          <div className="grid gap-3">
            {['Zonas con brillo', 'Zonas opacas', 'Textura uniforme'].map(opt => (
              <button key={opt} onClick={() => { setData({...data, observacion: opt}); setStep(2); }}
                className="w-full text-left p-4 border border-slate-100 rounded-2xl hover:bg-teal-50 hover:border-teal-200 transition-all shadow-sm">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paso 2: Sensación Física (Conexión) */}
      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest">
            <Heart size={14} /> Sensación Física
          </div>
          <h2 className="text-lg font-semibold text-slate-800 text-center">Cierra los ojos y percibe: ¿Cómo sientes tu rostro?</h2>
          <div className="grid gap-3">
            {['Cómoda', 'Tirante', 'Sensible'].map(opt => (
              <button key={opt} disabled={loading}
                onClick={() => { const d = {...data, sensacion: opt}; setData(d); saveAndFinish(d); }}
                className="w-full text-left p-4 border border-slate-100 rounded-2xl hover:bg-rose-50 hover:border-rose-200 transition-all flex justify-between items-center shadow-sm">
                {opt} {loading && <Loader2 className="animate-spin text-rose-500" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paso 3: Resultados y Manual Dinámico (Módulo 2) */}
      {step === 3 && (
        <div className="space-y-6 animate-in zoom-in">
          <div className="text-center">
            <CheckCircle size={50} className="text-green-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-slate-800">Diagnóstico Listo</h2>
          </div>
          
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 text-slate-700 text-sm leading-relaxed shadow-inner">
            <h3 className="font-bold text-amber-800 mb-1 uppercase text-[10px] tracking-widest">Consejo de Inteligencia Cutánea:</h3>
            {data.sensacion === 'Tirante' 
              ? "Tu piel reporta tirantez. Antes de aplicar más productos, observa si el ambiente (aire acondicionado o clima) está alterando tu barrera protectora."
              : data.observacion === 'Zonas con brillo'
              ? "El brillo registrado no es un error. Observa si coincide con cambios en tu sueño o alimentación; tu piel es un sistema que responde a tu contexto."
              : "Has iniciado tu entrenamiento de mirada objetiva. Observar tu piel sin juzgarla es el primer paso para decidir con criterio propio."}
          </div>

          <button className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
            <Download size={18} /> Descargar Manual PDF
          </button>
          
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 mb-2 italic">Aprende a elegir tus productos con el programa completo.</p>
            <button className="text-teal-600 font-bold text-sm flex items-center justify-center mx-auto gap-1 hover:underline">
              Programa Premium <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteligenciaCutaneaApp;