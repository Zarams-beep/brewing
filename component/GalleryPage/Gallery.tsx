"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../styles/Blogpage.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Gallery = () =>{
    const { status } = useSession(); // ✅ Must come first
     const router = useRouter();
     const [data, setData] = useState<any[]>([]);
   
     // 🚫 Redirect if not logged in
     useEffect(() => {
       if (status === "unauthenticated") {
         router.push("/login");
       }
     }, [status, router]); 
       return (
    <div>
        Gallery
    </div>
  )
}

export default Gallery