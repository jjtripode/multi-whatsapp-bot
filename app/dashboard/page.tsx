"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, TrendingUp, Settings, Activity, Send, MessageCircle, Clock } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Mensajes Enviados",
      value: "2,847",
      change: "+12%",
      icon: Send,
      color: "text-blue-600",
    },
    {
      title: "Conversaciones Activas",
      value: "156",
      change: "+8%",
      icon: MessageCircle,
      color: "text-green-600",
    },
    {
      title: "Usuarios Únicos",
      value: "1,234",
      change: "+15%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Tiempo de Respuesta",
      value: "2.3s",
      change: "-5%",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    { user: "Juan Pérez", action: "Envió mensaje", time: "Hace 2 min", status: "success" },
    { user: "María García", action: "Inició conversación", time: "Hace 5 min", status: "info" },
    { user: "Carlos López", action: "Completó flujo", time: "Hace 8 min", status: "success" },
    { user: "Ana Martínez", action: "Error en respuesta", time: "Hace 12 min", status: "error" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general de tu bot de WhatsApp</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Ver Reportes
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurar Bot
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span className="text-muted-foreground">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Status */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Estado del Bot
            </CardTitle>
            <CardDescription>Información actual del estado de tu bot de WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estado de Conexión</span>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Conectado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Última Actividad</span>
              <span className="text-sm text-muted-foreground">Hace 1 minuto</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mensajes en Cola</span>
              <span className="text-sm font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Uptime</span>
              <span className="text-sm text-muted-foreground">99.8%</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas interacciones con tu bot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas frecuentemente utilizadas para gestionar tu bot</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <MessageSquare className="h-6 w-6" />
              <span>Enviar Mensaje</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Gestionar Contactos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <TrendingUp className="h-6 w-6" />
              <span>Ver Analíticas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
