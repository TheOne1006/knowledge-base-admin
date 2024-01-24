
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



const PushMapShow = () => {
    const controllerProps = useShowController();

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="push-map.summary">
                        <TextField source="id" />
                        <TextField source="configId" />
                        <TextField source="fileId" />
                        <TextField source="type" />
                        <TextField source="pushVersion" />
                        <TextField source="remoteId" />
                        <ReferenceField source="kbId" reference="kbs" link="show" >
                            <TextField source="title" />
                            <TextField source="desc" />
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
