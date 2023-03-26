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
<style scoped>
.settings > input[type=range]{
    margin-left: 100px;
    transform: scale(2);
    cursor: pointer;
    outline: none;
    border: 0;
}
.settings > label{
    margin-left: 35px;
    font-size: 25px;
}
.toggle-switch {
    position: relative;
    width: 200px;
}
.toggle-switch label {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: var(--dark);
    border-radius: 50px;
    cursor: pointer;
}
.toggle-switch input{
    position: absolute;
    display: none;
}
.slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: 0.3s;
}
.toggle-switch input:checked ~ .slider {
    background-color: var(--light);
}
.slider::before {
    content: "";
    position: absolute;
    top: 13px;
    left: 16px;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    box-shadow: inset 28px -4px 0px 0px var(--light);
    background-color: var(--dark);
    transition: 0.3s;
}
.toggle-switch input:checked ~ .slider::before {
    transform: translateX(95px);
    background-color: var(--dark);
    box-shadow: none;
}
.toggle-switch {
    transform: scale(0.5);
    margin-left: -13px;
}
</style>
