
import {
    Create,
    SimpleForm,
    TextInput,
} from "react-admin";

const KbCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="desc" />
        </SimpleForm>
    </Create>
);

export default KbCreate;
