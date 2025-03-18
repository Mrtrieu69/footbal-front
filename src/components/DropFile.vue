<template>
  <div class="body">
    <div class="file-wrp">
      <div v-if="!videoHandled">
        <div :class="{ hidden: fileUpload }">
          <div
              class="dropzone-container"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
              :class="{ dragging: isDragging }"
          >
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
              <div v-if="isDragging">Release to drop files here.</div>
              <div v-else>Drop files here or <u>click here</u> to upload video.</div>
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
      <div v-else>
        <div class="mb-5">
          <p class="title">Main video</p>
          <div class="preview-video">
            <video width="100%" height="100%" controls>
              <source :src="videoHandled" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div class="d-flex ga-8">
          <table-data></table-data>
          <additional-video></additional-video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadVideo } from "@/services/videoService.js";
import videoTest from "@/data_handled/ok_798b45_0.mp4";
import { TableData, AdditionalVideo } from "@/components";

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
  align-items: center;
  min-height: calc(100vh - 108px);
  justify-content: center;
}

.hidden {
  opacity: 0 !important;
  visibility: hidden !important;
}

.dropzone-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  padding: 4rem;
  background: #f7fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
}

.dropzone-container.dragging {
  border: 2px solid #e2e8f0;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #00ffcc;
}

.preview-controls {
  margin-top: 20px;
}

.title{
  color: white;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 12px;
}
</style>
