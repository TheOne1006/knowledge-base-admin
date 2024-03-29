import {
    List,
    DatagridConfigurable,
    TextField,
    ShowButton,
    DeleteButton,
    TopToolbar,
    SelectColumnsButton,
    FilterButton,
    TextInput,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    // ArrayInput,
    WrapperField,
    // ReferenceOneField,
} from "react-admin";

import { PushTypeField } from '../components/fields';
import { PUSH_TYPE_CHOICES  } from '../constants';


const listFilter = [
    <ReferenceInput key="kbId" source="kbId" reference="kbs" >
        <SelectInput optionText="title" optionValue="id" />
    </ReferenceInput>,
    <ReferenceInput key="configId" source="configId" reference="push-configs" >
        <SelectInput optionText="title" optionValue="id" />
    </ReferenceInput>,
    <SelectInput  key="type" source="type" choices={PUSH_TYPE_CHOICES} />,
    <TextInput key="pushVersion" source="pushVersion" defaultValue="" />,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
    </TopToolbar>
);


const PushMapList = (props: any) => (
    <List 
        {...props} 
        filters={listFilter} 
        actions={<ListActions />}
        sort={{ field: 'id', order: 'DESC' }}
        >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" />
            <TextField source="remoteId" cellClassName="remoteId" />

            <ReferenceField source="fileId" reference="kb-files" >
                <TextField source="filePath" />
            </ReferenceField>

            <PushTypeField source="type" cellClassName="type" />
            <TextField source="pushVersion" cellClassName="pushVersion" />
            <ReferenceField source="kbId" reference="kbs" link="show" >
                <TextField source="title" />
            </ReferenceField>
            <ReferenceField source="configId" reference="push-configs" link="show" >
                <TextField source="title" />
            </ReferenceField>
            <WrapperField label="show">
                <ShowButton />
            </WrapperField>
            <WrapperField label="delete">
                <DeleteButton />
            </WrapperField>
        </DatagridConfigurable>
    </List>
);
export default PushMapList;
