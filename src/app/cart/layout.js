import Script from 'next/script';
export default function Layout({children}) {
    return (
        <section>
            <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v2/checkout.js"
   />
            {children}
        </section>
    );
}