<template>
  <div class="video-container">
    <div class="video-item">
      <p class="video-title">Player tracking map</p>
      <div class="d-flex">
        <video width="100%" height="100%" controls>
          <source :src="videoCircle" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div class="video-item">
      <p class="video-title">Ball path diagram</p>
      <div class="d-flex">
        <video width="100%" height="100%" controls>
          <source :src="videoLine" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div class="video-item">
      <p class="video-title">Team Influence Zones</p>
      <div class="d-flex">
        <video width="100%" height="100%" controls>
          <source :src="videoVoronoi" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
import videoCircle from "@/data_handled/ok_798b45_0_circle.mp4"
import videoLine from "@/data_handled/ok_798b45_0_line.mp4"
import videoVoronoi from "@/data_handled/ok_798b45_0_voronoi.mp4"

</script>

<style scoped lang="scss">
.video-container{
  margin-top: 32px;
  display: flex;
  gap: 32px;
}

.video-item{
  flex: 1;

  & video{
    border-radius: 12px;
  }
}

.video-title{
  color: #FFF;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 12px;
}
</style>