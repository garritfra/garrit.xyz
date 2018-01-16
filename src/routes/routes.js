import _ from 'lodash';
import NotFound from './NotFound';

export const routes = [
  { id: 0, component: 'Home', link: '/home' },
  { id: 1, component: 'Projects', link: '/projects' },
  { id: 2, component: NotFound, link: '/*' },


];

export const createRoute = (component, link) => {
  const id = _.lastIndexOf(routes);

  routes.push({ id, component, link });
};

