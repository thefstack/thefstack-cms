
export async function generateMetadata({ id, title, description, keywords, thumbnail, url }) {

  return {
    title: `${title} | TheFStack`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: url || `https://www.thefstack.com/page/${id}`,
      type: "article",
      images: thumbnail ? [
        {
          url: thumbnail,
          width: 800,
          height: 600,
          alt: title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      image: thumbnail,
    },
  };
}
