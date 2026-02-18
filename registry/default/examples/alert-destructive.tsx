import { Alert, AlertDescription, AlertTitle } from "@/registry/default/ui/alert"
import { AlertCircleIcon } from "blode-icons-react"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method
        and try again.
      </AlertDescription>
    </Alert>
  )
}
