<template>
  <div class="main-screen q-pa-xl">
    <div class="row flex justify-center">
      <div class="col-6">
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
        <div>
          <video ref="videoPlayer" controls style="width: 100%">
            <source id="player-src" :src="video.src" :type="video.type" />
          </video>
        </div>
        <div class="video-description">
          <q-card flat bordered clickable style="width: 100%">
            <q-card-section>
              <p class="title">{{ video_info.title }}</p>
            </q-card-section>
            <q-card-section>
              <p class="url">{{ videoUrl }}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-mt-sm">
          <div class="col-8">
            <q-card flat bordered class="time-setup-card">
              <q-card-section class="time-setup-card-header">
                <div style="width: 100%; display: flex; position: relative">
                  <p>현재 재생지점</p>
                </div>
                <q-input v-model="time_info.cp" placeholder="00:00:00.000" />
              </q-card-section>
              <q-card-section></q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <div class="video-controller" style="height: 100%">
              <q-card
                flat
                bordered
                class="time-setup-card"
                style="height: 100%; margin: 0px"
              >
                <q-card-section
                  class="time-setup-card-header flex justify-between items-center"
                  style="height: 100%"
                >
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    round
                    icon="play_circle"
                    @click="$refs.videoPlayer.play()"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <strong>재생</strong>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    round
                    icon="pause"
                    @click="$refs.videoPlayer.pause()"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <strong>중지</strong>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    round
                    icon="repeat"
                    @click="setVideoTime(time_info['sp'])"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <strong>시작지점 재생</strong>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    push
                    color="white"
                    text-color="primary"
                    round
                    icon="fast_forward"
                    @click="setVideoTime(time_info['ep'])"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <strong>종료지점 재생</strong>
                    </q-tooltip>
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-4">
            <q-card
              flat
              bordered
              class="time-setup-card"
              :class="{
                'invalid-border': !timeInputValidation(time_info.sp),
              }"
            >
              <q-card-section class="time-setup-card-header">
                <div style="width: 100%; display: flex; position: relative">
                  <p>시작지점 설정</p>
                  <q-btn
                    outline
                    round
                    color="grey-6"
                    icon="settings"
                    style="
                      font-size: 5pt;
                      position: absolute;
                      top: 0px;
                      right: 0px;
                    "
                    @click="s_visible = true"
                  />
                </div>
                <q-input v-model="time_info.sp" placeholder="00:00:00.000" />
              </q-card-section>
              <q-card-section></q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card
              flat
              bordered
              class="time-setup-card q-mr-xs"
              :class="{
                'invalid-border': !timeInputValidation(time_info.ep),
              }"
            >
              <q-card-section class="time-setup-card-header">
                <div style="width: 100%; display: flex; position: relative">
                  <p>종료지점 설정</p>
                  <q-btn
                    outline
                    round
                    color="grey-6"
                    icon="settings"
                    style="
                      font-size: 5pt;
                      position: absolute;
                      top: 0px;
                      right: 0px;
                    "
                    @click="e_visible = true"
                  />
                </div>
                <q-input v-model="time_info.ep" />
              </q-card-section>
              <q-card-section> </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <div class="request-box">
              <q-btn
                class="request-btn"
                outline
                color="primary"
                label="다운로드 요청"
                @click="download_request"
              />
              <q-btn
                class="request-btn request-btn-mt"
                outline
                color="primary"
                label="초기화"
                @click="reset"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 q-px-md">
        <q-card flat bordered class="box-card q-mb-md">
          <q-card-section class="flex justify-between">
            <div class="text-h6">타임스탬프 정보</div>
            <q-btn
              bordered
              round
              icon="youtube_searched_for"
              @click="load_timestamp_advanced"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                transition-show="flip-right"
                transition-hide="flip-left"
                :offset="[10, 10]"
              >
                유튜브 댓글 긁어오기
              </q-tooltip>
            </q-btn> </q-card-section
          ><q-separator />

          <q-card-section class="item-list-box">
            <q-list dense class="item-list">
              <q-item
                v-for="(comment, idx) in video_info.comments"
                :key="idx"
                v-ripple
                class="item-list-item"
              >
                <q-item-section avatar>
                  {{ comment.timestamp }}
                </q-item-section>
                <q-item-section
                  class="content"
                  @click="setVideoTime(comment.timestamp)"
                >
                  {{ comment.tag }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="box-card">
          <q-card-section>
            <div class="text-h6">다운로드 가능한 화질</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-separator />
          <q-card-section class="item-list-box">
            <q-list class="item-list" dense>
              <q-item
                v-for="stream in video_info.streams"
                :key="stream"
                v-ripple
                class="item-list-item"
              >
                <q-item-section>{{ stream.mime_type }}</q-item-section>
                <q-item-section>{{ stream.quality }}</q-item-section>
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="playlist_play"
                    :url="stream.url"
                  />
                </q-item-section>
              </q-item>
              <!-- <q-item v-ripple class="box-item">
                <q-item-section>video/mp4</q-item-section>
                <q-item-section>720p</q-item-section>
                <q-item-section avatar>
                  <q-icon color="primary" name="playlist_play" />
                </q-item-section>
              </q-item> -->
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="s_visible" class="setting-dialog">
      <q-card>
        <q-card-section>
          <q-input v-model="time_info.cp" label="현재 재생지점" stack-label />
        </q-card-section>
        <q-card-section>
          <q-input v-model="time_info.sp" label="설정된 시작지점" stack-label />
        </q-card-section>
        <q-card-section class="button-box">
          <q-btn
            push
            color="primary"
            icon="add_circle_outline"
            label="0.1초 "
            @click="timeControler(time_info, 'sp', true)"
          />
          <q-btn
            push
            color="primary"
            icon="remove_circle_outline"
            label="0.1초 "
            @click="timeControler(time_info, 'sp', false)"
          />
          <q-btn
            push
            color="primary"
            label="동기화"
            @click="timeSync(time_info, 'sp')"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="e_visible" class="setting-dialog">
      <q-card>
        <q-card-section>
          <q-input v-model="time_info.cp" label="현재 재생지점" stack-label />
        </q-card-section>
        <q-card-section>
          <q-input v-model="time_info.ep" label="설정된 종료지점" stack-label />
        </q-card-section>
        <q-card-section class="button-box">
          <q-btn
            push
            color="primary"
            icon="add_circle_outline"
            label="0.1초"
            @click="timeControler(time_info, 'ep', true)"
          />
          <q-btn
            push
            color="primary"
            icon="remove_circle_outline"
            label="0.1초"
            @click="timeControler(time_info, 'ep', false)"
          />
          <q-btn
            push
            color="primary"
            label="동기화"
            @click="timeSync(time_info, 'ep')"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert_visible">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <q-icon
              class="q-mr-sm"
              name="notification_important"
              color="grey-6"
            />알림
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-h8">
          {{ alert_msg }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="waiting_visible">
      <q-card>
        <q-card-section class="flex justify-center items-center">
          <q-spinner-hourglass color="grey-6" size="4em" />
        </q-card-section>
        <q-card-section class="flex justify-center items-center">
          {{ waiting_msg }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="download_visible" :position="position">
      <q-card style="width: 350px">
        <q-card-section>
          <span>
            <q-icon color="primary" name="view_headline"></q-icon>
            다운로드 목록
          </span>
        </q-card-section>
        <q-card-section
          class="no-wrap"
          style="max-height: 250px; overflow-y: auto"
        >
          <q-list>
            <div v-for="(item, index) in downloaded_list" :key="index">
              <q-item
                v-ripple
                clickable
                @click="downloadFromUrl(item.url, item.title)"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="file_download" />
                </q-item-section>
                <q-item-section>{{ item.title }}</q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-btn
      class="download_list_show_btn"
      label="다운로드 목록"
      icon="vertical_align_bottom"
      color="primary"
      @click="openDownloadList('right')"
    />

    <q-dialog v-model="processing_visible" position="bottom" seamless>
      <q-card style="width: 350px">
        <q-card-section class="row">
          <div>
            <div class="text-weight-bold">
              <span>다운로드 중</span>
              <q-spinner color="primary" size="1em" />
            </div>
            <div class="text-grey">{{ videoUrl }}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      aws_api_url:
        "https://4x0z0hafla.execute-api.ap-northeast-2.amazonaws.com/yt-download",
      videoUrl: "", // youtube short url
      video: {}, // html video element source
      download_processing: false,
      processing_visible: false, // download processing modal
      download_visible: false, // downloaded list modal
      waiting_visible: false, // waiting modal
      alert_visible: false, // alert modal
      downloaded_list: [], // user previously downloaded
      waiting_msg: "", // msg for waiting modal
      alert_msg: "", // msg for alert modal
      s_visible: false,
      e_visible: false,
      time_info: {
        sp: "00:00:00.000",
        ep: "00:00:00.000",
        cp: "00:00:00.000",
      },
      video_info: {
        time_info: "",
        length: "",
        title: "",
        vid: "",
        streams: [],
        comments: [],
      },
    };
  },
  watch: {
    waiting_visible: {
      handler(newv, oldv) {
        if (
          oldv === true &&
          newv === false &&
          this.download_processing === true
        ) {
          this.processing_visible = true;
        }
      },
    },
  },
  created() {
    this.videoUrl = this.$route.query.q;
  },
  mounted() {
    /**
      @ add timeupdate event to video element
      @ get video current time and present it to user like hh:mm:ss.sss format
      */
    this.$refs.videoPlayer.addEventListener("timeupdate", (event) => {
      this.time_info.cp = this.timestampToStrftime(event.target.currentTime);
    });
    /**
     * downloaded_list : {
     *  list: [],
     *  created_time : int
     * }
     */
    let dl = JSON.parse(localStorage.getItem("downloaded_list"));
    let new_creation_require = false;
    let _time = Math.round(new Date().getTime() / 1000);
    if (dl) {
      if (dl.created_time - _time > 86400 * 3) {
        // 3 days
        new_creation_require = true;
      }
    } else {
      new_creation_require = true;
    }
    if (new_creation_require) {
      localStorage.setItem(
        "downloaded_list",
        JSON.stringify({
          list: [],
          created_time: _time,
        })
      );
      this.downloaded_list = [];
    } else {
      this.downloaded_list = dl.list;
    }
    if (this.videoUrl) {
      this.setupVideoPlayer();
    }
  },
  methods: {
    openDownloadList(pos) {
      this.position = pos;
      this.download_visible = true;
    },
    doSearch() {
      this.setupVideoPlayer();
    },
    enterKey(evt) {
      if (evt.key === "Enter") {
        this.doSearch();
      }
    },
    alertPopup(msg) {
      this.alert_msg = msg;
      this.alert_visible = true;
    },
    timeInputValidation(val) {
      const regex = /^(([0-9]+:)?[0-5]?[0-9]:[0-5][0-9](\.[0-9]{1,3})?$)/;
      return regex.test(val);
    },
    strftimeToTimestamp(s) {
      let time = s;
      let array = time.split(":");
      let timestamp = 0.0;
      if (array.length === 2) {
        timestamp = parseInt(array[0], 10) * 60 + parseFloat(array[1]);
      } else if (array.length === 3) {
        timestamp =
          parseInt(array[0], 10) * 60 * 60 +
          parseInt(array[1], 10) * 60 +
          parseFloat(array[2]);
      } else {
        timestamp = NaN;
      }
      return timestamp;
    },
    timestampToStrftime(ts) {
      return new Date(ts * 1000).toISOString().slice(11, 23);
    },
    timeControler(s, k, positive) {
      let ts = this.strftimeToTimestamp(s[k]);
      if (positive) {
        ts += 0.1;
      } else {
        ts -= 0.1;
      }
      s[k] = this.timestampToStrftime(ts);
      return s[k];
    },
    timeSync(s, k) {
      s[k] = this.time_info.cp;
      return s[k];
    },
    reset() {
      this.time_info.sp = "00:00:00.000";
      this.time_info.ep = "00:00:00.000";
    },
    getOriginVideoUrl() {
      return this.$refs.videoPlayer.firstChild.src;
    },
    setupVideoInfo(data) {
      this.video_info.time_info = data.time_info;
      this.video_info.duration = data["length"];
      this.video_info.title = data.title;
      this.video_info.vid = data.vid;
      this.video_info.streams = data.streams;
    },
    loadVideo(url, mime_type) {
      this.video.src = url;
      this.video.type = mime_type;
      this.$refs.videoPlayer.load();
    },
    setupVideoPlayer() {
      let api_url = this.aws_api_url + "/query?q=" + this.videoUrl;
      fetch(api_url)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.body.success === true) {
            let data = resp.body.data;
            console.log(data);
            this.loadVideo(
              data.streams[data.streams.length - 1].url,
              data.streams[data.streams.length - 1].mime_type
            );
            this.setupVideoInfo(data);
          } else {
            this.alertPopup("요청하신 비디오 정보를 가져오는데 실패했습니다.");
            console.log(resp);
          }
        });
    },
    setVideoTime(strftime) {
      this.$refs.videoPlayer.currentTime = this.strftimeToTimestamp(strftime);
    },
    downloadFromUrl(video_url, file_name) {
      if (!video_url.startsWith("https://")) {
        video_url = "https://" + video_url;
      }
      fetch(video_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/mp4",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file_name + ".mp4");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    },
    addDownloadList(title, url) {
      let v = { title: title, url: url };
      this.downloaded_list.push(v);
      let dl = JSON.parse(localStorage.getItem("downloaded_list"));
      if (!dl) {
        dl = {
          list: [],
          created_time: Math.round(new Date().getTime() / 1000),
        };
      }
      dl.list.push(v);
      localStorage.setItem("downloaded_list", JSON.stringify(dl));
    },
    load_timestamp_advanced() {
      let api_url = this.aws_api_url + "/timestamp" + "?url=" + this.videoUrl;
      try {
        fetch(api_url)
          .then((resp) => resp.json())
          .then((resp) => {
            if (resp.statusCode === 200 && resp.body.success) {
              let data = resp.body.data;
              this.video_info.comments = data;
            } else {
              this.alertPopup("유튜브 댓글 정보를 가져오는데 실패했습니다.");
            }
          });
      } catch (err) {
        this.alertPopup("서버로부터 응답이 없습니다..");
        console.log(err);
        return;
      }
    },
    async trim_process_healthcheck(ticket) {
      let api_url = this.aws_api_url + "/healthcheck";
      let resp = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ticket: ticket,
          },
        }),
      });
      let data = await resp.json();
      if (data.statusCode === 200 && data.body.success) {
        data = data.body.data;
        if ("status" in data) {
          if (data.status === "RUNNING") {
            return undefined;
          } else if (data.status === "SUCCEEDED") {
            return data;
          } else {
            this.alertPopup(
              "trimming process is failed with error " + data.err
            );
            throw new Error(
              "trimming process is failed with error " + data.err
            );
          }
        } else {
          this.alertPopup("응답값이 유효하지 않습니다. 관리자에게 문의하세요");
          throw new Error("invalid response");
        }
      }
    },

    async download_request() {
      let sp = this.timeInputValidation(this.time_info.sp);
      let ep = this.timeInputValidation(this.time_info.ep);
      if (!this.getOriginVideoUrl()) {
        this.alertPopup(
          "원본 비디오 정보를 가져오는데 실패했습니다. 새로고침 후 다시 시도해 보세요!"
        );
        return;
      }
      if (!this.videoUrl) {
        this.alertPopup("요청하신 비디오 정보가 없습니다. 다시 검색해 주세요.");
        return;
      }
      if (!(sp && ep)) {
        this.alertPopup(
          "시작 / 종료 입력값을 확인하세요.\n 입력값은 00:00:00.000 형식이어야 합니다."
        );
        return;
      }
      if (sp > ep) {
        this.alertPopup("종료 지점이 시작 지점보다 앞에 있을 수 없습니다.");
        return;
      } else if (sp === ep) {
        this.addDownloadList(this.video_info.title, this.getOriginVideoUrl());
      } else {
        this.download_processing = true;
        this.waiting_visible = true;
        this.waiting_msg = "자르기 요청 시작";
        let resp = undefined;
        try {
          let api_url = this.aws_api_url + "/trim-request";
          resp = await fetch(api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              o_url: this.videoUrl,
              url: this.getOriginVideoUrl(),
              sp: this.time_info.sp,
              ep: this.time_info.ep,
              m_duration: parseInt(this.video_info.duration),
            }),
          });
          resp = await resp.json();
        } catch (err) {
          this.download_processing = false;
          this.waiting_visible = false;
          this.alertPopup("서버로부터 응답이 없습니다..");
          console.log(err);
          return;
        }
        if (resp.statusCode === 200 && resp.body.success) {
          this.waiting_msg = "자르기 요청 성공";
          let data = resp.body.data;
          if ("ticket" in data) {
            let max_retry = 6;
            let try_cnt = 1;
            while (max_retry >= try_cnt) {
              try {
                let status = await this.trim_process_healthcheck(data.ticket);
                this.waiting_msg = `작업이 진행중입니다 : ${try_cnt}`;
                if (status) {
                  this.download_processing = false;
                  this.waiting_visible = false;
                  this.processing_visible = false;
                  this.alertPopup("다운로드가 완료되었습니다!");
                  this.addDownloadList(this.video_info.title, status.url);
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  this.alert_visible = false;
                  break;
                }
                try_cnt += 1;
                await new Promise((resolve) => setTimeout(resolve, 4000));
              } catch (err) {
                this.processing_visible = false;
                this.waiting_visible = false;
                this.alertPopup("서버로부터 응답이 없습니다..");
                console.log(err);
                return;
              }
            }
          }
        } else if (resp.statusCode === 400) {
          this.download_processing = false;
          this.waiting_visible = false;
          this.alertPopup("요청 값을 확인하세요..");
        } else if (resp.statusCode === 500) {
          this.download_processing = false;
          this.waiting_visible = false;
          this.alertPopup("서버 내부적으로 문제가 발생했습니다.");
        }
      }
    },
  },
};
</script>
<style>
@import url(../css/main.scss);
</style>
<style scoped>
.item-list {
  font-size: 10pt;
}

.item-list .content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.item-list-box {
  max-height: 200px;
  overflow-y: auto;
}

.item-list-item:hover {
  background-color: #ffe8e8;
  transition-duration: 300ms;
}

.video-description {
  position: relative;
}
.video-description .title {
  font-size: 1.2rem;
  font-family: "Inter Medium";
  margin-bottom: 0px;
  padding: 0px 5px;
}
.video-description .url {
  font-size: 0.8rem;
  font-family: "Inter Medium";
  margin-bottom: 0px;
  padding: 3px 5px;
  border-radius: 5px;
}
.request-box {
  display: block;
  width: 100%;
}

.request-box .request-btn {
  width: 100%;
  font-size: 11px;
}

.request-box .request-btn-mt {
  margin-top: 6px;
}

.setting-dialog .button-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.invalid-border {
  border-color: red;
}
.download_list_show_btn {
  position: absolute;
  right: 3%;
  bottom: 3%;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) and (max-width: 500px) {
  .row > div[class*="col-"] {
    width: 100%;
  }
  .text-h6 {
    font-size: 0.8rem;
  }
  .item-list {
    font-size: 9pt;
  }
  .item-list-box {
    max-height: 100px;
  }
  .video-description .title {
    font-size: 0.8rem;
  }
  .video-description .url {
    font-size: 0.6rem;
  }
  .time-setup-card {
    margin-bottom: 10px;
  }
  .request-box {
    display: flex;
    margin-bottom: 10px;
  }
  .request-box .request-btn {
    width: 50%;
  }

  .request-box .request-btn-mt {
    margin-top: 0px;
    margin-left: 4px;
  }
}
</style>
