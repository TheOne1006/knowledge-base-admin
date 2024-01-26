import { useState } from 'react';
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
    useRecordContext,
    WrapperField,
    Pagination,
} from 'react-admin';
import {
    Button,
    Collapse,
    ButtonGroup,
} from '@mui/material';


import DiskFiles from '../components/DiskFiles';
import { PreviewBtn } from '../components/PreviewBtn';
import { SyncPageBtn } from '../components/SyncPageBtn';
import { Crawler } from '../components/Crawler/Crawler';
import { TagsField } from '../components/fields/TagsField';


const DiskFileTab = () => {
    const record = useRecordContext();

    return (
        <DiskFiles kbId={record.kbId} subDir={ record.title } />
    )
}


const KbSiteShow = () => {
    const [open, setOpen] = useState(true);
    const controllerProps = useShowController();

    const handleCollapseClick = () => {
        setOpen(!open);
    };

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="kb-site.summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        <TextField source="desc" />
                        <UrlField source="hostname" />
                        <ArrayField source="matchPatterns">
                            <SingleFieldList>
                                <TagsField />
                            </SingleFieldList>
                        </ArrayField> 
                        <ArrayField source="ignorePatterns">
                            <SingleFieldList>
                                <TagsField />
                            </SingleFieldList>
                        </ArrayField> 
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
                        <Button onClick={handleCollapseClick}>
                            CRAWLER
                        </Button>
                        <Collapse in={open}>
                            <Crawler />
                        </Collapse>
                        <ReferenceManyField
                            reference="kb-files"
                            target="siteId"
                            sort={{ field: 'id', order: 'DESC' }}
                            pagination={<Pagination />}
                        >
                            
                            {/* 使用 coll */}
                            <Datagrid>
                                <TextField source="filePath" />
                                <TextField source="fileExt" />
                                <TextField source="sourceType" />
                                <TextField source="sourceUrl" />
                                <WrapperField label="op">
                                    <ButtonGroup variant="text" aria-label="loading button group">
                                        <PreviewBtn />
                                        <SyncPageBtn />
                                    </ButtonGroup>
                                </WrapperField>
                        
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
