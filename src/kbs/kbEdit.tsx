import {
    Edit,
    SimpleForm,
    TextInput,
    DateTimeInput,
} from "react-admin";

const KbEdit = (props: any) => (
    <Edit undoable={false} title={"Kb"} {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="desc" />
            <DateTimeInput disabled source="createdAt" />
            <DateTimeInput disabled source="updatedAt" />
        </SimpleForm>
    </Edit>
);

export default KbEdit;
