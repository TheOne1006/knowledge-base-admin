import { lazy } from 'react';

import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
// import KbSiteCreate from './kbSiteCreate';
// import KbSiteEdit from './kbSiteEdit';
import KbSiteList from './kbSiteList';
// import KbSiteShow from './kbSiteShow';

export const KbSiteShow = lazy(() => import('./kbSiteShow'));
export const KbSiteEdit = lazy(() => import('./kbSiteEdit'));
export const KbSiteCreate = lazy(() => import('./kbSiteCreate'));

export default {
    list: KbSiteList,
    create: KbSiteCreate,
    edit: KbSiteEdit,
    show: KbSiteShow,
    icon: PublicRoundedIcon,
    recordRepresentation: 'title',
};

