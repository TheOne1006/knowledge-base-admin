import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';;
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
    useRefresh,
    useNotify,
} from 'react-admin';
// import { useFormContext } from 'react-hook-form';
import { dataProvider } from '../../dataProvider/dataProvider';

export const useSigleClear = (configId: number | string, fileId: number | string) => {
    const refresh = useRefresh();
    const notify = useNotify();

    const [loading, setLoading] = useState(false);

    async function startClearSigle() {
        setLoading(true);
        try {
            await dataProvider.clearSiglePushMapWithFileId(configId, fileId);
            notify('claer success', {
                type: 'success'
            });
            refresh();
        } catch (error) {
            notify('claer failed', {
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        startClearSigle,
        loading,
    }

}

interface SigleClearBtnProps {
    label: string;
    configId: string | number;
    fileId: string | number;
}

export const SigleClearBtn = ({ label, configId, fileId }: SigleClearBtnProps) => {
    const { startClearSigle, loading } = useSigleClear(configId, fileId);
    return (
        <LoadingButton color="error" loading={loading} onClick={(e: any) => {
            startClearSigle()
            e?.stopPropagation();
        }} endIcon={<RemoveCircleIcon />}>
            {label}
        </LoadingButton>
    )
}

SigleClearBtn.defaultProps = {
    label: 'clear'
}
