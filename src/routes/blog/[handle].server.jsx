import {
    useShopQuery,
    useLocalization,
    Seo,
    gql,
    Image
  } from '@shopify/hydrogen';
import {Suspense} from 'react';
  
import { Layout } from "../../components/Layout.server";
  
  export default function Article({params}) {
  
    const {handle} = params;

    const { data: { blog: { articleByHandle }} } = useShopQuery({
      query: ARTICLE_QUERY,
      variables: {handle}
    });

    const {
      language: {isoCode: languageCode},
      country: {isoCode: countryCode},
    } = useLocalization();

    const formattedDate = new Intl.DateTimeFormat(
      `${languageCode}-${countryCode}`,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    ).format(new Date(articleByHandle.publishedAt));

    console.log(articleByHandle);
  
    if (!articleByHandle) {
      return (
        <Layout>
          <div className="container">
            <div>Article not found</div>
          </div>
        </Layout>
      );
    }

    const { title, authorV2, image, contentHtml } = articleByHandle;
  
    return (
      <Layout>
        <Suspense>
          <Seo type="article" data={articleByHandle} />
        </Suspense>
        <div className="article-page container">
            <div className="article-page-header">
              <h1>{ title }</h1>
              <span>{ formattedDate } · { authorV2.name }</span>
            </div>
            <article>
              <Image data={image} altText={image.altText}/>
              <div
                dangerouslySetInnerHTML={{__html: contentHtml}}
                className="article-body"
              />
            </article>
        </div>
      </Layout>
    );
  }
  
  const ARTICLE_QUERY = gql`
    query article($handle: String!) {
        blog(handle: "journal") {
            articleByHandle(handle: $handle) {
                title
                publishedAt
                authorV2 {
                  name
                }
                image {
                  url
                  altText
                }
                contentHtml
            }
        }
    }
  `;