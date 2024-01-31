import {
    Edit,
    SimpleForm,
    TextInput,
    useRecordContext,
    // DateField,
    ArrayInput,
    SimpleFormIterator,
    ReferenceField,
    TextField,
    DateTimeInput,
    SelectInput,
} from "react-admin";

import { TypescriptEditInput } from '../components/inputs';
import { CRAWLER_ENGINE_TYPE_CHOICES, FILE_EXT_CHOICES  } from '../constants';

const KbSiteTitle = () => {
    const record = useRecordContext();
    return <span> Site : {record?.title}</span>;
};

const KbSiteEdit = (props: any) => (
    <Edit title={<KbSiteTitle />} {...props} undoable={false}>
        <SimpleForm>
            <ReferenceField source="kbId" reference="kbs" link="edit" label="kbId" >
                <TextField source="title" label="kb.title" />
            </ReferenceField>
            <TextInput source="title" />
            <TextInput source="desc" />
            <TextInput source="hostname" fullWidth />
            <ArrayInput source="startUrls" variant="outlined" >
                <SimpleFormIterator fullWidth>
                    <TextInput source="" fullWidth variant="outlined" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="matchPatterns">
                <SimpleFormIterator fullWidth>
                    <TextInput source="" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="ignorePatterns">
                <SimpleFormIterator fullWidth>
                    <TextInput source="" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="removeSelectors" variant="outlined" >
                <SimpleFormIterator fullWidth>
                    <TextInput source="" variant="outlined" />
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput source='engineType' choices={CRAWLER_ENGINE_TYPE_CHOICES} />
            <SelectInput source='fileSuffix' choices={FILE_EXT_CHOICES} />
            <TypescriptEditInput source="evaluate" />
            <DateTimeInput disabled source="createdAt" />
            <DateTimeInput disabled source="updatedAt" />
        </SimpleForm>
    </Edit>
);

export default KbSiteEdit;
