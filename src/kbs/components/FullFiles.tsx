
import {
    useRecordContext,
    Loading,
} from 'react-admin';

import { useQuery } from 'react-query';
import { dataProvider } from '../../dataProvider';

import DirTree from '../../components/DirTree';


export const FullFiles = () => {
    const record = useRecordContext();

    // fix: like useGetMany
    const { isLoading, data, error } = useQuery(['getDiskFiles', record.id], () => dataProvider.getDiskFiles(record.id, ''));

    if (isLoading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }


    return (<DirTree roots={data} title='files' />);
}

export default FullFiles;
