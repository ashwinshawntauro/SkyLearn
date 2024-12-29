"use strict";(()=>{var e={};e.id=7773,e.ids=[7773],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},32694:e=>{e.exports=require("http2")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},35816:e=>{e.exports=require("process")},68621:e=>{e.exports=require("punycode")},86624:e=>{e.exports=require("querystring")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},74175:e=>{e.exports=require("tty")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},26316:(e,r,s)=>{s.r(r),s.d(r,{originalPathname:()=>m,patchFetch:()=>q,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>x,staticGenerationAsyncStorage:()=>d});var o={};s.r(o),s.d(o,{POST:()=>p});var t=s(73278),a=s(45002),i=s(54877),u=s(2651),n=s(71309);async function p(e){try{let{accessToken:r,name:s,section:o,descriptionHeading:t,description:a,room:i}=await e.json();if(!r||!s)return n.NextResponse.json({error:"Access token and course name are required"},{status:400});let p=new u.lkr.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);p.setCredentials({access_token:r});let c=u.lkr.classroom({version:"v1",auth:p}),l=await c.courses.create({requestBody:{name:s,section:o||"Default Section",descriptionHeading:t||"Welcome to the Course",description:a||"This is a sample course created via API.",room:i||"Room 101",ownerId:"me"}});return n.NextResponse.json(l.data,{status:200})}catch(e){if(console.error("Error creating Google Classroom course:",e),e.response)return console.error("Google API error details:",e.response.data),n.NextResponse.json({error:e.response.data.error.message||"Google API Error"},{status:e.response.status||500});return n.NextResponse.json({error:"Internal Server Error"},{status:500})}}let c=new t.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/Classroom/createClassroom/route",pathname:"/api/Classroom/createClassroom",filename:"route",bundlePath:"app/api/Classroom/createClassroom/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Classroom\\createClassroom\\route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:d,serverHooks:x}=c,m="/api/Classroom/createClassroom/route";function q(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:d})}}};var r=require("../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),o=r.X(0,[9379,4833,4992,2651],()=>s(26316));module.exports=o})();