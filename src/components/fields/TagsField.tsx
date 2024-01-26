import {
    ChipField,
    useRecordContext,
} from 'react-admin';

/**
 * tagsField
 * @returns 
 */
export const TagsField = () => {
    const record = useRecordContext();

    return (
        <ChipField
            record={{ name: record }}
            source="name"
        />
    )
}
