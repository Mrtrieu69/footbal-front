<template>
  <div style="width: 41%">
    <div>
      <p class="subtitle">Player tracking map</p>
      <div class="preview-video">
        <video width="100%" height="100%" controls>
          <source :src="videoTestLine" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div>
      <p class="subtitle">Ball path diagram</p>
      <div class="preview-video">
        <video width="100%" height="100%" controls>
          <source :src="videoTestCircle" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>
<script setup>
import videoTestLine from "@/data_handled/ok_798b45_0_line.mp4";
import videoTestCircle from "@/data_handled/ok_798b45_0_circle.mp4";

</script>

<style lang="scss" scoped>
.subtitle{
  font-size: 20px;
  font-weight: 600;
  color: white;
}
.preview-video video {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #00ffcc;
}
</style>
