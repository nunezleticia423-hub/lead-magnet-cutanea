import React, { useState } from 'react';

const S_URL = 'https://ezcjpwxxsfieibfgblvf.supabase.co';
const S_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Y2pwd3h4c2ZpZWliZmdibHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDYyNzAsImV4cCI6MjA5MzMyMjI3MH0.XYzq2vXoLgVTSll20H4q8vycyz8zNPu84NNJb335XAg';

export default function App() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: '',
    observacion: '',
    sensacion: '',
  });

  const saveToSupabase = async (finalData) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${S_URL}/rest/v1/leads_inteligencia_cutanea`,
        {
          method: 'POST',
          headers: {
            apikey: S_KEY,
            Authorization: `Bearer ${S_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            email: finalData.email,
            observacion_visual: finalData.observacion,
            sensacion_fisica: finalData.sensacion,
          }),
        }
      );
      if (response.ok) {
        setStep(3);
      } else {
        const text = await response.text();
        setError('Error al guardar: ' + text);
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrap: {
      maxWidth: 420,
      margin: '2rem auto',
      background: '#fff',
      border: '0.5px solid #e5e5e5',
      borderRadius: 20,
      padding: '2rem',
      fontFamily: 'sans-serif',
    },
    title: { fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 },
    sub: { fontSize: 14, color: '#888', fontStyle: 'italic', marginBottom: 16 },
    label: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#888',
      marginBottom: 8,
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      border: '0.5px solid #ccc',
      borderRadius: 10,
      fontSize: 15,
      boxSizing: 'border-box',
      outline: 'none',
    },
    btnPrimary: {
      width: '100%',
      padding: 14,
      background: '#0F6E56',
      color: '#E1F5EE',
      border: 'none',
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: 8,
    },
    btnDisabled: {
      width: '100%',
      padding: 14,
      background: '#0F6E56',
      color: '#E1F5EE',
      border: 'none',
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      cursor: 'not-allowed',
      opacity: 0.4,
      marginTop: 8,
    },
    opt: {
      width: '100%',
      textAlign: 'left',
      padding: '13px 16px',
      border: '0.5px solid #e5e5e5',
      borderRadius: 10,
      background: '#fff',
      fontSize: 14,
      cursor: 'pointer',
      marginBottom: 8,
      display: 'block',
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
    optGrid: {
      padding: '13px 10px',
      border: '0.5px solid #e5e5e5',
      borderRadius: 10,
      background: '#fff',
      fontSize: 14,
      cursor: 'pointer',
      textAlign: 'center',
    },
    error: {
      background: '#fff0f0',
      color: '#c0392b',
      borderRadius: 10,
      padding: '10px 14px',
      fontSize: 13,
      marginTop: 8,
    },
    summary: {
      background: '#f5f5f5',
      borderRadius: 10,
      padding: '14px 16px',
      fontSize: 14,
      color: '#555',
      lineHeight: 1.6,
      marginBottom: 12,
    },
    btnDark: {
      width: '100%',
      padding: 14,
      background: '#1a1a1a',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    successIcon: {
      width: 52,
      height: 52,
      background: '#e8f8f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    },
  };

  return (
    <div style={styles.wrap}>
      {step === 0 && (
        <div>
          <p style={styles.title}>¿Qué te dice tu piel hoy?</p>
          <p style={styles.sub}>
            Inicia tu camino de Inteligencia Cutánea con este diagnóstico
            sensorial.
          </p>
          <input
            style={styles.input}
            type="email"
            placeholder="Tu email para recibir el Manual"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <button
            style={
              data.email.includes('@') ? styles.btnPrimary : styles.btnDisabled
            }
            disabled={!data.email.includes('@')}
            onClick={() => setStep(1)}
          >
            Comenzar ejercicio
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={styles.label}>🟢 Paso 1 — Observación visual</p>
          <p style={styles.title}>
            Frente al espejo con luz natural: ¿cómo luce la textura de tu piel?
          </p>
          {[
            'Zonas con brillo',
            'Zonas opacas',
            'Piel uniforme',
            'Cambios constantes',
          ].map((opt) => (
            <button
              key={opt}
              style={styles.opt}
              onClick={() => {
                setData({ ...data, observacion: opt });
                setStep(2);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={styles.label}>🔴 Paso 2 — Sensación física</p>
          <p style={styles.title}>
            Cierra los ojos y percibe tu rostro: ¿cómo se siente principalmente?
          </p>
          <div style={styles.grid}>
            {['Cómoda', 'Tirante', 'Sensible', 'Áspera', 'Suave'].map((opt) => (
              <button
                key={opt}
                style={styles.optGrid}
                disabled={loading}
                onClick={() => {
                  const final = { ...data, sensacion: opt };
                  setData(final);
                  saveToSupabase(final);
                }}
              >
                {loading ? '...' : opt}
              </button>
            ))}
          </div>
          {error && <div style={styles.error}>{error}</div>}
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <div style={styles.successIcon}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p style={styles.title}>¡Registro completo!</p>
          <div style={styles.summary}>
            Tu piel se observa con{' '}
            <strong>{data.observacion.toLowerCase()}</strong> y se siente{' '}
            <strong>{data.sensacion.toLowerCase()}</strong>.
          </div>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>
            Te hemos enviado el <strong>Manual de Usuario</strong> a tu correo
            para que aprendas a decidir con criterio propio.
          </p>
          <button style={styles.btnDark}>Ver programa premium →</button>
        </div>
      )}
    </div>
  );
}
