"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link"; // For navigation
import Image from "next/image";
import Script from "next/script";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthProvider, { AuthContext } from "@/providers/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";

export default function Order() {
    const searchParams = useSearchParams();
    const courseId =parseInt(searchParams.get('courseId'),10) ;
    const studentId = parseInt(searchParams.get('userId'),10);
    const amount = searchParams.get('courseAmt');
    const courseName = searchParams.get('courseName');
    const courseDesc= searchParams.get('courseDesc');
    const { userName, email } = AuthContext()
    const router = useRouter()
    const createOrderId = async () => {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount) * 100,
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.orderId;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };
    const enrollCourse = async (studentId,courseId) => {
        try {
            const response = await fetch('/api/courseEnroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    student_id: studentId,
                    course_id: courseId
                })
            })
            if (response.status == 200) {
                router.replace(`/courses/${courseId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const processPayment = async (e) => {
        e.preventDefault();
        try {
            const orderId = await createOrderId();
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure you have the key in your .env file
                amount: parseFloat(amount) * 100,
                currency: "INR",
                name: "Skylearn",
                description: 'Order Payment',
                order_id: orderId,
                handler: async function (response) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await fetch('/api/verifyOrder', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const res = await result.json();
                    if (res.isOk) {
                        alert("Payment successful: Page is reloading!");
                        enrollCourse(studentId,courseId)
                    }
                    else {
                        alert(res.message);
                    }
                },
                prefill: {
                    name: userName,
                    email: email,
                },
                theme: {
                    color: '#1e90ff',
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                alert(response.error.description);
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <Script
                id="razorpay-script"
                src="https://checkout.razorpay.com/v2/checkout.js"
            />
            <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center font-sans text-sm">
                <div className="card mx-auto shadow-lg flex w-3/4">
                    <div className="cart bg-white py-6 px-8 w-full shadow-md rounded-xl">
                        <div className="title mb-8">
                            <div className="flex justify-between items-center">
                                <div className="text-2xl font-bold text-primary">Course Payment</div>
                            </div>
                        </div>
                        <div className="row border-t border-b py-4">
                            <div className="main flex items-center justify-between">
                                <div className="col pl-4">
                                    <div className="text-sm text-black font-semibold">{courseName}</div>
                                    <div className="text-gray-500">{courseDesc}</div>
                                </div>
                                <div className="col text-right">
                                    <span className="font-bold text-lg">&#8377; {amount}</span>
                                </div>
                                {/* <button className="text-red-600 hover:text-red-800 focus:outline-none">
                                    <span className="text-xl">&#10005;</span>
                                </button> */}
                            </div>
                        </div>

                        <div className="back-to-shop mt-6 text-center">
                            <Link href="#" className="text-primary hover:text-primary-light">
                                &leftarrow; <span className="text-gray-500">Back to shop</span>
                            </Link>
                        </div>
                    </div>

                    <div className="summary bg-gray-200 px-8 py-6 w-full rounded-xl">
                        <h5 className="text-xl font-bold">Summary</h5>
                        <hr className="my-4" />
                        <div className="flex justify-between mt-4">
                            <div className="text-sm">Credits Available</div>
                            <div className="text-sm text-right">0</div>
                        </div>
                        <form onSubmit={processPayment}>
                            <div className="my-4">
                                <Label htmlFor="code" className="block text-sm font-medium py-2">Use Credits</Label>
                                <Input
                                    id="usecredits"
                                    placeholder="Enter the Amount of Credits"
                                    className="border p-4 mb-4 bg-gray-100 w-full outline-none rounded-md"
                                />
                            </div>
                        </form>
                        <div className="flex justify-between border-t pt-6">
                            <div className="text-sm">TOTAL PRICE</div>
                            <div className="text-sm text-right font-bold">&#8377; {amount}</div>
                        </div>
                        <Button
                            type="submit"
                            onClick={processPayment}
                            className="btn bg-primary text-white w-full text-sm py-2 mt-6 rounded-md hover:bg-primary-light focus:outline-none transition duration-200"
                        >
                            Pay &#8377;{amount}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
