<template>
  <div class="file-wrp">
    <template v-if="!videoHandled">
      <div class="dropzone-container-wrp" :class="{ hidden: fileUpload }">
        <p class="dropzone-container-title">Upload Video</p>
        <p class="dropzone-container-subtitle">Please upload video in mp4 format and make sure the video size is under 100 MB.</p>
        <div
          class="dropzone-container"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
          :class="{ dragging: isDragging }"
        >
          <span class="mb-2 d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <path d="M21.334 21.8326L16.0006 16.4993M16.0006 16.4993L10.6673 21.8326M16.0006 16.4993V28.4993M27.1873 25.0193C28.4877 24.3103 29.5151 23.1885 30.1071 21.8308C30.6992 20.4731 30.8222 18.9569 30.4569 17.5215C30.0916 16.0862 29.2586 14.8133 28.0895 13.9039C26.9204 12.9945 25.4818 12.5003 24.0006 12.4993H22.3206C21.917 10.9383 21.1648 9.48907 20.1205 8.26061C19.0763 7.03216 17.7671 6.05642 16.2914 5.40676C14.8158 4.75711 13.212 4.45043 11.6008 4.5098C9.98953 4.56916 8.41271 4.99302 6.98885 5.74951C5.565 6.50599 4.33117 7.57542 3.38011 8.8774C2.42906 10.1794 1.78554 11.68 1.49792 13.2665C1.21031 14.853 1.28609 16.484 1.71957 18.037C2.15305 19.5899 2.93294 21.0244 4.00062 22.2326" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <p class="dropzone-container_upload-title">Drop file here to upload video</p>
          <p class="dropzone-container_upload-subtitle">Format: .mp4 & Max file size: 100 MB</p>

          <input
            type="file"
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="(e) => onChange(e, 'input')"
            ref="file"
            accept=".mp4, video/mp4"
          />

          <label
            :style="{ 'pointer-events': isDragging ? 'none' : 'auto' }"
            for="fileInput"
            class="file-label"
          >
            Browse File
          </label>
        </div>
      </div>
      <div class="preview-container-wrp" :class="{ hidden: !fileUpload }">
        <p class="preview-container-wrp-title">Video Preview</p>
        <p class="preview-container-wrp-subtitle">Your video has been successfully uploaded and is now ready for preview</p>
        <div class="preview-container">
          <div class="preview-video">
            <video ref="video" width="100%" height="100%" controls>
              <source ref="source" src="" id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          </div>

          <p class="preview-video-name">{{ fileUpload?.name }}</p>

          <div class="preview-controls">
            <button @click="changeVideo" class="button-outline">
              Change video
            </button>
            <button @click="handleUploadVideo" class="button-main" :class="{loading: loading}">
              <span class="button-main-text">
                Process video
                <span class="d-flex align-center">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 18V12M12 12L9 14M12 12L15 14M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <div class="d-flex flex-column pa-6" style="width: 860px" v-else>
      <div class="mb-3 d-flex align-center justify-center">
        <v-icon icon="mdi-check-bold" color="green" class="mr-2"></v-icon>
        <span class="text-green">Video processed successfully!</span>
      </div>
      <div class="preview-video">
        <video width="100%" height="100%" controls>
          <source :src="videoHandled" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
<!--      <videos-handled></videos-handled>-->
      <table-static></table-static>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadVideo } from "@/services/videoService.js";
import videoTest from "@/data_handled/ok_798b45_0.mp4";
import {VideosHandled, TableStatic} from "@/components";

const isDragging = ref(false);
const file = ref(null);
const source = ref(null);
const video = ref(null);
const fileUpload = ref(null);
const loading = ref(false);

const videoHandled = ref(videoTest);

const onChange = (e, type) => {
  if (type === "input") {
    fileUpload.value = e.target.files[0];
  } else if (type === "drop") {
    fileUpload.value = e.dataTransfer.files[0];
  }

  if (fileUpload.value) {
    source.value.src = URL.createObjectURL(fileUpload.value);
    video.value.load();
  }
};

const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e) => {
  e.preventDefault();
  onChange(e, "drop");
  isDragging.value = false;
};

const changeVideo = () => {
  file.value.value = null;
  fileUpload.value = null;
  videoHandled.value = false;
};

const handleUploadVideo = async () => {
  loading.value = true;

  const formData = new FormData();
  formData.append("video", file.value.files[0]);

  try {
    const res = await uploadVideo(formData);

    videoHandled.value = import.meta.env.VITE_API_SERVER_URI + res.main_video.replace("\\", "/");
  } catch (err) {
    console.log("err upload video: ", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.file-wrp {
  display: flex;
  flex-grow: 1;
  min-height: calc(100vh - 152px);
  justify-content: center;
  text-align: center;
  position: relative;
}

.hidden {
  opacity: 0 !important;
  visibility: hidden !important;
}

.dropzone-container-wrp{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.dropzone-container-title{
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 4px;
}

.dropzone-container-subtitle{
  margin-bottom: 32px;
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.dropzone-container {
  flex: 1;
  width: 100%;
  border-radius: 8px;
  border: 1px dashed #FFF;
  background: rgba(0, 0, 0, 0.54);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dropzone-container.dragging {
  border: 2px solid #e2e8f0;
  background: rgba(0, 0, 0, 0.64);
}

.dropzone-container_upload-title{
  color: #FFF;
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.dropzone-container_upload-subtitle{
  color: #FFF;
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 16px;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  display: block;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  background: #FFF;
}

.file-label:hover{
  background: #f3f3f3;
}

.preview-container-wrp{
  padding: 24px;
  display: flex;
  flex-direction: column;

  &.hidden{
    display: none !important;
  }
}

.preview-container-wrp-title {
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 4px;
}

.preview-container-wrp-subtitle{
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 32px;
}

.preview-container{
  width: 860px;
}

.preview-video video {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
}

.preview-video-name{
  margin-top: 12px;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.preview-controls {
  margin: 32px auto 0;
  width: 540px;
  display: flex;
  gap: 24px;

  & button{
    flex: 1;
  }
}
</style>
