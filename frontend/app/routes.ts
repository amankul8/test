import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./shared/layout/layout.tsx', [
        index("./modules/main/main.tsx"),
        route("/auth/signin", "./modules/auth/pages/signin/index.tsx"),
        route("/auth/signup", "./modules/auth/pages/signup/index.tsx"),
        route("*", "./modules/errors/notfound.tsx"),
    ])
] satisfies RouteConfig;
