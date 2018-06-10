"use strict";var fetchRepoData=function(a){var e=a.dataset.user,r=a.dataset.update,n="https://api.github.com";fetch(n+"/users/"+e).then(function(t){if(t.ok)return t.json();throw"No user in GitHub with specified login: "+e}).then(function(t){var o=t.name?t.name:t.login;fetch(n+"/users/"+e+"/repos").then(function(t){if(t.ok)return t.json()}).then(function(t){var e=(void 0!==r?t.filter(function(t){return t.updated_at>=r}):t).reduce(function(t,e){return t+="\n      <tr>\n        <td>"+e.name+"</td>\n        <td>"+e.description+"</td>\n        <td>"+new Date(e.updated_at).toLocaleString()+'</td>\n        <td><a class="md-btn" href="'+e.html_url+'/archive/master.zip">Download</a></td>\n      </tr>'},""),n=document.createElement("div");n.classList.add("repo"),n.innerHTML="<h1>"+o+"</h1>\n  <table>\n    <thead>\n      <tr>\n        <th>Repository name</th>\n        <th>Repository description</th>\n        <th>Repository updated at</th>\n        <th>Download link</th>\n      </tr>\n    </thead>\n    <tbody>"+e+"\n    </tbody>\n  </table>\n  ",a.parentNode.replaceChild(n,a)})}).catch(function(t){return console.log(t.message?t.message:t)})},load=function(){document.querySelectorAll("repos").forEach(function(e){try{if(!e.dataset.user)throw"No user data specified in repos element";fetchRepoData(e)}catch(t){return void console.log(t,e)}})};window.onload=load;