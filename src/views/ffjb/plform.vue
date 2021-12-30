<template>
  <div class="qymsg">
   
  </div>
</template>
<script>
import _URL from "../../lib/url";
import areas from "../../lib/aera";
import { Toast,Dialog,RadioGroup,Radio } from 'vant';
import { getAction, postAction } from "@/api/manage";
export default {
  name: "index",
  data:function() {
    return {
      pjnr:'',
       type:localStorage.getItem('type'),
       fileList1: [
          //  { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
       ],
       fileList2: [
          //  { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
       ],
       fileList3: [
          //  { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
       ],
      //企业类型选择器
      columns: [
        {
          text: '岱岳区',
           children: [
            {text: '岱岳经济开发区'},
            {text: '大汶口工业园'},
            {text: '岱岳新兴产业园'},
            {text: '粥店办事处'},
            {text: '天平办事处'},
            {text: '山口镇'},
            {text: '大汶口镇'},
            {text: '祝阳镇'},
            {text: '范镇'},
            {text: '角峪镇'},
            {text: '马庄镇'},
            {text: '满庄镇'},
            {text: '夏张镇'},
            {text: '道朗镇'},
          ],
        },
      ],
      showPicker: false,
      //企业类型选择器结束

      // 隶属区域
      showArea: false,
      areaList: areas, // 数据格式见 Area 组件文档
      //结束
      ckList: [],
      username: '',
      fddbr: '',
     
      qylx:'',
      jglx:0,
      lsqy:'',
      xxdz:'',
      lxr:'',
      lxfs:'',
      id:'',
      istxx:'',
      // allfile1:[],
      // allfile2:[],
      // allfile3:[],
      type:this.$route.query.type
    };
  },
  mounted:function() {
    //  this.getDetail();
  },
  methods: {
    del1(val){
      alert(1);
      console.log(JSON.stringify(val));
      // let that = this;
      // let s = that.allfile1.indexOf(val);
    },
    del2(){

    },
    del3(){

    },
    afterRead1(file) {
          let that = this;
          var formData = new FormData();
          // HTML 文件类型input，由用户选择
          formData.append(file.file.name, file.file);
          file.status = 'uploading';
          file.message = '上传中...';
          postAction(`${_URL.upload_upload}`, formData).then(res => {
              if(res){
                  file.status = 'done';
                  file.url = res.data[0];
              }else{
                  file.status = 'failed';
                  file.message = '上传失败';
                  let index = that.fileList1.indexOf(file);
                  that.fileList1.splice(index, 1);
                  let index2 = that.fileList2.indexOf(file);
                  that.fileList2.splice(index2, 1);
                  let index3 = that.fileList3.indexOf(file);
                  that.fileList3.splice(index3, 1);
              }
          });
    },
    afterRead2(file) {
          let that = this;
          var formData = new FormData();
          // HTML 文件类型input，由用户选择
          formData.append(file.file.name, file.file);
          file.status = 'uploading';
          file.message = '上传中...';
          postAction(`${_URL.upload_upload}`, formData).then(res => {
              if(res){
                  file.status = 'done';
                  file.url = res.data[0];
                  
              }else{
                  file.status = 'failed';
                  file.message = '上传失败';
                  let index = that.fileList1.indexOf(file);
                  that.fileList1.splice(index, 1);
                  let index2 = that.fileList2.indexOf(file);
                  that.fileList2.splice(index2, 1);
                  let index3 = that.fileList3.indexOf(file);
                  that.fileList3.splice(index3, 1);
              }
          });
    },
    afterRead3(file) {
          let that = this;
          var formData = new FormData();
          // HTML 文件类型input，由用户选择
          formData.append(file.file.name, file.file);
          file.status = 'uploading';
          file.message = '上传中...';
          postAction(`${_URL.upload_upload}`, formData).then(res => {
              if(res){
                  file.status = 'done';
                  file.url = res.data[0];
                 
              }else{
                  file.status = 'failed';
                  file.message = '上传失败';
                  let index = that.fileList1.indexOf(file);
                  that.fileList1.splice(index, 1);
                  let index2 = that.fileList2.indexOf(file);
                  that.fileList2.splice(index2, 1);
                  let index3 = that.fileList3.indexOf(file);
                  that.fileList3.splice(index3, 1);
              }
          });
    },
    onClickLeft:function(){
       this.$router.go(-1)
    },
    getDetail:function(){
       var that = this;
      that.$store.commit("setLoadings", true);
      let obj = {
        'entity.id':localStorage.getItem('uid')
      };
      console.log(JSON.stringify(obj));
      getAction(`${_URL.user_Detail}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        console.log(JSON.stringify(res));
        setTimeout(function(){
            that.$store.commit("setLoadings", false);
            if(res.code==1){
              that.username= res.result[0].name;
              that.fddbr= res.result[0].frdb;
              that.qylx= res.result[0].qylx;
              that.lsqy= res.result[0].lsqy;
              that.xxdz= res.result[0].xxdz;
              that.lxr= res.result[0].lxr;
              that.lxfs= res.result[0].lxfs;
              that.id=res.result[0].id;
              that.istxx=res.result[0].istx;
              that.jglx=res.result[0].jglx+'';
            }else{
              Toast.fail(res.msg);
            }
        },1000)
      });
    },
    //提交表单
    onSubmit(values) {
      var that = this;
      
      if(that.lsqy==''){
        Toast('请选择违法活动所在区域');
        return false;
      }
      if(that.pjnr==''){
        Toast('请输入违法行为描述');
        return false;
      }
      that.$store.commit("setLoadings", true);


      let filesObj1 = that.fileList1;
      let f1 = []
      for(let i = 0; i<filesObj1.length;i++){
          f1.push(filesObj1[i]['url'])
      }
      let ft1 = f1.toString();
     

      let filesObj2 = that.fileList2;
      let f2 = []
      for(let i = 0; i<filesObj2.length;i++){
          f2.push(filesObj2[i]['url'])
      }
      let ft2 = f2.toString();


      let filesObj3 = that.fileList3;
      let f3 = []
      for(let i = 0; i<filesObj3.length;i++){
          f3.push(filesObj3[i]['url'])
      }
      let ft3 = f3.toString();
      console.log(ft1);
      console.log(ft2);
      console.log(ft3);
      let obj = {
        'entity.xm':that.lxr,
        'entity.phone':that.lxfs,
        'entity.jzd':that.lsqy,
        'entity.zxnr':that.pjnr,
        'entity.zxfj':ft1,
        'entity.zxfjsp':ft2,
        'entity.zxfjyp':ft3,
      };
      console.log(JSON.stringify(obj));
     
      getAction(`${_URL.illegalclap_saveOrUpdate}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        setTimeout(function(){
            that.$store.commit("setLoadings", false);
            if(res.code==1){
              Toast.success('提交成功,感谢您的反馈');
              that.$router.go(-1);
              console.log(JSON.stringify(res))
            }else{
              Toast.fail(res.msg);
            }
        },500)
      });
    },
    //选择企业类型
    onConfirm(value) {
      this.qylx = value;
      this.showPicker = false;
    },
    //选择隶属区域
     onConfirmqy(values) {
      // this.lsqy = values.map((item) => item.name).join('/');
      // this.showArea = false;
      this.lsqy = String(values);
     // this.lsqy = values.map((item) => item.name).join('/');
      this.showArea = false;
    },
  }
};
</script>
<style lang="less">
  .qymsg{
    .fjsc{
      width:94%;
      margin-left:3%;
      margin-top: 15px;
    }
    .fjsc{
      p{
        font-size:15px;
        margin-bottom: 10px;
      }
    }
     .lyMsg{
      width:92%;
      margin-left:4%;
      background:rgb(240,240,240);
      border-radius:10px;
      margin-top:20px
    }
    .van-doc-demo-block__title {
          margin: 0;
          padding: 16px 16px 16px;
          font-weight: normal;
          font-size: 16px;
          line-height: 16px;
          border-top:solid 5px rgb(240,240,240);
          margin-top: 7px;
        
      }
      .radiocls{
         margin: 0;
          padding: 16px 16px 16px;
          font-weight: normal;
          font-size: 16px;
          line-height: 16px;
          margin-top: 7px;
      }
      .van-cell{
          font-size:15px
      }
  }
    
</style>

