'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addToCalendar = (type: 'google' | 'apple') => {
    const startDate = '20260501T193000';
    const endDate = '20260501T230000';
    const title = 'Aniversário do Claudemir';
    const details = `Confirmado por: ${formData.name}`;
    const location = 'Chacara Petrin, -22.2219202, -51.4386292';

    if (type === 'google') {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
      window.open(url, '_blank');
    } else {
      const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Apple Inc.//Mac OS X 10.15.7//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nBEGIN:VEVENT\nDTSTART:20260501T193000Z\nDTEND:20260501T230000Z\nSUMMARY:${title}\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'aniversario-claudemir.ics';
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/confirmations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, status: 'confirmado' }),
      });

      if (!response.ok) throw new Error('Erro ao confirmar presença');

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => { onClose(); setSuccess(false); }, 2800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    show: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-md w-full p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #0d1b2a, #1a2d42)',
              border: '1px solid rgba(168,180,192,0.35)',
              borderRadius: '4px',
            }}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Brilho de canto */}
            <div
              className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at top left, rgba(168,180,192,0.08), transparent 70%)',
              }}
            />

            {success ? (
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  🥂
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold mb-2 tracking-widest"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: 'linear-gradient(135deg, #d0d8e0, #a8b4c0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Presença Confirmada!
                </motion.h3>
                <motion.p
                  style={{ color: '#8a9ab0', fontFamily: 'Montserrat' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  Obrigado por confirmar, {formData.name}!<br />
                  <span className="text-sm">Até dia 01 de Maio 🎉</span>
                </motion.p>
              </motion.div>
            ) : (
              <>
                <motion.h2
                  className="text-xl sm:text-2xl font-bold mb-6 text-center tracking-widest"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: 'linear-gradient(135deg, #d0d8e0, #a8b4c0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Confirmar Presença
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                  {[
                    { label: 'NOME', name: 'name', type: 'text', placeholder: 'Seu nome', required: true },
                    { label: 'EMAIL', name: 'email', type: 'email', placeholder: 'seu@email.com', required: true },
                    { label: 'TELEFONE', name: 'phone', type: 'tel', placeholder: '(11) 99999-9999', required: false },
                  ].map((field, i) => (
                    <motion.div key={field.name} custom={i} variants={fieldVariants} initial="hidden" animate="show">
                      <label
                        className="block text-xs font-semibold mb-2 tracking-[0.2em]"
                        style={{ fontFamily: 'Montserrat', color: focusedField === field.name ? '#c0c8d0' : '#8a9ab0' }}
                      >
                        {field.label} {field.required && '*'}
                      </label>
                      <motion.input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-2.5 focus:outline-none"
                        style={{
                          background: 'rgba(13, 27, 42, 0.7)',
                          border: `1px solid ${focusedField === field.name ? 'rgba(192,200,208,0.7)' : 'rgba(168,180,192,0.25)'}`,
                          color: '#d0d8e0',
                          borderRadius: '3px',
                          fontFamily: 'Montserrat',
                          fontSize: '0.875rem',
                          boxShadow: focusedField === field.name ? '0 0 12px rgba(168,180,192,0.12)' : 'none',
                          transition: 'border 0.2s, box-shadow 0.2s',
                        }}
                      />
                    </motion.div>
                  ))}

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="px-4 py-2 text-sm"
                        style={{
                          background: 'rgba(180,50,50,0.15)',
                          border: '1px solid rgba(180,50,50,0.35)',
                          color: '#f08080',
                          borderRadius: '3px',
                          fontFamily: 'Montserrat',
                        }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full font-bold py-3 tracking-[0.2em] disabled:opacity-50 relative overflow-hidden"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      background: 'linear-gradient(135deg, #1e3550, #243d56)',
                      border: '1px solid rgba(168,180,192,0.5)',
                      color: '#d0d8e0',
                      borderRadius: '3px',
                      fontSize: '0.9rem',
                    }}
                    whileHover={{
                      background: 'linear-gradient(135deg, #243d56, #2e4f6e)',
                      borderColor: 'rgba(208,216,224,0.85)',
                      color: '#f0f4f8',
                      boxShadow: '0 0 25px rgba(168,180,192,0.25)',
                      scale: 1.01,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full"
                          style={{ borderColor: '#a8b4c0', borderTopColor: 'transparent' }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        CONFIRMANDO...
                      </span>
                    ) : 'CONFIRMAR PRESENÇA'}
                  </motion.button>
                </form>

                <div style={{ borderTop: '1px solid rgba(168,180,192,0.15)' }} className="pt-5">
                  <p
                    className="text-xs font-semibold mb-3 text-center tracking-[0.2em]"
                    style={{ fontFamily: 'Montserrat', color: '#6b7a8d' }}
                  >
                    ADICIONAR À AGENDA
                  </p>
                  <div className="flex gap-3">
                    {[
                      { type: 'google' as const, label: 'Google', color: 'rgba(66,133,244,0.15)', border: 'rgba(66,133,244,0.4)', text: '#90b4f0', hoverBg: 'rgba(66,133,244,0.28)', hoverBorder: 'rgba(66,133,244,0.7)' },
                      { type: 'apple' as const, label: 'Apple', color: 'rgba(168,180,192,0.08)', border: 'rgba(168,180,192,0.25)', text: '#c0c8d0', hoverBg: 'rgba(168,180,192,0.2)', hoverBorder: 'rgba(168,180,192,0.6)' },
                    ].map((btn) => (
                      <motion.button
                        key={btn.type}
                        onClick={() => addToCalendar(btn.type)}
                        className="flex-1 font-bold py-2 tracking-wider"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          background: btn.color,
                          border: `1px solid ${btn.border}`,
                          color: btn.text,
                          borderRadius: '3px',
                          fontSize: '0.85rem',
                        }}
                        whileHover={{
                          background: btn.hoverBg,
                          borderColor: btn.hoverBorder,
                          scale: 1.03,
                          y: -1,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                      >
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-full mt-4 py-2 font-semibold text-sm tracking-wider"
                  style={{ fontFamily: 'Montserrat', color: '#4a5a6a' }}
                  whileHover={{ color: '#8a9ab0', scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  Fechar
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
