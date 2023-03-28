import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/style.css'

createApp(App).mount('#app')

function responsivity (x) {
  if (x.matches) {
    document.querySelector('#x_open').innerHTML = '<i class="fa fa-shopping-cart"></i>'
    document.querySelector('#span_skins').innerHTML = '<i class="fa fa-paint-brush"></i>'
  } else {
    document.querySelector('#x_open').innerHTML = 'SKLEP'
    document.querySelector('#span_skins').innerHTML = 'SKINY'
  }
}
var x = window.matchMedia('(max-width: 630px)')
responsivity(x)
x.addListener(responsivity)

window.cheat = function (score) {
  window.app.score = score
}
