import { Link, Image, Money } from "@shopify/hydrogen";

export default function ProductCard({ product }) {
    console.log(product);

    const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

    const isDiscounted = compareAtPrice?.amount > price?.amount;

    const imageAspectRatio = product.featuredImage.width / product.featuredImage.height;
    console.log(imageAspectRatio);

    return (
        <div className="product-grid-item">
            <Link to={`/products/${product.handle}`} className="image-container">
                <Image data={product.featuredImage}
                       alt={product.featuredImage.altText}
                    />
            </Link>
            <div className="product-grid-item-title">{ product.title }</div>
            <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
        </div>
    )
}