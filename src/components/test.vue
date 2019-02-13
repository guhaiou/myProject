<template>
<Row>
  <form  class="form form-horizontal" id="form-member-add" method="post" enctype="multipart/form-data">
    <input type="hidden"  value="${id }"  id="id" name="id" >
    <div class="row cl" style="margin: 20px;">
      <span class="c-red">*</span>标题：
      <input type="text" class="input-text radius"   id="title" name="title" >
    </div>
    <div class="row cl" style="margin: 20px;">
      <span class="c-red">*</span>内容：
      <div id="edit">
      </div>
    </div>
    <div class="row cl">
      <div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-3">
        <input class="btn btn-primary radius" type="button" value="  提交  " onclick="subm(${type})" style="margin-left: 170px">
      </div>
    </div>
  </form>

</Row>
</template>
<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  export default {
    name: 'test',
    data() {
      return {

      }
    },
    methods:{
        sub(){
          var id=document.getElementById('id').value;
          var title = document.getElementById('title').value;
          var content = editor.txt.html();
          if(title==""||content==""){
            layer.msg('请把内容填写完整！',{icon:2,time:1000});
            return false;
          }

          $.ajax({
            type : "post",
            url : "newsAddPage.action",
            data : {
              "id":id,
              "title" : title,
              "content" : content,
              "type":type
            },
            success : function(result) {
              layer.msg('添加成功!',{icon:1,time:1000});
            },
            error : function(data) {
              $.Huimodalalert('修改失败！', 2000);
            }
          });
        }

    },
    mounted(){
      var E = window.wangEditor;
      var editor = new E('#edit')
      editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      // 隐藏“网络图片”tab
      editor.customConfig.showLinkImg = false
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'image',  // 插入图片
        'table',  // 表格
        'undo',  // 撤销
        'redo'  // 重复
      ]
      editor.create()
    }
  }
</script>
