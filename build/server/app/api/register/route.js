"use strict";(()=>{var e={};e.id=5569,e.ids=[5569],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32375:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>m,staticGenerationAsyncStorage:()=>c});var a={};t.r(a),t.d(a,{POST:()=>p});var s=t(73278),i=t(45002),n=t(54877),o=t(71309);let u=new(t(53524)).PrismaClient,p=async e=>{let{name:r,email:t,role:a,id:s,department:i}=await e.json();try{let e;if("student"===a)e=await u.sTUDENT.create({data:{student_name:r,student_email:t,user_id:s}});else{if("teacher"!==a)return o.NextResponse.error('Invalid role, must be "student" or "teacher"',500);e=await u.tUTOR.create({data:{user_id:s,tutor_name:r,tutor_email:t,department:i}})}return o.NextResponse.json(e)}catch(e){return console.error("Error storing data with Prisma:",e),o.NextResponse.error("Error storing data",500)}},d=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/register/route",pathname:"/api/register",filename:"route",bundlePath:"app/api/register/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\register\\route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:l,staticGenerationAsyncStorage:c,serverHooks:m}=d,g="/api/register/route";function x(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:c})}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[9379,4833],()=>t(32375));module.exports=a})();