import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: "rzp_test_BKcjMd7hTo8tRU",
  key_secret: "9zDc9kiY6ZrSgeU56OyeJ7Mc",
});

async function POST(request) {
  const { amount, currency } = await request.json();

  const options = {
    amount: amount,
    currency: currency,
    receipt: 'course-purchase',
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
  }
}

module.exports = { POST };
