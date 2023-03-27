<template>
  <img :src="require('@/images/'+current_skin+'.jpg')" @click.left="clickHandle" id="cat_img" style="transform: scale(1)" draggable="false">
</template>

<script>
export default {
  data: function () {
    return { name: 'MainImage' }
  },
  props: ['skin', 'strength', 'skin_buff_strength', 'current_skin'],
  methods: {
    click_effect (e) {
      const div = document.createElement('div')
      div.classList.add('random_div')
      div.innerText = `+${this.strength + this.skin_buff_strength}`
      div.setAttribute('style', `position: absolute; top: ${e.clientY}px;left: ${e.clientX}px;`)
      document.querySelector('#app').appendChild(div)
      setTimeout(function () {
        div.remove()
      }, 500)
    },
    clickHandle (e = null) {
      if (document.querySelector('#cat_img').style.transform === 'scale(1)') {
        document.querySelector('#cat_img').style.transform = 'scale(1.1)'
      } else {
        document.querySelector('#cat_img').style.transform = 'scale(1)'
      }
      if (e) {
        this.click_effect(e)
      }
      this.$emit('img_click')
    }
  },
  mounted () {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 32) {
        this.clickHandle()
      }
    })
  }
}
</script>
<style scoped>
#cat_img{
    display: block;
    margin: auto;
    margin-top: 11vh;
    cursor: pointer;
    transition: 0.1s;
    box-shadow: -3px 1px 42px -5px rgba(0,0,0,0.75);
    height: 20vw;
    width: 20vw;
    min-height: 200px;
    min-width: 200px;
}
</style>
