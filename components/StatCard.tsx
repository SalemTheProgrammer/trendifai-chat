import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend: string;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  const isPositiveTrend = trend.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-blue-950/30 rounded-xl border border-blue-500/20 
        hover:border-blue-500/40 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-3">
          <Icon className="w-full h-full text-white" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-lg ${
          isPositiveTrend 
            ? 'text-green-400 bg-green-500/10' 
            : 'text-red-400 bg-red-500/10'
        }`}>
          {trend}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-blue-400/80">{title}</h3>
        <p className="text-2xl font-semibold text-blue-200 mt-1">{value}</p>
      </div>
    </motion.div>
  );
} 