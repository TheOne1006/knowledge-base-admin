
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
} from 'react-admin';



const KbFileShow = () => {
    const controllerProps = useShowController();

    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="kb-site.summary">
                        <TextField source="id" />
                        <TextField source="filePath" />
                        <TextField source="fileExt" />
                        <TextField source="sourceType" />
                        <UrlField source="sourceUrl" />
                        <TextField source="checksum" />
                        <ReferenceField source="kbId" reference="kbs" link="show" >
                            <TextField source="title" />
                        </ReferenceField>
                        <ReferenceField source="siteId" reference="kb-sites" link="show" >
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

export default KbFileShow;
