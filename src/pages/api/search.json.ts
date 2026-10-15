import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const data = posts.map(p => ({
    title: p.data.title,
    description: p.data.description,
    category: p.data.category,
    slug: p.slug,
    image: p.data.image || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80"
  }));

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}