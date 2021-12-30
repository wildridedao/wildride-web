<template>
  <div class="zjlx">
    <div class="toolbar setBox">
      <div class="flex1 ">
          <center>
              <div @click="setActive('min5')" class="itemBt" :class="{ 'active2':active=='min5' }">
                5分
              </div>
          </center>
      </div>
       <div class="flex1 ">
           <center>
              <div @click="setActive('h1')" class="itemBt" :class="{ 'active2':active=='h1' }">
                1时
              </div>
          </center>
      </div>
       <div class="flex1 ">
           <center>
               <div @click="setActive('d1')" class="itemBt" :class="{ 'active2':active=='d1' }">
                1天
              </div>
          </center>
      </div>
       <div class="flex1 ">
          <center>
               <div @click="setActive('d3')" class="itemBt" :class="{ 'active2':active=='d3' }">
                3天
              </div>
          </center>
      </div>
       <div class="flex1 ">
          <center>
               <div @click="setActive('d7')" class="itemBt" :class="{ 'active2':active=='d7' }">
                1周
              </div>
          </center>
      </div>
       <div class="flex1 ">
          <center>
               <div @click="setActive('d30')" class="itemBt" :class="{ 'active2':active=='d30' }">
                1月
              </div>
          </center>
      </div>
    </div>
    <div id="ppcs" class="setBox">
    </div>
    <div class="setBox noLine tabled" v-if="tdata">
        <div class="setBox lined" style="height:30px;position:relative;top:5px">
            <div class="gwe  sd"></div>
            <div class="flex1 getWidth sd gwe">买入($)</div>
            <div class="flex1 getWidth sd gwe">卖出($)</div>
            <div class="flex1 getWidth sd gwe">净流入($)</div>
        </div>
        <div class="setBox lined flex1 " >
            <div class="gwe  sd">小单</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_small_in,2)}}</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_small_out,2)}}</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_small_sum,2)}}</div>
        </div>
        <div class="setBox lined flex1 " >
            <div class="gwe  sd">中单</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_mid_in,2)}}</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_mid_out,2)}}</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_mid_sum,2)}}</div>
        </div>
        <div class="setBox lined flex1 " >
            <div class="gwe  sd">大单</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_big_in,2)}}</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_big_out,2)}}</div>
            <div class="flex1 getWidth sd">{{fomatFloat(tdata.f_big_sum,2)}}</div>
        </div>
        <div class="setBox lined flex1 " >
            <div class="gwe  sd">加总</div>
            <div class="flex1 getWidth sd">
              {{fomatFloat(Number(tdata.f_small_in)+Number(tdata.f_mid_in)+Number(tdata.f_big_in),2)}}
            </div>
            <div class="flex1 getWidth sd">
              {{fomatFloat(Number(tdata.f_small_out)+Number(tdata.f_mid_out)+Number(tdata.f_big_out),2)}}
            </div>
            <div class="flex1 getWidth sd">
               {{fomatFloat(Number(tdata.f_small_sum)+Number(tdata.f_mid_sum)+Number(tdata.f_big_sum),2)}}
            </div>
        </div>
    </div>
    <div class="msgd">
      <p>
        交易笔数：{{fomatFloat(tdata.f_swap_count,0)}}笔,买入{{fomatFloat(tdata.f_swap_count_in,0)}}笔,卖出{{fomatFloat(tdata.f_swap_count_out,0)}}笔;
      </p>
      <p>
        成交金额：${{fomatFloat(tdata.f_swap_price,2)}},买入${{fomatFloat(tdata.f_swap_price_in,2)}},卖出${{fomatFloat(tdata.f_swap_price_out,2)}};
      </p>
      <p>
        成交币量：{{fomatFloat(tdata.f_swap,0)}},买入{{fomatFloat(tdata.f_swap_in,0)}},卖出{{fomatFloat(tdata.f_swap_out,0)}};
      </p>
    </div>
  </div>
</template>
<script>
import _URL from "../../lib/url";
import { Toast, Dialog, RadioGroup, Radio } from "vant";
import { getAction, postAction } from "@/api/manage";
import * as echarts from "echarts";
export default {
  name: "index",
  props:['id'],
  data: function() {
    return {
      active: 0,
      c1:'',
      active:'min5',
      tdata:''
    };
  },
  mounted: function() {
    let that = this
    that.c1 = echarts.init(document.getElementById("ppcs"));
    that.setActive('min5')
  },
  methods: {
    getData(type){

    },
    fomatFloat(src,pos){     
          return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);     
    },
    setActive(val){
      let that = this;
      that.active =val;
        let obj = {
          "F_Tokenid":that.id,
          "timetype":val
        
        };
        getAction(`${_URL.SwapChar}`, obj).then(res => {
              //console.log(JSON.stringify(res));
              if(res.code==200){
                    that.tdata = res.data.results[0]
                    that.initChart(
                      [
                        { value: that.fomatFloat(that.tdata.f_small_in,2), name: '小单买入' },
                        { value: that.fomatFloat(that.tdata.f_mid_in,2), name: '中单买入' },
                        { value: that.fomatFloat(that.tdata.f_big_in,2), name: '大单买入' },
                        { value: that.fomatFloat(that.tdata.f_small_out,2), name: '小单卖出' },
                        { value: that.fomatFloat(that.tdata.f_mid_out,2), name: '中单卖出' },
                        { value: that.fomatFloat(that.tdata.f_big_out,2), name: '大单卖出' }
                      ]
                    );
              }else{
                Toast.fail(res.msg);
              }
        });
    },
     initChart(val) {
   
        let that = this
        var option = {
       
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: val,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      that.c1.setOption(option);
    },
  }
};
</script>
<style lang="less">
.toolbar{
  margin: 0 10px 0 10px;
}
.itemBt{
  width: 50px;
  height: 30px;
  line-height: 30px;
  background: #f4f4f4;
  margin-top: 15px;
  border-radius:5px;
  font-size: 15px;
}
.active2{
  background: #5c8bf0;
  color:white;
}
.zjlx{
  background: white;
}
#ppcs{
  height: 260px;
  margin:0;
  padding:0;
}
.tabled{
  margin: 0 20px 0 20px;
  background: #f5f5f5;
  text-align: center;
  margin-bottom: 20px;
  height: 200px;
  border-radius:5px;
}
.gwe{
  width:60px;
  color:#8b8686
}
.sd{
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 10px;
}
.lined{
  border-bottom: solid 1px white;
}
.sd{
  border-left: solid 1px white;
}
.msgd{
  margin: 0 20px 0 25px;
  margin-bottom: 20px;
}
.msgd p{
  color:#575353;
  margin-top: 20px;
}
</style>

