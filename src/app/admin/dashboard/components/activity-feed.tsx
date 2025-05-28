import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, ShieldAlert, UserPlus, Clock, Settings, Lock } from "lucide-react"

// Mock data for activity feed
const activityData = [
  {
    id: 1,
    type: "user_signup",
    user: {
      name: "María García",
      email: "maria.garcia@ejemplo.com",
      avatar: null,
    },
    timestamp: "2024-07-15T10:23:45",
    details: "Nuevo usuario registrado",
  },
  {
    id: 2,
    type: "invoice_created",
    user: {
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      avatar: null,
    },
    timestamp: "2024-07-15T09:45:12",
    details: "Factura F-2024-042 creada por importe de €1,500.00",
  },
  {
    id: 3,
    type: "admin_login",
    user: {
      name: "Admin",
      email: "admin@ejemplo.com",
      avatar: null,
    },
    timestamp: "2024-07-15T09:30:00",
    details: "Inicio de sesión de administrador",
  },
  {
    id: 4,
    type: "system_update",
    user: {
      name: "Sistema",
      email: "system@ejemplo.com",
      avatar: null,
    },
    timestamp: "2024-07-15T08:15:30",
    details: "Actualización de parámetros del sistema",
  },
  {
    id: 5,
    type: "security_alert",
    user: {
      name: "Sistema",
      email: "system@ejemplo.com",
      avatar: null,
    },
    timestamp: "2024-07-15T07:45:22",
    details: "Intento de acceso fallido múltiple desde IP 192.168.1.45",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "user_signup":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "invoice_created":
      return <FileText className="h-4 w-4 text-blue-500" />
    case "admin_login":
      return <Lock className="h-4 w-4 text-purple-500" />
    case "system_update":
      return <Settings className="h-4 w-4 text-orange-500" />
    case "security_alert":
      return <ShieldAlert className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activityData.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
          <div className="flex-shrink-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.avatar || ""} alt={activity.user.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {activity.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.user.name}</p>
              <div className="flex items-center text-xs text-gray-500">
                {getActivityIcon(activity.type)}
                <span className="ml-1">{formatTimestamp(activity.timestamp)}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">{activity.details}</p>

            <p className="text-xs text-gray-500">{activity.user.email}</p>
          </div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Ver todo el historial de actividad
        </button>
      </div>
    </div>
  )
}
