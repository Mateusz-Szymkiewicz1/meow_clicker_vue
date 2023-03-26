<template>
  <img :src="require('@/images/'+current_skin+'.jpg')" @click.left="clickHandle" id="cat_img" style="transform: scale(1)" draggable="false">
</template>

<script>
export default {
  data: function () {
    return {
      name: 'MainImage'
    }
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
    clickHandle (e) {
      if (document.querySelector('#cat_img').style.transform === 'scale(1)') {
        document.querySelector('#cat_img').style.transform = 'scale(1.1)'
      } else {
        document.querySelector('#cat_img').style.transform = 'scale(1)'
      }
      this.click_effect(e)
      this.$emit('img_click')
    }
  }
}
</script>
