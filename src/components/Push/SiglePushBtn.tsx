import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';;
import SendIcon from '@mui/icons-material/Send';
import {
    useRefresh,
    useNotify,
} from 'react-admin';
// import { useFormContext } from 'react-hook-form';
import { dataProvider } from '../../dataProvider/dataProvider';

export const useSiglePush = (configId: number | string, fileId: number | string) => {
    const refresh = useRefresh();
    const notify = useNotify();

    const [loading, setLoading] = useState(false);

    async function startRunSiglePush() {
        setLoading(true);
        try {
            await dataProvider.runSiglePush(configId, fileId);
            notify('push success', {
                type: 'success'
            });
            refresh();
        } catch (error) {
            notify('push failed', {
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        startRunSiglePush,
        loading,
    }

}

interface SiglePushBtnProps {
    label: string;
    configId: string | number;
    fileId: string | number;
}

export const SiglePushBtn = ({ label, configId, fileId }: SiglePushBtnProps) => {
    const { startRunSiglePush, loading } = useSiglePush(configId, fileId);

    return (
        <LoadingButton color="success" loading={loading} onClick={(e: any) => {
            startRunSiglePush()
            e?.stopPropagation();
        }} startIcon={<SendIcon />}>
            {label}
        </LoadingButton>
    )
}

SiglePushBtn.defaultProps = {
    label: 'push'
}
