import { useState } from 'react';
import pick from "lodash/pick";
import {
    useRefresh,
    useNotify,
} from 'react-admin';
// import { useFormContext } from 'react-hook-form';
import { dataProvider } from '../../dataProvider/dataProvider';
import { PushItem } from '../../interfaces';

export const usePush = () => {
    const refresh = useRefresh();
    const notify = useNotify();
    // const { getValues } = useFormContext();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState<PushItem>();

    function startRunPush(data: any) {
        const { kbId, pushVersion } = pick(data, ['kbId', 'pushVersion']);
        // config.id 
        const pushObser = dataProvider.runPush(kbId, pushVersion);

        setOpen(true);
        setLoading(true);
        pushObser.subscribe({
            next: (data) => {
                setPlan(data);
            },
            error: (error) => {
                console.log('error', error);
            },
            complete: () => {
                setOpen(false);
                setLoading(false);
                notify('push finish', {
                    type: 'success'
                });
                // console.log('complete');
                refresh();
            }
        });
    }

    function handleConfirm() {
        setOpen(false);
        setLoading(false);
        refresh();
    }

    function handleDialogClose() {
        setOpen(false);
        setLoading(false);
        refresh();
    }


    async function clearAllPushMap(data: any) {
        const { kbId, pushVersion } = pick(data, ['kbId', 'pushVersion']);
        setLoading(true);

        try {
            await dataProvider.clearAllPushMap(kbId, pushVersion);

            notify('claer all', {
                type: 'success'
            });
        } catch (error) {

            notify('claer all error', {
                type: 'error'
            });

            
        } finally {
            refresh()
            setLoading(false);
        }
 
    }

    return {
        open,
        startRunPush,
        plan,
        handleConfirm,
        handleDialogClose,
        clearAllPushMap,
        loading,
    }

}
