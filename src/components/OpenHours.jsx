import { Clock } from "lucide-react";

export default function OpenHours({ openHours, isOpen }) {
  return (
    <div className="max-w-6xl mx-auto px-5 mb-0">
      <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Jam Operasional</p>
            <p className="font-bold text-gray-800 text-sm">{openHours}</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${
            isOpen
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-red-50 text-red-500 border-red-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          {isOpen ? "Sedang Buka" : "Sedang Tutup"}
        </div>
      </div>
    </div>
  );
}
