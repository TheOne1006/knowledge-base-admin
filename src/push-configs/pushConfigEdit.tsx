import {
    Edit,
    SimpleForm,
    TextInput,
    useRecordContext,
    // ArrayInput,
    // SimpleFormIterator,
    DateTimeInput,
    // ReferenceInput,
    SelectInput,
    required,
} from "react-admin";

import { JSONEditInput } from '../components/inputs';
import { PUSH_TYPE_CHOICES } from '../constants';

const PushConfigTitle = () => {
    const record = useRecordContext();
    return <span>Push Config : {record?.title}</span>;
};

const PushConfigEdit = (props: any) => (
    <Edit undoable={false} title={<PushConfigTitle />} {...props}>
        <SimpleForm>
            <SelectInput source="type" validate={required()} choices={PUSH_TYPE_CHOICES} />
            <TextInput
                autoFocus
                source="title"
                validate={required()}
                variant="outlined"
                fullWidth
            />
            <TextInput variant="outlined" source="desc" multiline fullWidth />
            <TextInput variant="outlined" source="apiUrl" validate={required()} fullWidth />
            <TextInput variant="outlined" source="apiKey" validate={required()} fullWidth />
            <JSONEditInput source="additional" fullWidth />
            <DateTimeInput disabled source="createdAt" />
            <DateTimeInput disabled source="updatedAt" />
        </SimpleForm>
    </Edit>
);

export default PushConfigEdit;
