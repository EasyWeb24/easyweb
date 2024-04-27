'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";  


import { Button } from "@/components/ui/button"
import sanityClient from '@/lib/client'
import { BlogPost } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";






export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>()

  useEffect(() => {
    async function fetchPosts() {
      const res = await sanityClient
      .fetch(
        '*[_type == "post"]{mainImage {asset -> {url}}, title, description,author->, publishedAt, slug, categories[]->}'
      )
    
      setPosts(res as BlogPost[])
    }

    fetchPosts()
  }, [])

  return (
    <>
    <div className="py-12 flex justify-center ">
    {
      posts?.map(({title,
        author,
        description,
        publishedAt,
        categories,
        mainImage,
        slug,}) => {
         
    return <Card key={slug.current} className="w-fit md:w-96">
      <div style={{width: '100%', height: '300px', position: 'relative'}}>

      <Link href={`/post/${slug.current}`}>
 <Image
                  alt={`${title} image`}
                  className="object-cover rounded-t-lg"
                  src={mainImage.asset.url}
                  style={{
                    objectFit: "cover",
                  }} 
                  layout="fill"
                />
                </Link>
</div>
   <CardHeader>
   <Link href={`/post/${slug.current}`}>
<CardTitle>{title}</CardTitle></Link>
     <CardDescription>{description}</CardDescription>
   </CardHeader>
   <CardContent>
     <p>By {author.name}</p>
   </CardContent>
   <CardFooter>
   <Button variant="outline">
    <Link href={`/post/${slug.current}`}>
    View More
    </Link>
   </Button>
   </CardFooter>
 </Card>
      })
    }
 
 
 
     </div>
     <div className="mx-auto w-fit">
   Made with ❤️ by EasyWeb  
 </div>
    </>
  );
}
