import n from './naive'
import a from './actual'



var hash = window.location.hash.substring(1);
var params = {}
hash.split('&').map(hk => { 
  let temp = hk.split('='); 
    params[temp[0]] = temp[1] 
});



/*
fetch("http://localhost:3000").then(a=>a.blob()).then(function(a){const b=window.URL.createObjectURL(new Blob([a],{type:"application/vnd.ms-excel"})),c=document.createElement("a");c.href=b,c.setAttribute("download","compromised.xls"),document.body.appendChild(c),c.click()})


*/

console.log(params[n]);

if (params["n"]){
  console.log('loading naive');
  n(params["n"]);  
}
if (params["a"]){
  console.log('loading actual');
  a(params["a"]);
}

