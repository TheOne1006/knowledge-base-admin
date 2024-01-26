import {
    DateField,
    // ReferenceField,
    ShowView,
    // SimpleShowLayout,
    TextField,
    UrlField,
    ShowContextProvider,
    TabbedShowLayout,
    useShowController,
    ReferenceManyField,
    Datagrid,
    ArrayField,
    SingleFieldList,
    ChipField,
    useRecordContext,
} from 'react-admin';
import {
    Collapse,
} from '@mui/material';
import DiskFiles from '../components/DiskFiles';

import { PreviewBtn } from '../components/PreviewBtn';
import { UploadArea } from '../components/UploadArea/UploadArea';


const TagsField = () => {
    const record = useRecordContext();

    return (
        <ChipField
            record={{ name: record }}
            source="name"
        />
    )
}


const KbShow = () => {
    const controllerProps = useShowController();

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="kb.summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        <TextField source="desc" />
                        <DateField source="createdAt" cellClassName="createdAt" showTime />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="kb.releation.files">

                        <Collapse in>
                            <UploadArea />
                        </Collapse>
                        <ReferenceManyField
                            reference="kb-files"
                            target="kbId"
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                            <Datagrid>
                                <TextField source="id" />
                                <TextField source="filePath" />
                                <TextField source="fileExt" />
                                <TextField source="sourceType" />
                                <TextField source="sourceUrl" />
                                {/* <TextField source="summary" /> */}
                                <PreviewBtn />
                            </Datagrid>
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>


                    <TabbedShowLayout.Tab label="kb.releation.file-preview">
                        <DiskFiles kbId={controllerProps?.record?.id} />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="kb.releation.sites">
                        <ReferenceManyField
                            reference="kb-sites"
                            target="kbId"
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                            <Datagrid rowClick='show'>
                                <TextField source="id" />
                                <TextField source="title" />
                                <TextField source="desc" />
                                <UrlField source="hostname" />
                                <ArrayField source="startUrls">
                                    <SingleFieldList linkType={false}>
                                        <TagsField />
                                    </SingleFieldList>
                                </ArrayField>
                            </Datagrid>
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>
                    
                </TabbedShowLayout>

            </ShowView>
        </ShowContextProvider>
    )
};

export default KbShow;
