import Container from '@/components/container/Container';
import PostForm from '@/components/postForm/PostForm';
import React from 'react';

function AddPost() {
  return (
    <div className="py-10 min-h-screen bg-gray-100">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
