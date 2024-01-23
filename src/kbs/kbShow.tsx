
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
    Button,
} from '@mui/material';

import { genPreviewLink } from '../utils/genPreviewLink';


import FullFiles from './components/FullFiles';


const PreviewBtn = () => {
    const record = useRecordContext();
    const endPoint = genPreviewLink(record.kbId, record.filePath);

    function btnClick() {
        window.open(endPoint, record.filePath);
    }

    return (
        <Button onClick={btnClick}>
            preview
        </Button>
    )
}



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
                        <ReferenceManyField
                            reference="kb-files"
                            target="kbId"
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                            <Datagrid>
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
                        <FullFiles />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="kb.releation.sites">
                        <ReferenceManyField
                            reference="kb-sites"
                            target="kbId"
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                            <Datagrid rowClick='edit'>
                                <TextField source="title" />
                                <TextField source="desc" />
                                <UrlField source="hostname" />
                                <ArrayField source="startUrls">
                                    <SingleFieldList linkType={false}>
                                        <TagsField />
                                    </SingleFieldList>
                                </ArrayField>
                                {/* <TextField source="pattern" />
                                <TextField source="removeSelectors" /> */}
                            </Datagrid>
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>
                    
                </TabbedShowLayout>

            </ShowView>
        </ShowContextProvider>
    )
};

export default KbShow;
