import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { db } from '../server/db';
import { blogPosts } from '../shared/schema';

const blogPostsData = [
  {
    slug: 'scaling-healthcare-practice',
    category: 'Strategy',
  },
  {
    slug: 'healthcare-growth-blueprint',
    category: 'Strategy',
  },
  {
    slug: 'why-agencies-fail-doctors',
    category: 'Marketing',
  },
  {
    slug: 'why-practices-stall',
    category: 'Business Growth',
  }
];

async function migrateBlogPosts() {
  console.log('Starting blog post migration...');

  for (const postData of blogPostsData) {
    try {
      const filePath = path.join(process.cwd(), 'content/blog', `${postData.slug}.mdx`);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Convert markdown to HTML
      const htmlContent = await marked(content);

      // Parse the date
      const publishedAt = new Date(data.date);
      
      // Insert into database
      await db.insert(blogPosts).values({
        slug: postData.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: htmlContent,
        category: postData.category,
        tags: data.tags || [],
        featuredImage: data.ogImage || null,
        metaTitle: null,
        metaDescription: null,
        status: 'published',
        publishedAt: publishedAt,
      });

      console.log(`✓ Migrated: ${data.title}`);
    } catch (error) {
      console.error(`✗ Error migrating ${postData.slug}:`, error);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrateBlogPosts().catch(console.error);
