// blog/id
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id:any) {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_BASE_URL_DEV;

  const res = await fetch(`${baseURL}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound()
  }
  return res.json();
}

type PageParams = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: PageParams) {
const { id } = await params; // 👈 await required
  const post = await getData(id);

  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }: PageParams) => {
  const { id } = await params; // 👈 await required
  const data = await getData(id);
  return (
    <div className='blog-small-container'>
        <div className='imageContainer'>
          <Image
            src={data.img}
            alt=""
            width={300}
            height={300}
            quality={100}
            // fill={true}
            className='img'
          />
        </div>
       <div className="blog-small-content">
         <div className='info'>
          <div className='author'>
            <Image
              src={data.img}
              alt=""
              width={20}
              height={20}
              className='avatar'
            />
            <span className='username'>{data.username}</span>
          </div>
          <h1 className='title'>{data.title}</h1>
          <p className='desc'>
            {data.desc}
          </p>
          
        </div>
      <div className='content'>     
        <p className='text'>
         {data.content}
        </p>
      </div>
       </div>
    </div>
  );
};

export default BlogPost;