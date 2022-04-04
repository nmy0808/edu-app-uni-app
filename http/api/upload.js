import { baseUrl, appid } from "../config.js";
import store from "@/store";

/**
 * progress : 进度条回调
 */
export const uploadApi = (progress = null) => {
  const header = {};
  header.appid = appid;
  header.token = store.state.user.token;
  const url = baseUrl + "/mobile/upload";
  const fileName = "file";
  return new Promise((resolve, reject) => {
    const uploadTask = uni.chooseImage({
      success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        const uploadTask = uni.uploadFile({
          url,
          header,
          filePath: tempFilePaths[0],
          name: fileName,
          success: (res) => {
            const response = JSON.parse(res.data);
            if (res.statusCode === 200) {
              if (response.code === 20000 && response.msg !== "fail") {
                resolve(response.data);
                return;
              }
            }
            uni.showToast({
              title: response.data,
              icon: "none",
            });
            reject(response.data);
          },
          fail: (err) => {
            uni.showToast({
              title: err.message || "上传失败,请稍后再试",
              icon: "none",
            });
            reject(err.message);
          },
        });
        // 进度条
        progress &&
          uploadTask.onProgressUpdate((res) => {
            progress({
              progress: res.progress,
              current: res.totalBytesSent,
              total: res.totalBytesExpectedToSend,
            });
          });
        //
      },
    });
  });
};
