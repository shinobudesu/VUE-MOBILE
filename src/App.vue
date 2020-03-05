<template>
  <div id="app">
    <van-popup
      round
      get-container="#app"
      v-model="show1"
      class="popupAB"
      :close-on-click-overlay="false"
    >
      <p class="tip">请选择类型</p>
      <van-radio-group v-model="radio1" direction="horizontal" class="ab">
        <van-radio :name="1">A 类</van-radio>
        <van-radio :name="2">B 类</van-radio>
      </van-radio-group>
      <van-button type="info" round size="small" class="btn" @click="clickRadio1">确认</van-button>
    </van-popup>
    <van-popup
      round
      get-container="#app"
      v-model="show2"
      class="popupAB"
      :close-on-click-overlay="false"
    >
      <p class="tip">是否重要领导？</p>
      <van-radio-group v-model="radio2" direction="horizontal" class="ab">
        <van-radio :name="1">是</van-radio>
        <van-radio :name="2">否</van-radio>
      </van-radio-group>
      <van-button type="info" round size="small" class="btn" @click="clickRadio2">确认</van-button>
    </van-popup>
    <router-view></router-view>
    <div v-show="showDom" class="page">
      <van-button
        class="btn"
        type="info"
        size="small"
        @click="delPage"
        v-if="this.$store.state.page!=1"
      >上一张表</van-button>
      <van-button
        class="btn"
        type="info"
        size="small"
        @click="addPage"
        v-if="this.$store.state.page!=2"
      >下一张表</van-button>
    </div>
    <van-icon
      v-if="$route.meta.index!=0"
      class="arrowleft"
      name="arrow-left"
      color="#2d6eaf"
      size="50"
      v-show="showDom"
      @click="toPre"
    />
    <van-icon
      v-if="$route.meta.index!=($store.state.table2Person.length-1)"
      class="arrowright"
      name="arrow"
      color="#2d6eaf"
      size="50"
      v-show="showDom"
      @click="toNext"
    />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      show1: true,
      show2: false,
      radio1: 1,
      radio2: 1,
      showDom: false,
      data: [
        { name: "任帅", id: 0 },
        { name: "李标", id: 1 }
      ]
    };
  },
  created() {
    this.$store.commit("setTable2Person", this.data);
    this.$store.commit("setTable1Person", this.data);
  },
  methods: {
    clickRadio1() {
      this.show1 = false;
      this.radio1 == 1 ? (this.show2 = true) : (this.showDom = true);
    },
    clickRadio2() {
      this.show2 = false;
      this.showDom = true;
    },
    toPre() {
      this.$route.meta.index--;
      this.$store.commit("setPageFlag");
    },
    toNext() {
      this.$route.meta.index++;
      this.$store.commit("setPageFlag");
    },
    addPage() {
      this.$store.commit("addPage");
      this.topage();
    },
    delPage() {
      this.$store.commit("delPage");
      this.topage();
    },
    topage() {
      this.$router.push(
        `/table${this.$store.state.page}/${
          this.$store.state["table" + this.$store.state.page + "Person"][
            this.$route.meta.index
          ].id
        }`
      );
    }
  },
  watch: {
    showDom() {
      this.$router.push("/table1/" + this.data[0].id);
    }
  },
  components: {}
};
</script>

<style lang="less">
#app {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .popupAB {
    width: 200px;
    height: 150px;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    .tip {
      margin: 0;
      text-align: center;
    }
    .ab {
      height: 70px;
      display: flex;
      justify-content: center;
    }
    .btn {
      height: 40px;
      width: 100px;
    }
  }
  .page {
    position: relative;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
    .btn {
      margin: 0 10px;
    }
  }
  .arrowleft,
  .arrowright {
    position: fixed;
    top: 50%;
    margin-top: -25px;
    z-index: 100;
    border-radius: 50%;
    transition: all 0.5s;
    background: #ccc;
    opacity: 0.3;
  }
  .arrowleft {
    left: 0px;
  }
  .arrowright {
    right: 0px;
  }
}
</style>
