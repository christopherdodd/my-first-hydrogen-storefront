import {
    useShopQuery,
    Seo,
    gql
  } from '@shopify/hydrogen';
  import {Suspense} from 'react';
  
  import Layout from '../../components/Layout.server';
  import NotFound from '../../components/NotFound.server';
  
  export default function Page({params}) {
  
    const {handle} = params;
    const {
      data: {page},
    } = useShopQuery({
      query: PAGE_QUERY,
      variables: {handle}
    });

    console.log(page);
  
    if (!page) {
      return <NotFound />;
    }
  
    return (
      <Layout>
        <Suspense>
          <Seo type="page" data={page} />
        </Suspense>
        <div className="container">
            Page route
        </div>
      </Layout>
    );
  }
  
  const PAGE_QUERY = gql`
    query PageDetails($languageCode: LanguageCode, $handle: String!)
    @inContext(language: $languageCode) {
      page(handle: $handle) {
        id
        title
        body
        seo {
          description
          title
        }
      }
    }
  `;