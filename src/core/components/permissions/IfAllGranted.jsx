import { createElement } from 'react';
import PropTypes from 'prop-types';

const IfAllGranted = (props) => {
  const expected = props.expected,
  actual = props.actual ? Array.isArray(props.actual) ? props.actual : [props.actual] : [];

  for (var i = 0; i < expected.length; i++) {
    if (actual.indexOf(expected[i]) === -1) {
      return props.unauthorized;
    }
  }

  return createElement(props.element, null, props.children);  
}

IfAllGranted.propTypes = {
  expected: PropTypes.array.isRequired, // The expected roles
  actual: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]), // The actual roles
  element: PropTypes.string, // Type of element to render around the children, defaults to 'div'
  unauthorized: PropTypes.node, // Node to render if the actual roles do not match any the expected
}

IfAllGranted.defaultProps = {
  element: 'div',
  unauthorized: null,
}

export default IfAllGranted;