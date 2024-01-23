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
} from "react-admin";


const listFilter = [
    <TextInput key="title" source="title" defaultValue="" />,
    <TextInput key="desc" source="desc" defaultValue="" />,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const KbList = (props: any) => (
    <List {...props} filters={listFilter} actions={<ListActions />}>
        <DatagridConfigurable rowClick="show">
            <TextField source="id" />
            <TextField source="title" cellClassName="title" />
            <TextField source="desc" cellClassName="desc" />
            <DateField source="createdAt" cellClassName="createdAt"  showTime />
            <DateField source="updatedAt" cellClassName="updatedAt" showTime />
            <EditButton />
            <DeleteButton />
        </DatagridConfigurable>
    </List>
);
export default KbList;
