// @material-ui/icons
import People from '@material-ui/icons/People';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Bookmark from '@material-ui/icons/Bookmark';
import HomePage from '../scenes/Home/HomePage'
import NovaMediacao from "./../scenes/Register/Mediacao"
import Mediacao from './../scenes/admin/mediacao/Mediacao';
import ListUsers from '../scenes/admin/ListUsers';
import Profile from './../scenes/Profile';
import Configurations from '../scenes/admin/Configurations';
import CadastroPendente from '../scenes/admin/mediacao/CadastroPendente';


var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Início',
    icon: Home,
    component: HomePage,
    nivel:[1,4,99]
  },
  {
    collapse: true,
    path: '/mediacao',
    name: 'Mediação',
    state: 'openComponents',
    icon: Bookmark,
    nivel:[1,4,99],
    views: [
      {
        path: '/mediacao/nova',
        name: 'Nova Mediação',
        mini: 'NM',
        nivel:[1,4,99],
        component: NovaMediacao
      },
      {
        path: '/mediacao/todas',
        name: 'Mediações',
        nivel:[1,4,99],
        mini: 'M',
        component: NovaMediacao
      }
    ]
  },
  {
    collapse: true,
    path: '/administrador',
    name: 'Administrador',
    state: 'openAdministrador',
    nivel:[1],
    icon: Settings,
    views: [
      {
        path: '/administrador/usuario/todos',
        name: 'Usuários',
        mini: 'Us',
        nivel:[1,4,99],
        component: ListUsers
      },
      {
        path: '/administrador/configuracao',
        name: 'Configuração',
        mini: 'C',
        nivel:[1],
        component: Configurations
      }
    ]
  },
  { 
    path: '/profile',
    name: 'Meu perfil',
    icon: People,
    nivel:[1,4,99],
    component: Profile
  },
  { 
    path: '/mediacao/cadastropendente',
    name: 'Cadastros Pendentes',
    icon: People,
    nivel:[1,2],
    naoExibe: true,
    component: CadastroPendente
  },
  {
    path: '/mediacao/protocolo',
    name: 'Mediação',
    icon: People,
    nivel: [1,2,3,4,5,6,99],
    naoExibe: true,
    component: Mediacao
  },
  { redirect: true, path: '/',   nivel:[1,4,99], pathTo: '/dashboard', name: 'Dashboard' },
];
export default dashRoutes;



// WEBPACK FOOTER //
// ./src/routes/dashboard.jsx