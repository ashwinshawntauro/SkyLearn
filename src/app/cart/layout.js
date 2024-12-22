"use client"
import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Loading from '../loading'
export default function Layout({ children }) {
    const { isLogged,loading} = AuthContext();
    const router = useRouter();
    if (!isLogged & !loading){
        router.replace('/signin')
    }
    return (
        <>
            {isLogged?
                (<section>
                    <Script
                        id="razorpay-checkout-js"
                        src="https://checkout.razorpay.com/v2/checkout.js"
                    />
                    {children}
                </section> ): !loading?
                (<section>Please Login In</section>):
                (<Loading/>)
            }
        </>);
}