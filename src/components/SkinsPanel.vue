<template>
  <div class="skiny">
       <span class="x_icon_skins" id="x_close" @click.left="$emit('closeSkins')">x</span>
        <h2>Skiny</h2>
    <h3>{{score}}C</h3>
    <div v-for="(skin,i) in skins" :key="i" :class="'skin '+skin.class" :id="skin.name.toLowerCase()">
        <img :src="require('@/images/'+skin.name.toLowerCase()+'.jpg')" style="width:100px;height:100px;">
        <label class="skin_label">{{skin.name}}</label><br /><br /><br />
        <label class="skin_buff_label" v-if="skin.buff">+{{skin.power}} {{skin.buff}}</label><br v-if="skin.buff">
        <button class="skin_buy" @click="skins_check" @click.left="$emit('buySkin',skin,$event.target)">Kup <span v-if="skin.price">(</span>{{skin.price}}<span v-if="skin.price">)</span></button><button class="skin_set" @click="skins_check" @click.left="$emit('setSkin',skin)">Ustaw</button>
    </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      name: 'SkinsPanel',
      skins: [
        { name: 'Robert', price: '' },
        { name: 'Herbert', price: 400 },
        { name: 'Ildefons', price: 600 },
        { name: 'Laurenty', price: 800 },
        { name: 'Konstanty', price: 1000 },
        { name: 'Gerwazy', price: 1200, buff: 'Idle Clicks', power: 1, class: 'big_skin' },
        { name: 'Greg', price: 1500, buff: 'Strength', power: 4, class: 'big_skin' },
        { name: 'Kamien', price: 2000, buff: 'Idle Clicks', power: 2, class: 'big_skin' },
        { name: 'Karol', price: 2138, buff: 'Strength', power: 4, class: 'big_skin' }
      ]
    }
  },
  props: ['score', 'skins_array', 'current_skin'],
  methods: {
    skins_check () {
      this.skins.forEach(skin => {
        document.querySelector('#' + skin.name.toLowerCase() + ' .skin_set').style = 'background: #aaa;pointer-events:none;'
        this.skins_array.forEach(ownedSkin => {
          if (skin.name.toLowerCase() === ownedSkin) {
            document.querySelector('#' + skin.name.toLowerCase() + ' .skin_buy').style = 'background: #aaa;pointer-events:none;'
            if (skin.name.toLowerCase() !== this.current_skin) {
              document.querySelector('#' + skin.name.toLowerCase() + ' .skin_set').style = ''
            }
          }
        })
      })
    }
  },
  mounted () {
    this.skins_check()
  },
  watch: {
    skins_array: {
      handler: function () {
        this.skins_check()
      },
      deep: true
    },
    current_skin: function () {
      this.skins_check()
    }
  }
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
