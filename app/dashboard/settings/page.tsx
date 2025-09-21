"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Database, Palette, Globe, Key } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia y configuración de la cuenta</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Apariencia
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Cambiar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" defaultValue="Administrador" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" defaultValue="Sistema" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@empresa.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+1 234 567 8900" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Nuevos Mensajes</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones de nuevos mensajes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Errores del Bot</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones cuando el bot tiene problemas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Reportes Semanales</Label>
                    <p className="text-sm text-muted-foreground">Resumen semanal de actividad</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Actualizaciones del Sistema</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones sobre nuevas funciones</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Mantén tu cuenta segura con estas configuraciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Cambiar Contraseña</Label>
                  <div className="space-y-2 mt-2">
                    <Input type="password" placeholder="Contraseña actual" />
                    <Input type="password" placeholder="Nueva contraseña" />
                    <Input type="password" placeholder="Confirmar nueva contraseña" />
                  </div>
                  <Button className="mt-2" size="sm">
                    Actualizar Contraseña
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                  </div>
                  <Badge variant="outline">No configurado</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Sesiones Activas</Label>
                    <p className="text-sm text-muted-foreground">Gestiona tus sesiones activas</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Sesiones
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones Conectadas</CardTitle>
              <CardDescription>Gestiona las integraciones y servicios conectados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 rounded-lg p-2">
                      <Globe className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp Business API</p>
                      <p className="text-sm text-muted-foreground">Conectado y funcionando</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600">Conectado</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 rounded-lg p-2">
                      <Database className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Base de Datos</p>
                      <p className="text-sm text-muted-foreground">Almacenamiento de conversaciones</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600">Conectado</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500 rounded-lg p-2">
                      <Key className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">API Externa</p>
                      <p className="text-sm text-muted-foreground">Servicios de terceros</p>
                    </div>
                  </div>
                  <Badge variant="outline">No configurado</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia de tu dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Tema</Label>
                  <p className="text-sm text-muted-foreground mb-3">Selecciona tu tema preferido</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="w-full h-16 bg-background border border-border rounded mb-2" />
                      <p className="text-sm text-center">Claro</p>
                    </div>
                    <div className="p-3 border-2 border-primary rounded-lg cursor-pointer">
                      <div className="w-full h-16 bg-gray-900 rounded mb-2" />
                      <p className="text-sm text-center">Oscuro</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="w-full h-16 bg-gradient-to-r from-background to-gray-900 border border-border rounded mb-2" />
                      <p className="text-sm text-center">Sistema</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Animaciones</Label>
                    <p className="text-sm text-muted-foreground">Habilitar animaciones en la interfaz</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Sidebar Compacta</Label>
                    <p className="text-sm text-muted-foreground">Usar una barra lateral más pequeña</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
