import { 
    useCart, 
    CartLineProvider, 
    Image, 
    useCartLine, 
    Money,
    Link, 
    CartCost, 
    CartLineQuantity,
    CartLineQuantityAdjustButton
    } from '@shopify/hydrogen';
import { Suspense } from 'react';

export default function CartPage() {

  return (
    <div>
        <Suspense fallback={<SkeletonCart />}>
            <CartTable/>
        </Suspense>
    </div>
  )
}

function CartTable() {

    const { lines, checkoutUrl, status } = useCart();

    const btnLoading = (evt) => {
      evt.currentTarget.style.opacity = 0.5;
      evt.currentTarget.style.cursor = 'none';
    }

    if (lines.length === 0) {
        console.log(status);
        if(status == 'idle') {
          return <div>No items are currently in the cart</div>
        } else {
          return <SkeletonCart />
        }
    }

    return (
        <>
          <table className="cart-table">
              <tbody>
                  {lines.map((line) => {
                      return (
                          <CartLineProvider key={line.id} line={line}>
                              <CartLineItem />
                          </CartLineProvider>
                      )
                  })}
                  <tr>
                      <td></td>
                      <td></td>
                      <td>Total:</td>
                      <td><CartCost withoutTrailingZeros /></td>
                  </tr>
              </tbody>
          </table>
          <div className="cart-footer">
            <Link
              to={checkoutUrl}
              className="checkout-button"
              onClick={btnLoading}
            >Checkout</Link>
          </div>
        </>
    )
}

function CartLineItem() {

    // console.log(useCartLine());

    const { lineId, merchandise, cost } = useCartLine();

    const linkToProduct = `/products/${merchandise.product.handle}`;

    return (
        <tr key={lineId}>
            <td>
                <Image data={merchandise.image} className="line-item-image" />
            </td>
            <td>
                <Link className="line-item-product-title" to={linkToProduct}>{merchandise.product.title}</Link>
                <div className="line-item-variant">
                  {(merchandise?.selectedOptions || []).map((option) => (
                    <span key={option.name}>
                      {option.name}: {option.value}
                    </span>
                  ))}
                </div>
                <Money withoutTrailingZeros data={merchandise.priceV2}/>
            </td>
            <td>
                <div className="cart-quantity-selector">
                    <CartLineQuantityAdjustButton adjust="decrease">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                    </CartLineQuantityAdjustButton>
                    <CartLineQuantity />
                    <CartLineQuantityAdjustButton adjust="increase">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    </CartLineQuantityAdjustButton>
                </div>
            </td>
            <td>
                <Money withoutTrailingZeros data={ cost.totalAmount } />
                <CartLineQuantityAdjustButton as="div" className="cart-remove" adjust="remove">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </CartLineQuantityAdjustButton>
            </td>
        </tr>
    )
}

function SkeletonCart() {
    return (
      <table className="cart-table">
        <tbody>
          <tr>
            <td>
              <img alt="" loading="lazy" className="line-item-image skeleton" />
            </td>
            <td>
              <div className="skeleton">Insane Shoes</div>
              <div className="skeleton">A$80</div>
            </td>
            <td>
              <div className="cart-quantity-selector">
                <button className="skeleton"></button>
                <span className="skeleton">1</span>
                <button className="skeleton"></button>
              </div>
            </td>
            <td>
              <div className="cart-remove skeleton">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLineJoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="skeleton">Total:</td>
            <td>
              <div className="skeleton">A$80</div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }