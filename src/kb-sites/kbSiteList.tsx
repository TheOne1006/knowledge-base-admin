import {
    List,
    DatagridConfigurable,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    TopToolbar,
    SelectColumnsButton,
    FilterButton,
    CreateButton,
    TextInput,
    UrlField,
    WrapperField,
    // ArrayInput,
    ArrayField,
    SingleFieldList,
} from "react-admin";

import { TagsField } from '../components/fields/TagsField';


const listFilter = [
    <TextInput key="title" source="title" defaultValue="" />,
    <TextInput key="desc" source="desc" defaultValue="" />,
    <TextInput key="hostname" source="hostname" defaultValue="" />,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const KbSiteList = (props: any) => (
    <List {...props} filters={listFilter} actions={<ListActions />}>
        <DatagridConfigurable rowClick="show">
            <TextField source="id" />
            <TextField source="title" cellClassName="title" />
            <TextField source="desc" cellClassName="desc" />
            <UrlField source="hostname" cellClassName="hostname" />
            <ArrayField source="matchPatterns">
                    <SingleFieldList>
                        <TagsField />
                    </SingleFieldList>
                </ArrayField> 
                <ArrayField source="ignorePatterns">
                    <SingleFieldList>
                        <TagsField />
                    </SingleFieldList>
                </ArrayField> 
            <DateField source="createdAt" cellClassName="createdAt" showTime />
            <DateField source="updatedAt" cellClassName="updatedAt" showTime />
            <WrapperField label="Edit">
                <EditButton />
            </WrapperField>
            <WrapperField label="Delete">
                <DeleteButton />
            </WrapperField>
        </DatagridConfigurable>
    </List>
);
export default KbSiteList;
