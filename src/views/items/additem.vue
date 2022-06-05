<template>
<div style="margin:30px;">
    <h1>上架物品</h1>
    <t-row  justify="center" style="margin-top:30px;">
        <t-col :span="5">
            <h4>实物图(选填)</h4>
            <t-tabs style="margin-right:13px;">
                <t-tab-panel :value="1" label="图片1" :destroy-on-hide="false">
                    <input type="file" class="form-control" id="inputGroupFile01" @change="getFileImg1($event)">
                    <h6 style="margin-top:13px">预览图
                    </h6>
                    <img :src="image1" style="max-width:200px;max-height:200px;" class="img-thumbnail" alt="..." v-show="image1.length>0">
                </t-tab-panel>
                <t-tab-panel :value="2" label="图片2" :destroy-on-hide="false">
                    <input type="file" class="form-control" id="inputGroupFile02" @change="getFileImg2($event)">
                    <h6 style="margin-top:13px">预览图
                    </h6>
                    <img :src="image2" style="max-width:200px;max-height:200px;" class="img-thumbnail" alt="..." v-show="image2.length>0">
                </t-tab-panel>
                <t-tab-panel :value="3" label="图片3" :destroy-on-hide="false">
                    <input type="file" class="form-control" id="inputGroupFile03" @change="getFileImg3($event)">
                    <h6 style="margin-top:13px">预览图
                    </h6>
                    <img :src="image3" style="max-width:200px;max-height:200px;" class="img-thumbnail" alt="..." v-show="image3.length>0">
                </t-tab-panel>
                <t-tab-panel :value="4" label="图片4" :destroy-on-hide="false">
                    <input type="file" class="form-control" id="inputGroupFile04" @change="getFileImg4($event)">
                    <h6 style="margin-top:13px">预览图
                    </h6>
                    <img :src="image4" style="max-width:200px;max-height:200px;" class="img-thumbnail" alt="..." v-show="image4.length>0">
                </t-tab-panel>
            </t-tabs>
        </t-col>
        <t-col :span="3">
            <h4>类别 & 描述</h4>
            <div style="margin-top:26px;">
                <t-select v-model="categoryChoose" :options="options" placeholder="请选择"  @click="changeCategory" />
            </div>
            <div style="margin-top:26px;">
                <t-input v-model="title" placeholder="请输入物品名称"></t-input>
            </div>
            <div style="margin-top:26px;">
                <t-textarea
                    placeholder="请输入商品描述"
                    name="description"
                    v-model="description"
                    :autosize="{ minRows: 9, maxRows: 20 }"
                />
            </div>
        </t-col>
        <t-col :span="3" style="margin-left:26px;">
            <h4>价格 & 操作</h4>
            <div style="margin-top:26px;">
                <div style="margin-top:26px;">
                    <t-input-number v-model="oldPrice" :min="0" :decimal-places="2" :autoWidth="true" :step="10" placeholder="原价"/>
                </div>
                <div style="margin-top:26px;">
                    <t-input-number v-model="nowPrice" :min="0"  :decimal-places="2" :autoWidth="true" :step="10" placeholder="现价"/>
                </div>
                <div style="margin-top:150px;">
                    <t-button theme="primary" size="large" variant="base" @click="upload">  提交管理审核  </t-button>
                </div>
            </div>
        </t-col>
    </t-row>
</div>
</template>

<style scoped>
.tdesign-upload-item {
    display: inline-block !important;
    margin-right: 40px !important;
    margin-top: 20px;
}

</style>

<script>

import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'ItemDetail',
    data(){
        return{
            options: this.$store.state.categories_upload,
            categoryChoose : '请选择一个类别',
            oldPrice: 100.00,
            nowPrice: 50.00,
            description: '',
            title: '',
            file1: [],
            file2: [],
            file3: [],
            file4: [],
            image1: "",
            image2: "",
            image3: "",
            image4: "",
        }
    },
    methods:{
        changeCategory(){
            console.log(this.categoryChoose)
        },
        upload(){
            if(this.oldPrice<0 || this.nowPrice<0 || this.description.length<=0 || this.categoryChoose=='请选择一个类别' || this.title==''){
                MessagePlugin.error("请填写完整信息")
                return
            }
            var data = new FormData()
            data.append("title",this.title)
            data.append("oldPrice",Number(this.oldPrice))
            data.append("price",Number(this.nowPrice))
            data.append("description",this.description)
            data.append("type",this.$store.state.categories.get(Number(this.categoryChoose)))

            var msg = MessagePlugin.loading("正在上传...")
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/commodity/addCommodity",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                console.log(dataReturn)
                if(dataReturn['code']==200){
                    var itemid = dataReturn['data']
                    if(this.image1.length>0){
                        this.uploadImg(itemid,this.file1,1)
                    }
                    this.sleep(1000).then(()=>{
                        if(this.image2.length>0){
                            this.uploadImg(itemid,this.file2,2)
                        }
                        this.sleep(1000).then(()=>{
                            if(this.image3.length>0){
                                this.uploadImg(itemid,this.file3,3)
                            }
                            this.sleep(1000).then(()=>{
                                if(this.image4.length>0){
                                    this.uploadImg(itemid,this.file4,4)
                                }
                                MessagePlugin.close(msg)
                                MessagePlugin.success("商品信息提交成功")
                            })
                        })
                    })
                }else{
                    MessagePlugin.close(msg)
                    MessagePlugin.error("上传失败:"+dataReturn['msg'])
                }
                this.axios.defaults.headers.common['token'] = ''
            })
        },
        sleep(ms){
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        uploadImg(itemid,files,num){
            var data = new FormData()
            data.append("id",Number(itemid))
            data.append("files",files)
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/commodity/uploadPic",data,{
                headers:{
                    "Content-Type": "multipart/form-data; boundary=--------------------"+ new Date().getTime(),
                }
            }).then((res)=>{
                this.axios.defaults.headers.common['token'] = ''
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                console.log(dataReturn)
                if(dataReturn['code']!=200){
                    MessagePlugin.error("图片"+num+"上传失败:"+dataReturn['msg'])
                }else{
                    MessagePlugin.success("图片"+num+"上传成功")
                }
            })
        },
        //以下内容存在偷懒嫌疑
        getFileImg1(event){
            this.file1 = event.target.files[0]

            var reader = new FileReader()
            reader.readAsDataURL(this.file1);
            let _this = this
            reader.onload = function(){
                _this.image1 = reader.result
            }

            _this.image1 = this.file1
        },
        getFileImg2(event){
            this.file2 = event.target.files[0]

            var reader = new FileReader()
            reader.readAsDataURL(this.file2);
            let _this = this
            reader.onload = function(){
                _this.image2 = reader.result
            }

            _this.image2 = this.file2
        },
        getFileImg3(event){
            this.file3 = event.target.files[0]

            var reader = new FileReader()
            reader.readAsDataURL(this.file3);
            let _this = this
            reader.onload = function(){
                _this.image3 = reader.result
            }

            _this.image3 = this.file3
        },
        getFileImg4(event){
            this.file4 = event.target.files[0]

            var reader = new FileReader()
            reader.readAsDataURL(this.file4);
            let _this = this
            reader.onload = function(){
                _this.image4 = reader.result
            }

            _this.image4 = this.file4
        },
    },
}
</script>