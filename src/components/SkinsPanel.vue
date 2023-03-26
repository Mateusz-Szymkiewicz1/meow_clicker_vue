<template>
  <div class="skiny">
       <span class="x_icon_skins" id="x_close" @click.left="$emit('closeSkins')">x</span>
        <h2>Skiny</h2>
    <h3>{{score}}C</h3>
    <div class="skin" data-name="robert" data-state="1">
        <img src="@/images/robert.jpg" width="100px" height="100px">
        <label class="skin_label">Robert</label><br /><br /><br />
        <button class="skin_buy" style="pointer-events: none;background: #aaa;">Kup</button><button class="skin_set">Ustaw</button>
    </div>
    <div v-for="(skin,i) in skins" :key="i" class="skin" :data-name="skin.name" data-state="0">
        <img :src="require('@/images/'+skin.name.toLowerCase()+'.jpg')" style="width:100px;height:100px;">
        <label class="skin_label">{{skin.name}}</label><br /><br /><br />
        <button class="skin_buy" data-price="400">Kup ({{skin.price}})</button><button class="skin_set">Ustaw</button>
    </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      name: 'SkinsPanel',
      skins: [
        { name: 'Herbert', price: 400 },
        { name: 'Ildefons', price: 600 },
        { name: 'Laurenty', price: 800 },
        { name: 'Konstanty', price: 1000 },
        { name: 'Gerwazy', price: 1200 },
        { name: 'Greg', price: 1500 },
        { name: 'Kamien', price: 2000 },
        { name: 'Karol', price: 2138 }
      ]
    }
  },
  props: ['score']
}
</script>
<style scoped>
.skiny{
    overflow-x: hidden;
}
.skin{
    height: 100px;
    margin-bottom: 20px;
}
.skin > label{
    font-size: 25px;
    margin-left: 15px;
    margin-top: 11px;
}
.skin>button{
    width: 120px;
}
.skin_buff_label{
    margin-top: -15px !important;
    font-size: 14px !important;
}
.big_skin{
    height: 120px !important;
}
@media only screen and (max-width: 466px) {
    .skin{
        height: 130px;
    }
    .big_skin{
        height: 160px !important;
    }
    .big_skin .skin_set{
        margin-top: -10px;
    }
    .skin_set{
        margin-top: 10px;
       margin-left: 13px !important;
    }
    .skin_buy{
        margin-right: 20px;
    }
}
</style>
