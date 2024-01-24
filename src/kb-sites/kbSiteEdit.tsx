import {
    Edit,
    SimpleForm,
    TextInput,
    useRecordContext,
    DateField,
    ArrayInput,
    SimpleFormIterator,
    ReferenceField,
    TextField,
    DateTimeInput,
} from "react-admin";

const KbSiteTitle = () => {
    const record = useRecordContext();
    return <span>Knowledge Base : {record?.title}</span>;
};

const KbSiteEdit = (props: any) => (
    <Edit undoable={false} title={<KbSiteTitle />} {...props}>
        <SimpleForm>
            <ReferenceField source="kbId" reference="kbs" link="edit" label="kbId" >
                <TextField source="title" label="kb.title" />
            </ReferenceField>
            <TextInput source="title" />
            <TextInput source="desc" />
            <TextInput source="hostname" fullWidth />
            <TextInput source="pattern" fullWidth />
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

export default KbSiteEdit;
