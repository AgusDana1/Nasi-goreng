import { Clock } from "lucide-react";

export default function OpenHours({ openHours, isOpen }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 mb-0">
      <div className="flex items-center justify-between bg-white rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={15} className="text-orange-500 sm:w-[18px] sm:h-[18px]" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Jam Operasional</p>
            <p className="font-bold text-gray-800 text-xs sm:text-sm">{openHours}</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border ${
            isOpen
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-red-50 text-red-500 border-red-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          {isOpen ? "Sedang Buka" : "Sedang Tutup"}
        </div>
      </div>
    </div>
  );
}
