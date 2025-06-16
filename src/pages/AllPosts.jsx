import service from '@/appwrite/config';
import Container from '@/components/container/Container';
import PostCard from '@/components/PostCard';
import React, { useEffect, useState } from 'react';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await service.getPosts([]);
        if (response && Array.isArray(response.documents)) {
          setPosts(response.documents);
        } else {
          setPosts([]);  // fallback to empty array if structure unexpected
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);  // ensure posts is always an array
      }
    }

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="py-10 min-h-screen bg-gray-100">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-lg shadow p-6">
            <p className="text-lg text-gray-600">
              🚀 No posts yet. Start by creating your first post!
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen bg-gray-100">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
