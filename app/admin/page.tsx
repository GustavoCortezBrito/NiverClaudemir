'use client';

import { useState } from 'react';

interface Confirmation {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  confirmed_at: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        fetchConfirmations();
      } else {
        setAuthError('Senha incorreta');
      }
    } catch {
      setAuthError('Erro ao autenticar');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchConfirmations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/confirmations');
      const data = await response.json();
      setConfirmations(data);
    } catch (error) {
      console.error('Erro ao buscar confirmações:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2d42 100%)',
    minHeight: '100vh',
  };

  const cardStyle = {
    background: 'rgba(26, 45, 66, 0.9)',
    border: '1px solid rgba(168,180,192,0.3)',
    borderRadius: '4px',
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center p-4" style={containerStyle}>
        <div className="w-full max-w-sm p-8" style={cardStyle}>
          <div className="text-center mb-6">
            <span className="text-4xl">🔒</span>
            <h1
              className="text-2xl font-bold mt-2 tracking-widest"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'linear-gradient(135deg, #d0d8e0, #a8b4c0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Área Restrita
            </h1>
            <p className="text-sm mt-1" style={{ color: '#6b7a8d', fontFamily: 'Montserrat' }}>
              Digite a senha para acessar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              className="w-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#a8b4c0]"
              style={{
                background: 'rgba(13, 27, 42, 0.8)',
                border: '1px solid rgba(168,180,192,0.4)',
                color: '#d0d8e0',
                borderRadius: '4px',
                fontFamily: 'Montserrat',
              }}
            />

            {authError && (
              <p className="text-sm text-center" style={{ color: '#f08080', fontFamily: 'Montserrat' }}>
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full font-bold py-3 tracking-widest transition disabled:opacity-50"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: 'linear-gradient(135deg, #243d56, #1a2d42)',
                border: '1px solid #a8b4c0',
                color: '#d0d8e0',
                borderRadius: '4px',
              }}
            >
              {authLoading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8" style={containerStyle}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-widest"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(135deg, #d0d8e0, #a8b4c0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Confirmações
          </h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm font-semibold transition"
            style={{ fontFamily: 'Montserrat', color: '#6b7a8d' }}
          >
            Sair
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div
              className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: '#a8b4c0', borderTopColor: 'transparent' }}
            />
          </div>
        ) : confirmations.length === 0 ? (
          <div
            className="p-10 text-center"
            style={{ ...cardStyle, color: '#6b7a8d', fontFamily: 'Montserrat' }}
          >
            Nenhuma confirmação ainda
          </div>
        ) : (
          <>
            <div className="p-4 mb-6 flex items-center gap-3" style={cardStyle}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ background: 'rgba(168,180,192,0.15)', color: '#c0c8d0' }}
              >
                {confirmations.length}
              </div>
              <p className="font-semibold" style={{ color: '#a8b4c0', fontFamily: 'Montserrat' }}>
                {confirmations.length === 1 ? 'confirmação recebida' : 'confirmações recebidas'}
              </p>
            </div>

            {/* Cards mobile */}
            <div className="flex flex-col gap-4 sm:hidden">
              {confirmations.map((c) => (
                <div
                  key={c.id}
                  className="p-4"
                  style={{
                    ...cardStyle,
                    borderLeft: '3px solid #a8b4c0',
                  }}
                >
                  <p className="font-bold text-base mb-1" style={{ color: '#d0d8e0', fontFamily: 'Montserrat' }}>
                    {c.name}
                  </p>
                  <p className="text-sm mb-1" style={{ color: '#8a9ab0', fontFamily: 'Montserrat' }}>
                    {c.email}
                  </p>
                  <p className="text-sm mb-2" style={{ color: '#8a9ab0', fontFamily: 'Montserrat' }}>
                    {c.phone || 'Sem telefone'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-3 py-1"
                      style={{
                        background: 'rgba(168,180,192,0.15)',
                        color: '#c0c8d0',
                        borderRadius: '2px',
                        fontFamily: 'Montserrat',
                      }}
                    >
                      {c.status}
                    </span>
                    <span className="text-xs" style={{ color: '#6b7a8d', fontFamily: 'Montserrat' }}>
                      {new Date(c.confirmed_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela desktop */}
            <div className="hidden sm:block overflow-hidden" style={cardStyle}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(168,180,192,0.08)' }}>
                    {['Nome', 'Email', 'Telefone', 'Status', 'Data'].map((h) => (
                      <th
                        key={h}
                        className="text-left py-4 px-6 font-bold tracking-wider text-sm"
                        style={{ fontFamily: 'Montserrat', color: '#a8b4c0' }}
                      >
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {confirmations.map((c, i) => (
                    <tr
                      key={c.id}
                      style={{
                        borderTop: '1px solid rgba(168,180,192,0.1)',
                        background: i % 2 === 0 ? 'transparent' : 'rgba(168,180,192,0.03)',
                      }}
                    >
                      <td className="py-4 px-6 font-semibold" style={{ color: '#d0d8e0', fontFamily: 'Montserrat' }}>
                        {c.name}
                      </td>
                      <td className="py-4 px-6" style={{ color: '#8a9ab0', fontFamily: 'Montserrat' }}>
                        {c.email}
                      </td>
                      <td className="py-4 px-6" style={{ color: '#8a9ab0', fontFamily: 'Montserrat' }}>
                        {c.phone || '-'}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className="px-3 py-1 text-sm font-semibold"
                          style={{
                            background: 'rgba(168,180,192,0.15)',
                            color: '#c0c8d0',
                            borderRadius: '2px',
                            fontFamily: 'Montserrat',
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm" style={{ color: '#6b7a8d', fontFamily: 'Montserrat' }}>
                        {new Date(c.confirmed_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
