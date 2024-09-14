// // app/api/create-checkout/route.ts
// import { NextResponse } from 'next/server';
// import { initializePaddle, Paddle, CheckoutOpenOptions } from '@paddle/paddle-js';

// let paddle: Paddle | undefined = undefined as unknown as Paddle;
// paddle.Environment.set('sandbox');

// async function getPaddleInstance(): Promise<Paddle | undefined> {
//   if (!paddle) {
//     paddle = await initializePaddle({
//     //   environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
//       token: process.env.PADDLE_API_KEY || '',
//       // hunu parne paddle token ko lagi process.env.PADDLE_API_KEY lekhnu parne
//     });
//   }
//   return paddle as Paddle;
// }

// export async function POST(request: Request) {
//   const { planId, customerId } = await request.json();

//   try {
//     const paddle = await getPaddleInstance();

//     if (!paddle) {
//       throw new Error('Failed to initialize Paddle');
//     }

//     const checkoutOptions: CheckoutOpenOptions & { customerEmail: string } = {
//       items: [{ priceId: planId, quantity: 1 }],
//       customerEmail: customerId, // Assuming customerId is an email. Adjust if needed.
//       // Add more options as needed
//     };

//     // Open the checkout
//     paddle.Checkout.open(checkoutOptions);

//     // Note: The open method doesn't return a URL, so we need to handle this differently
//     return NextResponse.json({ success: true, message: 'Checkout opened' });
//   } catch (error) {
//     console.error('Error opening checkout:', error);
//     return NextResponse.json({ error: 'Failed to open checkout' }, { status: 500 });
//   }
// }