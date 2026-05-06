import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Lock, Unlock, Sparkles, ClipboardList, ShoppingBag, Eye, Microscope, Send } from 'lucide-react';

export default function InteligenciaCutaneaApp() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [daysPassed, setDaysPassed] = useState(0);
  const [auditoria, setAuditoria] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (user?.started_at) {
      const start = new Date(user.started_at);
      const now = new Date();
      const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      setDaysPassed(diffDays);
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').eq('email', email).single();
    if (data) { setUser(data); } 
    else {
      const { data: newUser } = await supabase.from('leads').insert([{ email, started_at: new Date() }]).select().single();
      if (newUser) setUser(newUser);
    }
    setLoading(false);
  };

  const guardarAuditoria = async () => {
    setLoading(true);
    await supabase.from('leads').update({ auditoria_gabinete: auditoria }).eq('email', user.email);
    setEnviado(true);
    setLoading(false);
  };

  const estaciones = [
    { id: 1, day: 0, icon: <Eye />, title: "Estación 1: Reto del Silencio", desc: "Observación visual sin productos por 3 días para entrenar la mirada objetiva." },
    { id: 2, day: 1, icon: <ClipboardList />, title: "Estación 2: Mapa Facial", desc: "Registro de sensaciones por zonas: ¿dónde pica, dónde tira, dónde brilla?" },
    { id: 3, day: 2, icon: <Microscope />, title: "Estación 3: Prueba del Pañuelo", desc: "La verdad sobre tu producción de sebo al despertar. Sin filtros." },
    { id: 4, day: 3, icon: <ShoppingBag />, title: "Estación 4: Auditoría de Gabinete", desc: "Revisión de productos actuales y aplicación del Filtro de Compra." }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-stone-100">
          <Sparkles className="w-12 h-12 text-[#4A5D4E] mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-[#2C362E] mb-4">Inteligencia Cutánea</h1>
          <p className="text-stone-600 mb-8 italic">"Deja de comprar por adivinación y empieza a escuchar a tu piel."</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Introduce tu email para comenzar" className="w-full p-4 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-[#4A5D4E]" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="w-full bg-[#4A5D4E] text-white py-4 rounded-xl font-bold hover:bg-[#3A4A3E] transition shadow-lg">Comenzar Workbook Gratis</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4] p-6 pb-20">
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-serif text-[#2C362E]">Tu Camino al Criterio Propio</h2>
        <p className="text-[#4A5D4E] tracking-widest text-xs mt-2 uppercase font-bold">Workbook Interactivo</p>
      </header>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {estaciones.map((s) => {
          const isLocked = daysPassed < s.day;
          return (
            <div key={s.id} className={`relative p-6 rounded-2xl border-2 transition-all ${isLocked ? 'bg-stone-100 border-transparent opacity-60' : 'bg-white border-[#E5EBE7] shadow-sm hover:shadow-md'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isLocked ? 'bg-stone-200 text-stone-400' : 'bg-[#E5EBE7] text-[#4A5D4E]'}`}>
                {isLocked ? <Lock size={18} /> : s.icon}
              </div>
              <h3 className="font-bold text-stone-800 mb-2 leading-tight">{s.title}</h3>
              <p className="text-xs text-stone-500 mb-4">{s.desc}</p>
              {isLocked ? (
                <span className="text-[10px] font-bold text-stone-400 uppercase">Bloqueado hasta el día {s.day + 1}</span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-700 uppercase flex items-center"><Unlock size={10} className="mr-1"/> Disponible</span>
              )}
            </div>
          );
        })}
      </div>

      {daysPassed >= 3 && (
        <div className="max-w-3xl mx-auto mt-16 bg-white p-10 rounded-3xl shadow-2xl border border-[#E5EBE7]">
          <h3 className="text-2xl font-serif text-[#2C362E] mb-6">Estación 4: Auditoría de Gabinete</h3>
          <p className="text-stone-600 mb-6 text-sm">Enumera los productos que usas actualmente y cuéntame: ¿Cuáles compraste por elección consciente y cuáles por adivinación o publicidad?</p>
          <textarea 
            className="w-full h-40 p-4 border border-stone-200 rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            placeholder="Ej: Limpiador marca X (publicidad), Crema Y (regalo), etc..."
            value={auditoria}
            onChange={(e) => setAuditoria(e.target.value)}
          />
          {!enviado ? (
            <button onClick={guardarAuditoria} className="flex items-center justify-center w-full bg-[#4A5D4E] text-white py-4 rounded-xl font-bold hover:bg-[#3A4A3E] transition">
              <Send size={18} className="mr-2" /> {loading ? 'Guardando...' : 'Enviar Auditoría y Finalizar'}
            </button>
          ) : (
            <div className="text-center p-6 bg-emerald-50 rounded-2xl">
              <p className="text-emerald-800 font-bold mb-4">¡Auditoría enviada con éxito!</p>
              <div className="space-y-3">
                <button className="w-full bg-[#2C362E] text-white py-4 rounded-xl font-bold">Obtener mi Programa Premium</button>
                <button className="w-full border-2 border-[#2C362E] text-[#2C362E] py-4 rounded-xl font-bold">Comprar Manual Personalizado</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}