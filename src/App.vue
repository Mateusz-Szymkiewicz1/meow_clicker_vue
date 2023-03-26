<template>
  <audio v-for="(url,i) in audios" :key="i" :src="require('@/audio/'+url)"></audio>
  <MainImage :skin="current_skin" :strength="click_strength" :skin_buff_strength="skin_buff_strength" v-on:img_click="click_event" :current_skin="current_skin"></MainImage>
  <span class="score">MeowCount: {{score}}</span>
  <span class="cps">CPS: 0</span>
  <button class="reset_btn" @click.left="show_decision_method">Reset</button>
  <div class="decision" v-show="show_decision">
    <span>Na pewno?</span><br />
    <button id="button_tak" @click.left="reset">TAK</button>
    <button id="button_nie" @click.left="hide_decision">NIE</button>
  </div>
  <span class="x_icon" id="x_open" @click.left="show_shop_method">Sklep</span>
  <span class="x_icon_skins" id="span_skins" @click.left="show_skins_method">Skiny</span>
  <i class="fa fa-cog settings_icon" @click.left="show_settings_method"></i>
  <ShopPanel @close-shop="close_shop" v-show="show_shop" :score="score" :strength="click_strength" :idle_clicks="idle_clicks" @buy-strength="buy_strength"></ShopPanel>
  <SkinsPanel v-show="show_skins" @close-skins="close_skins" :score="score"></SkinsPanel>
  <SettingsPanel v-show="show_settings" @close-settings="close_settings" @change_volume="change_volume" :volume="volume" :theme="theme" @change_theme="change_theme"></SettingsPanel>
</template>

<script>
import MainImage from '@/components/MainImage.vue'
import ShopPanel from '@/components/ShopPanel.vue'
import SkinsPanel from '@/components/SkinsPanel.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'
let score = 0
let idleClicks = 0
let clickStrength = 1
let skins = ['robert']
let currentSkin = 'robert'
let skinBuffStrength = 0
let hasSkinBuffAutoClick = 0
let theme = 'light'
let volume = 0.5
if (localStorage.getItem('meow_save')) {
  const json = JSON.parse(localStorage.getItem('meow_save'))
  score = parseInt(json.score)
  clickStrength = parseInt(json.click_strength)
  idleClicks = parseInt(json.idle_clicks)
  skins = json.skins
  currentSkin = json.current_skin
  skinBuffStrength = parseInt(json.skin_buff_strength)
  hasSkinBuffAutoClick = parseInt(json.has_skin_buff_auto_click)
}
if (localStorage.getItem('meow_settings')) {
  const json = JSON.parse(localStorage.getItem('meow_settings'))
  volume = parseFloat(json.volume)
  theme = json.theme
}
export default {
  data: function () {
    return {
      cps: 0,
      score: score,
      volume: volume,
      theme: theme,
      click_strength: clickStrength,
      idle_clicks: idleClicks,
      skins: skins,
      strength_buff_active: false,
      current_skin_buff: '',
      current_skin_buff_amount: 0,
      skin_buff_strength: skinBuffStrength,
      has_skin_buff_auto_click: hasSkinBuffAutoClick,
      current_skin: currentSkin,
      show_decision: false,
      show_shop: false,
      show_skins: false,
      show_settings: false,
      audios: ['meow.mp3', 'sound1.wav', 'sound2.wav', 'sound3.wav', 'sound4.wav', 'sound5.wav', 'sound6.wav', 'sound7.wav', 'sound8.wav', 'sound9.wav']
    }
  },
  components: {
    MainImage,
    ShopPanel,
    SkinsPanel,
    SettingsPanel
  },
  methods: {
    click_event () {
      this.cps++
      this.score = parseInt(this.score + this.click_strength + this.skin_buff_strength)
      this.save_score()
      const audio = document.querySelector('audio').cloneNode()
      audio.volume = 0.4 * this.volume
      audio.play()
    },
    reset () {
      localStorage.removeItem('meow_save')
      document.location.reload()
    },
    save_score () {
      let strength = this.click_strength
      let skinBuffStrength = this.skin_buff_strength
      if (this.strength_buff_active) {
        strength = strength / 2
        skinBuffStrength = skinBuffStrength / 2
      }
      window.localStorage.setItem('meow_save', JSON.stringify({
        score: this.score,
        click_strength: strength,
        idle_clicks: this.idle_clicks,
        skins: this.skins,
        current_skin: this.current_skin,
        skin_buff_strength: skinBuffStrength,
        has_skin_buff_auto_click: this.has_skin_buff_auto_click
      }))
    },
    save_settings () {
      localStorage.setItem('meow_settings', JSON.stringify({
        volume: this.volume,
        theme: this.theme
      }))
    },
    randomNumber (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    dark_theme () {
      this.theme = 'dark'
      document.documentElement.style.setProperty('--color', '#ffffff')
      document.documentElement.style.setProperty('--bg', '#202020')
      document.documentElement.style.setProperty('--button-bg', 'transparent')
      document.querySelector('.reset_btn').classList.add('dark_button')
    },
    light_theme () {
      this.theme = 'light'
      document.documentElement.style.setProperty('--color', '#000000')
      document.documentElement.style.setProperty('--bg', '#ffffff')
      document.documentElement.style.setProperty('--button-bg', '#202020')
      document.querySelector('.reset_btn').style.cssText = 'border: 1px solid #202020;'
    },
    change_volume (e) {
      this.volume = document.querySelector('input[type=range]').value / 100
      this.save_settings()
    },
    change_theme (e) {
      if (this.theme === 'light') {
        this.dark_theme()
      } else {
        this.light_theme()
      }
      this.save_settings()
    },
    show_decision_method () {
      this.show_decision = true
      document.querySelector('.decision').classList.add('slideInDown')
    },
    hide_decision () {
      document.querySelector('.decision').classList.remove('slideInDown')
      document.querySelector('.decision').classList.add('slideOutUp')
      setTimeout(() => {
        this.show_decision = false
        document.querySelector('.decision').classList.remove('slideOutUp')
      }, 450)
    },
    show_shop_method () {
      this.show_shop = true
      document.querySelector('.shop').classList.add('slideInRight')
    },
    close_shop () {
      document.querySelector('.shop').classList.remove('slideInRight')
      document.querySelector('.shop').classList.add('slideOutRight')
      setTimeout(() => {
        this.show_shop = false
        document.querySelector('.shop').classList.remove('slideOutRight')
      }, 450)
    },
    show_skins_method () {
      this.show_skins = true
      document.querySelector('.skiny').classList.add('slideInRight')
    },
    close_skins () {
      document.querySelector('.skiny').classList.remove('slideInRight')
      document.querySelector('.skiny').classList.add('slideOutRight')
      setTimeout(() => {
        this.show_skins = false
        document.querySelector('.skiny').classList.remove('slideOutRight')
      }, 450)
    },
    show_settings_method () {
      this.show_settings = true
      document.querySelector('.settings').classList.add('slideInRight')
    },
    close_settings () {
      document.querySelector('.settings').classList.remove('slideInRight')
      document.querySelector('.settings').classList.add('slideOutRight')
      setTimeout(() => {
        this.show_settings = false
        document.querySelector('.settings').classList.remove('slideOutRight')
      }, 450)
    },
    buy_strength (price, target) {
      if (this.score >= price) {
        this.score -= price
        this.click_strength++
        this.save_score()
      } else {
        target.classList.add('shake')
        setTimeout(function () {
          target.classList.remove('shake')
        }, 1000)
      }
    }
  },
  mounted () {
    setInterval(() => {
      if (this.cps > 5) {
        const rand = Math.floor(this.randomNumber(2, 10))
        const audio = document.querySelector(`audio:nth-of-type(${rand})`).cloneNode()
        audio.volume = this.volume
        audio.play()
      }
      document.querySelector('.cps').innerText = `CPS: ${this.cps}`
      this.cps = 0
    }, 1000)
    if (this.theme === 'dark') {
      this.dark_theme()
    }
  }
}
</script>
<style scoped>
  .dark_button{
    border: 1px solid var(--color) !important;
  }
  .dark_button:hover{
    background: #fff !important;
    color: #202020 !important;
  }
</style>
