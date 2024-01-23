
import {
    DateField,
    ReferenceField,
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


import DiskFiles from '../components/DiskFiles';


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


/**
 * tagsField
 * @returns 
 */
const TagsField = () => {
    const record = useRecordContext();

    return (
        <ChipField
            record={{ name: record }}
            source="name"
        />
    )
}



const DiskFileTab = () => {
    const record = useRecordContext();

    return (
        <DiskFiles subDir={ record.title } />
    )
}


const KbSiteShow = () => {
    const controllerProps = useShowController();

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="kb-site.summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        <TextField source="desc" />
                        <TextField source="pattern" />
                        <UrlField source="hostname" />
                        <ArrayField source="startUrls">
                            <SingleFieldList>
                                <TagsField />
                            </SingleFieldList>
                        </ArrayField> 
                        <ArrayField source="removeSelectors">
                            <SingleFieldList linkType={false}>
                                <TagsField />
                            </SingleFieldList>
                        </ArrayField>
                        <ReferenceField source="kbId" reference="kbs" >
                            <TextField source="title" />
                        </ReferenceField>
                        <DateField source="createdAt" cellClassName="createdAt" showTime />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="kb-site.releation.files">
                        <ReferenceManyField
                            reference="kb-files"
                            target="siteId"
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                            <Datagrid>
                                <TextField source="filePath" />
                                <TextField source="fileExt" />
                                <TextField source="sourceType" />
                                <TextField source="sourceUrl" />
                                <PreviewBtn />
                            </Datagrid>
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>


                    <TabbedShowLayout.Tab label="kb.releation.file-preview">
                        <DiskFileTab />
                    </TabbedShowLayout.Tab>


                </TabbedShowLayout>

            </ShowView>
        </ShowContextProvider>
    )
};

export default KbSiteShow;
