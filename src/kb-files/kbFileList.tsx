import {
    List,
    DatagridConfigurable,
    TextField,
    DateField,
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
    FilterLiveSearch,
    FilterList,
    FilterListItem,
} from "react-admin";

import { Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';

const listFilter = [
    <TextInput key="filePath" source="filePath" defaultValue="" />,
    <ReferenceInput key="kbId" source="kbId" reference="kbs" >
        <SelectInput optionText="title" optionValue="id" />
    </ReferenceInput>,
    <TextInput key="fileExt" source="fileExt" defaultValue="" />,
    // <TextInput key="kbId" source="kbId" defaultValue="" />,
    <TextInput key="sourceType" source="sourceType" defaultValue="" />,
    <TextInput key="sourceUrl" source="sourceUrl" defaultValue="" />,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
    </TopToolbar>
);

const KBFileFilterSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
        <CardContent>
            <FilterLiveSearch />
            <FilterList label="Subscribed to newsletter" icon={<MailIcon />}>
                <FilterListItem label="Yes" value={{ has_newsletter: true }} />
                <FilterListItem label="No" value={{ has_newsletter: false }} />
            </FilterList>
            <FilterList label="sourceType" icon={<CategoryIcon />}>
                <FilterListItem label="CRAWLER" value={{ sourceType: 'CRAWLER' }} />
                <FilterListItem label="UPLOADED" value={{ sourceType: 'UPLOADED' }} />
            </FilterList>
        </CardContent>
    </Card>
);

const KbFileList = (props: any) => (
    <List {...props} filters={listFilter} actions={<ListActions />} aside={<KBFileFilterSidebar />}>
        <DatagridConfigurable rowClick="show">
            <TextField source="id" />
            <TextField source="filePath" cellClassName="filePath" />
            <TextField source="fileExt" cellClassName="fileExt" />
            <TextField source="sourceType" cellClassName="sourceType" />
            <TextField source="sourceUrl" cellClassName="sourceUrl" />
            <ReferenceField source="kbId" reference="kbs" link="show" >
                <TextField source="title" />
            </ReferenceField>
            <ReferenceField source="siteId" reference="kb-sites" link="show" >
                <TextField source="title" />
            </ReferenceField>
            <DateField source="createdAt" cellClassName="createdAt" showTime />
            <ShowButton label='show' />
            <DeleteButton />
        </DatagridConfigurable>
    </List>
);
export default KbFileList;
