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
    ReferenceField,
    // ArrayInput,
} from "react-admin";


const listFilter = [
    <TextInput key="title" source="title" defaultValue="" />,
    <TextInput key="desc" source="desc" defaultValue="" />,
    <TextInput key="apiUrl" source="apiUrl" defaultValue="" />,
    <TextInput key="type" source="type" defaultValue="" />,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const PushConfigList = (props: any) => (
    <List {...props} filters={listFilter} actions={<ListActions />}>
        <DatagridConfigurable rowClick="show">
            <TextField source="id" />
            <TextField source="title" cellClassName="title" />
            <TextField source="desc" cellClassName="desc" />
            <UrlField source="apiUrl" cellClassName="apiUrl" />
            <TextField source="apiKey" cellClassName="apiKey" />
            <TextField source="type" cellClassName="type" />
            <ReferenceField source="kbId" reference="kbs">
                <TextField source="title" />
            </ReferenceField>
            <DateField source="createdAt" cellClassName="createdAt" showTime />
            <DateField source="updatedAt" cellClassName="updatedAt" showTime />
            <EditButton />
            <DeleteButton />
        </DatagridConfigurable>
    </List>
);
export default PushConfigList;
