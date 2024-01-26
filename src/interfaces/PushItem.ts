export interface PushItem  {
    remoteId: string;
    success: boolean;
    fileId: number;
    finish: boolean;
    total: number;
    index: number;
}


export interface ClearPushResDto {
    message: string;
    deleteRemoteIds?: string[];
    deleteFailedRemoteIds?: string[];
}
