"use strict";(()=>{var e={};e.id=3882,e.ids=[3882],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},47433:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>k,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g});var s={};r.r(s),r.d(s,{GET:()=>d});var n=r(73278),o=r(45002),a=r(54877),u=r(53524),i=r(71309);let p=new u.PrismaClient;async function d(e){try{let{searchParams:t}=new URL(e.url),r=t.get("courseids"),s=t.get("userId"),n=t.get("livestreamId");if(!r||!s||!n)return i.NextResponse.json({status:400,message:"Missing required query parameters."},{status:400});let o=await p.user_tokens.findFirst({where:{user_id:parseInt(s,10),course_id:parseInt(r,10),livestream_id:parseInt(n,10)}});if(!o)return i.NextResponse.json({status:404,message:"No token found for the given parameters."},{status:404});return i.NextResponse.json({status:200,data:o},{status:200})}catch(e){return console.error("Error fetching token count:",e),i.NextResponse.json({status:500,message:"Internal server error."},{status:500})}}let c=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/Token/getTokenStudent/route",pathname:"/api/Token/getTokenStudent",filename:"route",bundlePath:"app/api/Token/getTokenStudent/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Token\\getTokenStudent\\route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:g,serverHooks:m}=c,k="/api/Token/getTokenStudent/route";function x(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9379,4833],()=>r(47433));module.exports=s})();