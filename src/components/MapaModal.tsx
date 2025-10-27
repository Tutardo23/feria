"use client";
import { motion, AnimatePresence } from "framer-motion";
import MapaInteractivoLosCerros from "./MapaInteractivoLosCerros";

interface MapaModalProps {
  open: boolean;
  onClose: () => void;
  curso?: string | null;
}

export default function MapaModal({ open, onClose, curso }: MapaModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95vw] max-w-5xl bg-[#7A1C32] rounded-3xl overflow-hidden shadow-2xl border border-white/15"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 text-[#7A1C32] rounded-full px-3 py-1 text-sm z-10"
            >
              ✕ Cerrar
            </button>

            {/* Mapa con el curso seleccionado */}
            <MapaInteractivoLosCerros cursoInicial={curso ?? undefined} />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
