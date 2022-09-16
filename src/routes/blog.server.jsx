import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";
import { Suspense } from "react";
import { Layout } from "../components/Layout.server";
import ArticleGridItem from '../components/ArticleGridItem.server';

export default function Blog() {

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
    });

    const { data: { blog: { articles: articles } }} = data;

    console.log(articles);

    return (
        <Layout>
            <Suspense>
                <div className="container">
                    <div className="article-grid">
                        {articles.edges.map(article => {
                            return (
                                <ArticleGridItem article={article.node} />
                            )
                        })}
                    </div>
                </div>
            </Suspense>
        </Layout>
    )
}


const QUERY = gql`
    query articles {
        blog(handle: "journal") {
            articles(first: 9) {
              edges {
                node {
                  title
                  handle
                  image {
                    url
                    altText
                  }
                }
              }
            }
        }
    }
`;