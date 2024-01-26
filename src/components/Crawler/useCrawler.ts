import { useState } from 'react';
import pick from "lodash/pick";
import {
    useRecordContext,
    useRefresh
} from 'react-admin';
import { dataProvider } from '../../dataProvider/dataProvider';
import { CrawlerItem } from '../../dataProvider/interface';



export const useCrawler = () => {
    const record = useRecordContext();
    const refresh = useRefresh();
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState<CrawlerItem>();

    function startCrawler(data: any) {
        const crawlerData = pick(data, ['type', 'linkSelector', 'concurrency', 'maxConnections']);
        const crawler = dataProvider.startCrawler(record.kbId, record.id, crawlerData);

        setOpen(true);
        crawler.subscribe({
            next: (data) => {
                setPlan(data);
            },
            error: (error) => {
                console.log('error', error);
            },
            complete: () => {
                setOpen(false);
                // console.log('complete');
                refresh();
            }
        });
    }

    function handleConfirm() {
        console.log('confirm');
        setOpen(false);
        refresh();
    }

    function handleDialogClose() {
        console.log('close');
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
