
import { lazy } from 'react';
import SettingsInputCompositeRoundedIcon from '@mui/icons-material/SettingsInputCompositeRounded';
import PushMapList from './pushMapList';
// import PushMapShow from './pushMapShow';

export const PushMapShow = lazy(() => import('./pushMapShow'));

export default {
    list: PushMapList,
    show: PushMapShow,
    icon: SettingsInputCompositeRoundedIcon,
    // recordRepresentation: 'title',
};

