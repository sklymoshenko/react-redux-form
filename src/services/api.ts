export interface IUploadIdPayload {
  name: string;
  height: number;
}

export interface IUploadIdResp {
  uploadId: string;
}

export const getUploadId = async (payload: IUploadIdPayload) => {
  const response = await fetch("http://my-app-yikvv.ondigitalocean.app/submit", {
    body: JSON.stringify(payload),
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "cache-control": "no-cache"
    })
  });
  const data: IUploadIdResp = await response.json();

  return data.uploadId;
};
