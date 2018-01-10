import _ from "lodash"
import NotFound from "./NotFound";

export let routes = [
    { id: 0, component: "Home", link: "/home" },
    { id: 1, component: "Projects", link: "/projects" },
    { id: 2, component: NotFound, link: "/*" }

    
]

export let createRoute = (component, link) => {
    let id = _.lastIndexOf(routes)

    routes.push({ id: id, component: component, link: link })
}