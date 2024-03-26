import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Icons = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const AuthJoin = () => import("@/pages/Auth/Join.vue");
const AdsGeneratorList = () => import("@/pages/AdsGenerator/AdsGeneratorList.vue");
const AdsGeneratorNew = () => import("@/pages/AdsGenerator/AdsGeneratorNew.vue");
const AdsGeneratorEdit = () => import("@/pages/AdsGenerator/AdsGeneratorEdit.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "join",
        name: "join",
        component: AuthJoin,
        meta: {
          layout: 'guest',
        },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "ads-generator-list",
        name: "Gerador de Anúncios",
        component: AdsGeneratorList,
      },
      {
        path: "ads-generator-new",
        name: "Gerador de Anúncios",
        component: AdsGeneratorNew,
      },
      {
        path: "ads-generator-edit/:id",
        name: "Gerador de Anúncios",
        component: AdsGeneratorEdit,
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
