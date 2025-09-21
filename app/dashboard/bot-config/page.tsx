"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Settings,
  MessageSquare,
  Clock,
  Users,
  Shield,
  Zap,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  QrCode,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BotConfigPage() {
  const [isConnected, setIsConnected] = useState(true)
  const [autoReply, setAutoReply] = useState(true)
  const [businessHours, setBusinessHours] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [config, setConfig] = useState({
    botName: "Mi Bot de WhatsApp",
    welcomeMessage: "¡Hola! Gracias por contactarnos. ¿En qué podemos ayudarte?",
    businessName: "Mi Empresa",
    responseDelay: "2",
    maxMessages: "50",
    workingHours: {
      start: "09:00",
      end: "18:00",
    },
    offlineMessage: "Gracias por tu mensaje. Nuestro horario de atención es de 9:00 AM a 6:00 PM.",
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleReconnect = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración del Bot</h1>
          <p className="text-muted-foreground">Personaliza el comportamiento y configuración de tu bot de WhatsApp</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReconnect} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Reconectar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Alert className={isConnected ? "border-green-500/20 bg-green-500/10" : "border-red-500/20 bg-red-500/10"}>
        {isConnected ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-600" />
        )}
        <AlertDescription className={isConnected ? "text-green-700" : "text-red-700"}>
          {isConnected
            ? "Bot conectado correctamente a WhatsApp Business API"
            : "Bot desconectado. Haz clic en 'Reconectar' para restablecer la conexión."}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Mensajes
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Automatización
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="connection" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            Conexión
          </TabsTrigger>
        </TabsList>

        {/* General Configuration */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Información Básica
                </CardTitle>
                <CardDescription>Configura la información básica de tu bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botName">Nombre del Bot</Label>
                  <Input
                    id="botName"
                    value={config.botName}
                    onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                    placeholder="Mi Bot de WhatsApp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nombre del Negocio</Label>
                  <Input
                    id="businessName"
                    value={config.businessName}
                    onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
                    placeholder="Mi Empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responseDelay">Retraso de Respuesta (segundos)</Label>
                  <Select
                    value={config.responseDelay}
                    onValueChange={(value) => setConfig({ ...config, responseDelay: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Inmediato</SelectItem>
                      <SelectItem value="1">1 segundo</SelectItem>
                      <SelectItem value="2">2 segundos</SelectItem>
                      <SelectItem value="3">3 segundos</SelectItem>
                      <SelectItem value="5">5 segundos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horario de Trabajo
                </CardTitle>
                <CardDescription>Define cuando tu bot debe estar activo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="businessHours">Horario de Negocio</Label>
                  <Switch checked={businessHours} onCheckedChange={setBusinessHours} />
                </div>
                {businessHours && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Hora de Inicio</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={config.workingHours.start}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              workingHours: { ...config.workingHours, start: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">Hora de Fin</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={config.workingHours.end}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              workingHours: { ...config.workingHours, end: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offlineMessage">Mensaje Fuera de Horario</Label>
                      <Textarea
                        id="offlineMessage"
                        value={config.offlineMessage}
                        onChange={(e) => setConfig({ ...config, offlineMessage: e.target.value })}
                        placeholder="Mensaje cuando el bot está fuera de horario"
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Messages Configuration */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Configuración de Mensajes
              </CardTitle>
              <CardDescription>Personaliza los mensajes automáticos de tu bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Mensaje de Bienvenida</Label>
                <Textarea
                  id="welcomeMessage"
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  placeholder="Mensaje que se envía cuando alguien inicia una conversación"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Este mensaje se enviará automáticamente cuando un usuario inicie una conversación
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Mensajes Predefinidos</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Saludo</span>
                        <Badge variant="secondary">Activo</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">¡Hola! ¿En qué puedo ayudarte?</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Despedida</span>
                        <Badge variant="secondary">Activo</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ¡Gracias por contactarnos! Que tengas un buen día.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Configuración Avanzada</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoReply">Respuesta Automática</Label>
                      <Switch checked={autoReply} onCheckedChange={setAutoReply} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxMessages">Máximo de Mensajes por Hora</Label>
                      <Input
                        id="maxMessages"
                        type="number"
                        value={config.maxMessages}
                        onChange={(e) => setConfig({ ...config, maxMessages: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Configuration */}
        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Flujos Automáticos
                </CardTitle>
                <CardDescription>Configura respuestas automáticas basadas en palabras clave</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Información de Precios</span>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Palabras clave: precio, costo, cuánto</p>
                    <p className="text-sm">
                      Respuesta: "Nuestros precios varían según el servicio. ¿Te interesa algún producto en particular?"
                    </p>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Horarios de Atención</span>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Palabras clave: horario, abierto, cerrado</p>
                    <p className="text-sm">
                      Respuesta: "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM."
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Zap className="h-4 w-4 mr-2" />
                  Agregar Nuevo Flujo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestión de Contactos
                </CardTitle>
                <CardDescription>Configuración para el manejo de contactos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Guardar Contactos Automáticamente</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Etiquetar Nuevos Contactos</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Notificar Nuevos Contactos</Label>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Etiqueta por Defecto</Label>
                  <Select defaultValue="nuevo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuevo">Nuevo Cliente</SelectItem>
                      <SelectItem value="prospecto">Prospecto</SelectItem>
                      <SelectItem value="cliente">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Configuration */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
              <CardDescription>Protege tu bot y controla el acceso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Control de Acceso</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Bloquear Números Desconocidos</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Límite de Mensajes por Usuario</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Filtro de Spam</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Números Bloqueados</h4>
                  <div className="space-y-2">
                    <Input placeholder="Agregar número a bloquear" />
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Agregar a Lista Negra
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Números bloqueados: 0</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connection Configuration */}
        <TabsContent value="connection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Configuración de Conexión
              </CardTitle>
              <CardDescription>Gestiona la conexión de tu bot con WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Estado de Conexión</h4>
                  <div className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Estado</span>
                      <Badge className="bg-green-500/10 text-green-600">Conectado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Última Conexión</span>
                      <span className="text-sm text-muted-foreground">Hace 2 minutos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Número Conectado</span>
                      <span className="text-sm text-muted-foreground">+1 234 567 8900</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Código QR</h4>
                  <div className="p-8 border border-border rounded-lg text-center">
                    <QrCode className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Escanea este código QR con WhatsApp para conectar tu bot
                    </p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Generar Nuevo QR
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
