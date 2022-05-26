import { ITableItem } from "@/state/reducers/tableReducer";

export interface IUploadIdPayload {
  name: ITableItem["name"];
  height: ITableItem["height"];
}

export interface IUploadIdResp {
  uploadId: string;
}
export interface IUploadIdRespErr {
  uploadIdErr: string;
}

const url = "https://my-app-yikvv.ondigitalocean.app";

const getUploadId = async (payload: IUploadIdPayload): Promise<IUploadIdResp & IUploadIdRespErr> => {
  try {
    const response = await fetch(`${url}/submit`, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        "cache-control": "no-cache"
      })
    });
    const data: IUploadIdResp = await response.json();
    return { uploadId: data.uploadId, uploadIdErr: "" };
  } catch (err: any) {
    return { uploadIdErr: err.message, uploadId: "" };
  }
};

export const uploadFile = async (payload: IUploadIdPayload, fileData: any): Promise<void> => {
  try {
    const { uploadId, uploadIdErr } = await getUploadId(payload);
    if (uploadIdErr) {
      throw new Error(uploadIdErr);
    }

    await fetch(`${url}/upload/${uploadId}`, {
      body: fileData,
      method: "POST"
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getUploadedFiles = async (): Promise<ITableItem[]> => {
  try {
    const response = await fetch(`${url}/data`);
    const data: ITableItem[] = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
