<template>
  <div class="shop">
    <span class="x_icon" id="x_close" @click.left="$emit('closeShop')">x</span>
    <h2>Sklep</h2>
    <h3>{{score}}C</h3>
        <div v-for="(item,i) in items" :key="i" class="shop_item">
            <img :src="require('@/images/'+item.icon+'.png')" :style="`height: ${item.size}px;width:${item.size}px;`" class="shop_img" :id="'shop_img'+i">
            <label>{{item.title}}</label>
            <button class="buy" @click.left="$emit(item.method,item.type,item.price,$event.target)">Buy ({{item.price}})</button>
        </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return { name: 'ShopPanel', items: this.getInventory() }
  },
  methods: {
    getInventory () {
      return [
        { icon: 'cursor', size: 60, title: 'Click Strength (' + this.strength + ')', price: 100 * this.strength, method: 'buy', type: 'click_strength' },
        { icon: 'clock', size: 40, title: 'Auto Clicking (' + this.idle_clicks + ')', price: 200 * this.idle_clicks + 200, method: 'buy', type: 'idle_clicks' },
        { icon: 'fire', size: 40, title: 'Strength Buff (20S)', price: 100 * this.strength, method: 'buyBuff', type: 'strength' }
      ]
    }
  },
  props: ['score', 'strength', 'idle_clicks'],
  watch: {
    strength: function () {
      this.items = this.getInventory()
    },
    idle_clicks: function () {
      this.items = this.getInventory()
    }
  }
}
</script>
<style scoped>
  #shop_img1,#shop_img2{
    margin-top: -5px;
    margin-left: 30px;
    margin-right: 20px;
  }
  .shop_item{
    margin-bottom: 20px;
  }
</style>
