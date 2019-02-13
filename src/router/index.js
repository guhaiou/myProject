import Vue from 'vue'
import Router from 'vue-router'
import Profession from '@/components/Profession'
import Index from '@/components/Index'
import School from '@/components/School'
import Login from '@/components/Login'
import Personnal_center from '@/components/Personnal_center'
import Install from '@/components/Install'
import Course from '@/components/Course'
import Type from '@/components/Type'
import Site from '@/components/Site'
import Menu from '@/components/Menu'
import RecordMessage from '@/components/RecordMessage'
import QuestionBank from '@/components/QuestionBank'
import ExaminationList from '@/components/ExaminationList'
import ExaminationListContentText from '@/components/ExaminationListContentText'
import AddVideo from '@/components/AddVideo'
import ExamPaper from '@/components/ExamPaper'
import ExamPaperList from '@/components/ExamPaperList'
import ExamPaperText from '@/components/ExamPaperText'
import addMark from '@/components/addMark'
import test from '@/components/test'/*测试*/
import studentState from '@/components/studentState'/*测试*/
import appUpdata from '@/components/contentManage/appUpdata'
import questionType from '@/components/questionType'
import Advertising from '@/components/Advertising'
import News from '@/components/News'
import BatchController from '@/components/BatchController'
import RegisterPointController from '@/components/RegisterPointController'
import Role from '@/components/Role'
import User from '@/components/User'
import studentManage from '@/components/studentManage'
import ChangeQuestion from '@/components/ChangeQuestion'
import StudyPlan from '@/components/StudyPlan'
import ExamPlan from '@/components/ExamPlan'
import FeedBack from '@/components/FeedBack'
import ErrorCorrections from '@/components/ErrorCorrections'
import StudentMark from '@/components/StudentMark'
import Statistics from '@/components/Statistics'
import Customers from '@/components/Customers'
import TeacherStudent from '@/components/TeacherStudent'
import Objection from '@/components/Objection'
import StudentMsg from '@/components/StudentMsg'
import teacherMsg from '@/components/teacherMsg'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta:{requireAuth:false},
      component:resolve => require(['@/components/Login'],resolve),
    },
    {
      path: '/Profession',
      name: 'Profession',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Profession'],resolve),
    },
    {
      path: '/School',
      name: 'School',
      meta:{requireAuth:false,permissions:false},
      component:resolve => require(['@/components/School'],resolve),
    },
    {
      path: '/Index',
      name: 'Index',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Index'],resolve),

    },
    {
      path: '/Personnal_center',
      name: 'Personnal_center',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Personnal_center'],resolve),

    },
    {
      path: '/Install',
      name: 'Install',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Install'],resolve),

    }, {
      path: '/Course',
      name: 'Course',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Course'],resolve),

    }, {
      path: '/Type',
      name: 'Type',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Type'],resolve),

    },
    {
      path: '/Site',
      name: 'Site',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Site'],resolve),
    },
    {
      path: '/Menu',
      name: 'Menu',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Menu'],resolve),

    },
    {
      path: '/RecordMessage',
      name: 'RecordMessage',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/RecordMessage'],resolve),
    },
    {
      path: '/QuestionBank',
      name: 'QuestionBank',
      meta:{requireAuth:true,permissions:false,name:'referrer',content:'no-referrer',title:'题库'},
      component:resolve => require(['@/components/QuestionBank'],resolve),
    },
    /*考纲*/
    {
      path: '/Examination',
      name: 'Examination',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Examination'],resolve),
    },
    {
      path: '/ExaminationList',
      name: 'ExaminationList',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ExaminationList'],resolve),
    },
    {
      path: '/ExaminationListContentText',
      name: 'ExaminationListContentText',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ExaminationListContentText'],resolve),
    },
    {
      path: '/AddVideo',
      name: 'AddVideo',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/AddVideo'],resolve),
    },
    /*历年真题列表*/
    {
      path: '/ExamPaper',
      name: 'ExamPaper',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ExamPaper'],resolve),
    },
    /*真题题目列表*/
    {
      path: '/ExamPaperList',
      name: 'ExamPaperList',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ExamPaperList'],resolve),
    },
    /*真题题目内容*/
    {
      path: '/ExamPaperText',
      name: 'ExamPaperText',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ExamPaperText'],resolve),
    },
    /*加分宝典*/
    {
      path: '/addMark',
      name: 'addMark',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/addMark'],resolve),
    },
    /*APP版本管理*/
    {
      path: '/appUpdata',
      name: 'appUpdata',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/contentManage/appUpdata'],resolve),
    } ,
    /*测试*/
    {
      path: '/test',
      name: 'test',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/test'],resolve),
    },
    /*真题的题目类型*/
    {
      path: '/questionType',
      name: 'questionType',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/questionType'],resolve),
    },
    /*真题答案数据*/
    {
      path: '/PaperData',
      name: 'PaperData',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/PaperData'],resolve),
    },
    /*广告*/
    {
      path: '/Advertising',
      name: 'Advertising',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Advertising'],resolve),
    },
    /*新闻管理*/
    {
      path: '/News',
      name: 'News',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/News'],resolve),
    },
    /*批次管理*/
    {
      path: '/BatchController',
      name: 'BatchController',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/BatchController'],resolve),
    },
    /*注册点管理*/
    {
      path: '/RegisterPointController',
      name: 'RegisterPointController',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/RegisterPointController'],resolve),
    },
    /*角色管理*/
    {
      path: '/Role',
      name: 'Role',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Role'],resolve),
    },
    /*用户管理*/
    {
      path: '/User',
      name: 'User',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/User'],resolve),
    },
    /*题目纠错*/
    {
      path: '/ChangeQuestion',
      name: 'ChangeQuestion',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ChangeQuestion'],resolve),
    },
    /*学生管理*/
    {
      path: '/studentManage',
      name: 'studentManage',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/studentManage'],resolve),
    },
    /*学习计划*/
    {
      path: '/StudyPlan',
      name: 'StudyPlan',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/StudyPlan'],resolve),
    },
    /*报考计划*/
    {
      path: '/ExamPlan',
      name: 'ExamPlan',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ExamPlan'],resolve),
    },
    /*学生反馈*/
    {
      path: '/FeedBack',
      name: 'FeedBack',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/FeedBack'],resolve),
    },
    /*学生纠错*/
    {
      path: '/ErrorCorrections',
      name: 'ErrorCorrections',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/ErrorCorrections'],resolve),
    },
    /*学生成绩*/
    {
      path: '/StudentMark',
      name: 'StudentMark',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/StudentMark'],resolve),
    },
    /*数据统计*/
    {
      path: '/Statistics',
      name: 'Statistics',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Statistics'],resolve),
    },
    /*客户管理*/
    {
      path: '/Customers',
      name: 'Customers',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Customers'],resolve),
    },
    /*招生老师学生管理*/
    {
      path: '/TeacherStudent',
      name: 'TeacherStudent',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/TeacherStudent'],resolve),
    },
    /*学生异议*/
    {
      path: '/Objection',
      name: 'Objection',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/Objection'],resolve),
    },
    /*学生异议*/
    {
      path: '/StudentMsg',
      name: 'StudentMsg',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/StudentMsg'],resolve),
    },
    /*老师管理下的消息*/
    {
      path: '/teacherMsg',
      name: 'teacherMsg',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/teacherMsg'],resolve),
    },
    /*学习记录*/
    {
      path: '/studentState',
      name: 'studentState',
      meta:{requireAuth:true,permissions:false},
      component:resolve => require(['@/components/studentState'],resolve),
    },

  ]
})

