import { Link, Image } from "@shopify/hydrogen";

export default function ArticleGridItem({ article }) {
    console.log(article);

    return (
        <div className="article-grid-item">
            <Link to={`/blog/${article.handle}`} className="image-container">
                <Image data={article.image}
                       alt={article.image.altText}
                    />
            </Link>
            <Link to={`/blog/${article.handle}`} className="article-grid-item-title">{ article.title }</Link>
        </div>
    )
}