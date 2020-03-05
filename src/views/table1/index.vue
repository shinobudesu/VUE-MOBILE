<template>
  <div id="table1">
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
                v-model="formData1.data[dataHeader[index1].a+ '_' + it.name]"
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
          a: "政治素质",
          t: [
            { name: "总体评价", val: 0 },
            { name: "政治方向", val: 0 },
            { name: "企业党建", val: 0 },
            { name: "社会责任", val: 0 },
            { name: "党管干部", val: 0 }
          ]
        },
        {
          a: "经营能力",
          t: [
            { name: "总体评价", val: 0 },
            { name: "经济效益", val: 0 },
            { name: "承担重大任务", val: 0 },
            { name: "改革创新", val: 0 },
            { name: "科学管理", val: 0 }
          ]
        },
        {
          a: "团结协作",
          t: [
            { name: "总体评价", val: 0 },
            { name: "民主集中", val: 0 },
            { name: "整体合力", val: 0 },
            { name: "运行机制", val: 0 },
            { name: "人际关系", val: 0 }
          ]
        },
        {
          a: "作风形象",
          t: [
            { name: "总体评价", val: 0 },
            { name: "廉洁自律", val: 0 },
            { name: "联系群众", val: 0 },
            { name: "选人用人", val: 0 },
            { name: "执行力度", val: 0 }
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
      formData1: { id: 0, page: 1, data: {} }
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
      if (this.$store.state.formData1.length > 0) {
        this.$store.state.formData1.map(t => {
          if (t.id == parseInt(this.$route.params.id)) {
            this.formData1 = t;
          }
        });
      }
    },
    "$store.state.pageFlag": function() {
      this.initPerson();
      this.saveData();
      this.formData1 = { id: 0, data: {} };
      this.$router.push(
        "/table1/" + this.$store.state.table1Person[this.$route.meta.index].id
      );
      // 你需要执行的代码
    }
  },
  methods: {
    initData() {
      this.dataHeader.map(it => {
        it.t.map(i => {
          this.formData1.data[it.a + "_" + i.name] = "";
        });
      });
    },
    initPerson() {
      if (this.$store.state.table1Person.length > 0) {
        this.nowName = this.$store.state.table1Person[
          this.$route.meta.index
        ].name;
      }
    },
    saveData() {
      this.formData1.id = parseInt(this.$route.params.id);
      this.$store.commit("setFormData1", this.formData1);
    }
  }
};
</script>

<style lang="less" scoped>
#table1 {
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