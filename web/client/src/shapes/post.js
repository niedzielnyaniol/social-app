import PropTypes from 'prop-types';

const PostShape = PropTypes.shape({
  likes: PropTypes.number,
  text: PropTypes.string,
  data: PropTypes.string,
});

export default PostShape;
