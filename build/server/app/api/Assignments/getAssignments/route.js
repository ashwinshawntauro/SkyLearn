"use strict";(()=>{var e={};e.id=391,e.ids=[391],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},43694:(e,t,s)=>{s.r(t),s.d(t,{originalPathname:()=>A,patchFetch:()=>x,requestAsyncStorage:()=>c,routeModule:()=>g,serverHooks:()=>l,staticGenerationAsyncStorage:()=>m});var r={};s.r(r),s.d(r,{GET:()=>d});var n=s(73278),i=s(45002),a=s(54877),o=s(53524),u=s(71309);let p=new o.PrismaClient;async function d(e){let{searchParams:t}=new URL(e.url),s=t.get("courseId");if(!s)return u.NextResponse.json({error:"courseId is required"},{status:400});try{let e=await p.aSSIGNMENT.findMany({where:{course_id:parseInt(s)}});return u.NextResponse.json(e,{status:200})}catch(e){return console.error(e),u.NextResponse.json({error:"Failed to fetch assignments"},{status:500})}}let g=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/Assignments/getAssignments/route",pathname:"/api/Assignments/getAssignments",filename:"route",bundlePath:"app/api/Assignments/getAssignments/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Assignments\\getAssignments\\route.js",nextConfigOutput:"",userland:r}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:l}=g,A="/api/Assignments/getAssignments/route";function x(){return(0,a.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:m})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[9379,4833],()=>s(43694));module.exports=r})();