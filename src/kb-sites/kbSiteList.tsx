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
    // ArrayInput,
} from "react-admin";


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
            <TextField source="pattern" cellClassName="pattern" />
            <DateField source="createdAt" cellClassName="createdAt" showTime />
            <DateField source="updatedAt" cellClassName="updatedAt" showTime />
            <EditButton />
            <DeleteButton />
        </DatagridConfigurable>
    </List>
);
export default KbSiteList;
