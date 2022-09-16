import {
    ProductOptionsProvider,
    MediaFile,
    useProductOptions,
    ProductPrice,
    AddToCartButton
  } from "@shopify/hydrogen";
  
  export default function ProductDetails({ product }) {
    return (
      <ProductOptionsProvider data={product}>
        <MediaFile data={product.media.nodes.find(media => media.mediaContentType == "IMAGE")} className="product-page-image"/>
        <ProductForm product={product} />
      </ProductOptionsProvider>
    );
  }
  
  function ProductForm({ product }) {
    const { options, selectedVariant, selectedOptions, setSelectedOption } = useProductOptions();
  
    const isOutOfStock = !selectedVariant?.availableForSale || false;

    console.log('product:', product);
    return (
      <div>
        <h1>{product.title}</h1>
        <ProductPrice className="product-page-price" withoutTrailingZeros data={product} variantId={selectedVariant.id} />

        <div className="product-options">
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div key={name} className="product-option-group">
                <legend className="product-option-name">
                  {name}
                </legend>
                {values.map((value) => {
                  const id = `option-${name}-${value}`;
                  const checked = selectedOptions[name] === value;
                  return (
                    <div key={id} className="product-option-value">
                      <input 
                        checked={checked} 
                        type="radio" 
                        name={name} 
                        id={id} 
                        value={value} 
                        onChange={() => setSelectedOption(name, value)} />
                      <label htmlFor={id}>{value}</label>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        

        <AddToCartButton 
          accessibleAddingToCartLabel="Adding item to your cart" 
          className="add-to-cart"
        >
          {isOutOfStock ? 'Out of stock' : 'Add to cart'}
        </AddToCartButton>
        <div className="product-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml}}></div>
      </div>
    );
  }
  