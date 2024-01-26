import { useState } from 'react';
import {
    useRecordContext,
    useRefresh,
} from 'react-admin';
import { genPreviewLink } from '../../utils/genPreviewLink';
import { dataProvider } from '../../dataProvider';
import { FileStatDto } from '../../interfaces';

export function useDirTree() {

    const record = useRecordContext();
    const refresh = useRefresh();

    const [openChildren, setOpenChildren] = useState<string[]>([]);

    const kbId = record?.kbId || record.id;

    function previewBtnClick(file: FileStatDto) {
        const endPoint = genPreviewLink(kbId, file.path)
        window.open(endPoint, file.path);
    }

    async function delBtnClick(file: FileStatDto) {
        await dataProvider.kbRemoveDiskFiles(kbId, file.path);

        refresh()
    }

    const toggleNode = (node: FileStatDto) =>
        setOpenChildren(state => {
            if (state.includes(node.path)) {
                return [
                    ...state.splice(0, state.indexOf(node.path)),
                    ...state.splice(state.indexOf(node.path) + 1, state.length),
                ];
            } else {
                return [...state, node.path];
            }
        });

    return {
        previewBtnClick,
        delBtnClick,
        openChildren,
        toggleNode,
    }

}
