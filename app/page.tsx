"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ConfirmationModal from "./components/ConfirmationModal";

// Paleta: azul royal vivo + prata brilhante + branco luminoso
// #0a1628 fundo escuro | #1e3a5f azul médio | #2d6aad azul vivo
// #e8f0fe azul claro | #c8d8f0 prata-azulada | #ffffff branco

export default function Home() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; delay: number; duration: number; size: number; type: number }>
  >([]);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: 3 + Math.random() * 94,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 6,
        size: 2 + Math.random() * 5,
        type: Math.floor(Math.random() * 3),
      }))
    );
  }, []);

  const particleColors = [
    "linear-gradient(135deg, #c8d8f0, #7aa8d8)", // prata-azulada
    "linear-gradient(135deg, #4d8fd4, #2d6aad)",  // azul vivo
    "linear-gradient(135deg, #ffffff, #c8d8f0)",  // branco
  ];

  const handleLocation = () => {
    window.open("https://www.google.com/maps?q=-22.2219202,-51.4386292&z=17&hl=pt-BR", "_blank");
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.85 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <div
      className="relative w-screen min-h-screen flex items-center justify-center p-4 pb-8 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #060e1a 0%, #0d1f38 45%, #0a1628 100%)" }}
    >
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Glow azul central pulsante */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "70vw", height: "70vw",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(45,106,173,0.18) 0%, rgba(30,58,95,0.08) 50%, transparent 75%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Segundo glow — topo */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "40vw", height: "30vw",
          top: "-5%", left: "30%",
          background: "radial-gradient(ellipse, rgba(100,160,230,0.12) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Partículas coloridas — só renderiza no client */}
      {mounted && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: particleColors[p.type],
            top: "-5%",
            boxShadow: p.type === 2 ? "0 0 4px rgba(255,255,255,0.6)" : p.type === 1 ? "0 0 6px rgba(45,106,173,0.7)" : "none",
          }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 0.7, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Grid diagonal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(100,160,230,0.04) 0px, rgba(100,160,230,0.04) 1px, transparent 1px, transparent 55px)",
        }}
      />

      <div className="text-center px-4 max-w-2xl w-full relative z-10">

        {/* Bolo + nome */}
        <div className="relative mb-0 min-h-[140px] sm:min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-0"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 110, damping: 14 }}
          >
            <motion.span
              className="text-[9rem] sm:text-[11rem] md:text-[15rem] select-none"
              style={{ opacity: 0.15 }}
              animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              🎂
            </motion.span>
          </motion.div>

          <motion.h2
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, #ffffff 0%, #c8d8f0 30%, #7ab4e8 60%, #c8d8f0 80%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.08em",
              filter: "drop-shadow(0 0 28px rgba(100,160,230,0.55))",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            Claudemir
          </motion.h2>
        </div>

        {/* Divisor */}
        <motion.div
          className="flex justify-center items-center mb-6 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-px"
            style={{ background: "linear-gradient(90deg, transparent, #4d8fd4, #c8d8f0, transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: "9rem" }}
            transition={{ delay: 0.85, duration: 0.8 }}
          />
          <motion.span
            className="mx-4 text-xl"
            style={{ color: "#4d8fd4", filter: "drop-shadow(0 0 6px rgba(77,143,212,0.8))" }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.span>
          <motion.div
            className="h-px"
            style={{ background: "linear-gradient(90deg, transparent, #c8d8f0, #4d8fd4, transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: "9rem" }}
            transition={{ delay: 0.85, duration: 0.8 }}
          />
        </motion.div>

        {/* Infos com stagger */}
        <motion.div
          className="space-y-4 sm:space-y-5 mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base font-semibold tracking-[0.22em]"
            style={{ fontFamily: "Montserrat", color: "#7aa8d8" }}
          >
            VENHA COMEMORAR COMIGO<br />ESTE DIA ESPECIAL
          </motion.p>

          {/* Badge da data */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              className="inline-block px-10 sm:px-14 py-3 sm:py-4 text-xl sm:text-2xl font-bold tracking-[0.22em] cursor-default"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: "linear-gradient(135deg, #0d2040, #1e3a5f)",
                border: "1px solid rgba(100,160,230,0.7)",
                color: "#c8d8f0",
                boxShadow: "0 0 24px rgba(45,106,173,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              whileHover={{
                boxShadow: "0 0 50px rgba(77,143,212,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
                borderColor: "rgba(200,216,240,0.95)",
                color: "#ffffff",
                scale: 1.05,
              }}
              transition={{ duration: 0.22 }}
            >
              01 DE MAIO
            </motion.div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base font-semibold tracking-[0.22em]"
            style={{ fontFamily: "Montserrat", color: "#c8d8f0" }}
          >
            A PARTIR DO MEIO-DIA
          </motion.p>

          {/* Card do local */}
          <motion.div
            variants={itemVariants}
            className="rounded-sm px-6 sm:px-8 py-4 sm:py-5 cursor-default"
            style={{
              background: "rgba(13, 32, 64, 0.65)",
              border: "1px solid rgba(100,160,230,0.25)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
            whileHover={{
              background: "rgba(20, 45, 85, 0.8)",
              border: "1px solid rgba(100,160,230,0.55)",
              boxShadow: "0 8px 40px rgba(45,106,173,0.25), 0 0 0 1px rgba(100,160,230,0.1)",
              y: -4,
            }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.span
                className="text-xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                📍
              </motion.span>
              <p
                className="text-sm sm:text-base font-bold tracking-[0.2em]"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "#7ab4e8",
                  filter: "drop-shadow(0 0 6px rgba(100,160,230,0.4))",
                }}
              >
                LOCAL DO EVENTO
              </p>
            </div>
            <p className="text-sm sm:text-base font-semibold" style={{ fontFamily: "Montserrat", color: "#e8f0fe" }}>
              CHACARA PETRIN<br />
              <span className="text-xs sm:text-sm" style={{ color: "#7aa8d8" }}>
                Pra baixo do Rancho Quarto de Milha
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Botões */}
        <motion.div
          className="flex justify-center items-center gap-10 sm:gap-20 px-4 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.6 }}
        >
          {[
            {
              id: "location",
              label: ["Local da", "Festa"],
              delay: 1.75,
              onClick: handleLocation,
              icon: (
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              ),
              iconAnim: hoveredBtn === "location" ? { y: [0, -3, 0] } : {},
            },
            {
              id: "confirm",
              label: ["Confirmar", "Presença"],
              delay: 1.95,
              onClick: () => setIsModalOpen(true),
              icon: (
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              ),
              iconAnim: hoveredBtn === "confirm" ? { scale: [1, 1.25, 1] } : {},
            },
          ].map((btn) => (
            <motion.button
              key={btn.id}
              className="flex flex-col items-center w-24 sm:w-28 cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: btn.delay, type: "spring", stiffness: 220, damping: 14 }}
              whileHover={{ scale: 1.14, y: -9 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setHoveredBtn(btn.id)}
              onHoverEnd={() => setHoveredBtn(null)}
              onClick={btn.onClick}
            >
              <div className="relative mb-3">
                {/* Anel girando */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px dashed rgba(100,160,230,0.5)" }}
                  animate={hoveredBtn === btn.id ? { rotate: btn.id === "location" ? 360 : -360 } : { rotate: 0 }}
                  transition={{ duration: 2.5, repeat: hoveredBtn === btn.id ? Infinity : 0, ease: "linear" }}
                />
                {/* Anel de glow no hover */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={hoveredBtn === btn.id
                    ? { boxShadow: "0 0 20px rgba(77,143,212,0.5)", opacity: 1 }
                    : { boxShadow: "0 0 0px transparent", opacity: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                  style={{ border: "1px dashed rgba(100,160,230,0.2)" }}
                >
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #0d2040, #1e3a5f)",
                      border: "1px solid rgba(100,160,230,0.55)",
                      boxShadow: "0 0 18px rgba(45,106,173,0.3)",
                    }}
                    whileHover={{
                      background: "linear-gradient(135deg, #1e3a5f, #2d5a8e)",
                      boxShadow: "0 0 35px rgba(77,143,212,0.55)",
                      borderColor: "rgba(200,216,240,0.9)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      style={{ color: "#7ab4e8", filter: hoveredBtn === btn.id ? "drop-shadow(0 0 6px rgba(100,180,255,0.8))" : "none" }}
                      animate={btn.iconAnim}
                      transition={{ duration: 0.55, repeat: hoveredBtn === btn.id ? Infinity : 0 }}
                    >
                      {btn.icon}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              <motion.p
                className="text-[10px] sm:text-xs font-bold uppercase text-center leading-tight tracking-wider"
                style={{ fontFamily: "Montserrat" }}
                animate={hoveredBtn === btn.id ? { color: "#e8f0fe" } : { color: "#7aa8d8" }}
                transition={{ duration: 0.2 }}
              >
                {btn.label[0]}<br />{btn.label[1]}
              </motion.p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-3 w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
      >
        <motion.a
          href="https://www.instagram.com/gustavo_cortezb/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold"
          style={{ fontFamily: "Montserrat", color: "#2d4a6a" }}
          whileHover={{ color: "#7aa8d8" }}
          transition={{ duration: 0.2 }}
        >
          Desenvolvido por Gustavo Cortez de Brito © 2026
        </motion.a>
      </motion.div>
    </div>
  );
}
