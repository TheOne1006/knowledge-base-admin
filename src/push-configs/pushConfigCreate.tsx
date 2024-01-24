
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    ReferenceInput,
    SelectInput,
} from "react-admin";

const PushConfigCreate = (props: any) => {
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
                <TextInput source="apiUrl" validate={required()} fullWidth />
                <TextInput source="apiKey" validate={required()} fullWidth />
                <SelectInput source="type" validate={required()} fullWidth choices={[
                    { id: 'dify', name: 'Dify' },
                ]} />
            </SimpleForm>
        </Create>
    )
};

export default PushConfigCreate;
