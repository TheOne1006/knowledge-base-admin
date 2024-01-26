import pick from "lodash/pick";
import {
    useRecordContext,
    useRefresh,
    useNotify,
} from 'react-admin';
import { dataProvider } from '../../dataProvider/dataProvider';

export const useUpload = () => {
    const refresh = useRefresh();
    const notify = useNotify();
    const record = useRecordContext();

    async function startUpload(data: any) {
        const pickData = pick(data, ['files']);

        try {
            const { json: files } = await dataProvider.kbUpload(record.id, pickData);

            if (files.length) {
                notify(`Upload Success`, { type: 'success' });
                refresh();
            }
        } catch (error) {
            notify(`Upload Failed`, { type: 'error' });
            // console.log('error', error);
        }
    }

    return {
        startUpload,
    }

}
