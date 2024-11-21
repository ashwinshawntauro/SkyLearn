"use client"
import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
export default function Layout({ children }) {
    const { isLogged } = AuthContext();
    const router = useRouter();
    if (!isLogged){
        router.replace('/signin')
    }
    return (
        <>
            {isLogged ?
                <section>
                    <Script
                        id="razorpay-checkout-js"
                        src="https://checkout.razorpay.com/v2/checkout.js"
                    />
                    {children}
                </section> :
                <section>Please Login In</section>
            }
        </>);
}