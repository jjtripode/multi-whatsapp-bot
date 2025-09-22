"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  MessageSquare,
  Phone,
  Mail,
  Edit,
  Trash2,
  Star,
  Tag,
} from "lucide-react"
import { WtsContact } from "@/app/models/WtsContact"
import { getWtsContacts } from "@/app/server/wts/wtsApi"
import { formatTelephone } from "@/app/helper/helper";

export default async function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [contacts, setContacts] = useState<WtsContact[]>([])

   useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.error('buscando fetching contacts:');

        const data = await getWtsContacts('028208fd01cc119b42ea8c819311bce3');
        console.log('Fetched contacts:', JSON.stringify(data, null, 2));
        
        if (!data) {
          throw new Error('No data received from API');
        }
        
        setContacts(data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setContacts([]); // Set empty array on error
      } finally {
        // Handle loading state if needed
      }
    };

    fetchContacts();
  }, [])


  // const getStatusBadge = (status: WtsContact["status"]) => {
  //   switch (status) {
  //     case "active":
  //       return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Activo</Badge>
  //     case "blocked":
  //       return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Bloqueado</Badge>
  //     case "archived":
  //       return <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">Archivado</Badge>
  //     default:
  //       return null
  //   }
  // }

  // const filteredContacts = contacts;

  // // const filteredContacts = contacts.filter(
  // //   // (contact) =>
  // //   //   contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  // //   //   contact.phone.includes(searchQuery) ||
  // //   //   contact.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  // //   contacts
  // // )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Contactos</h1>
          <p className="text-muted-foreground">Administra todos los contactos de tu bot de WhatsApp</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Contacto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Contacto</DialogTitle>
                <DialogDescription>Crea un nuevo contacto para tu base de datos</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Opcional)</Label>
                  <Input id="email" type="email" placeholder="juan@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiquetas</Label>
                  <Input id="tags" placeholder="Cliente, VIP, Prospecto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea id="notes" placeholder="Información adicional sobre el contacto" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar Contacto</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Contactos</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Activos</p>
                {/* <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "active").length}</p> */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">VIP</p>
                {/* <p className="text-2xl font-bold">{contacts.filter((c) => c.tags.includes("VIP")).length}</p> */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Prospectos</p>
                {/* <p className="text-2xl font-bold">{contacts.filter((c) => c.tags.includes("Prospecto")).length}</p> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Contactos</CardTitle>
              <CardDescription>Gestiona y organiza todos tus contactos</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contactos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contacto</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Etiquetas</TableHead>
                <TableHead>Último Contacto</TableHead>
                <TableHead>Mensajes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        {/* <p className="text-sm text-muted-foreground truncate max-w-[200px]">{contact.lastMessage}</p> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatTelephone(contact.id)}</span>
                      <span className="text-sm">{contact.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* {contact.email ? (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                    ) : ( */}
                      <span className="text-sm text-muted-foreground">-</span>
                    {/* )} */}
                  </TableCell>
                  {/* <TableCell>{getStatusBadge(contact.status)}</TableCell> */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {/* {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))} */}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* <span className="text-sm text-muted-foreground">{contact.lastContact}</span> */}
                  </TableCell>
                  <TableCell>
                    {/* <span className="text-sm font-medium">{contact.totalMessages}</span> */}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Enviar mensaje
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar contacto
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Marcar como VIP
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar contacto
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
