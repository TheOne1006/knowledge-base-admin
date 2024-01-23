import {
    Edit,
    SimpleForm,
    TextInput,
    DateTimeInput,
    useRecordContext,
} from "react-admin";

const KbTitle = () => {
    const record = useRecordContext();
    return <span>Knowledge Base : {record?.title}</span>;
};

const KbEdit = (props: any) => (
    <Edit undoable={false} title={<KbTitle />} {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="desc" />
            <DateTimeInput disabled source="createdAt" />
            <DateTimeInput disabled source="updatedAt" />
        </SimpleForm>
    </Edit>
);

export default KbEdit;
