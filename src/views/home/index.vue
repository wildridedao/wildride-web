<template>
  <div class="index">
    <van-nav-bar class="headers" />
    <img src="image/titlen.png" class="titimg" />
    <van-search
      v-model="value"
      :placeholder="$t('message.search')"
      class="searchs"
      shape="round"
      @search="onSearch"
    />
     <img src="image/cg.png" class="searchs2" @click="cg18n()"/>
    <div v-if="active==0">
      <div class="getBuild"></div>
      <van-tabs @change="onRefresh" color="#0e5eed" class="v-tabs" v-model="activeName">
        <van-tab v-for="index in menus" :title="index" :key="index" :name="index">
        </van-tab>
      </van-tabs>
      <div class="tits setBox">
        <!-- <div class="flex1 titItem" style="margin-left:30px">币种/流通市值</div>
        <div class="flex1 titItem">价格($)</div>
        <div class="flex1 titItem">24H涨跌幅</div> -->
        <div class="setBox mainItem tits" >
                <div class="zbs number ">
                  
                </div>
                <div @click="cgOrder('f_count')" class="flex1  titsd   getWidth titItem fuLeft">
                  <font >{{$t('message.f1')}}</font>
                  <font class="iconsd" v-if="ordering=='-f_count'">↓</font>
                  <font class="iconsd" v-if="ordering=='f_count'">↑</font>
                </div>
                <div @click="cgOrder('F_Price')" class="flex1 zbs3   getWidth titItem" >
                   <font >{{$t('message.f2')}}</font>($)
                  <font class="iconsd" v-if="ordering=='-F_Price'">↓</font>
                  <font class="iconsd" v-if="ordering=='F_Price'">↑</font>
                </div>
                <div @click="cgOrder('f_addwave')" class=" zbs4   zhand titItem2 lat" >
                  <font >{{$t('message.f3')}}</font>
                  <font class="iconsd" v-if="ordering=='-f_addwave'">↓</font>
                  <font class="iconsd" v-if="ordering=='f_addwave'">↑</font>
                </div>
            </div>
      </div>
      <!-- 顶部结束 -->
      <div v-if="hasData">
        <div v-if="tokens.length==0"> 
          <br>
            <van-skeleton title avatar :row="3" />
            <van-skeleton title avatar :row="3" />
            <van-skeleton title avatar :row="3" />
            <van-skeleton title avatar :row="3" />
            <van-skeleton title avatar :row="3" />
        </div>
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <div v-if="tokens.length>0"> 
            <!-- 
            :finished="finished"
            @load="onLoad" -->
          <van-list
            v-model="laoding"
            :finished="!needload"
            :finished-text="$t('message.done')"
            :loading-text="$t('message.loading')"
            @load="getTokenList"
          >
              <div class="setBox mainItem" v-for="(item,index) in tokens" :key="index" @click="goDt(item,index)" v-if="item.F_TokenShort">
                  <div class="zbs number " v-if="index<=2">
                    {{index+1}}
                  </div>
                  <div class="zbs number2 " v-if="index>2">
                    {{index+1}}
                  </div>
                  <div class="flex1 zbs2 setBox noLine getWidth" >
                    <div class="names">
                      <div
                      class="icons"
                      :style="{backgroundColor:getColor(index)}"
                      >{{item.F_TokenShort.substring(0,1)}}</div>
                      {{item.F_TokenShort}}
                    </div>
                    <div class="bnum">
                      {{getAllNum(item.allamountprice)}}
                    </div>
                  </div>
                  <div class="flex1 zbs3 setBox noLine getWidth" >
                    <div class="bnum2">
                      <font class="meizi">$</font>{{fomatFloat(item.F_Price,18)}}
                    </div>
                  </div>
                  <div class=" zbs3 setBox noLine zhand" v-if="getFd(item.F_Price,item.F_Hisprice)>0">
                    <!-- <div>{{getFd(item.F_Price,item.F_Hisprice)}}%</div> -->
                    {{getFd2(item.f_addwave)}}%
                  </div>
                  <div class=" zbs3 setBox noLine zhand" v-if="getFd(item.F_Price,item.F_Hisprice)<=0" style="color:red">
                    <!-- <div>{{getFd(item.F_Price,item.F_Hisprice)}}%</div> -->
                    {{getFd2(item.f_addwave)}}%
                  </div>
              </div> 
          </van-list>
      
        </div>
      </div>
      <div v-if="!hasData">
          <br>
          <br>
          <br>
          <br>
          <van-empty  description="暂无数据" />
      </div>
      <!-- </van-pull-refresh> -->

    </div>
     <div v-if="active==1">
       <br>
       <br>
       <br>
       <br>
       <van-empty  description="敬请期待~" />
     </div>
      <div v-if="active==2">
       <br>
       <br>
       <br>
       <br>
       <van-empty  description="敬请期待~" />
     </div>
    <div style="height:80px"></div>
    <van-tabbar class="v-tb" v-model="active" active-color="#0e5eed">
        <van-tabbar-item icon="fire">{{$t('message.t1')}}</van-tabbar-item>
        <van-tabbar-item icon="gem">{{$t('message.t2')}}</van-tabbar-item>
        <!-- <van-tabbar-item icon="manager">我的</van-tabbar-item> -->
    </van-tabbar>
    
  </div>
</template>
  <script>
import _URL from "../../lib/url";
import { Toast, Dialog, RadioGroup, Radio,PullRefresh } from "vant";
import { getAction, postAction } from "@/api/manage";
export default {
  name: "index",
  data: function () {
    return {
      value: "",
      active: 0,
      menus: [
        this.$t('message.title1'),
        this.$t('message.title2'),
      ],
      hasData:true,
      tokenShort:'',
      f_id:'',
      activeName:  this.$t('message.title2'), 
      isLoading:true,
      tokens:[],
      colors:[
        '#eea34e',
        '#7999c9',
        '#4f9f7d',
        '#6296f1',
        '#e93576',
        '#d6452f',
        '#eea34e',
        '#7999c9',
        '#4f9f7d',
        '#6296f1',
      ],
      laoding:false,
      snum:1,
      needload:true,
      isLoading: false,
      ordering:'-f_count'
    };
  },
  mounted: function () {
    let that = this;
    setTimeout(function(){
      that.isLoading = false
    },600)

    //获取token列表
    that.getTokenList()
    //监听滚动，进行分页
    //  window.addEventListener('scroll', that.windowScroll)
  },
  methods: {
    cg18n(){
        let locale = this.$i18n.locale
        locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
        this.menus = [this.$t('message.title1'),this.$t('message.title2')]
    },
    onSearch(val) {
      let that = this;
      if(val.length > 20){
        that.f_id = val;
        that.tokenShort = '';
      }else{
        that.tokenShort = val;
         that.f_id = '';
      }
      that.onRefresh()
    },
    onCancel() {
       let that = this;
      that.tokenShort = '';
      that.f_id = '';
      that.onRefresh()
    },
    //下拉刷新
    onRefresh(){
      let that = this;
      that.snum = 1;
      that.tokens = []
      that.getTokenList()
    },
    getColor(val){
      val = val.toString()
      let that = this;
      var s = val.substring(val.length-1,val.length)
      return that.colors[s]
    },
    //监听滚动条
     windowScroll() {
      
    },
    //计算涨跌幅
    getFd(val,hisVal){
      let that = this;
      if(!hisVal||hisVal==0){
        return 100;
      }else{
          let soc = val - hisVal;
          let cop = soc/hisVal*100;
          return that.fomatFloat(cop,2);
      }
    },
    getFd2(val){
      let that = this;
          let cop = val*100;
          if(cop<1000){
               return that.fomatFloat(cop,2);
          }else{
               return  ">1000" 
          }
         
     
    },
    fomatFloat(src,pos){     
          return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);     
    },
    getAllNum(val){
      let that = this;
      if(val<100000000){
        return that.fomatFloat(val,2)
      }else{
  let sum =  val/100000000;
      // if(String(sum).length<=4){
         return that.fomatFloat(sum,5)+that.$t('message.yi')
      // }
      // if(String(sum).length>=4){
      //    return that.fomatFloat(sum/10000,5)+'万亿'
      // }
      }
    
    },
    cgOrder(val){
       let that = this;
        // that.ordering = val;
        if(val != that.ordering){
          that.ordering = val;
        }else{
          that.ordering = '-'+val
        }
        that.onRefresh()
    },
    getTokenList(){
        let that = this;
        let obj = {
          'pageNum':that.snum,
          'pageSize':20,
          'ordering':that.ordering,
          'F_TokenShort':that.tokenShort,
          'f_id':that.f_id
        };
        getAction(`${_URL.Tokendatail}`, obj).then(res => {
              if(res.code==200){
                let datas = res.data.results
               
                //搞区别对待，第一次和其它次不一样
                if(this.snum==1){
                   if(datas.length>0){
                     that.hasData = true
                     that.needload = true
                   }else{
                     that.hasData = false
                   }
                   that.tokens=datas;
                }else{
                  for(var i = 0;i<datas.length;i++){
                      that.tokens.push(datas[i])
                  }
                }
                that.laoding = false
                that.isLoading=false
                that.snum++
                //说明加载完了
                if(datas.length<20){
                    that.needload = false
                }
              }else{
                Toast.fail(res.msg);
              }
        });
    },
    reload(){
       let that = this;
       that.isLoading = true;
        setTimeout(function(){
          that.isLoading = false
        },600)
    },
    goDt(item,index){
      let that = this;
      // alert(1)
      // localStorage.setItem('token',item.name);
      that.$router.push({
        path:'token',
        query: {
          sname:item.F_TokenShort,
          id:item.f_id,
          index:index,
          kad:that.getFd(item.F_Price,item.F_Hisprice)
        }
      });
    }
  },
};
</script>
  <style lang="less">
.index {
   .zbs{
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 17px;
    position: relative;
  }
  .names{
    overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
  }
  .zbs2{
    justify-content: center;
    display: flex;
    font-size: 17px;
    position: relative;
    padding-left: 30px;
    padding-right: 20px;
  }
  .zbs3{
    justify-content: center;
    display: flex;
    font-size: 17px;
    position: relative;
  }
  .zbs4{
    font-size: 17px;
    position: relative;
  }
  .lat{
    position: relative;
    right:15px !important
  }
  .number{
    width: 50px;
    font-weight: bold;
    font-style:oblique
  }
  .number2{
    width: 50px;
    font-weight: bold;
    color:#868a8f ;
    font-style:oblique
  }
  .bnum{
    font-size: 13px;
    color: #7a7f85;
    margin-right: 0px;
    word-wrap:break-word
  }
  .bnum2{
    font-size: 14px;
    color: #7a7f85;
    word-break:break-all;
    text-align: left !important;
  }
  .iconsd{
    display: inline-block !important;
  }
  .zhand{
    color: #118255;
    font-size:16px;
    font-weight: bold;
     width: 100px;
     position: relative;
     top:-3px;
     text-align: right;
     right: 20px;
  }
  .meizi{
    color: #118255;
    font-weight: bold;
     width: 100px;
  }
  .icons{
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
    left:5px;
    top:16px
  }
  .allMon{
    color: #118255;
    font-weight: bold;
  }
  .mainItem{
    height: 65px;
  }
  .v-tb .van-icon {
    font-size: 25px !important;
  }
  .titimg {
    width: 110px;
    position: fixed;
    left: 8px;
    z-index: 9999;
    top: 8px;
  }
  .searchs {
    width: 203px;
    position: fixed;
    height: 20px;
    right: 30px;
    z-index: 9999;
    top: 13px;
  }
  .searchs2 {
    width: 25px;
    height:25px;
    position: fixed;
    right:10px;
    z-index: 9999;
    top: 10px;
  }
  .v-tabs {
    position: fixed;
    width:100%;
    top: 44px;
    left: 0;
    background: white;
    z-index: 9998;
    .van-tabs__wrap {
      height: 40px !important;
    }
  }
  .tits{
     position: fixed;
      width:100%;
      top: 84px;
      height: 30px;
      background: white;
      z-index: 9999;
  }
  .titItem{
    font-size: 13px;
    line-height: 35px;
     font-weight:normal;
     color: rgb(150,150, 150);
     text-align: left !important;
      justify-content: left !important;
  }
  .titItem2{
    font-size: 13px;
    line-height: 35px;
     font-weight:normal;
     color: rgb(150,150, 150);
     text-align: right;
     float: right;
  }
  .fuLeft{
    position: relative;
    left:-40px;
    margin-left:30px;
  }
  .titsd{
  }
}
</style>
  
  