<template>
  <div class="main-screen">
    <div class="row flex justify-center">
      <div class="col-6 q-mt-md">
        <div class="q-mb-xl" style="z-index: 100">
          <q-input
            v-model="videoUrl"
            rounded
            outlined
            class="search-input q-mt-sm"
            @keyup="enterKey($event)"
          >
            <template #append>
              <q-icon class="zoom" name="search" @click="doSearch" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8 q-px-md">
        <video ref="videoPlayer" controls style="width: 100%">
          <source id="player-src" :src="video.src" :type="video.type" />
        </video>
      </div>
      <div class="col-4 q-px-md">
        <q-card class="my-card">
          <q-card-section class="flex justify-between">
            <div class="text-h6">댓글에서 정보 가져오기</div>
            <q-btn>Action 2</q-btn>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>

          <q-separator />
        </q-card>
        <q-card class="my-card">
          <q-card-section class="flex justify-between">
            <div class="text-h6">다운로드 가능한 화질</div>
            <q-btn>Action 2</q-btn>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>

          <q-separator />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      videoUrl: "",
      video: {
        src: "http://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/tears_of_steel_720p.mov",
        type: "video/mp4",
      },
    };
  },
  methods: {
    doSearch() {
      alert(this.videoUrl);
      // this.$router.push('/search?q='+this.videoUrl);
    },
    enterKey(evt) {
      if (evt.key === "Enter") {
        this.doSearch();
      }
    },
  },
};
</script>
<style>
.search-input .q-field__control {
  height: auto !important;
  padding: 0px 20px !important;
  background-color: white;
  opacity: 80%;
}
.search-input input {
  font-size: 10pt;
  font-family: "Inter Medium";
  color: #333;
}
.search-input .q-field__marginal {
  height: auto !important;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) and (max-width: 500px) {
  .row > div[class*="col-"] {
    width: 100%;
  }
}
</style>
<style scoped>
@import url(../css/animation.scss);

.main-screen {
  width: 100vw;
  height: calc(100vh - 50px);
  padding: 0 50px;
  /* margin: 0 40px !important; */
}
</style>
