import PostCard from 'components/modules/social/PostCard';
import { Button } from 'react-bootstrap';
const SocialPosts = ({ posts }) => {
    return (<>
      <div className="mb-9">
        {posts.map(post => (<PostCard key={post.id} post={post}/>))}
      </div>
      <div className="text-center">
        <Button variant="link" className="fs-8 p-0">
          Load more
        </Button>
      </div>
    </>);
};
export default SocialPosts;
