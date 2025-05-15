"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  Filter,
} from "lucide-react";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

// Interfaces pour les données des graphiques
interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface BookingsByService {
  service: string;
  count: number;
}

interface BookingsByDay {
  day: string;
  count: number;
}

interface ChartData {
  monthlyRevenue: MonthlyRevenue[];
  bookingsByService: BookingsByService[];
  bookingsByDay: BookingsByDay[];
}

// Interface pour les statistiques d'analytics
interface AnalyticsStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  totalClients: number;
  newClientsThisMonth: number;
  averageRating: number;
  bookingCompletionRate: number;
  mostPopularService: string;
  mostPopularDay: string;
  mostPopularTime: string;
}

// Données fictives pour les statistiques
const MOCK_STATS: AnalyticsStats = {
  totalBookings: 124,
  completedBookings: 98,
  cancelledBookings: 12,
  pendingBookings: 14,
  totalRevenue: 12450,
  totalClients: 45,
  newClientsThisMonth: 8,
  averageRating: 4.7,
  bookingCompletionRate: 79,
  mostPopularService: "Consultation juridique",
  mostPopularDay: "Mercredi",
  mostPopularTime: "14:00 - 16:00"
};

// Données fictives pour les graphiques
const MOCK_MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: "Janvier", revenue: 1200 },
  { month: "Février", revenue: 1800 },
  { month: "Mars", revenue: 2400 },
  { month: "Avril", revenue: 2000 },
  { month: "Mai", revenue: 2600 },
  { month: "Juin", revenue: 3200 },
  { month: "Juillet", revenue: 3000 },
  { month: "Août", revenue: 2800 },
  { month: "Septembre", revenue: 3400 },
  { month: "Octobre", revenue: 3800 },
  { month: "Novembre", revenue: 4200 },
  { month: "Décembre", revenue: 4800 }
];

const MOCK_BOOKINGS_BY_SERVICE: BookingsByService[] = [
  { service: "Consultation juridique", count: 45 },
  { service: "Rédaction de contrat", count: 30 },
  { service: "Conseil fiscal", count: 25 },
  { service: "Audit juridique", count: 15 },
  { service: "Accompagnement procédure", count: 9 }
];

const MOCK_BOOKINGS_BY_DAY: BookingsByDay[] = [
  { day: "Lundi", count: 18 },
  { day: "Mardi", count: 22 },
  { day: "Mercredi", count: 30 },
  { day: "Jeudi", count: 25 },
  { day: "Vendredi", count: 20 },
  { day: "Samedi", count: 8 },
  { day: "Dimanche", count: 1 }
];

export default function AnalyticsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<AnalyticsStats | null>(null);
    const [timeRange, setTimeRange] = useState("month"); // week, month, year, all
    const [chartData, setChartData] = useState<ChartData>({
      monthlyRevenue: [],
      bookingsByService: [],
      bookingsByDay: []
    });
  
    useEffect(() => {
      // Simuler le chargement des données
      const timer = setTimeout(() => {
        setStats(MOCK_STATS);
        setChartData({
          monthlyRevenue: MOCK_MONTHLY_REVENUE,
          bookingsByService: MOCK_BOOKINGS_BY_SERVICE,
          bookingsByDay: MOCK_BOOKINGS_BY_DAY
        });
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);
  
    // Formater le montant en euros
    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    };
  
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-tabali-text">Analyses</h1>
            <p className="text-tabali-muted-text">Suivez vos performances et vos statistiques</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-tabali-muted-text" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-tabali-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
              <option value="all">Toutes les données</option>
            </select>
          </div>
        </div>
  
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-32 bg-slate-100 animate-pulse rounded-lg"></div>
            ))}
            <div className="md:col-span-2 lg:col-span-4 h-64 bg-slate-100 animate-pulse rounded-lg"></div>
            <div className="md:col-span-2 h-64 bg-slate-100 animate-pulse rounded-lg"></div>
            <div className="md:col-span-2 h-64 bg-slate-100 animate-pulse rounded-lg"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={item}>
                <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-tabali-muted-text text-sm">Total des réservations</p>
                        <p className="text-3xl font-bold text-tabali-text">{stats?.totalBookings}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                            {stats?.pendingBookings} en attente
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={item}>
              <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tabali-muted-text text-sm">Revenus totaux</p>
                      <p className="text-3xl font-bold text-tabali-text">{formatCurrency(stats?.totalRevenue ?? 0)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">+12% ce mois</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tabali-muted-text text-sm">Clients totaux</p>
                      <p className="text-3xl font-bold text-tabali-text">{stats?.totalClients}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full">
                          {stats?.newClientsThisMonth} nouveaux
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tabali-muted-text text-sm">Taux de complétion</p>
                      <p className="text-3xl font-bold text-tabali-text">{stats?.bookingCompletionRate}%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-tabali-muted-text">{stats?.completedBookings} terminées</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Graphique des revenus mensuels */}
          <motion.div variants={item}>
            <Card className="border-tabali-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-tabali-text mb-4 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-tabali-primary" />
                  Revenus mensuels
                </h2>
                <div className="h-64 w-full">
                  {/* Ici, vous pourriez intégrer une bibliothèque de graphiques comme Recharts ou Chart.js */}
                  <div className="h-full w-full flex items-end justify-between gap-2">
                    {chartData.monthlyRevenue.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-12 bg-tabali-primary/80 hover:bg-tabali-primary transition-all rounded-t-md"
                          style={{ 
                            height: `${(item.revenue / Math.max(...chartData.monthlyRevenue.map(d => d.revenue))) * 200}px` 
                          }}
                        ></div>
                        <p className="text-xs text-tabali-muted-text mt-2">{item.month}</p>
                        <p className="text-xs font-medium">{formatCurrency(item.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
                    {/* Graphiques des réservations par service et par jour */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={item}>
              <Card className="border-tabali-border">
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium text-tabali-text mb-4 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-tabali-primary" />
                    Réservations par service
                  </h2>
                  <div className="h-64 w-full">
                    {/* Ici, vous pourriez intégrer une bibliothèque de graphiques comme Recharts ou Chart.js */}
                    <div className="space-y-4">
                      {chartData.bookingsByService.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-tabali-text">{item.service}</p>
                            <p className="text-sm font-medium">{item.count}</p>
                          </div>
                          <div className="w-full h-2 bg-tabali-muted/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-tabali-primary"
                              style={{ 
                                width: `${(item.count / Math.max(...chartData.bookingsByService.map(d => d.count))) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-tabali-border">
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium text-tabali-text mb-4 flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-tabali-primary" />
                    Réservations par jour
                  </h2>
                  <div className="h-64 w-full">
                    {/* Ici, vous pourriez intégrer une bibliothèque de graphiques comme Recharts ou Chart.js */}
                    <div className="h-full w-full flex items-end justify-between gap-2">
                      {chartData.bookingsByDay.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-12 bg-tabali-primary/80 hover:bg-tabali-primary transition-all rounded-t-md"
                            style={{ 
                              height: `${(item.count / Math.max(...chartData.bookingsByDay.map(d => d.count))) * 200}px` 
                            }}
                          ></div>
                          <p className="text-xs text-tabali-muted-text mt-2">{item.day}</p>
                          <p className="text-xs font-medium">{item.count}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Statistiques supplémentaires */}
          <motion.div variants={item}>
            <Card className="border-tabali-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-tabali-text mb-4">Autres statistiques</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-tabali-muted-text text-sm">Service le plus populaire</p>
                    <p className="font-medium">{stats?.mostPopularService}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-tabali-muted-text text-sm">Jour le plus réservé</p>
                    <p className="font-medium">{stats?.mostPopularDay}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-tabali-muted-text text-sm">Créneau horaire le plus demandé</p>
                    <p className="font-medium">{stats?.mostPopularTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}