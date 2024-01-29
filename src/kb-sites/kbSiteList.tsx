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
    SelectField,
    // ArrayInput,
    // ArrayField,
    // SingleFieldList,
} from "react-admin";
import { CRAWLER_ENGINE_TYPE_CHOICES } from '../constants';


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
            <SelectField source="engineType" choices={CRAWLER_ENGINE_TYPE_CHOICES} />
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
