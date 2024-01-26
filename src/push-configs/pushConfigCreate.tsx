
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    ReferenceInput,
    SelectInput,
} from "react-admin";

import { PUSH_TYPE_CHOICES } from '../constants'

const PushConfigCreate = (props: any) => {
    return (
        <Create {...props} undoable={false}>
            <SimpleForm>
                <ReferenceInput source="kbId" reference="kbs" >
                    <SelectInput optionText="title" optionValue="id" validate={required()} />
                </ReferenceInput>
                <SelectInput source="type" validate={required()} choices={PUSH_TYPE_CHOICES} />
                <TextInput
                    autoFocus
                    source="title"
                    validate={required('Required field')}
                    variant="outlined"
                    fullWidth
                />
                <TextInput variant="outlined" source="desc" multiline fullWidth />
                <TextInput variant="outlined" source="apiUrl" validate={required()} fullWidth />
                <TextInput variant="outlined" source="apiKey" validate={required()} fullWidth />

            </SimpleForm>
        </Create>
    )
};

export default PushConfigCreate;
