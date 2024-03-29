import { lazy } from 'react';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import pushConfigCreate from './pushConfigCreate';
// import pushConfigEdit from './pushConfigEdit';
import pushConfigList from './pushConfigList';
// import pushConfigShow from './pushConfigShow';


export const pushConfigCreate = lazy(() => import('./pushConfigCreate'));
export const pushConfigEdit = lazy(() => import('./pushConfigEdit'));
export const pushConfigShow = lazy(() => import('./pushConfigShow'));

export default {
    list: pushConfigList,
    create: pushConfigCreate,
    edit: pushConfigEdit,
    show: pushConfigShow,
    icon: SettingsRoundedIcon,
    recordRepresentation: 'title',
};

