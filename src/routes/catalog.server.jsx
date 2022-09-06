import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Layout } from "../components/Layout.server";
import ProductGridItem from '../components/ProductGridItem.server';

export default function Catalog() {

  const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
  });

  const { data: { products : { edges } } } = data;

  const products = edges;

  return (
    <Layout>
      <Suspense>
        <div className="container">
            <div className="product-grid">
                {products.map((product) => (
                        <ProductGridItem key={product.id} product={product.node} />
                    )
                )}
            </div>
        </div>
      </Suspense>
    </Layout>
  );
}

const QUERY = gql`
    query products {
        products(first: 9) {
            edges {
                node {
                    id
                    title
                    handle
                    featuredImage {
                        altText
                        url
                        height
                        width
                    }
                    variants(first: 1) {
                        nodes {
                          id
                          image {
                            url
                            altText
                            width
                            height
                          }
                          priceV2 {
                            amount
                            currencyCode
                          }
                          compareAtPriceV2 {
                            amount
                            currencyCode
                          }
                        }
                    }
                }
            }
        }
    }
`;