import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<void> {
  try{
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to fetch posts");
    }
  }
  
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  try{
    const response = await axios.get<Post[]>(API_URL);
    const posts = response.data;
    console.log(posts);
    return posts;
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to fetch posts");
    }
    return [] as Post[];
  }
}

export async function fetchPostById(id: number): Promise<Post> {
  try {
    const response = await axios.get<Post>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error(`Failed to fetch post with ID ${id}`);
    }
    throw new Error("An unknown error occurred");
  }
}

export async function createPost(title: string, body: string, userId: number): Promise<Post> {
  try {
    const response = await axios.post<Post>(API_URL, {
      title,
      body,
      userId
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to create post");
    }
    throw new Error("An unknown error occurred");
  }
}
/*
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<void> {
  try{
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to fetch posts");
    }
  }
  
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  try{
    const response = await axios.get<Post[]>(API_URL);
    const posts = response.data;
    console.log(posts);
    return posts;
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to fetch posts");
    }
    return [] as Post[];
  }
}

export async function fetchPostById(): Promise<void> {
  try {
    const response = await fetch(
      `${API_URL}/1`
    );
    const data =await response.json();
    console.log(data);
  } catch (error:unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to fetch posts");
    }
  }
  
}

export async function createPost(): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body:"bar",
        userId: 1 ,
      }),
      headers: {
        'Content-type' : 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    console.log(data);
     
  } catch (error: unknown){
    if(error instanceof Error) {
      console.error("Error message:", error.message);
      throw new Error("Failed to create post");
    }
  }

}
*/

/*
function fetchData() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch((error) => console.error("Error fetching data:", error))
}

function createPost(): void {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

async function fetchPosts(): Promise<void> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data =await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error ("Failed to fetch posts");
  }

  //Promise 
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }
  // const data = await response.json();
  // console.log(data);
}
*/