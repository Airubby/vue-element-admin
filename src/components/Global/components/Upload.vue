<template>
    <div class="upload-btn">
        <el-upload
            :action="actionURL"
            ref="upload"
            :data="data"
            :on-success="onSuccess"
            :on-error="onError"
            :on-change="onChange"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :file-list="fileList"
            :limit="1"
            :name="name"
            :accept="accept"
            :auto-upload="autoUpload">
            <slot />
        </el-upload>
        <upload-loading v-if="loadingInfo.visible" :dialogInfo="loadingInfo"></upload-loading>
    </div>
</template>

<script>
import UploadLoading from '@/components/UploadLoading'
export default {
    name:'Upload',
    components: { UploadLoading },
    props:{
        action:{
            type: String,
            default:'https://jsonplaceholder.typicode.com/posts/'
        },
        data:{
            type: Object,
            default: () => {
                return {}
            }
        },
        accept:{
            type: String,
            default: '',
        },
        name:{
            type:String,
            default:'file'
        },
        autoUpload:{
            type: Boolean,
            default: true
        }
    },
    created() {

    },
    mounted(){

    },
    computed:{
        actionURL:{
            get(){
                return this.$store.state.settings.baseURL+this.action
            }
        },
    },
    data() {
        return {
            fileList:[],
            loadingInfo:{
                visible:false,
                finished:null
            }
        }
    },
    methods:{
        onSuccess(res){
            if(res.errCode=='200'){
                this.fileList=[];
                this.loadingInfo.visible=true;
            }else{
                this.fileList=[];
                this.loadingInfo.visible=false;
            }
		},
		onError(){
            this.fileList=[];
            this.loadingInfo.visible=false;
        },
        onchange(file,fileList){
            if(this.autoUpload&&fileList.length>0){
                this.submit();
            }
        },
        beforeUpload(){
            this.loadingInfo.finished=null;
            this.loadingInfo.visible=true;
        },
        submit:function(){
            this.$refs.upload.submit();
        },
        finished:function(){
            if(this.loadingInfo.finished){
                this.$message.success('上传成功');
            }else{
                this.$message.warning('上传失败');
            }
            this.$emit('backHandle',this.loadingInfo.finished);
        }
    },
    watch: {
        
    },
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .upload-btn{
        display: inline-block;
        margin: 0 10px;
    }
}
</style>