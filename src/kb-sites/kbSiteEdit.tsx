
import {
    Create,
    SimpleForm,
    TextField,
    UrlField,
    ArrayInput,
    SimpleFormIterator,
    ChipField,
} from "react-admin";

const KbSiteEdit = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextField
                source="title"
            />
            <TextField source="desc" />
            <UrlField source="hostname" />
            <ArrayInput source="startUrls">
                <SimpleFormIterator inline>
                    <ChipField source="url" helperText={false} />
                </SimpleFormIterator>
            </ArrayInput>
            <TextField source="pattern" />
            <TextField source="removeSelectors" />
        </SimpleForm>
    </Create>
);

export default KbSiteEdit;
