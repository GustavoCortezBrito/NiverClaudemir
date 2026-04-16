"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ConfirmationModal from "./components/ConfirmationModal";

export default function Home() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; delay: number; duration: number; size: number }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        delay: Math.random() * 3,
        duration: 5 + Math.random() * 3,
        size: 2 + Math.random() * 4,
      }))
    );
  }, []);

  const handleLocation = () => {
    window.open(
      "https://www.google.com/maps?q=-22.2219202,-51.4386292&z=17&hl=pt-BR",
      "_blank"
    );
  };

  return (
    <div
      className="relative w-screen min-h-screen flex items-center justify-center p-4 pb-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1a2d42 40%, #0d1b2a 100%)",
      }}
    >
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Partículas metálicas flutuantes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: "linear-gradient(135deg, #c0c8d0, #8a9ab0)",
            top: "-5%",
          }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, 0.5, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Linhas decorativas de fundo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #a8b4c0 0px, #a8b4c0 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="text-center px-4 max-w-2xl w-full relative z-10">
        {/* Número grande atrás + nome na frente */}
        <div className="relative mb-0 min-h-[140px] sm:min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
          >
            <h1
              className="text-[10rem] sm:text-[12rem] md:text-[16rem] font-black select-none"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "linear-gradient(180deg, #c0c8d0 0%, #6b7a8d 50%, #a8b4c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 0.35,
              }}
            >
              🎂
            </h1>
          </motion.div>

          <motion.h2
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, #d0d8e0 0%, #a8b4c0 40%, #e8edf2 70%, #a8b4c0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              letterSpacing: "0.05em",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Claudemir
          </motion.h2>
        </div>

        {/* Divisor metálico */}
        <motion.div
          className="flex justify-center items-center mb-6 mt-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div
            className="h-px w-24 sm:w-32"
            style={{
              background: "linear-gradient(90deg, transparent, #a8b4c0, transparent)",
            }}
          />
          <span className="mx-4 text-2xl">⬡</span>
          <div
            className="h-px w-24 sm:w-32"
            style={{
              background: "linear-gradient(90deg, transparent, #a8b4c0, transparent)",
            }}
          />
        </motion.div>

        {/* Informações do evento */}
        <motion.div
          className="space-y-4 sm:space-y-5 mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p
            className="text-base sm:text-lg font-semibold tracking-widest"
            style={{ fontFamily: "Montserrat", color: "#a8b4c0" }}
          >
            VENHA COMEMORAR COMIGO<br />ESTE DIA ESPECIAL
          </p>

          <motion.div
            className="inline-block px-10 sm:px-14 py-3 sm:py-4 rounded-sm text-xl sm:text-2xl font-bold tracking-widest"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              background: "linear-gradient(135deg, #1a2d42, #243d56)",
              border: "1px solid #a8b4c0",
              color: "#d0d8e0",
              boxShadow: "0 0 20px rgba(168,180,192,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileHover={{ boxShadow: "0 0 30px rgba(168,180,192,0.3)" }}
          >
            01 DE MAIO
          </motion.div>

          <p
            className="text-base sm:text-lg font-semibold tracking-widest"
            style={{ fontFamily: "Montserrat", color: "#c0c8d0" }}
          >
            ÀS 19:30 HORAS
          </p>

          {/* Card do local */}
          <motion.div
            className="rounded-sm px-6 sm:px-8 py-4 sm:py-5 mt-4"
            style={{
              background: "rgba(26, 45, 66, 0.7)",
              border: "1px solid rgba(168,180,192,0.3)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl" style={{ color: "#a8b4c0" }}>📍</span>
              <p
                className="text-sm sm:text-base font-bold tracking-widest"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "#c0c8d0" }}
              >
                LOCAL DO EVENTO
              </p>
            </div>
            <p
              className="text-sm sm:text-base font-semibold"
              style={{ fontFamily: "Montserrat", color: "#d0d8e0" }}
            >
              CHACARA PETRIN<br />
              <span className="text-xs sm:text-sm" style={{ color: "#8a9ab0" }}>
                Pra baixo do Rancho Quarto de Milha
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Botões de ação */}
        <div className="w-full mt-8 sm:mt-12 pb-8">
          <motion.div
            className="flex justify-center items-center gap-8 sm:gap-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            {/* Localização */}
            <motion.button
              className="flex flex-col items-center w-24 sm:w-28 cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.12, y: -6 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleLocation}
            >
              <div className="relative mb-2">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                  style={{
                    border: "1px dashed rgba(168,180,192,0.5)",
                  }}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #1a2d42, #243d56)",
                      border: "1px solid #a8b4c0",
                      boxShadow: "0 0 15px rgba(168,180,192,0.2)",
                    }}
                  >
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#c0c8d0" }}
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p
                className="text-[10px] sm:text-xs font-bold uppercase text-center leading-tight tracking-wider"
                style={{ fontFamily: "Montserrat", color: "#a8b4c0" }}
              >
                Local da<br />Festa
              </p>
            </motion.button>

            {/* Confirmar Presença */}
            <motion.button
              className="flex flex-col items-center w-24 sm:w-28 cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.12, y: -6 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative mb-2">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                  style={{
                    border: "1px dashed rgba(168,180,192,0.5)",
                  }}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #1a2d42, #243d56)",
                      border: "1px solid #a8b4c0",
                      boxShadow: "0 0 15px rgba(168,180,192,0.2)",
                    }}
                  >
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#c0c8d0" }}
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p
                className="text-[10px] sm:text-xs font-bold uppercase text-center leading-tight tracking-wider"
                style={{ fontFamily: "Montserrat", color: "#a8b4c0" }}
              >
                Confirmar<br />Presença
              </p>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-3 w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <a
          href="https://www.instagram.com/gustavo_cortezb/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold transition-colors"
          style={{ fontFamily: "Montserrat", color: "#6b7a8d" }}
        >
          Desenvolvido por Gustavo Cortez de Brito © 2026
        </a>
      </motion.div>
    </div>
  );
}
