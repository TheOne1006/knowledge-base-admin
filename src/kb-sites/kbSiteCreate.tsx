
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
                    <SelectInput optionText="title" 
                     fullWidth optionValue="id" validate={required()} />
                </ReferenceInput>
                <TextInput
                    autoFocus
                    source="title"
                    fullWidth
                    validate={required()}
                />
                <TextInput source="desc" multiline fullWidth />
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
                    <SimpleFormIterator  fullWidth>
                        <TextInput source="" fullWidth />
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="removeSelectors" variant="outlined" >
                    <SimpleFormIterator  fullWidth>
                        <TextInput source="" variant="outlined" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
};

export default KbSiteCreate;
