interface jsonLD {
  title: string;
  pubDate: Date;
  description: string;
  author: string;
  image: {
    url: string;
    alt: string;
  };
  tags: string[];
}

export function generateJsonLD(data: jsonLD, url: string) {
  const isoDate = new Date(data.pubDate).toISOString();
  const imageUrl = new URL(data.image?.url, url).href;

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.description,
    ...(data.image ? { image: imageUrl } : {}),
    url: url,
    datePublished: isoDate,
    author: {
      '@type': 'Person',
      name: 'Bassim Shahidy',
      jobTitle: 'IT Technician',
      worksFor: {
        '@type': 'Organization',
        name: 'NYC Bar Association',
      },
      description:
        'Bassim Shahidy is an IT specialist with experience in information technologies, audio visual technologies, and computer science. Bassim also has a vast set of academic interests including history, political science, and philosophy.',
      url: 'https://bassimshahidy.com',
      sameAs: [
        'https://www.linkedin.com/in/bassimshahidy',
        'https://github.com/avgvstvs96',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'bassim@bassimshahidy.com',
        contactType: 'professional',
      },
    },
  };

  return JSON.stringify(jsonLD, null, 2);
}
