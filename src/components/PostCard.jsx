import service from '@/appwrite/config';
import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const imageUrl = service.getFilePreview(featuredImage);

    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/fallback.jpg';  // Place fallback.jpg in /public
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
