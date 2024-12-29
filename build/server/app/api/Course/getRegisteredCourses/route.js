"use strict";(()=>{var e={};e.id=3317,e.ids=[3317],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},11665:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>R,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g});var s={};t.r(s),t.d(s,{GET:()=>d});var o=t(73278),n=t(45002),u=t(54877),i=t(53524),a=t(71309);let p=new i.PrismaClient;async function d(e){try{let{searchParams:r}=new URL(e.url),t=r.get("userId");if(!t)return a.NextResponse.json({error:"Missing userId parameter"},{status:400});let s=parseInt(t,10);if(isNaN(s))return a.NextResponse.json({error:"Invalid userId parameter"},{status:400});let o=await p.eNROLLMENT.findMany({where:{student_id:s},select:{course_completion:!0,COURSE:{select:{course_id:!0,course_name:!0,course_description:!0,course_price:!0,course_duration:!0,difficulty:!0,enrollment_deadline:!0}}}});if(o.length>0)return a.NextResponse.json(o.map(e=>({...e.COURSE,course_completion:e.course_completion})));return a.NextResponse.json({error:"No registered courses found"},{status:404})}catch(e){return console.error("Error fetching courses:",e),a.NextResponse.json({error:"Internal Server Error"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/Course/getRegisteredCourses/route",pathname:"/api/Course/getRegisteredCourses",filename:"route",bundlePath:"app/api/Course/getRegisteredCourses/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Course\\getRegisteredCourses\\route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:g,serverHooks:m}=c,R="/api/Course/getRegisteredCourses/route";function x(){return(0,u.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[9379,4833],()=>t(11665));module.exports=s})();