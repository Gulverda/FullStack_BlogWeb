import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchPostsByTag } from '../../api/blogs'; 
import { format } from 'date-fns'; 
import { Link } from 'react-router-dom'; 
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import './TagPostsPage.css';
import '../../components/BlogList/BlogList.css';

const TagPosts = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { tag } = useParams(); 

  useEffect(() => {
    const getPostsByTag = async () => {
      try {
        // Fetch posts by the tag from the API
        const data = await fetchPostsByTag(tag);
        // console.log(data); // Check the fetched data
        setPosts(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching posts by tag:', error);
        setError('Failed to load posts'); 
        setLoading(false); 
      }
    };

    getPostsByTag(); 
  }, [tag]); // Re-fetch when the tag changes

  if (loading) return <LoadingScreen />; 
  if (error) return <p>{error}</p>; 

  // If no posts are found for the tag, show a message
  if (posts.length === 0) return <p>No posts found for this tag.</p>;

  return (
    <div className="tag-posts">
      <h1>Posts tagged with: {tag}</h1>

      <div className="posts-list">
        {posts.map((post, index) => {
          const postKey = post.id || `${post.title}-${post.date || index}`;
          return (
            <div key={postKey} className="news-card">
              <img src={post.image} alt={post.title} />
            <h4>{post.title}</h4>
            <p>{format(new Date(post.createdAt), 'yyyy-MM-dd')}</p>
            <Link to={`/blogs/${post._id}`}>Read More</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagPosts;
