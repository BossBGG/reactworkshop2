import React, { useEffect, useState } from 'react'
import { createPost, fetchPostById, fetchPosts, Post } from './services/PostService'

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState<string>('');
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1,
  });
  
  const loadPosts = async () => {
    try {
      const posts = await fetchPosts();
      setPosts(posts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleFetchById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || isNaN(Number(postId))) {
      alert("Please enter a valid post ID");
      return;
    }
    
    try {
      const post = await fetchPostById(Number(postId));
      setSinglePost(post);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      setSinglePost(null);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { title, body, userId } = formData;
      const post = await createPost(title, body, userId);
      setNewPost(post);
      // Reset form
      setFormData({
        title: '',
        body: '',
        userId: 1,
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'userId' ? Number(value) : value
    }));
  };

  return (
    <>
      <div className='text-4xl font-bold text-center m-6'>
        React Post Manager
      </div>

      <div className='w-full bg-sky-50 p-6'>
        {/* Fetch Post by ID Form */}
        <div className='mb-8 bg-white p-4 rounded-lg shadow'>
          <h2 className='text-2xl font-bold mb-4'>Fetch Post by ID</h2>
          <form onSubmit={handleFetchById} className='flex gap-4 mb-4'>
            <input 
              type="text" 
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              placeholder="Enter post ID"
              className='flex-grow px-4 py-2 border border-gray-300 rounded'
            />
            <button 
              type="submit"
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Fetch Post
            </button>
          </form>

          {singlePost && (
            <div className='bg-blue-100 p-4 rounded-lg'>
              <h3 className='font-bold text-xl'>{singlePost.title}</h3>
              <p className='mt-2'>{singlePost.body}</p>
              <p className='text-sm text-gray-600 mt-2'>Post ID: {singlePost.id}, User ID: {singlePost.userId}</p>
            </div>
          )}
        </div>

        {/* Create Post Form */}
        <div className='mb-8 bg-white p-4 rounded-lg shadow'>
          <h2 className='text-2xl font-bold mb-4'>Create New Post</h2>
          <form onSubmit={handleCreatePost} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Body</label>
              <textarea 
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Enter post body"
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded'
                rows={4}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>User ID</label>
              <input 
                type="number" 
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded'
                required
              />
            </div>
            <button 
              type="submit"
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Create Post
            </button>
          </form>

          {newPost && (
            <div className='mt-4 bg-green-100 p-4 rounded-lg'>
              <h3 className='font-bold text-xl'>Post Created Successfully!</h3>
              <p className='mt-2'><strong>Title:</strong> {newPost.title}</p>
              <p className='mt-1'><strong>Body:</strong> {newPost.body}</p>
              <p className='text-sm text-gray-600 mt-2'>Post ID: {newPost.id}, User ID: {newPost.userId}</p>
            </div>
          )}
        </div>

        {/* List of Posts */}
        <div className='bg-white p-4 rounded-lg shadow'>
          <h2 className='text-2xl font-bold mb-4'>Recent Posts</h2>
          <div className='space-y-4'>
            {posts.slice(0, 10).map((post) => (
              <div key={post.id} className='bg-sky-100 p-4 rounded-lg'>
                <h3 className='font-bold text-xl'>{post.title}</h3>
                <p className='mt-2'>{post.body}</p>
                <p className='text-sm text-gray-600 mt-2'>Post ID: {post.id}, User ID: {post.userId}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
/*
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
*/