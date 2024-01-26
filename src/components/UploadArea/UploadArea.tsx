import {
    SimpleForm,
    FileField,
    FileInput,
    Toolbar,
    SaveButton
} from 'react-admin';
import UploadIcon from '@mui/icons-material/Upload';
import { useUpload } from './useUpload';

const UploadToolbar = () => (
    <Toolbar>
        <SaveButton label="start.upload" icon={<UploadIcon />} />
    </Toolbar>
);

export const UploadArea = () => {
    const { startUpload } = useUpload();

    return (
        <SimpleForm 
            toolbar={<UploadToolbar />}
            onSubmit={startUpload}>
            <FileInput
                source="files"
                label="UploadArea"
                multiple
                // pdf html json excel csv txt
                accept="application/pdf, text/html, application/json, application/vnd.ms-excel, text/csv, text/plain, text/markdown"
            >
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>

    );
};
