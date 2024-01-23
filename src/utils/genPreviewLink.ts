
/**
 * 生成 预览链接
 * @param kbId 
 * @param filePath 
 * @returns 
 */
export function genPreviewLink(kbId: string | number, filePath: string) {
    const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);
    const encodeToken = encodeURIComponent(token || '');
    const encodeFilePath = encodeURIComponent(filePath || '');
    const endPoint = `${import.meta.env.VITE_SERVER_HOST}/kbs/${kbId}/privewFile?filePath=${encodeFilePath}&token=${encodeToken}`;
    
    return endPoint;
}
