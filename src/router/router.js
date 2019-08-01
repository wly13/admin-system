import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
   {
     path:"/login",
     name:"login",
     component:() => import("../views/login/Login"),
     hidden:true,
   },
   {
     path:"/",
     name:"Layout",
     component:Layout,
     hidden:true,
     redirect:"/dashboard"
   },
   {
     path:"/dashboard",
     icon:"dashboard",
     title:"route.dashboard",
     component:Layout,
     noChild:true,
     children:[
       {
         path:"/dashboard",
         component:() => import("@/views/dashboard")
       }
     ]
   },
   {
     path:"/documentation",
     icon:"documentations",
     title:"route.documentation",
     component:Layout,
     noChild:true,
     children:[
       {
         path:"/documentation",
         component:() => import("@/views/documentation")
       }
     ]
   },
   {
     path:"/guide",
     icon:'guides',
     title:"route.guide",
     noChild:true,
     component:Layout,
     children:[
       {
         path:"/guide",
         component:() => import("@/views/guide")
       }
     ]
   },
   {
     path:"/permission",
     icon:"lock",
     title:"route.permission",
     component:Layout,
     children:[
       {
         path:"/permission/page",
         title:"route.pagePermission",
         component:() => import("@/views/permission/page")
       },
       {
         path:'/permission/role',
        //  name:"/rolePermission",
         title:'route.rolePermission',
         component:() =>import("@/views/permission/role")
       },
       {
         path:"/permission/directive",
         title:"route.directivePermission",
         component:() => import("@/views/permission/directive")
       }
     ]
   },
   {
     path:'/icon',
     icon:'icon',
     title:'route.icons',
     noChild:true,
     component:Layout,
     children:[
       {
         path:"/icon",
          component:() => import("@/views/icon")
       }
     ]
   },
   {
     path:"/component",
     icon:"component",
     title:"route.components",
     component:Layout,
     children:[
       {
         path:"/component/tinymce",
         title:"route.tinymce",
         component:() => import("@/views/component/tinymce")
       },
       {
         path:"/component/avatarUpload",
         title:"route.avatarUpload",
         component:() => import("@/views/component/avatarUpload")
       }
     ]

   },
   {
     path:"/chart",
     icon:"chart",
     title:"route.charts",
     component:Layout,
     children:[
       {
         path:"/echarts/line",
         title:"route.line",
         component:() => import("@/views/echarts/line")
       }
     ]
   },
   {
     path:"/nested",
     icon:"nested",
     title:"route.nested",
     children:[
       {
         path:"/menu1",
         title:"route.menu1"
       }
     ]
   },
   {
     path:"/table",
     icon:"tables",
     title:"route.Table",
     children:[
       {
        path:"/dynamicTable",
        titleL:"route.dynamicTable"
       }
     ]
   },
   {
     path:"/treeTable",
     icon:"tree-table",
     title:"route.treeTable",
     children:[
       {
         path:"/customTreeTable",
         title:"route.customTreeTable"
       }
     ]
   },
   {
     path:"/tab",
     icon:"tab",
     title:"route.tab",
     children:[
       {
         path:"/form",
         title:"route.form"
       }
     ]
   },
   {
     path:"/errorPage",
     icon:"404s",
     title:"route.errorPages",
     children:[
       {
         path:"/page401",
         title:"route.page401"
       }
     ]
   },
   {
     path:"/example",
     icon:"example",
     title:"route.example",
     children:[{
       path:"/articleList",
       title:"route.articleList"
     }]
   },
   {
    path:"/errorLog",
    icon:"bug",
    title:"route.errorLog",
    noChild:true
   },
   {
     path:"/Excel",
     icon:"Excel",
     title:"route.excel",
     children:[
       {
         path:"/exportExcel",
         title:"route.exportExcel"
       }
     ]
   },
   {
     path:"/PDF",
     icon:"pdfs",
     title:"route.pdf",
     noChild:true
   },
   {
     path:"/theme",
     icon:"themes",
     title:"route.theme",
     noChild:true
   },
   {
     path:"/international",
     icon:"international",
     title:"route.i18n",
     noChild:true,
   }
  ]
})
 