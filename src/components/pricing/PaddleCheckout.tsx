'use client';

import { initializePaddle, Paddle, Environments } from '@paddle/paddle-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface CheckoutProps {
  user: {
    id: string;
    email: string;
  };
}

export function Checkout({ user }: CheckoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paddle, setPaddle] = useState<Paddle>();
  const updateDatabase = async (eventData: any) => {
    try {
      const response = await fetch('/api/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          eventData: eventData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update database');
      }

      const result = await response.json();
    } catch (error) {
      console.error('Error updating database:', error);
    }
  };


  useEffect(() => {
    initializePaddle({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
      checkout: {
        settings: {
          allowLogout: false,
        },
      },
      eventCallback(event) {
        switch (event.name) {
          case 'checkout.completed':
            updateDatabase(event.data);
            break;
          case 'checkout.closed':
            router.push('/');
            break;

          case 'checkout.loaded':
            break;
          case 'checkout.error':
            console.error('Checkout error:', event.data);
            break;
        }
      },
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  useEffect(() => {
    let transactionId = searchParams.get('_ptxn');
    let priceId = searchParams.get('priceId');

    if (paddle?.Checkout) {
      if (transactionId) {
        paddle.Checkout.open({
          settings: {
            allowLogout: false,
          },
          transactionId,
        });
      } else if (priceId) {
        paddle.Checkout.open({
          settings: {
            allowLogout: false,
          },
          items: [{ priceId, quantity: 1 }],
          customer: {
            email: user.email,
          },
          customData: {
            userId: user.id,
          },
        });
      } else {
        router.push('/');
      }
    }
  }, [paddle?.Checkout, searchParams]);

  return <div id="paddle-checkout"></div>;
}