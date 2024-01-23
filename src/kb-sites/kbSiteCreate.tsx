
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    ArrayInput,
    SimpleFormIterator,
    ReferenceInput,
    SelectInput,
} from "react-admin";

const KbSiteCreate = (props: any) => {
    return (
        <Create {...props} undoable={false}>
            <SimpleForm>
                <ReferenceInput source="kbId" reference="kbs" >
                    <SelectInput optionText="title" optionValue="id" validate={required()} />
                </ReferenceInput>
                <TextInput
                    autoFocus
                    source="title"
                    validate={required('Required field')}
                />
                <TextInput source="desc" multiline fullWidth />
                <TextInput source="hostname" fullWidth />
                <ArrayInput source="startUrls" >
                    <SimpleFormIterator inline fullWidth>
                        <TextInput source={''} />
                    </SimpleFormIterator>
                </ArrayInput>
                <TextInput source="pattern" fullWidth />
                <ArrayInput source="removeSelectors">
                    <SimpleFormIterator inline fullWidth>
                        <TextInput source={''} />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
};

export default KbSiteCreate;
