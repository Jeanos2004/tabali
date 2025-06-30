'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// Types pour les données
interface ChartData {
  lineChart: Array<{ month: string; value: number }>;
  barChart: Array<{ service: string; value: number }>;
}

// Props pour le composant
interface DashboardChartsProps {
  userType: 'client' | 'provider' | 'admin';
  stats: {
    bookings: number;
    completed: number;
    upcoming: number;
    favorites: number;
    revenue: number;
    pendingReviews: number;
  };
}

// Générer des données pour les graphiques à partir de stats
const generateChartData = (userType: 'client' | 'provider' | 'admin', stats: DashboardChartsProps['stats']): ChartData => {
  // Générer des données pour la courbe (évolution mensuelle)
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  const baseValue = userType === 'client' ? stats.bookings : stats.revenue / 100000; // Normaliser revenue pour l'échelle
  const lineChart = months.map((month, index) => ({
    month,
    value: Math.round(baseValue * (0.7 + index * 0.1)), // Variation fictive
  }));

  // Générer des données pour le diagramme en barres (répartition par service)
  const services = ['Plomberie', 'Électricité', 'Menuiserie', 'Peinture'];
  const totalBookings = stats.bookings;
  const barChart = services.map((service, index) => ({
    service,
    value: Math.round(totalBookings * (0.4 - index * 0.1)), // Répartition fictive
  }));

  return { lineChart, barChart };
};

// Animation pour les graphiques
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardCharts({ userType, stats }: DashboardChartsProps) {
  const chartData = generateChartData(userType, stats);

  return (
    <>
      <style>{`
        .custom-chart .recharts-wrapper:focus,
        .custom-chart .recharts-surface:focus,
        .custom-chart .recharts-wrapper:focus-within,
        .custom-chart .recharts-surface:focus-within,
        .custom-chart .recharts-cartesian-layer:focus,
        .custom-chart .recharts-cartesian-layer:focus-within,
        .custom-chart .recharts-cartesian-layer * {
          outline: none !important;
          border: 1px solid #4ade80 !important;
          border-radius: 8px;
          outline-offset: 2px;
        }
      `}</style>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Graphique en courbes */}
        <motion.div variants={item}>
          <div className="bg-white p-6 rounded-lg shadow-md border border-tabali-border hover:shadow-lg transition-all duration-300 custom-chart">
            <h2 className="text-lg font-bold font-tabali-serif text-tabali-foreground mb-4">
              {userType === 'client' ? 'Évolution de vos réservations' : userType === 'provider' ? 'Évolution des revenus' : 'Évolution des réservations'}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.lineChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={14} fontFamily="Inter, sans-serif" />
                <YAxis stroke="#6b7280" fontSize={14} fontFamily="Inter, sans-serif" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb" // tabali-primary
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Graphique en barres */}
        <motion.div variants={item}>
          <div className="bg-white p-6 rounded-lg shadow-md border border-tabali-border hover:shadow-lg transition-all duration-300 custom-chart">
            <h2 className="text-lg font-bold font-tabali-serif text-tabali-foreground mb-4">
              Répartition par type de service
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.barChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="service" stroke="#6b7280" fontSize={14} fontFamily="Inter, sans-serif" />
                <YAxis stroke="#6b7280" fontSize={14} fontFamily="Inter, sans-serif" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} /> {/* tabali-secondary */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}