import {
    DateField,
    ReferenceField,
    ShowView,
    // SimpleShowLayout,
    TextField,
    ShowContextProvider,
    TabbedShowLayout,
    useShowController,
} from 'react-admin';
import { PushTypeField } from '../components/fields';


const PushMapShow = () => {
    const controllerProps = useShowController();

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="push-map.summary">
                        <TextField source="id" />
                        <ReferenceField source="configId" reference="push-configs" link="show" >
                            <TextField source="title" />
                        </ReferenceField>
                        <ReferenceField source="fileId" reference="kb-files" >
                            <TextField source="filePath" />
                        </ReferenceField>
                        <PushTypeField source="type" cellClassName="type" />
                        <TextField source="pushVersion" />
                        <TextField source="remoteId" />
                        <TextField source="pushChecksum" />
                        <ReferenceField source="kbId" reference="kbs" link="show" >
                            <TextField source="title" />
                        </ReferenceField>
                        <DateField source="createdAt" cellClassName="createdAt" showTime />
                    </TabbedShowLayout.Tab>

                    {/* <TabbedShowLayout.Tab label="kb-sites.releation.push-maps"> */}
                        {/* todo:  */}
                    {/* </TabbedShowLayout.Tab> */}


                </TabbedShowLayout>

            </ShowView>
        </ShowContextProvider>
    )
};

export default PushMapShow;
