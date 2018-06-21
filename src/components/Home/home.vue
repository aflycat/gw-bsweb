<template>
  <div class="home">
       <h1 v-text="projectName"></h1>
       <div class="homeContent">
           <div class="homeTop">

           </div>
           <div class="homeMenu">
             <span v-for="item in rootSave" v-show="!item.parent">
               <a @click="homeMenuClick(rootSave,item)" v-show="item.node.title != '首页'"><i :class="item.node.iconClass"></i>{{item.node.title}}</a>
             </span>
           </div>
       </div>
</div>

</template>

<script>
import { formatDate } from "../../assets/js/date.js";
export default {
  props: ['rootSave'],
  data () {
    return {
      projectName:'',
    }
  },
  mounted() {
     this.getProjectNmae();

		},
  methods:{
    homeMenuClick(root,item){
      var data = item.node;
      let obj = data.title === '首页' ? {
        isHome: true
      } : {
        isHome: false,
        name: data.title
      }
     
      if (data.selected) return false
      root.forEach(ele => {
        if (ele.node.expand) ele.node.expand = false
        ele.node.selected = false
      })
      var dt = this;
      if(data.hasChild)
      {  
        this.$parent.isFold = false
        this.$parent.navItemClick(root, data)           
      }
      else
      {
        this.$store.commit('setCurpage', obj)
        data.selected = true
        data.expand = true
        this.$router.push(data.href);
      }
    },
    callback: function(){
      console.log("success");
    },
    getProjectNmae: function(){
      var dthis = this;
      let urlna = "/api/real/equip_tree";
      this.Axios.post(urlna).then(response => {
            if(response.data.HttpData.code == 200)
              dthis.projectName =response.data.HttpData.data.Name;
            else
              dthis.getProjectNmae();
        })
        .catch(error => {
          // console.log(error);
        });
    },
  },


}
</script>
<style lang="scss" src="../../assets/styles/sass/home.scss"></style>
