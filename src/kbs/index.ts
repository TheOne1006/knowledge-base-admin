
import { lazy } from 'react';
import AppsOutlined from '@mui/icons-material/AppsOutlined';
// import KbCreate from './kbCreate';
// import KbEdit from './kbEdit';
import KbList from './kbList';
// import KbShow from './kbShow';

export const KbEdit = lazy(() => import('./kbEdit'));
// export const KbList = lazy(() => import('./kbList'));
export const KbShow = lazy(() => import('./kbShow'));
export const KbCreate = lazy(() => import('./kbCreate'));

export default {
    list: KbList,
    create: KbCreate,
    edit: KbEdit,
    show: KbShow,
    icon: AppsOutlined,
    recordRepresentation: 'knowledge base',
};

