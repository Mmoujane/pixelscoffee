import BlogContent from '@/app/components/BlogContent';


export default async function Blog({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug

    return (
    <div className='w-full bg-background py-24 px-6 flex justify-center items-center'>
        <BlogContent slug={slug}/>
    </div>
);
  }