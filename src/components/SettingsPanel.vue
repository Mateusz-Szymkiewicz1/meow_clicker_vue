<template>
   <div class="settings">
        <span class="x_icon" id="x_settings" @click.left="$emit('closeSettings')">x</span>
        <h2>Ustawienia</h2><br /><br />
        <label>Głosnosc</label><br /><br />
        <input type="range" :value="volume*100" @change="$emit('change_volume')"><br /><br />
        <label>Motyw</label><br /><br />
        <div class='toggle-switch'>
            <label>
                <input type='checkbox' checked="true" class="theme_switch" @click.left="$emit('change_theme')">
                <span class='slider'></span>
            </label>
        </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      name: 'SettingsPanel'
    }
  },
  props: ['volume', 'theme'],
  mounted () {
    if (this.theme === 'dark') {
      document.querySelector('.theme_switch').checked = false
    }
  }
}
</script>
