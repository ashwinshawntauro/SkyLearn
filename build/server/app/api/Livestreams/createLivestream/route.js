"use strict";(()=>{var e={};e.id=1206,e.ids=[1206],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},56354:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>x,patchFetch:()=>L,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>v,staticGenerationAsyncStorage:()=>m});var a={};t.r(a),t.d(a,{POST:()=>c});var s=t(73278),i=t(45002),n=t(54877),o=t(53524),u=t(71309);let p=new o.PrismaClient;async function c(e){let{status:r,course_id:t,tutor_id:a,datetime:s,title:i,description:n,refLiveId:o}=await e.json();if(!r||!t||!a)return u.NextResponse.json({error:"All fields are required"},{status:400});try{let e=await p.livestreams.create({data:{title:i,description:n,status:r,course_id:parseInt(t),tutor_id:parseInt(a),datetime:new Date(s).toISOString(),refLiveId:parseInt(o)}});return u.NextResponse.json(e,{status:200})}catch(e){return console.error("Error creating course:",e),u.NextResponse.json({error:"Internal Server Error"},{status:500})}}let d=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/Livestreams/createLivestream/route",pathname:"/api/Livestreams/createLivestream",filename:"route",bundlePath:"app/api/Livestreams/createLivestream/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Livestreams\\createLivestream\\route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:v}=d,x="/api/Livestreams/createLivestream/route";function L(){return(0,n.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:m})}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[9379,4833],()=>t(56354));module.exports=a})();