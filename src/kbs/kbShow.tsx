
import {
    DateField,
    // ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin';

const KbShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="desc" />
            <DateField source="createdAt" cellClassName="createdAt" showTime />
        </SimpleShowLayout>
    </Show>
);

export default KbShow;
