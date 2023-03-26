<template>
  <div class="shop">
    <span class="x_icon" id="x_close" @click.left="$emit('closeShop')">x</span>
    <h2>Sklep</h2>
    <h3>{{score}}C</h3>
        <div class="shop_item">
            <img src="@/images/cursor.png" style="height: 60px;width:60px;" class="shop_img">
            <label id="label_strength">Click Strength ({{strength}})</label>
            <button class="buy" data-price="100" data-type="click_strength" id="buy_strength">Buy (100)</button>
        </div><br />
        <div class="shop_item">
            <img src="@/images/clock.png" style="height: 40px;width:40px;" class="shop_img" id="clock_png">
            <label id="label_idle">Auto Clicking ({{idle_clicks}})</label>
            <button class="buy" data-price="200" data-type="idle_clicks" id="buy_idle">Buy (200)</button>
        </div><br />
        <div class="shop_item">
            <img src="@/images/fire.png" style="height: 40px;width:40px;" class="shop_img" id="fire_png">
            <label id="label_strength_buff">Strength Buff (20S)</label>
            <button class="buy buff" data-price="100" data-type="buff" data-buff="strength" id="buy_strength_buff">Buy (100)</button>
        </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      name: 'ShopPanel'
    }
  },
  props: ['score', 'strength', 'idle_clicks']
}
</script>
