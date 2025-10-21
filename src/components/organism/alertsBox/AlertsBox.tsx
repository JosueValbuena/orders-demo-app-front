import { Info, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AlertVariant = "info" | "success" | "warning" | "error"

interface CustomAlertProps {
    variant: AlertVariant
    description: string
    className?: string
}

const alertConfig = {
    info: {
        icon: Info,
        containerClass: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
        iconClass: "text-blue-600 dark:text-blue-400",
        title: 'Info',
        titleClass: "text-blue-900 dark:text-blue-100 font-bold",
        descriptionClass: "text-blue-800 dark:text-blue-200",
    },
    success: {
        icon: CheckCircle2,
        containerClass: "border-green-500 bg-green-50 dark:bg-green-950/30",
        iconClass: "text-green-600 dark:text-green-400",
        title: 'Success',
        titleClass: "text-green-900 dark:text-green-100 font-bold",
        descriptionClass: "text-green-800 dark:text-green-200",
    },
    warning: {
        icon: AlertTriangle,
        containerClass: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
        iconClass: "text-yellow-600 dark:text-yellow-500",
        title: 'Warning',
        titleClass: "text-yellow-900 dark:text-yellow-100 font-bold",
        descriptionClass: "text-yellow-800 dark:text-yellow-200",
    },
    error: {
        icon: AlertCircle,
        containerClass: "border-red-500 bg-red-50 dark:bg-red-950/30",
        iconClass: "text-red-600 dark:text-red-400",
        title: 'Error',
        titleClass: "text-red-900 dark:text-red-100 font-bold",
        descriptionClass: "text-red-800 dark:text-red-200",
    },
}


const AlertBox = ({ variant, description }: CustomAlertProps) => {

    const config = alertConfig[variant];

    return (
        <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto">

            <Alert className={config.containerClass}>
                <config.icon />
                <AlertTitle className={config.titleClass}>{config.title}</AlertTitle>
                <AlertDescription className={config.descriptionClass}>{description}</AlertDescription>
            </Alert>
            {/* <CustomAlert
                variant="info"
                title="Información"
                description="Usa el componente CustomAlert para crear alertas rápidamente."
            />

            <CustomAlert
                variant="success"
                title="¡Perfecto!"
                description="El componente es completamente reutilizable y tipado."
            />

            <CustomAlert variant="warning" title="Atención" description="Puedes personalizar cada alerta con props." />

            <CustomAlert
                variant="error"
                title="Error crítico"
                description="El sistema de tipos te ayudará a evitar errores."
            /> */}
        </div>
    )
}

export default AlertBox;