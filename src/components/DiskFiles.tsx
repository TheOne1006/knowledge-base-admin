
import {
    Loading,
} from 'react-admin';

import { useQuery } from 'react-query';
import { dataProvider } from '../dataProvider/dataProvider';

import { DirTree } from './DirTree/DirTree';

export const DiskFiles = ({ kbId, subDir }: { kbId: number, subDir?: string }) => {
    // fix: like useGetMany
    const { isLoading, data, error } = useQuery(['getDiskFiles', kbId], () => dataProvider.getDiskFiles(kbId, subDir));

    if (isLoading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }


    return (<DirTree roots={data} title='files' />);
}

export default DiskFiles;
