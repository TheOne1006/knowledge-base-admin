import { useState } from 'react';
import pick from "lodash/pick";
import {
    useRefresh,
    useNotify,
} from 'react-admin';
// import { useFormContext } from 'react-hook-form';
import { dataProvider } from '../../dataProvider/dataProvider';
import { PushItem } from '../../interfaces';

let globalCtrl: AbortController | null = null;

export const usePush = () => {
    const refresh = useRefresh();
    const notify = useNotify();
    // const { getValues } = useFormContext();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState<PushItem>();

    async function startRunPush(data: any) {
        if (globalCtrl) {
            globalCtrl.abort();
        }
        const ctrl = new AbortController();
        globalCtrl = ctrl;
        const { id, pushVersion } = pick(data, ['id', 'pushVersion']);
        // config.id 
        const pushObser = await dataProvider.runPush(id, pushVersion, ctrl);

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
                ctrl.abort();
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
        if (globalCtrl) {
            globalCtrl.abort();
        }
        setOpen(false);
        setLoading(false);
        refresh();
    }

    function handleDialogClose() {
        if (globalCtrl) {
            globalCtrl.abort();
        }
        setOpen(false);
        setLoading(false);
        refresh();
    }


    async function clearAllPushMap(data: any) {
        const { id, pushVersion } = pick(data, ['id', 'pushVersion']);
        setLoading(true);

        try {
            await dataProvider.clearAllPushMap(id, pushVersion);

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
