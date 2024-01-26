import { useState } from 'react';
import {
    useRecordContext,
    useNotify,
} from 'react-admin';
import LoadingButton from '@mui/lab/LoadingButton';;
import SyncIcon from '@mui/icons-material/Sync';

import { dataProvider } from '../dataProvider';


export function useSyncPage() {

    const [loading, setLoading] = useState(false);
    const record = useRecordContext();
    const notify = useNotify();

    const { kbId, siteId, id: fileId, sourceUrl } = record;

    async function startSync() {
        setLoading(true);

        try {
            const result = await dataProvider.crawlerSinglePage(kbId, siteId, fileId);

            if (result.finish) {
                notify(`Update Success ${sourceUrl}`, { type: 'success' });
            } else {
                throw new Error("update error");
            }
            
        } catch (error) {
            notify(`Update Failed ${sourceUrl}`, { type: 'error' });
            
        } finally {
            setLoading(false);
        }
  
        

    }

    return {
        startSync,
        loading,
    }

}


export const SyncPageBtn = ({ label }: {label: string}) => {
    const { startSync, loading } = useSyncPage();

    return (
        <LoadingButton loading={loading} onClick={(e: any) => {
            startSync()
            e?.stopPropagation();
        }} startIcon={<SyncIcon />}>
            {label}
        </LoadingButton>
    )
}

SyncPageBtn.defaultProps = {
    label: 'Sync'
}
