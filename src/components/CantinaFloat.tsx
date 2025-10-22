"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CantinaFloat() {
  const [popup, setPopup] = useState(false);
  const [visible, setVisible] = useState(true); // desaparece hasta recargar

  if (!visible) return null;

  return (
    <>
      {/* === BOTÓN FLOTANTE === */}
      <motion.button
        onClick={() => setPopup(true)}
        className="fixed bottom-6 right-6 z-50 px-5 py-2 rounded-full text-sm font-semibold tracking-wider
                   bg-gradient-to-r from-[#8B0000] via-[#B51228] to-[#8B0000]
                   text-white shadow-[0_0_25px_rgba(255,0,0,0.35)]
                   border border-[#ffffff33] backdrop-blur-md
                   hover:brightness-110 transition-all duration-300"
        animate={{
          y: [0, -6, 0],
          boxShadow: [
            "0 0 10px rgba(255,80,80,0.3)",
            "0 0 25px rgba(255,80,80,0.55)",
            "0 0 10px rgba(255,80,80,0.3)",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
      >
        ⚠️ <span className="ml-1 font-semibold">AVISO</span>
      </motion.button>

      {/* === POPUP === */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-10 py-8 text-center max-w-md mx-auto text-white"
            >
              <h3 className="text-2xl font-semibold mb-3 text-[#FCD7D9]">
                Cantina abierta toda la noche
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Durante todo el evento podrás disfrutar de la cantina con opciones dulces,
                saladas y bebidas.  
                <br />¡Aprovechá y disfrutá la noche!
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setPopup(false)}
                  className="px-6 py-2 rounded-full bg-[#FCD7D9] text-[#7A1C32] font-semibold text-sm hover:brightness-110 transition"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setPopup(false);
                    setVisible(false);
                  }}
                  className="px-6 py-2 rounded-full border border-white/30 text-white/80 text-sm hover:bg-white/10 transition"
                >
                  No mostrar más
                </button>
              </div>

              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#7A1C32]/40 to-[#FCD7D9]/30 rounded-3xl opacity-40" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
