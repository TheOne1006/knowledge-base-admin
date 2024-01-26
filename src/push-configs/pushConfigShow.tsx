
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
    DatagridConfigurable,
    ReferenceOneField,
    WrapperField,
} from 'react-admin';

import { PushTypeField } from '../components/fields';
import { PreviewBtn } from '../components/PreviewBtn';

const PushConfigShow = () => {
    const controllerProps = useShowController();
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="push-config.summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        <TextField source="desc" />
                        <TextField source="apiUrl" />
                        <UrlField source="apiKey" />
                        <ReferenceField source="kbId" reference="kbs" >
                            <TextField source="title" />
                        </ReferenceField>
                        <DateField source="createdAt" cellClassName="createdAt" showTime />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="push-configs.releation.push-maps">
                        <ReferenceManyField
                            debounce={1000}
                            reference="push-maps"
                            target="configId"
                            source="id"
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                                <DatagridConfigurable rowClick="show" >
                                    <ReferenceOneField target='id' source="configId" reference="push-configs" link="show" >
                                        <TextField source="title" />
                                    </ReferenceOneField>
                                    <PushTypeField source="type" />

                                    <TextField source="pushVersion" />
                                    <TextField source="remoteId" />

                                    <ReferenceOneField
                                    source="fileId" target='id' reference="kb-files" link="show" >
                                        <TextField source="filePath" />
                                    </ReferenceOneField>

                                    <WrapperField label="preview">
                                    <ReferenceOneField target='id' source="fileId" reference="kb-files" link="show" >
                                            <PreviewBtn />
                                        </ReferenceOneField>
                                    </WrapperField>

                                </DatagridConfigurable>
                        
                        </ReferenceManyField>
                    </TabbedShowLayout.Tab>

                </TabbedShowLayout>

             

                {/* logs */}
            </ShowView>
        </ShowContextProvider>
    )
};

export default PushConfigShow;
