import service from '@/appwrite/config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Container from '@/components/container/Container';
import Button from '@/components/Button';

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [post, setPost] = useState(null);

  const isAuthor = post && userData ? userData.$id === post.userId : false;

  useEffect(() => {
    service.getPost(slug).then((fetchedPost) => {
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const status = await service.deletePost(post.$id);
      if (status) {
        await service.deleteFile(post.featuredImage);
        navigate("/");
      }
    }
  };

  return post ? (
    <div className="py-10 bg-gray-100 min-h-screen">
      <Container>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {post.featuredImage && (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            <div className="prose max-w-none">{parse(post.content)}</div>

            {isAuthor && (
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={() => navigate(`/edit-post/${post.$id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    null
  );
}

export default Post;
