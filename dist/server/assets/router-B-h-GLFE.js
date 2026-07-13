import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const appCss = "/assets/styles-D_JDmikj.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$n = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$n.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$m = () => import("./register-BpR1KLxQ.js");
const Route$m = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component"),
  head: () => ({
    meta: [{
      title: "Registrar Cuenta - AGENDA 2050 | ADPH Group"
    }, {
      name: "description",
      content: "Crea tu cuenta en AGENDA 2050 y únete a la comunidad de aprendizaje tecnológico líder en la región."
    }]
  })
});
const $$splitComponentImporter$l = () => import("./programas-BFsOu0JM.js");
const Route$l = createFileRoute("/programas")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./nosotros-CSUPlmwO.js");
const Route$k = createFileRoute("/nosotros")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component"),
  head: () => ({
    meta: [{
      title: "Sobre Nosotros | ADPH Group"
    }, {
      name: "description",
      content: "Conoce la historia, visión y misión de ADPH Group, líderes en gestión humana."
    }]
  })
});
const $$splitComponentImporter$j = () => import("./login-DKNvGj5X.js");
const Route$j = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component"),
  head: () => ({
    meta: [{
      title: "Iniciar Sesión - AGENDA 2050 | ADPH Group"
    }, {
      name: "description",
      content: "Ingresa a tu aula virtual y accede a tus programas de formación tecnológica y desarrollo estratégico."
    }]
  })
});
const $$splitComponentImporter$i = () => import("./hrcorex-BFsOu0JM.js");
const Route$i = createFileRoute("/hrcorex")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./ficha-de-inscripcion-CdH2kuN0.js");
const Route$h = createFileRoute("/ficha-de-inscripcion")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component"),
  head: () => ({
    meta: [{
      title: "Ficha de Inscripción Oficial | ADPH Group - Executive Education"
    }, {
      name: "description",
      content: "Completa la ficha de inscripción oficial para diplomados, certificaciones y programas ejecutivos de ADPH Group."
    }]
  })
});
const $$splitComponentImporter$g = () => import("./eventos-wEK91ZiS.js");
const Route$g = createFileRoute("/eventos")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  head: () => ({
    meta: [{
      title: "Eventos & Webinars | Masterclasses de RRHH | ADPH Group"
    }, {
      name: "description",
      content: "Inscríbete en nuestros próximos webinars, masterclasses de reclutamiento digital y conferencias sobre gestión de riesgos y bienestar laboral."
    }]
  })
});
const $$splitComponentImporter$f = () => import("./entrenamiento-digital-CxbHDEU9.js");
const Route$f = createFileRoute("/entrenamiento-digital")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component"),
  head: () => ({
    meta: [{
      title: "Entrenamiento Digital & ADPH TV | Educación Ejecutiva"
    }, {
      name: "description",
      content: "Explora nuestra biblioteca digital de masterclasses, webinars y conferencias gratuitas dictadas por consultores expertos en gestión humana y salud ocupacional."
    }]
  })
});
const $$splitComponentImporter$e = () => import("./contacto-DhWLYNM5.js");
const Route$e = createFileRoute("/contacto")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component"),
  head: () => ({
    meta: [{
      title: "Contacto | ADPH Group"
    }, {
      name: "description",
      content: "Ponte en contacto con nosotros para potenciar el talento de tu organización."
    }]
  })
});
const $$splitComponentImporter$d = () => import("./consultoria-BFsOu0JM.js");
const Route$d = createFileRoute("/consultoria")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./blog-CwnVZWmg.js");
const Route$c = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  head: () => ({
    meta: [{
      title: "Nuestro Blog | Artículos y Tendencias de RRHH | ADPH Group"
    }, {
      name: "description",
      content: "Explora nuestros artículos, guías y tendencias en recursos humanos, psicología ocupacional y consultoría organizacional."
    }]
  })
});
const $$splitComponentImporter$b = () => import("./index-BJ18_MRj.js");
const Route$b = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component"),
  head: () => ({
    meta: [{
      title: "ADPH Group | Educación Ejecutiva"
    }, {
      name: "description",
      content: "Educación ejecutiva de alto nivel."
    }]
  })
});
const $$splitComponentImporter$a = () => import("./programas.index-By9YxKpJ.js");
const Route$a = createFileRoute("/programas/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  head: () => ({
    meta: [{
      title: "Programas Académicos | ADPH Group"
    }, {
      name: "description",
      content: "Explora nuestra oferta académica de programas ejecutivos."
    }]
  })
});
const $$splitComponentImporter$9 = () => import("./hrcorex.index-Dly0WkZN.js");
const Route$9 = createFileRoute("/hrcorex/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  head: () => ({
    meta: [{
      title: "HR CoreX | Plataformas de Software de Recursos Humanos"
    }, {
      name: "description",
      content: "Descubre nuestra suite avanzada de software para selección, evaluación psicométrica, salud ocupacional y analítica de talento humano."
    }]
  })
});
const $$splitComponentImporter$8 = () => import("./consultoria.index-BpIKpuyu.js");
const Route$8 = createFileRoute("/consultoria/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "Consultoría en RRHH | ADPH Group"
    }, {
      name: "description",
      content: "Soluciones a medida en capacitación in-house, evaluaciones ocupacionales y gestión del talento."
    }]
  })
});
const $$splitComponentImporter$7 = () => import("./programas.especializaciones-CgLk3B_Q.js");
const Route$7 = createFileRoute("/programas/especializaciones")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Programas de Especialización Ejecutiva | ADPH Group"
    }, {
      name: "description",
      content: "Desarrollo profundo de competencias técnicas y estratégicas en gestión de personas, clima laboral y desarrollo organizacional."
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./programas.diplomados-DbpcjAzx.js");
const Route$6 = createFileRoute("/programas/diplomados")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Diplomados de Alta Dirección y Estrategia | ADPH Group"
    }, {
      name: "description",
      content: "Diplomados ejecutivos de alto impacto estratégico diseñados para potenciar el liderazgo y la excelencia organizacional en América Latina."
    }]
  })
});
const $$splitComponentImporter$5 = () => import("./programas.cursos-DbzDRA3z.js");
const Route$5 = createFileRoute("/programas/cursos")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Programas Ejecutivos | ADPH Group"
    }, {
      name: "description",
      content: "Programas ejecutivos de alta intensidad diseñados para potenciar competencias."
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./programas.certificaciones-BHdta95o.js");
const Route$4 = createFileRoute("/programas/certificaciones")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Certificaciones Oficiales con Validez Regional | ADPH Group"
    }, {
      name: "description",
      content: "Obtén acreditaciones y certificaciones oficiales líderes en el mercado de Recursos Humanos y Psicología Ocupacional con validez regional."
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./programas._serviceId-cnNImJLh.js");
const Route$3 = createFileRoute("/programas/$serviceId")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./hrcorex._serviceId-Cyr7mg11.js");
const Route$2 = createFileRoute("/hrcorex/$serviceId")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./escuelas._escuelaId-HiRyLC1f.js");
const Route$1 = createFileRoute("/escuelas/$escuelaId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./consultoria._serviceId-C1yQ9h2d.js");
const Route = createFileRoute("/consultoria/$serviceId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$m.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$n
});
const ProgramasRoute = Route$l.update({
  id: "/programas",
  path: "/programas",
  getParentRoute: () => Route$n
});
const NosotrosRoute = Route$k.update({
  id: "/nosotros",
  path: "/nosotros",
  getParentRoute: () => Route$n
});
const LoginRoute = Route$j.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$n
});
const HrcorexRoute = Route$i.update({
  id: "/hrcorex",
  path: "/hrcorex",
  getParentRoute: () => Route$n
});
const FichaDeInscripcionRoute = Route$h.update({
  id: "/ficha-de-inscripcion",
  path: "/ficha-de-inscripcion",
  getParentRoute: () => Route$n
});
const EventosRoute = Route$g.update({
  id: "/eventos",
  path: "/eventos",
  getParentRoute: () => Route$n
});
const EntrenamientoDigitalRoute = Route$f.update({
  id: "/entrenamiento-digital",
  path: "/entrenamiento-digital",
  getParentRoute: () => Route$n
});
const ContactoRoute = Route$e.update({
  id: "/contacto",
  path: "/contacto",
  getParentRoute: () => Route$n
});
const ConsultoriaRoute = Route$d.update({
  id: "/consultoria",
  path: "/consultoria",
  getParentRoute: () => Route$n
});
const BlogRoute = Route$c.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$n
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$n
});
const ProgramasIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => ProgramasRoute
});
const HrcorexIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => HrcorexRoute
});
const ConsultoriaIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => ConsultoriaRoute
});
const ProgramasEspecializacionesRoute = Route$7.update({
  id: "/especializaciones",
  path: "/especializaciones",
  getParentRoute: () => ProgramasRoute
});
const ProgramasDiplomadosRoute = Route$6.update({
  id: "/diplomados",
  path: "/diplomados",
  getParentRoute: () => ProgramasRoute
});
const ProgramasCursosRoute = Route$5.update({
  id: "/cursos",
  path: "/cursos",
  getParentRoute: () => ProgramasRoute
});
const ProgramasCertificacionesRoute = Route$4.update({
  id: "/certificaciones",
  path: "/certificaciones",
  getParentRoute: () => ProgramasRoute
});
const ProgramasServiceIdRoute = Route$3.update({
  id: "/$serviceId",
  path: "/$serviceId",
  getParentRoute: () => ProgramasRoute
});
const HrcorexServiceIdRoute = Route$2.update({
  id: "/$serviceId",
  path: "/$serviceId",
  getParentRoute: () => HrcorexRoute
});
const EscuelasEscuelaIdRoute = Route$1.update({
  id: "/escuelas/$escuelaId",
  path: "/escuelas/$escuelaId",
  getParentRoute: () => Route$n
});
const ConsultoriaServiceIdRoute = Route.update({
  id: "/$serviceId",
  path: "/$serviceId",
  getParentRoute: () => ConsultoriaRoute
});
const ConsultoriaRouteChildren = {
  ConsultoriaServiceIdRoute,
  ConsultoriaIndexRoute
};
const ConsultoriaRouteWithChildren = ConsultoriaRoute._addFileChildren(
  ConsultoriaRouteChildren
);
const HrcorexRouteChildren = {
  HrcorexServiceIdRoute,
  HrcorexIndexRoute
};
const HrcorexRouteWithChildren = HrcorexRoute._addFileChildren(HrcorexRouteChildren);
const ProgramasRouteChildren = {
  ProgramasServiceIdRoute,
  ProgramasCertificacionesRoute,
  ProgramasCursosRoute,
  ProgramasDiplomadosRoute,
  ProgramasEspecializacionesRoute,
  ProgramasIndexRoute
};
const ProgramasRouteWithChildren = ProgramasRoute._addFileChildren(
  ProgramasRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  BlogRoute,
  ConsultoriaRoute: ConsultoriaRouteWithChildren,
  ContactoRoute,
  EntrenamientoDigitalRoute,
  EventosRoute,
  FichaDeInscripcionRoute,
  HrcorexRoute: HrcorexRouteWithChildren,
  LoginRoute,
  NosotrosRoute,
  ProgramasRoute: ProgramasRouteWithChildren,
  RegisterRoute,
  EscuelasEscuelaIdRoute
};
const routeTree = Route$n._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$3 as R,
  Route$2 as a,
  Route$1 as b,
  Route as c,
  router as r
};
