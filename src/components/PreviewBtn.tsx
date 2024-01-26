import {useRecordContext,
} from 'react-admin';
import {
    Button,
} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';

import { genPreviewLink } from '../utils/genPreviewLink';

export const PreviewBtn = ({ label }: {label: string}) => {
    const record = useRecordContext();
    const endPoint = genPreviewLink(record.kbId, record.filePath);

    function btnClick(e: any) {
       
        window.open(endPoint, record.filePath);

        e?.stopPropagation();
    }

    return (
        <Button onClick={btnClick} startIcon={<PreviewIcon />}>
            {label}
        </Button>
    )
}

PreviewBtn.defaultProps = {
    label: 'preview'
}
