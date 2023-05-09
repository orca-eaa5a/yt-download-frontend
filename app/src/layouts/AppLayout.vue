<template>
  <q-layout view="hHh Lpr lff">
      <q-header elevated>
          <q-toolbar style="background-color: #ff6a6a;">
              <!-- <q-btn
                  flat
                  dense
                  round
                  icon="menu"
                  aria-label="Menu"
                  @click="toggleLeftDrawer"
              /> -->

              <!-- <q-toolbar-title>
                  Quasar App
              </q-toolbar-title> -->

              <!-- <div>Quasar v{{ $q.version }}</div> -->
              <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
          </q-toolbar>
      </q-header>


      <!-- <q-drawer
        v-model="drawer"
        :width="300"
        :breakpoint="500"
        overlay
        bordered
      >
      <q-scroll-area class="fit">
        <q-list>
          <div>
            <q-item>
              <q-item-section avatar>
                <q-icon name="playlist_add" />
              </q-item-section>
              <q-item-section>
                다운로드 가능 목록
              </q-item-section>
              <q-separator/>
            </q-item>
          </div>
          <div v-for="(item, idx) in videoList" :key="idx">
            <q-item clickable v-ripple @click="downloadVideo(item.url)">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.title }}
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

      <q-page-container>
          <router-view />
      </q-page-container>
    <!-- <q-dialog v-model="alert_visible">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <q-icon class="q-mr-sm" name="feedback" color="grey-6"/>알림</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-h8">
          {{this.alert_msg}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'MainLayout',
    created(){

    },
    data(){
      return{}
    },
    components: {
        // EssentialLink
    },
    methods:{

    }
})
</script>
