<template>
  <div class="file-wrp">
    <div v-if="!videoHandled">
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
          <span class="mb-2">
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
      <div :class="{ hidden: !fileUpload }">
        <div class="preview-container">
          <div class="preview-video">
            <video ref="video" width="100%" height="100%" controls>
              <source ref="source" src="" id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          </div>

          <p>{{ fileUpload?.name }}</p>

          <div class="preview-controls">
            <v-btn class="mr-4" @click="changeVideo">Change video</v-btn>
            <v-btn
              :loading="loading"
              color="primary"
              prepend-icon="mdi-upload"
              @click="handleUploadVideo"
              >Upload video</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column ga-2" v-else>
      <div>
        <v-icon icon="mdi-check-bold" color="green" class="mr-2"></v-icon>
        <span class="text-green">Upload successfully!</span>
      </div>
      <div class="preview-video">
        <video width="640" height="360" controls>
          <source :src="videoHandled" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="preview-controls">
        <v-btn class="mr-4" @click="changeVideo">Change video</v-btn>
        <a :href="videoHandled" download>
          <v-btn :loading="loading" color="primary" prepend-icon="mdi-download"
            >Download video</v-btn
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadVideo } from "@/services/videoService.js";

const isDragging = ref(false);
const file = ref(null);
const source = ref(null);
const video = ref(null);
const fileUpload = ref(null);
const loading = ref(false);

const videoHandled = ref(false);

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
  align-items: center;
  height: calc(100vh - 152px);
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
  margin-bottom: 8px;
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
  padding: 4px 16px;
  border-radius: 8px;
  background: #FFF;
}

.file-label:hover{
  background: #f3f3f3;
}

.preview-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 640px;
}

.preview-video video {
  border-radius: 12px;
  overflow: hidden;
}

.preview-controls {
  margin-top: 20px;
}
</style>
