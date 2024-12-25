'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Script from "next/script"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function Order() {
  const [isLoading, setIsLoading] = useState(false)
  const [credits, setCredits] = useState(0)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { toast } = useToast()

  const searchParams = useSearchParams()
  const courseId = parseInt(searchParams.get('courseId') || '0', 10)
  const studentId = parseInt(searchParams.get('userId') || '0', 10)
  const amount = searchParams.get('courseAmt') || '0'
  const courseName = searchParams.get('courseName') || 'Course'
  const courseDesc = searchParams.get('courseDesc') || 'Course Description'
  const router = useRouter()

  const createOrderId = async () => {
    try {
      const response = await fetch('/api/Orders/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      return data.orderId
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error)
      setError("Failed to create order. Please try again.")
    }
  }

  const enrollCourse = async (studentId, courseId) => {
    try {
      const response = await fetch('/api/Course/courseEnroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_id: studentId,
          course_id: courseId
        })
      })
      if (response.status === 200) {
        router.replace(`/courses/${courseId}`)
      } else {
        throw new Error('Failed to enroll in the course')
      }
    } catch (error) {
      console.log(error)
      setError("Failed to enroll in the course. Please contact support.")
    }
  }

  const processPayment = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const orderId = await createOrderId()
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: "INR",
        name: "Skylearn",
        description: 'Course Payment',
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }

          const result = await fetch('/api/Orders/verifyOrder', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          })
          const res = await result.json()
          if (res.isOk) {
            setSuccess("Payment successful! Enrolling you in the course...")
            await enrollCourse(studentId, courseId)
            toast({
              title: "Payment Successful",
              description: "You have been enrolled in the course.",
              duration: 5000,
            })
          } else {
            setError(res.message || "Payment verification failed")
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: '#1e90ff',
        },
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.on('payment.failed', function (response) {
        setError(response.error.description)
      })
      paymentObject.open()
    } catch (error) {
      console.log(error)
      setError("Failed to process payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <Script
        id="razorpay-script"
        src="https://checkout.razorpay.com/v2/checkout.js"
      />
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Course Payment</CardTitle>
            <CardDescription>Complete your payment to enroll in the course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Progress value={66} className="w-full" />
              <div className="flex justify-between text-primary text-sm text-muted-foreground mt-2 font-bold">
                <span>Cart</span>
                <span>Payment</span>
                <span>Confirmation</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md mb-4">Course Details</h3>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">{courseName}</CardTitle>
                    <CardDescription>{courseDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">₹{amount}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-md mb-4">Payment Summary</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Course Price</span>
                        <span>₹{amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits Used</span>
                        <span>-₹{credits}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{parseFloat(amount) - credits}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch gap-4">
                    <div>
                      <Label htmlFor="credits" className="text-sm font-medium">Use Credits</Label>
                      <Input
                        id="credits"
                        placeholder="Enter credit amount"
                        value={credits}
                        onChange={(e) => setCredits(Math.min(parseFloat(e.target.value) || 0, parseFloat(amount)))}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={processPayment}
                      disabled={isLoading}
                      className="w-full  font-semibold"
                    >
                      {isLoading ? "Processing..." : `Pay ₹${parseFloat(amount) - credits}`}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="mt-6 bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Link href={`/courses/${courseId}`} className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Courses
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

