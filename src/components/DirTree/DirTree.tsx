import { Title } from 'react-admin';
import { List } from '@mui/material';

import { FileStatDto } from '../../interfaces';
import { SubTree } from './SubTree';
import { useDirTree } from './useDirTree';

interface TreeProps {
    roots: FileStatDto[];
    title: string;
}

export const DirTree = ({ roots, title }: TreeProps) => {

    const {
        previewBtnClick,
        delBtnClick,
        openChildren,
        toggleNode,
    } = useDirTree();

    return (
        <List>
            <Title defaultTitle={title} />
            {roots.map(root => (
                <SubTree
                    key={root.path}
                    root={root}
                    childNodes={root.children}
                    openChildren={openChildren}
                    toggleNode={toggleNode}
                    level={1}
                    preview={previewBtnClick}
                    deletePath={delBtnClick}
                />
            ))}
        </List>
    );
};

