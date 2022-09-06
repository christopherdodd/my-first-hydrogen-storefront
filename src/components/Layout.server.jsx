import { useShopQuery, CacheLong, gql, Seo, useUrl, Link } from "@shopify/hydrogen";
import { Suspense } from "react";

export function Layout({ children }) {
    const { pathname } = useUrl();
    const isHome = pathname === "/";

    const data = useShopQuery({
        query: SHOP_QUERY,
        cache: CacheLong(),
        preload: true,
    });

  const { data: { shop } } = data;

  return (
    <>
      <Suspense>
        <Seo
            type="defaultSeo"
            data={{
                title: shop.name,
                description: shop.description,
            }}
        />
      </Suspense>
      <header>
        <div className="container header-inner">
          <Link to="/" className="header-logo">
            {shop.name}
          </Link>
          <ul className="header-navigation">
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/collections/shoes">Shoes</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>
      </header>
      <main>
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;