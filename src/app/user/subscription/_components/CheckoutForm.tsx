"use client"

import { saveSubscription } from "@/lib/actions/subscription"
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import type { SubscriptionPlan } from "@prisma/client"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { toast } from "react-toastify"

interface Props {
  show: boolean
  setShow: (show: boolean) => void
  plan: SubscriptionPlan
}

const CheckoutForm = (props: Props) => {
  const [isLoading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.user) return null

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      if (!elements || !stripe) return

      const result = await stripe?.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/user/profile",
        },
        redirect: "if_required",
      })

      if (result.error) {
        toast.error(result.error.message)
      } else {
        await saveSubscription({
          paymentId: result.paymentIntent.id,
          planId: props.plan.id,
          userId: session.user.id,
        })
        toast.success("Payment Successful!")
        router.push("/user/profile")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal isOpen={props.show}>
      <ModalContent>
        <ModalHeader>Complete your subscription purchase</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="flex justify-center gap-4 mt-4">
              <Button isDisabled={isLoading} onClick={() => props.setShow(false)} color="danger" variant="light">
                Cancel
              </Button>
              <Button isLoading={isLoading} color="primary" type="submit">
                Pay
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CheckoutForm

