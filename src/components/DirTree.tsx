import { Fragment, useState } from 'react';
import {
    useRecordContext,
    // ShowButton,
    Title,
} from 'react-admin';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Collapse,
    ListItemIcon,
    Button,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import FolderIcon from '@mui/icons-material/FolderOpenRounded';
import FolderOffRoundedIcon from '@mui/icons-material/FolderOffRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';

// 文件类型
import HtmlIcon from '@mui/icons-material/Html';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import { genPreviewLink } from '../utils/genPreviewLink';



interface FileStatDto {
    /**
     * 文件名
     */
    name: string;
    /**
     * 文件路径
     */
    path: string;
    /**
     * 是否是目录
     */
    isDir: boolean;
    /**
     * 子目录
     */
    children?: FileStatDto[];
}

function previewBtnClick(kbId: string | number, file: FileStatDto) {
    const endPoint = genPreviewLink(kbId, file.path)
    window.open(endPoint, file.path);

}

interface TreeProps {
    roots: FileStatDto[];
    title: string;
}

const DirTree = ({ roots, title }: TreeProps) => {

    const [openChildren, setOpenChildren] = useState<string[]>([]);
    const toggleNode = (node: FileStatDto) =>
        setOpenChildren(state => {
            if (state.includes(node.path)) {
                return [
                    ...state.splice(0, state.indexOf(node.path)),
                    ...state.splice(state.indexOf(node.path) + 1, state.length),
                ];
            } else {
                return [...state, node.path];
            }
        });

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
                />
            ))}
        </List>
    );
};

interface SubTreeProps {
    level: number;
    root: FileStatDto;
    childNodes?: FileStatDto[];
    openChildren: string[];
    // eslint-disable-next-line no-unused-vars
    toggleNode(root: FileStatDto): void
}

// function previewFile(file: FileStatDto) {
//     const serverUrl = `${import.meta.env.VITE_SERVER_HOST}/api/files/`;
// }

const SubTree = ({ level, root, childNodes, openChildren, toggleNode }: SubTreeProps) => {
    const record = useRecordContext();
    const hasChildren = childNodes && childNodes.length > 0;
    const open = openChildren.includes(root.path);

    const displayPath = root.path.split('/').pop();

    let icon = null;
    if (root.isDir) {
        icon = open ? <FolderOpenRoundedIcon /> :<FolderOffRoundedIcon />;
    } else {
        const ext = root.path.split('.').pop();

        switch (ext) {
            case 'html':
                icon = <HtmlIcon />;
                break;
            case 'pdf':
                icon = <PictureAsPdfIcon />;
                break;
            case 'txt':
                icon = <TextSnippetIcon />;
                break;
            case 'md':
                icon = <FormatIndentDecreaseIcon />;
                break;

            default:
                break;
        }
    }



    return (
        <Fragment>
            <ListItem
                onClick={() => hasChildren && toggleNode(root)}
                style={{ paddingLeft: level * 16 }}
            >
                {hasChildren && open && <ExpandLess />}
                {hasChildren && !open && <ExpandMore />}
    
                {!hasChildren && <div style={{ width: 24 }}>&nbsp;</div>}

                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={displayPath} />

                <ListItemSecondaryAction>
                    {!root.isDir && <Button onClick={() => previewBtnClick(record.id, root)}> preview </Button>}
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {childNodes && childNodes.map(node => (
                        <SubTree
                            key={node.path}
                            root={node}
                            childNodes={node.children}
                            openChildren={openChildren}
                            toggleNode={toggleNode}
                            level={level + 1}
                        />
                    ))}
                </List>
            </Collapse>
        </Fragment>
    );
};

export default DirTree;
