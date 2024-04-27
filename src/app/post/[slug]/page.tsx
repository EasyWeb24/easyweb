'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AauOucrJSdR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import  Image  from "next/image"
import { useEffect, useState } from "react"
import sanityClient from '@/lib/client'
import { BlogPost } from "@/lib/types"
import { PortableText } from '@portabletext/react';
import Moment from 'react-moment'
import {useNextSanityImage} from 'next-sanity-image'


const SanityImage = ({ asset }: {asset:string}) => {
  const imageProps = useNextSanityImage(sanityClient, asset);

  if (!imageProps) return null;

  return (
    <Image 
    {...imageProps}
    alt='Image'
    layout='responsive'
    sizes='(max-width: 800px) 100vw, 800px'
  />)
}


export default function Component({params}:{params:{slug:string}}) {
const [post, setPost] = useState<{post: BlogPost[]} | null>()

  useEffect(()=> {

    async function fetchPost(slug:string) {
      try {
        const postRes = await sanityClient
        .fetch(
          `*[_type == "post" && slug.current == '${slug}']{mainImage {asset -> {url}}, title, body,author->, publishedAt, slug, categories[]->}`
        )
    
        const categoriesRes = await sanityClient.fetch(`
        *[_type == 'post'] {
          categories[]->{
            title,
            name
          }
        }
      `);
    
 
          setPost({post: postRes as BlogPost[]})
      
      }
      catch(erorr) {
        console.warn(erorr)
        return {post: [] as BlogPost[], categories: [], recentPosts: [] as BlogPost[]};
        }
      }

      fetchPost(params.slug)
  }, [params.slug])

  const myPortableTextComponents = {
    types: {
      image: ({ value }:{value: {
        asset: string;
        alt?: string;
      }
      } ) => {
        return (
          <SanityImage {...value} />
        );
      },
    },
  };
  

  if (!post?.post) return
  

  return (
    <div className="bg-[#ffffff]">
      <main className="py-6 px-4 md:px-16 lg:py-16 md:py-12">
        <article className="prose prose-gray mx-auto dark:prose-invert">
          <div className="space-y-2 not-prose">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
{post.post[0]?.title}            </h1>
<div style={{width: '100%', height: '500px', position: 'relative'}}>

 <Image
                  alt={`${post?.post[0].title} image`}
                  className="object-cover rounded-t-lg"
                  src={post?.post[0].mainImage.asset.url}
                  style={{
                    objectFit: "cover",
                  }} 
                  layout="fill"
                />
</div>
            <p className="text-gray-500 dark:text-gray-400">Posted on  <Moment format="MMMM DD, YYYY">
                      {new Date(post.post[0]?.publishedAt)}
                    </Moment></p>
          </div>
          <PortableText value={post.post[0]?.body} components={myPortableTextComponents}/>        </article>
        
       
      </main> <div className="mx-auto w-fit">
   Made with ❤️ by EasyWeb  
 </div>
    </div>
  )
}