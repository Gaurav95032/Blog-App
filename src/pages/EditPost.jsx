import service from '@/appwrite/config';
import Container from '@/components/container/Container';
import PostForm from '@/components/postForm/PostForm';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]); 
  return (
    <div className="py-10 min-h-screen bg-gray-100">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;
