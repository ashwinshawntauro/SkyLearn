(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1327],{6819:function(e,s,t){Promise.resolve().then(t.bind(t,6041))},6041:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return u}});var r=t(7437),l=t(2265);let a={_origin:"https://api.emailjs.com"},n=(e,s,t)=>{if(!e)throw"The user ID is required. Visit https://dashboard.emailjs.com/admin/integration";if(!s)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!t)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";return!0};class o{constructor(e){this.status=e.status,this.text=e.responseText}}let i=(e,s,t={})=>new Promise((r,l)=>{let n=new XMLHttpRequest;n.addEventListener("load",({target:e})=>{let s=new o(e);200===s.status||"OK"===s.text?r(s):l(s)}),n.addEventListener("error",({target:e})=>{l(new o(e))}),n.open("POST",a._origin+e,!0),Object.keys(t).forEach(e=>{n.setRequestHeader(e,t[e])}),n.send(s)}),d=e=>{let s;if(!(s="string"==typeof e?document.querySelector(e):e)||"FORM"!==s.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of form";return s};var c=(e,s,t,r)=>{let l=r||a._userID,o=d(t);n(l,e,s);let c=new FormData(o);return c.append("lib_version","3.2.0"),c.append("service_id",e),c.append("template_id",s),c.append("user_id",l),i("/api/v1.0/email/send-form",c)},u=()=>{let e=(0,l.useRef)(),[s,t]=(0,l.useState)(null);return(0,r.jsx)("div",{className:"bg-gray-50 min-h-screen py-10",children:(0,r.jsxs)("div",{className:"max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg",children:[(0,r.jsx)("h2",{className:"text-3xl font-bold mb-8 text-center text-blue-600",children:"Contact Us"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,r.jsxs)("div",{className:"p-4 bg-white shadow-md rounded-lg",children:[(0,r.jsx)("h3",{className:"text-xl font-semibold mb-4 text-gray-800",children:"Get in Touch"}),(0,r.jsxs)("form",{ref:e,onSubmit:s=>{s.preventDefault(),c("service_n51etsk","template_0wbt1vs",e.current,"bzmwZT1MV-J1sAEwg").then(e=>{t("Message sent successfully!"),console.log(e.text)},e=>{t("Error sending message."),console.log(e.text)})},className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Name"}),(0,r.jsx)("input",{type:"text",name:"user_name",placeholder:"Your Name",className:"w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,r.jsx)("input",{type:"email",name:"user_email",placeholder:"Your Email",className:"w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Message"}),(0,r.jsx)("textarea",{name:"message",placeholder:"Your Message",className:"w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})]}),(0,r.jsx)("button",{type:"submit",className:"w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",children:"Send Message"})]}),s&&(0,r.jsx)("div",{className:"mt-4 text-center font-medium ".concat("Message sent successfully!"===s?"text-green-500":"text-red-500"),children:s})]}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h3",{className:"text-xl font-semibold mb-4 text-gray-800 text-center",children:"Our Office Location"}),(0,r.jsx)("iframe",{src:"https://www.google.com/maps/embed/v1/place?key=AIzaSyAbeTIYDaCLbev-GrI5TTmp8U9VhSv1OkA&q=12.9108,74.8987&zoom=15",width:"100%",height:"100%",className:"rounded-lg shadow-md w-full h-96",style:{border:0},allowFullScreen:"",loading:"lazy"})]})]})]})})}}},function(e){e.O(0,[2971,2117,1744],function(){return e(e.s=6819)}),_N_E=e.O()}]);