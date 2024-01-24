import {useRecordContext,
} from 'react-admin';
import {
    Button,
} from '@mui/material';

import { genPreviewLink } from '../utils/genPreviewLink';

const PreviewBtn = () => {
    const record = useRecordContext();
    const endPoint = genPreviewLink(record.kbId, record.filePath);

    function btnClick(e: any) {
       
        window.open(endPoint, record.filePath);

        e?.stopPropagation();
    }

    return (
        <Button onClick={btnClick}>
            preview
        </Button>
    )
}

export default PreviewBtn;
