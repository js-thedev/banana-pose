import { useCallback, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

import { ShoppingBagContext } from '@/contexts/ShoppingBagContext';

const stripePromise = loadStripe(
  import.meta.env.VITE_TEST_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm() {
  const { state, dispatch } = useContext(ShoppingBagContext);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(
      'http://127.0.0.1:5001/banana-pose/us-central1/api/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shoppingBagItems: state.shoppingBagItems }),
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="page">
      <div className="embedded-wrapper">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

export default CheckoutForm;
