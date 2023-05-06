<template>
    <div class="main-screen">
        <img class="main-yt-image" src="~assets/images/youtube-phone.png"/>
        <div>
            <div>
                <legend class="main-legend q-mb-xl">Get your own video from Youtube</legend>
            </div>
            
            <div class="q-mb-xl" style="z-index: 100;">
                <legend class="sub-legend">Input Youtube Video URl here</legend>
                <q-input v-model="videoUrl" rounded outlined class="search-input q-mt-sm" @keyup="enterKey($event)">
                    <template #append>
                        <q-icon class="zoom" name="search" @click="doSearch"/>
                    </template>
                </q-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
    data(){
        return{
            videoUrl: ''
        }
    },
    methods:{
        doSearch(){
            alert(this.videoUrl);
            // this.$router.push('/search?q='+this.videoUrl);
        },
        enterKey(evt){
            if (evt.key === 'Enter'){
                this.doSearch();
            }
        }
    }
}
</script>
<style>
.search-input .q-field__control{
    height: auto !important;
    padding: 0px 20px !important;
    background-color: white;
    opacity: 80%;
}
.search-input input{
    font-size: 10pt;
    font-family: 'Inter Medium';
    color: #333;
}
.search-input .q-field__marginal{
    height: auto !important;
}
</style>
<style scoped>
@import url(../css/animation.scss);
.bg-black{
    background-color: black;
}

.main-screen{
    display: flex;
    background-color: black;
    width: 100vw;
    height: calc(100vh - 50px);
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    /* margin: 0 40px !important; */
}
.main-yt-image{
    max-width: 330px;
    position: absolute;
    right: 10%;
    bottom: 0px;
}
.main-legend{
    font-size: 30pt;
    font-family: 'Inter Bold';
    color: #ff6a6a;
    text-align: center;
    position: relative;
    z-index: 5;
}
.sub-legend{
    font-size: 11pt;
    font-family: 'Inter Medium';
    color: white;
    text-align: center;
    margin: auto;
    position: relative;
    z-index: 5;
}

@media screen and (-webkit-min-device-pixel-ratio:0) and (max-width: 700px){ 
    .main-legend{
        font-size: 25pt;
        font-family: 'Inter Medium';
        color: #ff6a6a;
        text-align: center;
    }
    .main-yt-image{
        max-width: 250px;
    }
    
}
@media screen and (-webkit-min-device-pixel-ratio:0) and (max-width: 500px){ 
    .main-yt-image{
        max-width: 200px;
    }
    .main-legend{
        font-size: 20pt;
        font-family: 'Inter Medium';
        color: #ff6a6a;
        text-align: center;
    }
}

</style>