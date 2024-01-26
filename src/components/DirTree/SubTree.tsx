import { Fragment } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Collapse,
    ListItemIcon,
    Button,
    ButtonGroup,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ViewCozyOutlinedIcon from '@mui/icons-material/ViewCozyOutlined';
import FolderOffRoundedIcon from '@mui/icons-material/FolderOffRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';

// 文件类型
import HtmlIcon from '@mui/icons-material/Html';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import { FileStatDto } from '../../interfaces';

interface SubTreeProps {
    level: number;
    root: FileStatDto;
    childNodes?: FileStatDto[];
    openChildren: string[];
    // eslint-disable-next-line no-unused-vars
    toggleNode(root: FileStatDto): void
    // eslint-disable-next-line no-unused-vars
    preview(file: FileStatDto): void
    // eslint-disable-next-line no-unused-vars
    deletePath(file: FileStatDto): void
}

export const SubTree = ({ 
    level, root, childNodes, openChildren, toggleNode, preview, 
    deletePath } : SubTreeProps) => {
    const hasChildren = childNodes && childNodes.length > 0;
    const open = openChildren.includes(root.path);

    const displayPath = root.path.split('/').pop();

    let icon = null;
    if (root.isDir) {
        icon = open ? <FolderOpenRoundedIcon /> : <FolderOffRoundedIcon />;
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
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button 
                            onClick={() => deletePath(root)}
                            startIcon={<DeleteOutlineIcon />}>
                            delete
                        </Button>
                        {!root.isDir && <Button
                            onClick={() => preview(root)}
                            startIcon={<ViewCozyOutlinedIcon />}>
                            preview
                        </Button>}
                    </ButtonGroup>
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
                            deletePath={deletePath}
                            preview={preview}
                        />
                    ))}
                </List>
            </Collapse>
        </Fragment>
    );
};
