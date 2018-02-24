import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  _id: PropTypes.string,
  email: PropTypes.string,
});

export default userShape;
