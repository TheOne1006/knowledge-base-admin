
import {
    DateField,
    ReferenceField,
    ShowView,
    // SimpleShowLayout,
    TextField,
    ShowContextProvider,
    TabbedShowLayout,
    useShowController,
    ReferenceManyField,
    DatagridConfigurable,
    WrapperField,
    Pagination,
    // ReferenceOneField,
} from 'react-admin';

import { PreviewBtn } from '../components/PreviewBtn';
import { PushTypeField } from '../components/fields';


const PushLogShow = () => {
    const controllerProps = useShowController();

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="push-logs.summary">
                        <TextField source="id" />
                        <PushTypeField source="type" />
                        <TextField source="pushVersion" />
                        <ReferenceField source="kbId" reference="kbs" link="show" >
                            <TextField source="title" />
                        </ReferenceField>

                        <ReferenceField source="configId" reference="push-configs" link="show" >
                            <TextField source="title" />
                        </ReferenceField>
                        <DateField source="createdAt" cellClassName="createdAt" showTime />
                    </TabbedShowLayout.Tab>


                    <TabbedShowLayout.Tab label="push-logs.releation.push-maps">
                        <ReferenceManyField
                            debounce={1000}
                            reference="push-maps"
                            target="pushVersion"
                            source="pushVersion"
                            sort={{ field: 'id', order: 'DESC' }}
                            filter={{ 
                                // pushVersion: controllerProps.record.pushVersion, 
                                configId: controllerProps.record.configId ,
                                kbId: controllerProps.record.kbId,
                            }}
                            pagination={<Pagination />}
                        >
                            <DatagridConfigurable rowClick="show" >
                                <ReferenceField source="configId" reference="push-configs" link="show" >
                                    <TextField source="title" />
                                </ReferenceField>
                                {/* <TextField source="fileId" /> */}
                                <PushTypeField source="type" />

                                <TextField source="pushVersion" />
                                <TextField source="remoteId" />

                                <ReferenceField 
                                    source="fileId" reference="kb-files" link="show" >
                                    <TextField source="filePath" />
                                </ReferenceField>

                                <WrapperField label="preview">
                                    <ReferenceField source="fileId" reference="kb-files" link="show" >
                                        <PreviewBtn />
                                    </ReferenceField>
                                </WrapperField>
                                
                            </DatagridConfigurable>
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>

                </TabbedShowLayout>

            </ShowView>
        </ShowContextProvider>
    )
};

export default PushLogShow;
