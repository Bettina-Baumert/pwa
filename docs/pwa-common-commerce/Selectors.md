# Cart Selectors

## getCartItems

Selects all items from the cart.

### Usage

```js
import { getCartItems } from '@shopgate/pwa-common-commerce/cart/selectors';
```

### Parameters

* `state` *(Object)*: The application state.

### Returns

*(Array|null)*: The cart items.

---

## getCartItemById

Selects a cartIitem of the given ID.

### Usage

```js
import { getCartItemById } from '@shopgate/pwa-common-commerce/cart/selectors';
```

### Parameters

* `state` *(Object)*: The application state.
* `props` *(Object)*: The component props containing `cartItemId`.

### Returns

*(Object)*: The single cart item.

---

# Cart Actions

## addCouponsToCart

Adds coupons to the cart.

### Usage

```js
import addCouponsToCart from '@shopgate/pwa-common-commerce/cart/actions/addCouponsToCart';

const couponIds = ['someCouponId', 'anotherCouponId'];

dispatch(addCouponsToCart(couponIds));
```

### Parameters

* `couponIds` *(Array\<String\>)*: The IDs of the coupons that shall be added to the cart.

---

## addProductToCart

Adds a single product to the cart.

Something about **options**. Something about **metadata**.

### Usage

```js
import addProductToCart from '@shopgate/pwa-common-commerce/cart/actions/addProductToCart';

const productData = {
  productId: '12345',
  quantity: 2,
};

dispatch(addProductToCart(productData));
```

### Parameters

* `productData` *(Object)*: The product data necessary for the cart
  * `productId` *(string)* **required**
  * `quantity` *(number)* **required**

---

# Cart Streams

## couponsAdded$

Gets triggered when the user added coupons to the cart.

### Usage

```js
import { couponsAdded$ } from '@shopgate/pwa-common-commerce/cart/streams';

subscribe(couponsAdded$, ({ action, dispatch, getState, prevState, events }) => {
  // Your desired code to perform when the stream triggers.
})
```
