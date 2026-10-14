import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Cẩm Nang Xe Đạp - CamNangXeDap.com',
    description: 'Trang thông tin cẩm nang xe đạp, hướng dẫn bảo dưỡng líp xích và kinh nghiệm đi tour.',
    site: context.site?.toString() ?? 'https://camnangxedap.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.slug}/`,
    })),
  });
}
