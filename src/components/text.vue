
<template>
  <div style="margin: 0 5% 0 20%;">
    <Divider orientation="left">视频管理</Divider>
    <Row>
      <Col span="6">
        <Input v-model="value13" placeholder="请输入要搜索的视频名">
        <Select v-model="select3" slot="prepend" style="width: 25%">
          <Option value="全部">全部</Option>
          <Option value="正常">正常</Option>
          <Option value="禁用">禁用</Option>
        </Select>
        <Button slot="append" icon="ios-search"></Button>
        </Input>
      </Col>
      <Col span="6">-</Col>
      <Col span="12">
        <Button type="primary" @click="modal1 = true">添加视频专辑</Button>
        <Modal
          v-model="modal1"
          title="添加视频专辑"
          @on-ok="ok"
          @on-cancel="cancel">
          <p class="ln-g">  <Row>
            <Col span="6">视频名：</Col>
            <Col span="18"><Input v-model="value" placeholder="请输入视频名" style="width: 100%" /></Col>
          </Row></p>
          <br>
          <p class="ln-g"><Row>
            <Col span="6">视频介绍：</Col>
            <Col span="18">
              <Input v-model="valueIntroduction" type="textarea" placeholder="视频介绍..." style="width: 100%" />
            </Col>
          </Row></p>
          <br>
          <p class="ln-g"><Row>
            <Col span="6">缩略图地址：</Col>
            <Col span="18"><Input v-model="valueadd" placeholder="请输入缩略图地址" style="width: 100%" /></Col>
          </Row></p>
          <br>
          <p class="ln-g"><Row>
            <Col span="6">添加者：</Col>
            <Col span="18"><Input v-model="tianjiazhe" placeholder="" style="width: 100%" /></Col>
          </Row></p>
          <br>
          <p class="ln-g"><Row>
            <Col span="6">排序：</Col>
            <Col span="18"><Input v-model="valueSort" placeholder="" style="width: 100%" /></Col>
          </Row></p>
          <br>
          <p class="ln-g"><Row>
            <Col span="6">状态：</Col>
            <Col span="18"><Input v-model="zhuantai" placeholder="" style="width: 100%" /></Col>
          </Row></p>
        </Modal>
      </Col>
    </Row>
    <br>
    <div class="layout">
      <Layout>
        <Header style="padding: 0;background: #2d8cf0;color: #fff;">
          <Row style="font-size: 16px;">
            <Col span="4">工程造价</Col>
            <Col span="4">视频简介</Col>
            <Col span="3">添加者</Col>
            <Col span="1">排序</Col>
            <Col span="1">视频数</Col>
            <Col span="11">操作</Col>
          </Row>
        </Header>
        <Content>
          <div class="video_box"  v-for="(parent,index) in parent_video_group" >
            <Row style="line-height: 100px;font-size: 14px;margin: 10px 0;">
              <Col span="4">
                <div style="width: 150px;height: 100px;border:1px solid #000;margin: 0 auto;line-height: 50px;">{{parent.valueadd}}<br>
                  <span>{{parent.parent_name}}</span>
                </div>
              </Col>
              <Col span="4">{{parent.parent_introduction}}</Col>
              <Col span="3">{{parent.parent_adder}}</Col>
              <Col span="1">{{parent.parent_sort}}</Col>
              <Col span="1">{{parent.parent_number}}</Col>
              <Col span="11">
                <Button type="primary" @click="parent.modal2 = true">追加子视频</Button>
                <Modal
                  v-model="fatherModal"
                  title="添加视频专辑"
                  @on-ok="ok2(parent)"
                  @on-cancel="cancel2(parent)">
                  <p class="ln-g">  <Row>
                    <Col span="6">视频名：</Col>
                    <Col span="18"><Input v-model="value" placeholder="请输入视频名" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">视频介绍：</Col>
                    <Col span="18">
                      <Input v-model="valueIntroduction" type="textarea" placeholder="视频介绍..." style="width: 100%" />
                    </Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">视频地址：</Col>
                    <Col span="18"><Input v-model="valueadd" placeholder="请输入视频地址" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">排序：</Col>
                    <Col span="18"><Input v-model="valueSort" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">缩略图地址：</Col>
                    <Col span="18"><Input v-model="valueadd" placeholder="" style="width: 100%" /></Col>
                  </Row>
                  </p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">添加者：</Col>
                    <Col span="18"><Input v-model="tianjiazhe" placeholder="" style="width: 100%" /></Col>
                  </Row>
                  </p>
                </Modal>
                <Button :size="buttonSize" type="primary"  @click="Switch(parent)">{{parent.parent_witch}}</Button>

                <Button :size="buttonSize" type="primary" @click="parent.modalbj = true">编辑</Button>
                <Modal
                  v-model="parent.modalbj"
                  title="视频专辑"
                  @on-ok="okbj(parent)"
                  @on-cancel="cancel">
                  <p class="ln-g">  <Row>
                    <Col span="6">视频名：</Col>
                    <Col span="18"><Input v-model="value" placeholder="请输入视频名" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">视频介绍：</Col>
                    <Col span="18">
                      <Input v-model="valueIntroduction" type="textarea" placeholder="视频介绍..." style="width: 100%" />
                    </Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">缩略图地址：</Col>
                    <Col span="18"><Input v-model="valueadd" placeholder="请输入缩略图地址" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">添加者：</Col>
                    <Col span="18"><Input v-model="tianjiazhe" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">排序：</Col>
                    <Col span="18"><Input v-model="valueSort" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">状态：</Col>
                    <Col span="18"><Input v-model="zhuantai" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                </Modal>

                <Button :size="buttonSize" type="primary">设置专业</Button>
                <Button :size="buttonSize" type="primary"  @click="modal = true">设置课程</Button>
                <Modal
                  title="选择课程"
                  v-model="modal"
                  width="1000"
                  :mask-closable="false">
                  <span class="tip-title">交通土建:</span>
                  <CheckboxGroup>
                    <Checkbox label="中国近代史"></Checkbox>
                    <Checkbox label="马克思主义基本理论概论"></Checkbox>
                    <Checkbox label="桥梁工程"></Checkbox>
                    <Checkbox label="桥梁工程（实践）"></Checkbox>
                    <Checkbox label="工程监理"></Checkbox>
                    <Checkbox label="工程项目管理"></Checkbox>
                    <Checkbox label="交通工程经济分析"></Checkbox>
                    <Checkbox label="桥涵水文"></Checkbox>
                    <Checkbox label="结构设计原理（二）"></Checkbox>
                    <Checkbox label="工程招标与合同管理"></Checkbox>
                    <Checkbox label="交通工程"></Checkbox>
                    <Checkbox label="工程机械"></Checkbox>
                    <Checkbox label="工程教学"></Checkbox>
                    <Checkbox label="工程应用英语"></Checkbox>
                    <Checkbox label="公路工程CAD"></Checkbox>
                    <Checkbox label="现代施工技术"></Checkbox>
                    <Checkbox label="工程造价与管理"></Checkbox>
                    <Checkbox label="交通土建工程毕业设计"></Checkbox>
                  </CheckboxGroup>
                  <span class="tip-title">工程造价:</span>
                  <CheckboxGroup>
                    <Checkbox label="中国近代史"></Checkbox>
                    <Checkbox label="马克思主义基本理论概论"></Checkbox>
                    <Checkbox label="桥梁工程"></Checkbox>
                    <Checkbox label="桥梁工程（实践）"></Checkbox>
                    <Checkbox label="工程监理"></Checkbox>
                    <Checkbox label="工程项目管理"></Checkbox>
                    <Checkbox label="交通工程经济分析"></Checkbox>
                    <Checkbox label="桥涵水文"></Checkbox>
                    <Checkbox label="结构设计原理（二）"></Checkbox>
                    <Checkbox label="工程招标与合同管理"></Checkbox>
                    <Checkbox label="交通工程"></Checkbox>
                    <Checkbox label="工程机械"></Checkbox>
                    <Checkbox label="工程教学"></Checkbox>
                    <Checkbox label="工程应用英语"></Checkbox>
                    <Checkbox label="公路工程CAD"></Checkbox>
                    <Checkbox label="现代施工技术"></Checkbox>
                    <Checkbox label="工程造价与管理"></Checkbox>
                    <Checkbox label="交通土建工程毕业设计"></Checkbox>
                  </CheckboxGroup>
                </Modal>
                <Button :size="buttonSize" type="primary" v-on:click="showhide(parent)">子视频</Button>
                <Button :size="buttonSize" type="primary"  @click="deletec(index)">删除</Button>
              </Col>
            </Row>
            <div>
              <Row>
                <transition name="fade">
                  <p v-if="parent.show"  style="height: 100px;line-height: 100px;">
                    <Row style="font-size: 14px;">
                      <Col span="4">子视频名称</Col>
                      <Col span="4">子视频简介</Col>
                      <Col span="3">讲课老师</Col>
                      <Col span="2">视频时长</Col>
                      <Col span="2">排序</Col>
                      <Col span="9">操作</Col>
                    </Row>

                    <Row style="background: #fff;"  v-for="(sub,index1) in parent.sub_video">

                      <Col span="4" style="line-height: 100px;margin: 10px 0;">
                        <div style="width: 150px;height: 100px;border:1px solid #000;margin: 0 auto;line-height: 50px;">{{sub.sub_url}}<br>
                          <span>{{sub.sub_name}}</span>
                        </div>
                        <!---->
                      </Col>
                      <Col span="4">{{sub.sub_name}}</Col>
                      <Col span="3">{{sub.sub_introduction}}</Col>
                      <Col span="2">{{sub.sub_adder}}</Col>
                      <Col span="2">{{sub.sub_sort}}</Col>
                      <Col span="9">
                        <Button :size="buttonSize" type="primary">预览</Button>
                        <Button :size="buttonSize" type="primary" @click="sub.modal2 = true">编辑</Button>
                        <Modal
                          v-model="sub.modal2"
                          title="视频专辑"
                          @on-ok="okzbj(sub)"
                          @on-cancel="cancel">
                  <p class="ln-g">  <Row>
                    <Col span="6">视频名：</Col>
                    <Col span="18"><Input v-model="value" placeholder="请输入视频名" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">视频介绍：</Col>
                    <Col span="18">
                      <Input v-model="valueIntroduction" type="textarea" placeholder="视频介绍..." style="width: 100%" />
                    </Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">缩略图地址：</Col>
                    <Col span="18"><Input v-model="valueadd" placeholder="请输入缩略图地址" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">添加者：</Col>
                    <Col span="18"><Input v-model="tianjiazhe" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">排序：</Col>
                    <Col span="18"><Input v-model="valueSort" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                  <br>
                  <p class="ln-g"><Row>
                    <Col span="6">状态：</Col>
                    <Col span="18"><Input v-model="zhuantai" placeholder="" style="width: 100%" /></Col>
                  </Row></p>
                  </Modal>

                        <Button :size="buttonSize" type="primary"  @click="deletecz(index,index1)">删除</Button>
                      </Col>
                    </Row>
                  </p>
                </transition>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
    <br>
    <Page :total="100" show-elevator />
  </div>
</template>

<script>

  export default {
    name: "Add_video",
    data () {
      return {
        value13: '',//搜索视频名称
        select3: '',//选择视频状态
        value:"",//视频编辑名称
        valueIntroduction:"",//视频介绍
        valueadd:"",//视频地址
        tianjiazhe:"",//添加者
        valueSort:"",//排序
        zhuantai:"",//状态
        modal1: false,
        modal:false,
        buttonSize: 'large',
        parent_video_group:[
          {
            parent_name:"父视频名1",//父视频名
            parent_introduction:"父视频简介1",//父视频简介
            parent_adder:"添加者1",//添加者
            parent_sort:"1",//排序
            parent_witch:"禁用",
            show:false,
            valueadd:"缩略图地址",
            modal2: false,
            modalbj:false,
            sub_video:[
              {
                sub_name:"子视频名",//子视频名
                sub_introduction:"子视频简介",//子视频简介
                sub_adder:"添加者",//添加者
                sub_sort:"1",//排序
                modal2:false,
                sub_url:"缩略图地址"
              },
              {
                sub_name:"子视频名2",//子视频名
                sub_introduction:"子视频简介2",//子视频简介
                sub_adder:"添加者2",//添加者
                sub_sort:"1",//排序
                modal2:false,
                sub_url:"缩略图地址2"
              }

            ],
            parent_number:12,//视频数
          },
          {

            parent_name:"父视频名2",//父视频名
            parent_introduction:"父视频简介2",//父视频简介
            parent_adder:"添加者2",//添加者
            parent_sort:"1",//排序
            parent_witch:"禁用",
            show:false,
            modal2: false,
            modalbj:false,
            valueadd:"缩略图地址",
            sub_video:[
              {
                sub_name:"子视频名",//子视频名
                sub_introduction:"子视频简介",//子视频简介
                sub_adder:"添加者",//添加者
                sub_sort:"1",//排序
                modal2:false,
                sub_url:"缩略图地址"
              },
              {
                sub_name:"子视频名2",//子视频名
                sub_introduction:"子视频简介2",//子视频简介
                sub_adder:"添加者2",//添加者
                sub_sort:"1",//排序
                modal2:false,
                sub_url:"缩略图地址2"
              }
            ],
            parent_number:11,//视频数
          }

        ],//视频编辑数组


      }
    },
    methods: {
      ok (parent) {
        this.parent_video_group.push({
          parent_name:this.value,
          parent_introduction:this.valueIntroduction,
          parent_adder:this.tianjiazhe,
          parent_sort:this.valueSort,
          parent_witch:"禁用",
          valueadd:this.valueadd,
          modal2:false,
          modalbj:false,
          sub_video:[],
          parent_number:10,}),
          this.$Message.info('添加成功！');
      },
      ok2 (parent) {
        parent.sub_video.push({
            sub_name:this.value,//子视频名
            sub_introduction:this.valueIntroduction,//子视频简介
            sub_adder:this.tianjiazhe,//添加者
            sub_sort:this.valueSort,//排序
            sub_url:this.valueadd
        })
      },
      okbj (parent){
          parent.parent_name=this.value,
          parent.parent_introduction=this.valueIntroduction,
          parent. parent_adder=this.tianjiazhe,
          parent.parent_sort=this.valueSort,
            parent.parent_witch="禁用",
            parent.valueadd=this.valueadd,
            parent.modal2=false,
          parent. modalbj=false,
          // parent.sub_video=[],
          parent.parent_number=10

      },
      okzbj(sub){
        sub.sub_name=this.value,//子视频名
          sub.sub_introduction=this.valueIntroduction,//子视频简介
          sub.sub_adder=this.tianjiazhe,//添加者
          sub.sub_sort=this.valueSort,//排序
          sub.sub_url=this.valueadd
      },
      cancel (parent) {
        this.$Message.info('取消添加！');
      },
      Switch(parent){
        if(parent.parent_witch=="禁用"){
          parent.parent_witch="启用"
        }else {
          parent.parent_witch="禁用"
        }

      },
      showhide(parent){
        parent.show = !parent.show;
      },
      deletec(index){
        this.parent_video_group.splice(index,1)


      },
      deletecz(index,index1){
        this.parent_video_group[index].sub_video.splice(index1,1)

      }
    }

  }
</script>

<style scoped>
  .ln-g{
    line-height: 32px;
    text-align: right;}
  button{background: #8CD3F7;border-color: #a2c5e1;}
</style>
