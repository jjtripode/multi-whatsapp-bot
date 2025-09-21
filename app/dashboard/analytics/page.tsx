"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Target,
  Download,
  Activity,
  Send,
  MessageCircle,
  UserCheck,
  Zap,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  // Sample data for charts
  const messageData = [
    { name: "Lun", enviados: 45, recibidos: 38, respondidos: 35 },
    { name: "Mar", enviados: 52, recibidos: 48, respondidos: 42 },
    { name: "Mié", enviados: 38, recibidos: 35, respondidos: 30 },
    { name: "Jue", enviados: 65, recibidos: 58, respondidos: 52 },
    { name: "Vie", enviados: 78, recibidos: 72, respondidos: 68 },
    { name: "Sáb", enviados: 42, recibidos: 38, respondidos: 35 },
    { name: "Dom", enviados: 28, recibidos: 25, respondidos: 22 },
  ]

  const responseTimeData = [
    { time: "00:00", promedio: 2.3 },
    { time: "04:00", promedio: 1.8 },
    { time: "08:00", promedio: 3.2 },
    { time: "12:00", promedio: 4.1 },
    { time: "16:00", promedio: 3.8 },
    { time: "20:00", promedio: 2.9 },
  ]

  const conversationStatusData = [
    { name: "Activas", value: 156, color: "#3b82f6" },
    { name: "Completadas", value: 89, color: "#10b981" },
    { name: "Pendientes", value: 23, color: "#f59e0b" },
    { name: "Archivadas", value: 12, color: "#6b7280" },
  ]

  const userEngagementData = [
    { name: "Ene", nuevos: 45, activos: 120, retenidos: 98 },
    { name: "Feb", nuevos: 52, activos: 135, retenidos: 110 },
    { name: "Mar", nuevos: 38, activos: 128, retenidos: 105 },
    { name: "Abr", nuevos: 65, activos: 158, retenidos: 125 },
    { name: "May", nuevos: 78, activos: 172, retenidos: 140 },
    { name: "Jun", nuevos: 42, activos: 165, retenidos: 135 },
  ]

  const topKeywords = [
    { keyword: "precio", count: 145, trend: "up" },
    { keyword: "horario", count: 98, trend: "up" },
    { keyword: "producto", count: 87, trend: "down" },
    { keyword: "servicio", count: 76, trend: "up" },
    { keyword: "información", count: 65, trend: "stable" },
  ]

  const stats = [
    {
      title: "Mensajes Totales",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Usuarios Activos",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Tiempo Respuesta",
      value: "2.3s",
      change: "-15%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Tasa Conversión",
      value: "68%",
      change: "+5%",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analíticas del Bot</h1>
          <p className="text-muted-foreground">Métricas detalladas y análisis de rendimiento</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.trend === "up"
          const TrendIcon = isPositive ? TrendingUp : TrendingDown

          return (
            <Card key={index} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs mt-1">
                  <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                  <span className="text-muted-foreground">vs período anterior</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Mensajes
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Rendimiento
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Messages Analytics */}
        <TabsContent value="messages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Actividad de Mensajes
                </CardTitle>
                <CardDescription>Mensajes enviados, recibidos y respondidos por día</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={messageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="enviados" fill="#3b82f6" name="Enviados" />
                    <Bar dataKey="recibidos" fill="#10b981" name="Recibidos" />
                    <Bar dataKey="respondidos" fill="#f59e0b" name="Respondidos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Estado de Conversaciones
                </CardTitle>
                <CardDescription>Distribución del estado actual de las conversaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={conversationStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {conversationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {conversationStatusData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Analytics */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Engagement de Usuarios
              </CardTitle>
              <CardDescription>Usuarios nuevos, activos y retenidos por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="activos"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Usuarios Activos"
                  />
                  <Area
                    type="monotone"
                    dataKey="retenidos"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Usuarios Retenidos"
                  />
                  <Area
                    type="monotone"
                    dataKey="nuevos"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                    name="Usuarios Nuevos"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Tiempo de Respuesta
                </CardTitle>
                <CardDescription>Tiempo promedio de respuesta por hora del día</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="promedio"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      name="Tiempo Promedio (s)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Métricas de Rendimiento
                </CardTitle>
                <CardDescription>Indicadores clave de rendimiento del bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tasa de Respuesta</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }} />
                      </div>
                      <span className="text-sm font-semibold">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Satisfacción Usuario</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87%" }} />
                      </div>
                      <span className="text-sm font-semibold">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Resolución Automática</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "76%" }} />
                      </div>
                      <span className="text-sm font-semibold">76%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uptime del Bot</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "99%" }} />
                      </div>
                      <span className="text-sm font-semibold">99.8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Analytics */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Palabras Clave Populares
                </CardTitle>
                <CardDescription>Las consultas más frecuentes de los usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">#{index + 1}</span>
                        <span className="text-sm">{keyword.keyword}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{keyword.count}</span>
                        {keyword.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                        {keyword.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                        {keyword.trend === "stable" && <div className="h-3 w-3 bg-gray-400 rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Resumen de Actividad
                </CardTitle>
                <CardDescription>Estadísticas generales del período seleccionado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Mensajes Enviados</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">1,847</p>
                    <p className="text-xs text-muted-foreground">+12% vs anterior</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Nuevos Usuarios</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">234</p>
                    <p className="text-xs text-muted-foreground">+8% vs anterior</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Horario Pico</span>
                    <Badge variant="secondary">14:00 - 16:00</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Día Más Activo</span>
                    <Badge variant="secondary">Viernes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consulta Más Común</span>
                    <Badge variant="secondary">Precios</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
