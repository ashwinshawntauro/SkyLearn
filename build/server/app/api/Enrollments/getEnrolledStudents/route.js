"use strict";(()=>{var e={};e.id=9717,e.ids=[9717],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9678:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>E,patchFetch:()=>g,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>c});var n={};r.r(n),r.d(n,{GET:()=>d});var s=r(73278),o=r(45002),u=r(54877),a=r(71309);let i=new(r(53524)).PrismaClient;async function d(e){try{let{searchParams:t}=new URL(e.url),r=t.get("courseId");if(!r)return a.NextResponse.json({error:"courseId is required"},{status:400});let n=(await i.eNROLLMENT.findMany({where:{course_id:parseInt(r)},select:{student_id:!0}})).map(e=>e.student_id);if(0===n.length)return a.NextResponse.json({students:[]},{status:200});let s=await i.sTUDENT.findMany({where:{student_id:{in:n}},select:{student_id:!0,student_name:!0,student_email:!0}});return a.NextResponse.json({students:s},{status:200})}catch(e){return console.error(e),a.NextResponse.json({error:"Internal Server Error"},{status:500})}}let l=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/Enrollments/getEnrolledStudents/route",pathname:"/api/Enrollments/getEnrolledStudents",filename:"route",bundlePath:"app/api/Enrollments/getEnrolledStudents/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Enrollments\\getEnrolledStudents\\route.js",nextConfigOutput:"",userland:n}),{requestAsyncStorage:p,staticGenerationAsyncStorage:c,serverHooks:m}=l,E="/api/Enrollments/getEnrolledStudents/route";function g(){return(0,u.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:c})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[9379,4833],()=>r(9678));module.exports=n})();