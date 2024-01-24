
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

                </TabbedShowLayout>

                {/* maps */}

                {/* logs */}
            </ShowView>
        </ShowContextProvider>
    )
};

export default PushConfigShow;
