"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Archive,
  Star,
  Trash2,
  Clock,
  CheckCheck,
  Check,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  timestamp: string
  isFromBot: boolean
  status: "sent" | "delivered" | "read"
}

interface Conversation {
  id: string
  contactName: string
  contactPhone: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  status: "active" | "archived" | "blocked"
  avatar?: string
  messages: Message[]
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      contactName: "Juan Pérez",
      contactPhone: "+1 234 567 8901",
      lastMessage: "Gracias por la información, me interesa el producto",
      timestamp: "10:30 AM",
      unreadCount: 2,
      status: "active",
      messages: [
        {
          id: "1",
          content: "Hola, me interesa conocer más sobre sus productos",
          timestamp: "10:25 AM",
          isFromBot: false,
          status: "read",
        },
        {
          id: "2",
          content:
            "¡Hola Juan! Gracias por contactarnos. Tenemos una amplia gama de productos. ¿Hay algo específico que te interese?",
          timestamp: "10:26 AM",
          isFromBot: true,
          status: "read",
        },
        {
          id: "3",
          content: "Me interesa el servicio de consultoría",
          timestamp: "10:28 AM",
          isFromBot: false,
          status: "read",
        },
        {
          id: "4",
          content:
            "Perfecto! Nuestro servicio de consultoría incluye análisis personalizado y estrategias adaptadas a tu negocio. ¿Te gustaría agendar una llamada?",
          timestamp: "10:29 AM",
          isFromBot: true,
          status: "delivered",
        },
        {
          id: "5",
          content: "Gracias por la información, me interesa el producto",
          timestamp: "10:30 AM",
          isFromBot: false,
          status: "sent",
        },
      ],
    },
    {
      id: "2",
      contactName: "María García",
      contactPhone: "+1 234 567 8902",
      lastMessage: "¿Cuáles son sus horarios de atención?",
      timestamp: "9:45 AM",
      unreadCount: 1,
      status: "active",
      messages: [
        {
          id: "1",
          content: "¿Cuáles son sus horarios de atención?",
          timestamp: "9:45 AM",
          isFromBot: false,
          status: "sent",
        },
      ],
    },
    {
      id: "3",
      contactName: "Carlos López",
      contactPhone: "+1 234 567 8903",
      lastMessage: "Perfecto, muchas gracias por la ayuda",
      timestamp: "Ayer",
      unreadCount: 0,
      status: "active",
      messages: [
        {
          id: "1",
          content: "Perfecto, muchas gracias por la ayuda",
          timestamp: "Ayer",
          isFromBot: false,
          status: "read",
        },
      ],
    },
  ]

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Mensajes</h1>
          <p className="text-muted-foreground">Administra las conversaciones de tu bot de WhatsApp</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archivar
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Nueva Conversación
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversaciones</CardTitle>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-1 p-3">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.contactName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground truncate">{conversation.contactName}</p>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            {conversation.unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 text-xs bg-primary">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">{conversation.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedConv.contactName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{selectedConv.contactName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConv.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Marcar como favorito
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archivar conversación
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar conversación
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-400px)] p-4">
                  <div className="space-y-4">
                    {selectedConv.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isFromBot ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isFromBot ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                            {message.isFromBot && getStatusIcon(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[40px] max-h-[120px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground">Selecciona una conversación</h3>
                  <p className="text-sm text-muted-foreground">
                    Elige una conversación de la lista para comenzar a chatear
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Conversaciones</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Pendientes</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCheck className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Respondidas</p>
                <p className="text-2xl font-bold">144</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Archive className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Archivadas</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
