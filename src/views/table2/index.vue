<template>
  <div id="table2">
    <van-panel :title="$route.meta.title" :desc="$route.meta.desc" :status="nowName">
      <div class="tableContent">
        <van-divider style="color:red; border-color:#ccc;
">请根据实际情况如实填写</van-divider>
        <van-form class="form">
          <div class="formItem" v-for="(i,index1) in 5" :key="index1">
            <van-divider
              v-if="dataHeader[index1].a!=''"
              :style="{ color: 'red', borderColor: '#ccc'}"
            >{{dataHeader[index1].a}}</van-divider>
            <div v-for="(it,index2) in dataHeader[i-1].t" :key="index2">
              <van-divider
                content-position="left"
                :style="{ color: '#000', borderColor: '#ccc', padding: '0 4px' }"
              >{{it.name}}</van-divider>
              <van-radio-group
                v-model="formData2.data[dataHeader[index1].a+ '_' + it.name]"
                direction="horizontal"
                class="radiogroup"
              >
                <van-radio
                  shape="square"
                  :name="item.value"
                  v-for="(item,e) in label"
                  :key="e"
                >{{item.label}}</van-radio>
              </van-radio-group>
            </div>
          </div>
          <!-- <div style="margin: 30px 16px;">
            <van-button round block type="info" @click="save">提交</van-button>
          </div>-->
        </van-form>
      </div>
      <!-- <div slot="footer" style="text-align:right">
        <van-button size="small" type="danger">确认提交</van-button>
      </div>-->
    </van-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowName: "",
      dataHeader: [
        {
          a: "",
          t: [{ name: "总体评价", val: 0 }]
        },
        {
          a: "德",
          t: [
            { name: "总体评价", val: 0 },
            { name: "政治素质", val: 0 },
            { name: "个人品质", val: 0 },
            { name: "职业素养", val: 0 }
          ]
        },
        {
          a: "能",
          t: [
            { name: "总体评价", val: 0 },
            { name: "科学决策", val: 0 },
            { name: "推动执行", val: 0 },
            { name: "学习创新", val: 0 }
          ]
        },
        {
          a: "勤",
          t: [
            { name: "总体评价", val: 0 },
            { name: "工作效率", val: 0 },
            { name: "工作态度", val: 0 },
            { name: "推进力度", val: 0 }
          ]
        },
        {
          a: "绩",
          t: [
            { name: "总体评价", val: 0 },
            { name: "履职绩效", val: 0 },
            { name: "协同成效", val: 0 },
            { name: "团队建设", val: 0 }
          ]
        },
        {
          a: "廉",
          t: [
            { name: "总体评价", val: 0 },
            { name: "廉洁自律", val: 0 },
            { name: "作风建设", val: 0 },
            { name: "依法合规", val: 0 }
          ]
        }
      ],
      label: [
        {
          label: "优秀",
          value: 1
        },
        {
          label: "称职",
          value: 2
        },
        {
          label: "基本称职",
          value: 3
        },
        {
          label: "不称职",
          value: 4
        }
      ],
      formData2: { id: 0, page: 2, data: {} }
    };
  },

  created() {
    this.initPerson();
  },
  mounted() {
    //this.initData();
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (this.$store.state.formData2.length > 0) {
        this.$store.state.formData2.map(t => {
          if (t.id == parseInt(this.$route.params.id)) {
            this.formData2 = t;
          }
        });
      }
    },
    "$store.state.pageFlag": function() {
      this.initPerson();
      this.saveData();
      this.formData2 = { id: 0, data: {} };
      this.$router.push(
        "/table2/" + this.$store.state.table2Person[this.$route.meta.index].id
      );
      // 你需要执行的代码
    }
  },
  methods: {
    initData() {
      this.dataHeader.map(it => {
        it.t.map(i => {
          this.formData2.data[it.a + "_" + i.name] = "";
        });
      });
    },
    initPerson() {
      if (this.$store.state.table2Person.length > 0) {
        this.nowName = this.$store.state.table2Person[
          this.$route.meta.index
        ].name;
      }
    },
    saveData() {
      this.formData2.id = parseInt(this.$route.params.id);
      this.$store.commit("setFormData2", this.formData2);
    }
  }
};
</script>

<style lang="less" scoped>
#table2 {
  position: relative;
  padding-bottom: 40px;
  .van-panel__header {
    background-color: #cc2e2e;
    border-radius: 0px 0px 30px 30px;
    color: #fff;
    .van-cell__label {
      color: rgb(219, 208, 208);
      font-size: 10px;
    }
    .van-panel__header-value {
      color: rgb(255, 255, 255);
    }
  }
  /deep/.van-cell__title {
    flex: 0 1 80%;
  }
  /deep/.form {
    background: #f8f8f8;
    padding: 10px 0;
    /deep/.van-cell__title {
      flex: 0 1 80px;
    }
    .van-divider--content-left::before {
      max-width: 1% !important;
    }
    .radiogroup {
      justify-content: center;
    }
  }
}
</style>