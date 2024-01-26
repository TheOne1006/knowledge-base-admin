import {
    Edit,
    SimpleForm,
    TextInput,
    useRecordContext,
    ArrayInput,
    SimpleFormIterator,
    DateTimeInput,
    ReferenceInput,
} from "react-admin";

const PushConfigTitle = () => {
    const record = useRecordContext();
    return <span>Knowledge Base : {record?.title}</span>;
};

const PushConfigEdit = (props: any) => (
    <Edit undoable={false} title={<PushConfigTitle />} {...props}>
        <SimpleForm>
            <ReferenceInput disabled source="kbId" reference="kbs" link="edit" label="kbId" >
                <TextInput disabled source="title" label="kb.title" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput source="desc" />
            <TextInput source="hostname" fullWidth />
            <ArrayInput source="startUrls" >
                <SimpleFormIterator inline fullWidth>
                    <TextInput source={''} />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="removeSelectors">
                <SimpleFormIterator inline fullWidth>
                    <TextInput source={''} />
                </SimpleFormIterator>
            </ArrayInput>
            <DateTimeInput disabled source="createdAt" />
            <DateTimeInput disabled source="updatedAt" />
        </SimpleForm>
    </Edit>
);

export default PushConfigEdit;
