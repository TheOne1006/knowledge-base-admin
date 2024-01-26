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
    WrapperField,
    useRecordContext,
    // ArrayInput,
} from "react-admin";

import {
    ButtonGroup,
} from '@mui/material';
import { PreviewBtn } from '../components/PreviewBtn';
import { SyncPageBtn } from '../components/SyncPageBtn';

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

const OpButtons = () => {
    const record = useRecordContext();

    return (
        <ButtonGroup disableElevation size="small" variant="outlined" aria-label="outlined button group">
            <ShowButton label='show' />
            <DeleteButton label='Del' />
            <PreviewBtn label='Preview' />
            {record?.sourceUrl && <SyncPageBtn />}
        </ButtonGroup>
    )
}

const KbFileList = (props: any) => (
    <List {...props} filters={listFilter} actions={<ListActions />}>
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
            <WrapperField label="op">
                <OpButtons />
            </WrapperField>
     
        </DatagridConfigurable>
    </List>
);
export default KbFileList;
