export const FILE_SOURCE_TYPE_UPLOAD = 'UPLOAD'; // 上传
export const FILE_SOURCE_TYPE_CRAWLER = 'CRAWLER'; // 爬虫

export const FILE_SOURCE_TYPE_CHOICES = [
    { id: FILE_SOURCE_TYPE_CRAWLER, name: `🕷️${FILE_SOURCE_TYPE_CRAWLER}` },
    { id: FILE_SOURCE_TYPE_UPLOAD, name: `💾${FILE_SOURCE_TYPE_UPLOAD}` },
];


export const FILE_EXT_HTML = 'html';
export const FILE_EXT_PDF = 'pdf';
export const FILE_EXT_DOC = 'doc';
export const FILE_EXT_DOCX = 'docx';
export const FILE_EXT_TXT = 'txt';
export const FILE_EXT_MD = 'md';
export const FILE_EXT_CSV = 'csv';
export const FILE_EXT_EXCEL = 'xls';
export const FILE_EXT_JSON = 'json';

export const FILE_EXT_CHOICES = [
    { id: FILE_EXT_HTML, name: FILE_EXT_HTML },
    { id: FILE_EXT_PDF, name: FILE_EXT_PDF },
    { id: FILE_EXT_DOC, name: FILE_EXT_DOC },
    { id: FILE_EXT_DOCX, name: FILE_EXT_DOCX },
    { id: FILE_EXT_TXT, name: FILE_EXT_TXT },
    { id: FILE_EXT_MD, name: FILE_EXT_MD },
    { id: FILE_EXT_CSV, name: FILE_EXT_CSV },
    { id: FILE_EXT_EXCEL, name: FILE_EXT_EXCEL },
    { id: FILE_EXT_JSON, name: FILE_EXT_JSON },
];
