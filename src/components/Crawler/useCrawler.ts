import { useState } from 'react';
import pick from "lodash/pick";
import {
    useRecordContext,
    useRefresh
} from 'react-admin';
import { dataProvider } from '../../dataProvider/dataProvider';
import { CrawlerItem } from '../../interfaces';

let globalCtrl: AbortController | null = null;

export const useCrawler = () => {
    const record = useRecordContext();
    const refresh = useRefresh();
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState<CrawlerItem>();


    async function startCrawler(data: any) {
        if (globalCtrl) {
            globalCtrl.abort();
        }
        const ctrl = new AbortController();
        globalCtrl = ctrl;

        const crawlerData = pick(data, ['type', 'linkSelector', 'concurrency', 'maxConnections']);
        const crawler = await dataProvider.startCrawler(record.kbId, record.id, crawlerData, ctrl);

        setOpen(true);
        crawler.subscribe({
            next: (data) => {
                setPlan(data);
            },
            error: (error) => {
                console.log('error', error);
            },
            complete: () => {
                ctrl.abort();
                setOpen(false);
                // console.log('complete');
                refresh();
            }
        });


    }

    function handleConfirm() {
        console.log('confirm');
        if (globalCtrl) {
            globalCtrl.abort();
        }
        setOpen(false);
        refresh();
    }

    function handleDialogClose() {
        console.log('close');
        if (globalCtrl) {
            globalCtrl.abort();
        }
        setOpen(false);
        refresh();
    }

    return {
        open,
        startCrawler,
        plan,
        handleConfirm,
        handleDialogClose,
    }

}
