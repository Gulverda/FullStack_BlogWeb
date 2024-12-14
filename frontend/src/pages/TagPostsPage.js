import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL params
import { fetchPostsByTag } from '../api/blogs'; // Function to fetch posts by tag
import { format } from 'date-fns'; // Library to format dates
import { Link } from 'react-router-dom'; // Component to navigate between routes
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import './TagPostsPage.css';
import '../components/BlogList.css';

const TagPosts = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const { tag } = useParams(); // Get the tag from the URL parameter

  useEffect(() => {
    const getPostsByTag = async () => {
      try {
        // Fetch posts by the tag from the API
        const data = await fetchPostsByTag(tag);
        // console.log(data); // Check the fetched data
        setPosts(data); // Update state with fetched posts
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching posts by tag:', error);
        setError('Failed to load posts'); // Set error if something goes wrong
        setLoading(false); // Set loading to false even if there was an error
      }
    };

    getPostsByTag(); // Fetch posts whenever the component mounts or tag changes
  }, [tag]); // Re-fetch when the tag changes

  if (loading) return <LoadingScreen />; // Show loading message
  if (error) return <p>{error}</p>; // Show error message if fetching fails

  // If no posts are found for the tag, show a message
  if (posts.length === 0) return <p>No posts found for this tag.</p>;

  // Render the posts list
  return (
    <div className="tag-posts">
      <h1>Posts tagged with: {tag}</h1>

      <div className="posts-list">
        {posts.map((post, index) => {
          // Make sure each post has a unique key, using the id or a combination of title and date
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
