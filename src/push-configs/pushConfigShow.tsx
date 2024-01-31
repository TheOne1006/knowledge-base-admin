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
    ReferenceOneField,
    WrapperField,
    Pagination,
    DatagridConfigurable,
    useRecordContext,
} from 'react-admin';
import {
    Button,
    Collapse,
    ButtonGroup,
} from '@mui/material';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';

import { PushTypeField, JSONEditField } from '../components/fields';
import { PreviewBtn } from '../components/PreviewBtn';
import { PushForm, SigleClearBtn, SiglePushBtn } from '../components/Push';


const OpButtons = ({ configId }: { configId: number | string }) => {
    const record = useRecordContext();
    return (
        <ButtonGroup disableElevation size="small" variant="outlined" aria-label="outlined button group">
            <SiglePushBtn configId={configId}  fileId={record.id} />
            <PreviewBtn label='Preview' />
            <SigleClearBtn configId={configId} fileId={record.id} />
        </ButtonGroup>
    )
}

const PushConfigShow = () => {
    const [open, setOpen] = useState(true);
    
    const controllerProps = useShowController();

    const handleCollapseClick = () => {
        setOpen(!open);
    };
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="push-config.summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        <TextField source="desc" />
                        <UrlField source="apiUrl" />
                        <TextField source="apiKey" />
                        <ReferenceField source="kbId" reference="kbs" >
                            <TextField source="title" />
                        </ReferenceField>
                        <JSONEditField source="additional" />
                        <DateField source="createdAt" cellClassName="createdAt" showTime />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="push-configs.releation.push-maps">
                        <Button onClick={handleCollapseClick}>
                            Sync
                        </Button>
                        <Collapse in={open}>
                            <PushForm />
                        </Collapse>
                        <ReferenceManyField
                            debounce={1000}
                            reference="push-maps"
                            target="configId"
                            source="id"
                            sort={{ field: 'id', order: 'DESC' }}
                            pagination={<Pagination />}
                        >
                                <Datagrid rowClick="show" >
                                    <ReferenceField 
                                    source="configId" reference="push-configs" link="show" >
                                        <TextField source="title" />
                                    </ReferenceField>
                                    <PushTypeField source="type" />

                                    <TextField source="pushVersion" />
                                    <TextField source="remoteId" />

                                    <ReferenceField
                                    source="fileId" 
                                    reference="kb-files" link="show" >
                                        <TextField source="filePath" />
                                    </ReferenceField>

                                    <WrapperField label="preview">
                                    <ReferenceField source="fileId" reference="kb-files" link="show" >
                                            <PreviewBtn />
                                    </ReferenceField>
                                    </WrapperField>

                                </Datagrid>
                        
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="releation.push-logs">
                        <ReferenceManyField
                            debounce={1000}
                            reference="push-logs"
                            target="configId"
                            source="id"
                            sort={{ field: 'id', order: 'DESC' }}
                            pagination={<Pagination />}
                        >
                            <Datagrid rowClick="show" >
                                <TextField source="configId" />
                                <PushTypeField source="type" />

                                <TextField source="pushVersion" />
                                <DateField source="createdAt" cellClassName="createdAt" showTime />
                            </Datagrid>

                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="releation.kb-files">
                        <ReferenceManyField
                            debounce={1000}
                            reference="kb-files"
                            target="kbId"
                            source="kbId"
                            label=""
                            sort={{ field: 'id', order: 'DESC' }}
                            pagination={<Pagination />}
                        >
                            <DatagridConfigurable rowClick="show" >
                                <TextField source="id" />
                                <TextField source="filePath" />
                                <TextField source="sourceType" />
                                    {
                                        controllerProps?.record?.id ? (
                                            <ReferenceOneField
                                                label="map.pushVersion"
                                                source="id"
                                                reference="push-maps"
                                                target="fileId"
                                                filter={{
                                                    configId: controllerProps.record.id,
                                                }}
                                            >
                                                <TextField source="pushVersion" />    
                                            </ReferenceOneField>
                                        ): null
                                    }

                                {
                                    controllerProps?.record?.id ? (
                                        <ReferenceOneField
                                            label="map.cheksum"
                                            source="checksum"
                                            reference="push-maps"
                                            target="pushChecksum"
                                            filter={{
                                                configId: controllerProps.record.id,
                                            }}
                                        >
                                            <WrapperField>
                                                {/* <TextField source="pushChecksum" /> */}
                                                <DoneOutlineRoundedIcon color="success" />
                                            </WrapperField>

                                        </ReferenceOneField>
                                    ) : null
                                }


                                <DateField source="createdAt" cellClassName="createdAt" showTime />
                                 <WrapperField label="op">
                                    {
                                        controllerProps?.record?.id ? (
                                            <OpButtons configId={controllerProps.record.id} />
                                        ) : null
                                    }
                                </WrapperField>
                            </DatagridConfigurable>

                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </ShowView>
        </ShowContextProvider>
    )
};

export default PushConfigShow;
