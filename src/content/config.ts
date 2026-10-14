import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    gallery: z.array(
      z.object({
        src: z.string(),
        label: z.string(),
      })
    ).optional(),
    category: z.enum([
      'Kinh nghiệm chọn xe',
      'Bảo dưỡng & Sửa chữa',
      'Phụ kiện & Đồ chơi',
      'Cung đường & Trải nghiệm',
    ]),
    author: z.string().default('Ban Biên Tập Cẩm Nang Xe Đạp'),
    featured: z.boolean().default(false),
    readTime: z.string().default('5 phút'),
  }),
});

export const collections = { posts };
