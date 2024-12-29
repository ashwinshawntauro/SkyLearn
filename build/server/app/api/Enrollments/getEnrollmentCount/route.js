"use strict";(()=>{var e={};e.id=4831,e.ids=[4831],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},59342:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>E,patchFetch:()=>x,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m});var n={};t.r(n),t.d(n,{GET:()=>p});var o=t(73278),s=t(45002),a=t(54877),u=t(53524),l=t(71309);let i=new u.PrismaClient;async function p(e){try{let{searchParams:r}=new URL(e.url),t=r.get("courseId");if(!t)return l.NextResponse.json({error:"Missing courseId parameter"},{status:400});let n=parseInt(t,10);if(isNaN(n))return l.NextResponse.json({error:"Invalid courseId parameter"},{status:400});let o=await i.eNROLLMENT.count({where:{course_id:n}});return l.NextResponse.json({courseId:n,enrolledStudents:o})}catch(e){return console.error("Error fetching enrollment count:",e),l.NextResponse.json({error:"Internal Server Error"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/Enrollments/getEnrollmentCount/route",pathname:"/api/Enrollments/getEnrollmentCount",filename:"route",bundlePath:"app/api/Enrollments/getEnrollmentCount/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Enrollments\\getEnrollmentCount\\route.js",nextConfigOutput:"",userland:n}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:g}=c,E="/api/Enrollments/getEnrollmentCount/route";function x(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),n=r.X(0,[9379,4833],()=>t(59342));module.exports=n})();