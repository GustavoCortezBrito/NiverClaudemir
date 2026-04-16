"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import ConfirmationModal from "./components/ConfirmationModal";

export default function Home() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; delay: number; duration: number; size: number; opacity: number }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 5,
        size: 1.5 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.5,
      }))
    );
  }, []);

  const handleLocation = () => {
    window.open(
      "https://www.google.com/maps?q=-22.2219202,-51.4386292&z=17&hl=pt-BR",
      "_blank"
    );
  };

  // stagger children
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className="relative w-screen min-h-screen flex items-center justify-center p-4 pb-8 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1520 0%, #1a2d42 50%, #0a1520 100%)" }}
    >
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Glow de fundo pulsante */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(168,180,192,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Partículas metálicas */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: "linear-gradient(135deg, #d0d8e0, #8a9ab0)",
            top: "-5%",
          }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, p.opacity, 0], x: [0, Math.random() * 30 - 15, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Grid diagonal de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(168,180,192,0.04) 0px, rgba(168,180,192,0.04) 1px, transparent 1px, transparent 55px)",
        }}
      />

      {/* Linhas horizontais sutis */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(168,180,192,0.02) 0px, rgba(168,180,192,0.02) 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="text-center px-4 max-w-2xl w-full relative z-10">

        {/* Emoji bolo + nome */}
        <div className="relative mb-0 min-h-[140px] sm:min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-0"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 14 }}
          >
            <motion.span
              className="text-[9rem] sm:text-[11rem] md:text-[15rem] select-none"
              style={{ opacity: 0.18, filter: "grayscale(0.3)" }}
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              🎂
            </motion.span>
          </motion.div>

          <motion.h2
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, #e8edf2 0%, #a8b4c0 35%, #f0f4f8 65%, #8a9ab0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.08em",
              filter: "drop-shadow(0 0 20px rgba(168,180,192,0.3))",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          >
            Claudemir
          </motion.h2>
        </div>

        {/* Divisor animado */}
        <motion.div
          className="flex justify-center items-center mb-6 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <motion.div
            className="h-px"
            style={{ background: "linear-gradient(90deg, transparent, #a8b4c0, transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.9, duration: 0.7 }}
          />
          <motion.span
            className="mx-4 text-xl"
            style={{ color: "#a8b4c0" }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            ⬡
          </motion.span>
          <motion.div
            className="h-px"
            style={{ background: "linear-gradient(90deg, transparent, #a8b4c0, transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.9, duration: 0.7 }}
          />
        </motion.div>

        {/* Bloco de infos com stagger */}
        <motion.div
          className="space-y-4 sm:space-y-5 mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base font-semibold tracking-[0.25em]"
            style={{ fontFamily: "Montserrat", color: "#8a9ab0" }}
          >
            VENHA COMEMORAR COMIGO<br />ESTE DIA ESPECIAL
          </motion.p>

          {/* Badge da data */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              className="inline-block px-10 sm:px-14 py-3 sm:py-4 text-xl sm:text-2xl font-bold tracking-[0.2em] cursor-default"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: "linear-gradient(135deg, #1a2d42, #243d56)",
                border: "1px solid rgba(168,180,192,0.6)",
                color: "#d0d8e0",
                boxShadow: "0 0 20px rgba(168,180,192,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
              whileHover={{
                boxShadow: "0 0 40px rgba(168,180,192,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                borderColor: "rgba(208,216,224,0.9)",
                color: "#f0f4f8",
                scale: 1.04,
              }}
              transition={{ duration: 0.25 }}
            >
              01 DE MAIO
            </motion.div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base font-semibold tracking-[0.2em]"
            style={{ fontFamily: "Montserrat", color: "#c0c8d0" }}
          >
            ÀS 19:30 HORAS
          </motion.p>

          {/* Card do local */}
          <motion.div
            variants={itemVariants}
            className="rounded-sm px-6 sm:px-8 py-4 sm:py-5 cursor-default"
            style={{
              background: "rgba(26, 45, 66, 0.65)",
              border: "1px solid rgba(168,180,192,0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
            whileHover={{
              background: "rgba(36, 61, 86, 0.8)",
              border: "1px solid rgba(168,180,192,0.45)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(168,180,192,0.08)",
              y: -3,
            }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.span
                className="text-xl"
                style={{ color: "#a8b4c0" }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                📍
              </motion.span>
              <p
                className="text-sm sm:text-base font-bold tracking-[0.2em]"
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
        <motion.div
          className="flex justify-center items-center gap-10 sm:gap-20 px-4 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {/* Botão Localização */}
          <motion.button
            className="flex flex-col items-center w-24 sm:w-28 cursor-pointer group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 220, damping: 14 }}
            whileHover={{ scale: 1.14, y: -8 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setHoveredBtn("location")}
            onHoverEnd={() => setHoveredBtn(null)}
            onClick={handleLocation}
          >
            <div className="relative mb-3">
              {/* Anel externo girando no hover */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px dashed rgba(168,180,192,0.4)" }}
                animate={hoveredBtn === "location" ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: hoveredBtn === "location" ? Infinity : 0, ease: "linear" }}
              />
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                style={{ border: "1px dashed rgba(168,180,192,0.25)" }}
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1a2d42, #243d56)",
                    border: "1px solid rgba(168,180,192,0.5)",
                    boxShadow: "0 0 15px rgba(168,180,192,0.15)",
                  }}
                  whileHover={{
                    background: "linear-gradient(135deg, #243d56, #2e4f6e)",
                    boxShadow: "0 0 30px rgba(168,180,192,0.35)",
                    borderColor: "rgba(208,216,224,0.9)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#c0c8d0" }}
                    animate={hoveredBtn === "location" ? { y: [0, -2, 0] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
            <motion.p
              className="text-[10px] sm:text-xs font-bold uppercase text-center leading-tight tracking-wider"
              style={{ fontFamily: "Montserrat", color: "#a8b4c0" }}
              animate={hoveredBtn === "location" ? { color: "#d0d8e0" } : { color: "#a8b4c0" }}
              transition={{ duration: 0.2 }}
            >
              Local da<br />Festa
            </motion.p>
          </motion.button>

          {/* Botão Confirmar */}
          <motion.button
            className="flex flex-col items-center w-24 sm:w-28 cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, type: "spring", stiffness: 220, damping: 14 }}
            whileHover={{ scale: 1.14, y: -8 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setHoveredBtn("confirm")}
            onHoverEnd={() => setHoveredBtn(null)}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="relative mb-3">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px dashed rgba(168,180,192,0.4)" }}
                animate={hoveredBtn === "confirm" ? { rotate: -360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: hoveredBtn === "confirm" ? Infinity : 0, ease: "linear" }}
              />
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                style={{ border: "1px dashed rgba(168,180,192,0.25)" }}
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1a2d42, #243d56)",
                    border: "1px solid rgba(168,180,192,0.5)",
                    boxShadow: "0 0 15px rgba(168,180,192,0.15)",
                  }}
                  whileHover={{
                    background: "linear-gradient(135deg, #243d56, #2e4f6e)",
                    boxShadow: "0 0 30px rgba(168,180,192,0.35)",
                    borderColor: "rgba(208,216,224,0.9)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#c0c8d0" }}
                    animate={hoveredBtn === "confirm" ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
            <motion.p
              className="text-[10px] sm:text-xs font-bold uppercase text-center leading-tight tracking-wider"
              style={{ fontFamily: "Montserrat" }}
              animate={hoveredBtn === "confirm" ? { color: "#d0d8e0" } : { color: "#a8b4c0" }}
              transition={{ duration: 0.2 }}
            >
              Confirmar<br />Presença
            </motion.p>
          </motion.button>
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
          style={{ fontFamily: "Montserrat", color: "#4a5a6a" }}
          whileHover={{ color: "#8a9ab0" }}
          transition={{ duration: 0.2 }}
        >
          Desenvolvido por Gustavo Cortez de Brito © 2026
        </motion.a>
      </motion.div>
    </div>
  );
}
