<template>
  <div class="token">
    <van-nav-bar
      class="headers"
      :title="name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
       
      </template>
    </van-nav-bar>
    <center>
      <img src="image/titlen.png" class="titimg" />
    </center>
    <div class="getBuildS"></div>
    <!-- 顶部结束 -->
    <div v-if="isLoading">
      <br>
      <van-skeleton title avatar :row="3" />
      <br>
    </div>
    <div v-if="!isLoading">
      <div v-if="!price" style="height:135px" id="tzw">
        <br>
        <van-skeleton title avatar :row="3" />
        <br>
      </div>
      <div class="mainItem" v-if="price">
        <div class="line setBox">
          <div class="flex1">
            <font class="allMoney">
              <font style="font-size: 15px"> $ </font>
              <b>{{fomatFloat(price.F_Price,18)}}</b>
              <font style="font-size: 15px; margin-left: 2px">
                <!-- <b>↓</b> -->
              </font>
            </font>
          </div>
          <!-- <div class="flex1">
            <span class="pm">
              <van-icon name="fire" />
              NO.{{$route.query.index+1}}
            </span>
          </div> -->
        </div>
        <div class="line setBox" style="margin-top: 1px">
          <div class="flex1">
            <font class="price">
              <!-- ≈$61187.8 -->
              <font style="color: red"> {{kad}}%</font>
            </font>
          </div>
          <!-- <div class="flex1">
            <span class="ltsz"> 流通市值 {{getAllNum(price.allamountprice)}} </span>
          </div> -->
        </div>
        <div class="line setBox" style="margin-top: 8px" >
          <div class="flex1 getWidth sixBuild setBox noLine">
            <div class="flex1">
              <font class="sTitle">流通市值</font>
              <font class="sNum">${{getAllNum(price.allamountprice)}}</font>
            </div>
            <div class="flex1">
              <font class="sTitle">24H高</font>
              <font class="sNum">${{fomatFloat(price.maxprice,8)}}</font>
            </div>
            <div class="flex1">
              <font class="sTitle">24H低</font>
              <font class="sNum">${{fomatFloat(price.minprice,8)}}</font>
            </div>
            <div class="flex1">
              <font class="sTitle">24H波幅</font>
              <font class="sNum">{{fomatFloat2(price.wave,2)}}%</font>
            </div>
          </div>
          <div class="flex1 getWidth sixBuild">
            <div class="flex1">
              <font class="sTitle">总量</font>
              <font class="sNum">{{getAllNum(price.F_Total)}}</font>
            </div>
            <div class="flex1">
              <font class="sTitle">24H量</font>
              <font class="sNum">{{getAllNum(price.amount)}}</font>
            </div>
            <div class="flex1">
              <font class="sTitle">24H额</font>
              <font class="sNum">{{getAllNum(price.amountprice)}}</font>
            </div>
            <div class="flex1">
              <font class="sTitle">24H换手</font>
              <font class="sNum">{{fomatFloat2(price.changprice,2)}}%</font>
            </div>
          </div>
        </div>
        <div  class="line setBox lines" style="margin-top:8px;position:relative;">
              <font @click="toBnb()" class="sTitle color2">合约地址：</font>
              <font @click="toBnb()" class="flex1 sNum">{{id.substring(0,10)}}...{{id.substring(id.length-10)}}</font>
              <font class="flex1 sNum" style="display:none" ret="container">{{id}}</font>
              <div class="cpBtn"  @click="copyCode()">
                <img src="image/copy.png" alt="" class="cbtn">
              </div>
        </div>
      </div>
    </div>
    <div class="setBox tools">
        <div class="flex1 setBox noLine cItem getWidth" @click="setAct(1)">
                <font class="ctits noActive" :class="{'active':nowAct==1}">24H</font>
                <!-- <font class="cnums setRed">-1.97%</font> -->
        </div>
        <div class="flex1 setBox noLine cItem getWidth" @click="setAct(2)">
                <font class="ctits noActive" :class="{'active':nowAct==2}">1周</font>
                <!-- <font class="cnums setRed">-1.78%</font> -->
        </div>
        <div class="flex1 setBox noLine cItem getWidth" @click="setAct(3)">
                <font class="ctits noActive" :class="{'active':nowAct==3}">30日</font>
                <!-- <font class="cnums">+28.3</font> -->
        </div>
        <div class="flex1 setBox noLine cItem getWidth" @click="setAct(4)">
                <font class="ctits noActive" :class="{'active':nowAct==4}">1年</font>
                <!-- <font class="cnums">+28.3</font> -->
        </div>
        <div class="flex1 setBox noLine cItem getWidth" @click="setAct(5)">
                <font class="ctits noActive" :class="{'active':nowAct==5}">所有</font>
                <!-- <font class="cnums">+21476倍</font> -->
        </div>
    </div>
    <div id="myChart" style="width: 100%; height: 280px"></div>
     <!-- <div class="setBox tools" style="margin-top:-7px;padding-bottom:10px">
        <div class="flex1 setBox noLine cItem getWidth">
                <font class="cnums">看多52.14%</font>
        </div>
        <div class="flex1 setBox noLine cItem getWidth">
                <font class="cnums setRed">看多47.86%</font>
        </div>
    </div> -->
    <van-tabs  color="#0e5eed" class="v-tabs" v-model="activeName" style="z-index:1 !important">
      <van-tab v-for="index in menus" :title="index" :key="index" :name="index">
      </van-tab>
    </van-tabs>
     <div v-if="isLoading2"> 
        <br>
       
       <van-skeleton title avatar :row="3" />
        <van-skeleton title avatar :row="3" />
        <van-skeleton title avatar :row="3" />
        <van-skeleton title avatar :row="4" />
        <van-skeleton title avatar :row="4" />
    </div>
    <div v-if="!isLoading2"> 
      <div v-if="activeName=='持币地址监控'">
         <div class="t100">持币占比</div>
          <div class="line setBox cbzb" style="margin-top: 8px" >
            <div class="flex1 getWidth sixBuild setBox noLine">
              <div class="flex1">
                <font class="sTitle">持币前10名</font>
                <font class="sNum">{{getFd(t10,price.F_Total)}}%</font>
              </div>
              <div class="flex1">
                <font class="sTitle">持币前50名</font>
                <font class="sNum">{{getFd(t50,price.F_Total)}}%</font>
              </div>
            
            </div>
            <div class="flex1 getWidth sixBuild">
              <div class="flex1">
                <font class="sTitle">持币前20名</font>
                <font class="sNum">{{getFd(t20,price.F_Total)}}%</font>
              </div>
              <div class="flex1">
                <font class="sTitle">持币前100名</font>
                <font class="sNum">{{getFd(t100,price.F_Total)}}%</font>
              </div>
            
            </div>
          </div>
          <div class="t100">持币地址TOP100</div>
            <div class="setBox mainItem tits2" >
                <!-- <div class="zbs number " style="width:50px">
                  
                </div>
                <div class="flex1 zbs3 setBox noLine getWidth titItem fuLeft">
                  持仓占比
                </div>
                <div class="flex1 zbs3 setBox noLine getWidth titItem" >
                  持仓数量
                  </div>
                <div class="flex1 zbs3 setBox noLine  titItem" >
                  7日波动
                </div>
                 <div class="flex1 zbs3 setBox noLine  titItem" >
                  钱包地址
                </div> -->
                 <div class="zbs number titItem" >
                 #
                </div>
                <div class="flex1 zbs setBox noLine titItem">
                  持仓占比
                </div>
                <div class="flex1 zbs setBox noLine titItem">
                   持仓数量
                </div>
                <div class="flex1 zbs setBox noLine titItem" >
                   钱包地址
                </div>
            </div>
            <div class="setBox mainItem setBorder" v-for="(item,index) in adss" :key="index">
                <div class="zbs number " v-if="index<=2">
                  {{index+1}}
                </div>
                <div class="zbs number2 " v-if="index>2">
                  {{index+1}}
                </div>
                <div class="flex1 zbs setBox noLine">
                 {{getFd(item.F_Value,price.F_Total)}}%
                </div>
                <div class="flex1 zbs setBox noLine">
                    {{fomatFloat(item.F_Value,0)}}
                </div>
                <!-- <div class="flex1 zbs setBox noLine zhand" >
                    {{item.day7}}
                </div> -->
                <div class="flex1 zbs setBox noLine " >
                    <font style="color:#5e91ed" @click="showStr(item)">查看</font>
                </div>
            </div>
      </div>
      <div v-if="activeName=='资金流向分析'">
        <zjlx :id="id"/>
      </div>
    </div>
    <van-action-sheet
      v-model="show"  
      cancel-text="取消"   
      :description="nowAds.F_Address"
      close-on-click-action
      :actions="actions" 
      @select="onSelect" 
    />



  <!-- <van-action-sheet
  v-model="show"
  :actions="actions"
  cancel-text="取消"
  close-on-click-action
  @cancel="onCancel"
/> -->
  </div>
</template>
  <script>
import _URL from "../../lib/url";
import { Toast, Dialog, RadioGroup, Radio } from "vant";
import { getAction, postAction } from "@/api/manage";
import * as echarts from "echarts";
import zjlx from '@/components/zjlx';

export default {
  name: "index",
   components: {
     zjlx
  },
  data: function () {
    return {
      show: false,
      actions: [],
      nowAds:[],
      nowAct:1,
      c1: "",
      value: "",
      active: 1,
      name:'',
      id:'',
      price:'',
      kad:'',
      menus: [
        "持币地址监控",
        "资金流向分析",
      ],
      activeName: "持币地址监控",
      isLoading: true,
      isLoading2: true,
      item: {
        name: "BTC",
        nums: "7.46万亿",
        rmb: "405417.17",
        mj: "62995.04",
        zd: "-0.17",
      },
      colors: [
        "#eea34e",
        "#7999c9",
        "#4f9f7d",
        "#6296f1",
        "#e93576",
        "#d6452f",
        "#eea34e",
        "#7999c9",
        "#4f9f7d",
        "#6296f1",
        "#e93576",
        "#d6452f",
        "#eea34e",
        "#7999c9",
        "#4f9f7d",
        "#6296f1",
        "#e93576",
        "#d6452f",
      ],
      tokens:[
        {
          bfb:'7.46%',
          num:'4054.55万',
          day7:'+62.9万',
        },
        {
          bfb:'5.46%',
          num:'40154.55万',
          day7:'+332.9万',
        },
         {
          bfb:'6.16%',
          num:'14054.55万',
          day7:'+12.9万',
        },
        {
          bfb:'5.96%',
          num:'1058.55万',
          day7:'+2.9万',
        },
         {
          bfb:'1.46%',
          num:'988.55万',
          day7:'+62.9万',
        },
        {
          bfb:'0.46%',
          num:'102.55万',
          day7:'+2.9万',
        },
      ],
      adss:[

      ],
      t10:'',
      t20:'',
      t50:'',
      t100:'',
    };
  },
  mounted: function () {
    let that = this;
    that.c1 = echarts.init(document.getElementById("myChart"));
    setTimeout(function () {
      that.isLoading = false;
      that.isLoading2 = false;
    }, 600);
  
    that.name = this.$route.query.sname
    that.id = this.$route.query.id
    that.kad = this.$route.query.kad
    that.getDt()
    that.setAct(1)
    //获取持币地址监控信息
    that.getAdss()
  },
  methods: {
    toBnb(){
      let that = this;
      window.open('https://bscscan.com/token/'+that.id)
    },
      getAdss(){
        //alert(this.$route.query.id)
        let that = this;
        let obj = {
          'F_TokenAddress':that.id,
          'pageSize':'100',
          'ordering':'-F_Value'
        };
        getAction(`${_URL.TopAddess}`, obj).then(res => {
         
              that.adss = res.data.results
              var sump = 0
             for(var i=0;i<that.adss.length;i++){
                sump+=Number(that.adss[i]['F_Value'])
                if(i==9){
                  that.t10 = sump
                }
                 if(i==19){
                  that.t20 = sump
                }
                 if(i==49){
                  that.t50 = sump
                }
                 if(i==99){
                  that.t100 = sump
                }
             }
            //  alert(sump)
        });
    },
    onSelect(item) {
      let that= this;
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      if(item.name =="复制地址"){
       
			      that.$copyText(that.nowAds.F_Address).then(
		        res => {
		         Toast.success('已复制');
		        },
		        err => {
		          Toast.fail('复制失败，请重试');
		        })
      };
       if(item.name =="前往区块站"){
       
			      window.open('https://bscscan.com/address/'+that.nowAds.F_Address)
      }
    },
    showStr(val){
      let that = this;
      that.show = true;
      that.nowAds = val; 
      // alert(JSON.stringify(val));
      that.actions = [
       
        { name: '复制地址' }, 
        { name: '前往区块站' }
      ]
    },
    setAct(val){
      var url = ""
      if(val == 1){
          url = _URL.KChar_day;
      }
      if(val == 2){
          url = _URL.KChar_week;
      }
      if(val == 3){
          url = _URL.KChar_month;
      }
      if(val == 4){
          url = _URL.KChar_year;
      }
      if(val == 5){
          url = _URL.KChar_all;
      }
      let that = this;
      this.nowAct = val;
      let obj = {
        'F_Tokenid':this.$route.query.id,
        'pageNum':1,
        'pageSize':999999,
        'ordering':'f_time'
      };
      Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration:0
      });
      getAction(url, obj).then(res => {
          let date = [];
          let data = [];
          for(var i=0;i<res.data.results.length;i++){
            data.push(res.data.results[i]['f_price'])
            date.push(that.getYear(that.getLocalTime(res.data.results[i]['f_time']).substring(0,11)))
          }
          this.initChart(date,data);
          Toast.clear();
      });
    },
    getYear(val){
      let s = val.split(' ');
      return s[0]
    },
    getLocalTime(nS) {     
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    getDt(){
        //alert(this.$route.query.id)
        let that = this;
        let obj = {
          'f_id':this.$route.query.id
          // 'f_id':'0x7fb4ed1b35d8f8638056913bece78b8cd624ca0d'
        };
        getAction(`${_URL.Tokendatail}`, obj).then(res => {
              if(res.code==200){
                
                    that.price = res.data.results[0]
                    
                    if(res.data.results.length==0){
                      setTimeout(function(){
                          document.getElementById('tzw').style.display="none"
                      },1000)
                    }
              }else{
                Toast.fail(res.msg);
              }
        });
    },
   
    fomatFloat(src,pos){     
            if(src){
              return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);     
            }else{
              return 0
            }
    },
    fomatFloat2(src,pos){     
            if(src){
              src = src *100
              return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);     
            }else{
              return 0
            }
    },
    getFd(val,hisVal){
       let that = this;
      if(!hisVal||hisVal==0){
        return 100;
      }else{
          let cop = val/hisVal*100;
          return that.fomatFloat(cop,5);
      }
    },
    getFd3(val,hisVal){
      // let that = this;
      // let ps = 0
      // for(let i = val;i<val;i++){
      //   // ps+=that.adss[i]['F_Value']
      //   // alert(that.adss[i]['F_Value'])
      // }
      // alert(ps)
      // if(!hisVal||hisVal==0){
      //   return 100;
      // }else{
      //     let cop = val/hisVal*100;
      //     return that.fomatFloat(cop,5);
      // }
    },
   getAllNum(val){
      let that = this;
      if(val<100000000){
        return that.fomatFloat(val,2)
      }else{
          let sum =  val/100000000;
      // if(String(sum).length<=4){
         return that.fomatFloat(sum,5)+'亿'
      // }
      // if(String(sum).length>=4){
      //    return that.fomatFloat(sum/10000,5)+'万亿'
      // }
      }
    },
    // reload(){
    //    let that = this;
    // },
     copyCode() {
			this.$copyText(this.id).then(
		        res => {
		         Toast.success('已复制');
		        },
		        err => {
		          Toast.fail('复制失败，请重试');
		        })
		 },
    randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    }, 
    initChart(date,data) {
        let that = this
       
        var option = {
        grid:{
            left:'5%',
            top:'5%',
            right:'5%',
            bottom:'20px',
            containLabel:true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          axisLabel: {
            interval: 120,
            rotate: 40,
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        
        series: [
          {
            name: "价格",
            type: "line",
            symbol: "none",
            sampling: "lttb",
              smooth: true,
            itemStyle: {
              color: "#4b7de2",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#d6e3f8",
                },
                {
                  offset: 1,
                  color: "#f4f7fc",
                },
              ]),
            },
            data: data,
          },
        
        ],
      };
      that.c1.setOption(option);
    },
   
    onClickLeft: function () {
      this.$router.go(-1);
    },
  },
};
</script>
  <style lang="less">
  #myChart{
      background: white;
  }
.token {
  background: #f7f8f8;
  min-height: 100vh;
  .zbs {
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
  }
  .number {
    width: 30px;
    font-weight: bold;
  }
  .tits2{
      width:100%;
      height: 30px;
      background: white;
      z-index: 9999;
      margin-top: -5px;
      
  }
  .titItem{
    font-size: 13px;
    line-height: 35px;
     font-weight:normal;
     color: rgb(150,150, 150);
     position: relative;
     top:5px;
     left:-5px
  }
  .cbtn{
    width:15px;
    margin:5px 5px 0 0;
  }
  .number2 {
    width: 30px;
    font-weight: bold;
    color: #868a8f;
  }
  .cbzb{
    background: white;
    margin-top: 0 !important;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-top: 10px;
  }
  .bnum {
    font-size: 13px;
    color: #7a7f85;
  }
  .zhand {
    color: #118255;
    font-weight: bold;
    width: 100px;
    position: relative;
    top: -3px;
  }
  .color2{
    color:#3b72df !important;
  }
  .cItem{
       align-items: center;
    justify-content: center;
    display: flex; 
  }
  .ctits{
      color: #565c61;
      font-size: 13px;
      margin-top: 5px;
  }
  .active{
      border:solid 1px #3b72df !important;
      color: #3b72df !important;
      border-radius: 50px !important;
      padding:1px 5px 1px 5px !important;
  }
  .noActive{
      border:solid 1px white;
      padding:1px 5px 1px 5px;
  }
  .t100{
    background: white;
    margin-top: 10px;
    text-indent: 20px;
    line-height: 30px;
    font-size:15px;
    font-weight: bold;
  }
  .cnums{
      font-size: 12px;
      line-height: 30px;
      color:#548864;
      font-weight: bold;
  }
  .setRed{
      color:#b63c3a;
      font-weight: bold;
  }
  .tools{
      background: white;
      margin-top: 10px;
  }
  .cpBtn{
    position: absolute;
    background:white;
    right:0;

  }
  .lines{
    border-top: solid 1px #eef1f6;
    line-height:32px;
    height: 30px;
    position: relative;
    top:7px;
  }
  .icons {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
    color: white;
    background-color: #e5af67;
    font-size: 12px;
    position: absolute;
    left: 18px;
    top: 2px;
  }
  .allMon {
    color: #118255;
    font-weight: bold;
  }
  .mainItem {
    padding: 12px 8px 12px 8px;
    background: white;
  }
  .setBorder{
    border-bottom:solid 1px rgb(240,240,240);
    font-size: 15px !important;
  }
  .v-tb .van-icon {
    font-size: 25px !important;
  }
  .titimg {
    width: 110px;
    position: fixed;
    right: 8px;
    z-index: 9999;
    top: 8px;
  }
  .searchs {
    width: 263px;
    position: fixed;
    height: 20px;
    right: 0;
    z-index: 9999;
    top: 13px;
  }
  .v-tabs {
    background: white;
    z-index: 9998;
    .van-tabs__wrap {
      height: 40px !important;
    };
    margin-top:10px;
  }
  .allMoney {
    color: #e52e33;
    font-size: 23px;
  }
  .pm {
    border: solid 1px #398259;
    color: #398259;
    float: right;
    border-radius: 30px;
    padding: 1px 8px 1px 8px;
    font-weight: bold;
    font-size: 13px;
    line-height: 15px;
    margin-top: 3px;
  }
  .price {
    font-size: 12px;
  }
  .ltsz {
    float: right;
    font-size: 12px;
  }
  .sixBuild:first-child {
    border-right: solid 1px #eef1f6;
    padding-right: 20px;
  }
  .sixBuild:last-child {
    padding-left: 20px;
  }
  .sTitle {
    font-size: 12px;
    color: #868a8f;
  }
  .sNum {
    font-size: 12px;
    float: right;
  }
}
</style>
  
  