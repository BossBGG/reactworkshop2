import React, { useEffect, useState } from 'react'

import { createPost, fetchPostById, fetchPosts, getPosts, Post } from './services/PostService'



function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  };

  useEffect(() => {
    loadPosts();
  },[]);

  return (
    <>
    <div className='text-4xl font-bold text-center m-6'>
    Hello
  </div>

  <div className='w-full h-screen bg-sky-50 flex flex-col justify-center items-center '>
    {posts.slice(0,10).map((post) => (
      <div key={post.id} className=' w-[70%] h-[100px] bg-sky-200 m-3 p-4 rounded-2xl'>
        <h2 className='font-bold text-xl'>
          {post.title}
        </h2>
        <p>{post.body}</p>
      </div>
    ))}

  </div>
    </>
  

 
  )
  
}

export default App
