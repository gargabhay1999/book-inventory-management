(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{27:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),a=n(10),r=n.n(a),s=(n(27),n(28),n(1)),l=function(){return Object(s.jsxs)("header",{children:[Object(s.jsx)("i",{className:"fas fa-book"}),Object(s.jsx)("h1",{children:" Welcome to Abhay's Book Inventory"})]})},i=n(22),u=n(6);var d=function(e){return Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"search-area",children:Object(s.jsxs)("form",{onSubmit:e.searchBook,action:"",children:[Object(s.jsx)("input",{className:"searchArea",type:"text",placeholder:"Search Book",onChange:e.handleSearch}),Object(s.jsx)("button",{className:"btn btn-info",type:"submit",children:"Search"})]})})})},b=n(17),h=n(18),j=function(){function e(){Object(b.a)(this,e)}return Object(h.a)(e,null,[{key:"InsertBook",value:function(e){if(!(e.quantity<=0))return fetch("https://eflask-app-abhay.herokuapp.com/addBook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()}));alert("Please enter valid quantity")}},{key:"DeleteBook",value:function(e){return fetch("https://eflask-app-abhay.herokuapp.com/deleteBookByGoogleId/".concat(e,"/"),{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()}))}},{key:"UpdateBook",value:function(e,t){return fetch("https://eflask-app-abhay.herokuapp.com/updateBookByGoogleId/".concat(e,"/"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()}))}}]),e}(),f=n(36),O=n(37);var k=function(e){var t=Object(o.useState)(""),n=Object(u.a)(t,2),c=n[0],a=n[1],r=Object(o.useState)(""),l=Object(u.a)(r,2),i=l[0],d=l[1],b=Object(o.useState)(""),h=Object(u.a)(b,2),f=h[0],O=h[1],k=Object(o.useState)(""),p=Object(u.a)(k,2),g=p[0],m=p[1],x=Object(o.useState)(""),y=Object(u.a)(x,2),v=y[0],B=y[1],C=Object(o.useState)(""),I=Object(u.a)(C,2),N=I[0],S=I[1];return Object(o.useEffect)((function(){a(e.book.googleId),d(e.book.title),O(e.book.authors),m(e.book.publishedDate),B(e.book.quantity),S(e.book.imageUrl)}),[e.book]),Object(s.jsx)("div",{children:e.book?Object(s.jsxs)("div",{className:"mb-3",children:[Object(s.jsx)("label",{htmlFor:"title",className:"form-label",children:" Title"}),Object(s.jsx)("input",{type:"text",className:"form-control",placeholder:"Plese Enter Title",value:i,onChange:function(e){return d(e.target.value)}}),Object(s.jsx)("label",{htmlFor:"authors",className:"form-label",children:" Author/s"}),Object(s.jsx)("input",{type:"text",className:"form-control",placeholder:"Plese Enter Author/s",value:f,onChange:function(e){return O(e.target.value)}}),Object(s.jsx)("label",{htmlFor:"quantity",className:"form-label",children:" Quantity"}),Object(s.jsx)("input",{type:"number",className:"form-control",min:"1",placeholder:"Plese Enter Quantity",value:v>=0?v:0,onChange:function(e){return B(e.target.value)}}),-1!=e.book.quantity?Object(s.jsx)("button",{onClick:function(){j.UpdateBook(e.book.googleId,{googleId:c,title:i,authors:f,publishedDate:g,quantity:v,imageUrl:N}).then((function(t){return e.updatedBook(t)})).catch((function(e){return console.log(e)}))},className:"btn btn-success mt-3",children:" Update"}):Object(s.jsx)("button",{onClick:function(){console.log("sdfafd"),console.log({googleId:c,title:i,authors:f,publishedDate:g,quantity:v,imageUrl:N}),j.InsertBook({googleId:c,title:i,authors:f,publishedDate:g,quantity:v,imageUrl:N}).then((function(t){return e.updatedBook(t)})).catch((function(e){return console.log(e)}))},className:"btn btn-success mt-3",children:" Insert"})]}):null})};var p=function(e){var t=Object(o.useState)(!1),n=Object(u.a)(t,2),c=n[0],a=n[1],r=function(){return a(!1)},l=function(t){console.log(t),j.DeleteBook(t).then((function(t){return e.deleteBook(t)})).catch((function(e){return console.log(e)}))},i=function(t){console.log(t),e.editBook(t)};return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{className:"card-container",id:e.googleId,children:[e.editedBook==e.book?Object(s.jsx)(k,{book:e.editedBook,updatedBook:e.updatedBook,insertedBook:e.insertedBook}):null,Object(s.jsx)("img",{src:e.imageUrl,alt:""}),Object(s.jsxs)("div",{className:"desc",children:[Object(s.jsxs)("h5",{children:["Title: ",e.title]}),Object(s.jsxs)("h5",{children:["Author: ",e.authors]}),Object(s.jsxs)("h5",{children:["Published Date: ",e.publishedDate]}),0==e.quantity?Object(s.jsxs)("div",{children:[Object(s.jsx)("h5",{children:"OUT OF STOCK"}),Object(s.jsx)("button",{className:"btn btn-success",onClick:function(){return i(e.book)},children:"Manage Inventory"}),Object(s.jsx)("button",{className:"btn btn-danger",onClick:function(){return l(e.googleId)},children:"Remove Books"})]}):null,e.quantity>0?Object(s.jsxs)("div",{children:[Object(s.jsxs)("h5",{children:["Available Qty: ",e.quantity]}),Object(s.jsx)("button",{className:"btn btn-success",onClick:function(){return i(e.book)},children:"Manage Inventory"}),Object(s.jsx)("button",{className:"btn btn-danger",onClick:function(){return l(e.googleId)},children:"Remove Books"})]}):null,e.quantity<0?Object(s.jsxs)("div",{children:[Object(s.jsx)("h5",{children:"NOT AVAILABLE"}),Object(s.jsx)("button",{className:"btn btn-success",onClick:function(){return i(e.book)},children:"Add Book"})]}):null]}),Object(s.jsx)("hr",{style:{borderColor:"orange",backgroundColor:"green",height:2}}),Object(s.jsxs)(f.a,{show:c,onHide:r,children:[Object(s.jsx)(f.a.Header,{closeButton:!0,children:Object(s.jsx)(f.a.Title,{children:"Modal heading"})}),Object(s.jsx)(f.a.Body,{children:"Woohoo, you're reading this text in a modal!"}),Object(s.jsxs)(f.a.Footer,{children:[Object(s.jsx)(O.a,{variant:"secondary",onClick:r,children:"Close"}),Object(s.jsx)(O.a,{variant:"primary",onClick:r,children:"Save Changes"})]})]})]})})};n(38);var g=function(e){var t=Object(o.useState)(null),n=Object(u.a)(t,2),c=n[0],a=n[1],r=Object(o.useState)(!1),l=Object(u.a)(r,2),i=(l[0],l[1]),d=function(e){a(e),i(!0)};return Object(s.jsxs)("div",{children:[Object(s.jsx)("hr",{}),e.books.map((function(t,n){return Object(s.jsx)(p,{googleId:t.googleId,imageUrl:t.imageUrl,title:t.title,authors:t.authors,publishedDate:t.publishedDate,quantity:t.quantity,deleteBook:e.deleteBook,editBook:d,editedBook:c,updatedBook:e.updatedBook,insertedBook:e.insertedBook,book:t},n)}))]})};var m=function(){var e=Object(o.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(o.useState)(""),r=Object(u.a)(a,2),l=r[0],b=r[1];return Object(o.useEffect)((function(){fetch("https://eflask-app-abhay.herokuapp.com/getBooks",{method:"GET",headers:{"Content-Type":"applications/json"}}).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return console.log(e)}))}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)(d,{handleSearch:function(e){b(e.target.value)},searchBook:function e(t){return t.preventDefault(),console.log(e),fetch("https://eflask-app-abhay.herokuapp.com/getFinalBooks?searchText=".concat(l),{method:"GET",headers:{"Content-Type":"applications/json"}}).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return console.log(e)}))}}),Object(s.jsx)(g,{books:n,deleteBook:function(e){var t=n.filter((function(t){return t.googleId!==e.googleId}));c(t)},updatedBook:function(e){var t=n.map((function(t){return t.googleId===e.googleId?e:t}));c(t)},insertedBook:function(e){var t=[].concat(Object(i.a)(n),[e]);c(t)}})]})};var x=function(){return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(l,{}),Object(s.jsx)(m,{})]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,39)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),o(e),c(e),a(e),r(e)}))};n(33);r.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root")),y()}},[[34,1,2]]]);
//# sourceMappingURL=main.26bfccb0.chunk.js.map