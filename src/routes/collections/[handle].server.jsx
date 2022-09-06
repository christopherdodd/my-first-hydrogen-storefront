import { Seo, useShopQuery, useRouteParams, gql } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Layout } from "../../components/Layout.server";
import ProductGridItem from '../../components/ProductGridItem.server';

export default function Collection() {
  const { handle } = useRouteParams();

  const data = useShopQuery({
        query: QUERY,
        variables: {
            handle,
        }
  });

  const { data: { collection } } = data;

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
        <div className="container">
            <div className="product-grid">
                {collection.products.nodes.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    )
                )}
            </div>
        </div>
      </Suspense>
    </Layout>
  );
}

const QUERY = gql`
    query CollectionDetails($handle: String!) {
        collection(handle: $handle) {
            id
            title
            description
            seo {
                description
                title
            }
            image {
                id
                url
                width
                height
                altText
            }
            products(first: 8) {
                nodes {
                    id
                    title
                    publishedAt
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