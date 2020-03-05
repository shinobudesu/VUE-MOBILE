<template>
  <div id="layout">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      show: true
    };
  },
  methods: {},
  components: {},
  computed: {}
};
</script>

<style lang="less" scoped>
#layout {
  height: 100%;
  width: 100%;
  position: relative;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.2s;
}
</style>