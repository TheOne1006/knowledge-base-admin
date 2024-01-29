import { lazy } from 'react';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import PushLogList from './pushLogList';
// import PushLogShow from './pushLogShow';

export const PushLogShow = lazy(() => import('./pushLogShow'));
export default {
    list: PushLogList,
    show: PushLogShow,
    icon: AccessTimeFilledRoundedIcon,
    recordRepresentation: 'pushVersion',
};

