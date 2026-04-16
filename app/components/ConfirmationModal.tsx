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
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:20260501T193000Z
DTEND:20260501T230000Z
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: 'confirmado',
        }),
      });

      if (!response.ok) throw new Error('Erro ao confirmar presença');

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '' });

      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(26, 45, 66, 0.8)',
    border: '1px solid rgba(168,180,192,0.4)',
    color: '#d0d8e0',
    borderRadius: '4px',
  };

  const inputFocusClass =
    'w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a8b4c0]';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-md w-full p-6 sm:p-8"
            style={{
              background: 'linear-gradient(135deg, #0d1b2a, #1a2d42)',
              border: '1px solid rgba(168,180,192,0.4)',
              borderRadius: '4px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(168,180,192,0.05)',
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl mb-4">🥂</div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: 'linear-gradient(135deg, #d0d8e0, #a8b4c0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Presença Confirmada!
                </h3>
                <p style={{ color: '#8a9ab0', fontFamily: 'Montserrat' }}>
                  Obrigado por confirmar, {formData.name}!
                </p>
              </motion.div>
            ) : (
              <>
                <h2
                  className="text-2xl font-bold mb-6 text-center tracking-widest"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: 'linear-gradient(135deg, #d0d8e0, #a8b4c0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Confirmar Presença
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 tracking-wider"
                      style={{ fontFamily: 'Montserrat', color: '#a8b4c0' }}
                    >
                      NOME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputFocusClass}
                      style={inputStyle}
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 tracking-wider"
                      style={{ fontFamily: 'Montserrat', color: '#a8b4c0' }}
                    >
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputFocusClass}
                      style={inputStyle}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 tracking-wider"
                      style={{ fontFamily: 'Montserrat', color: '#a8b4c0' }}
                    >
                      TELEFONE
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputFocusClass}
                      style={inputStyle}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  {error && (
                    <div
                      className="px-4 py-2 rounded text-sm"
                      style={{
                        background: 'rgba(180, 50, 50, 0.2)',
                        border: '1px solid rgba(180,50,50,0.4)',
                        color: '#f08080',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-bold py-3 tracking-widest transition disabled:opacity-50"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      background: 'linear-gradient(135deg, #243d56, #1a2d42)',
                      border: '1px solid #a8b4c0',
                      color: '#d0d8e0',
                      borderRadius: '4px',
                      boxShadow: '0 0 15px rgba(168,180,192,0.1)',
                    }}
                  >
                    {loading ? 'CONFIRMANDO...' : 'CONFIRMAR PRESENÇA'}
                  </button>
                </form>

                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(168,180,192,0.2)' }}
                >
                  <p
                    className="text-sm font-semibold mb-3 text-center tracking-wider"
                    style={{ fontFamily: 'Montserrat', color: '#8a9ab0' }}
                  >
                    ADICIONAR À AGENDA
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCalendar('google')}
                      className="flex-1 font-bold py-2 transition"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        background: 'rgba(66, 133, 244, 0.15)',
                        border: '1px solid rgba(66,133,244,0.4)',
                        color: '#90b4f0',
                        borderRadius: '4px',
                      }}
                    >
                      Google
                    </button>
                    <button
                      onClick={() => addToCalendar('apple')}
                      className="flex-1 font-bold py-2 transition"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        background: 'rgba(168,180,192,0.1)',
                        border: '1px solid rgba(168,180,192,0.3)',
                        color: '#c0c8d0',
                        borderRadius: '4px',
                      }}
                    >
                      Apple
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full mt-4 py-2 font-semibold transition"
                  style={{ fontFamily: 'Montserrat', color: '#6b7a8d' }}
                >
                  Fechar
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
