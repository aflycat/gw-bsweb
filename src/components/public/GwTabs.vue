<template>
  <div class="gw-tabs">
    <div class="tabs-nav">
      <ul>
        <li
        v-for="(nv, index) of list"
        :key="index"
        :class="{active : nv.isActive}"
        @click="navClick(list, list[index])"
        v-if="nv.isShow"
        >
          <slot :name="'nav-icon-' + index"></slot>
          <span v-text="nv.title"></span>
        </li>
      </ul>
      <slot name="tabnav"></slot>
    </div>
    <div class="tabs-container">
      <slot v-for="(nv, index) of list" :name="nv.name" v-if="nv.isActive && nv.isShow" appear>{{nv.title}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    navList: {
      type: Array,
      default() {
        return [
          {
            name: "",
            title: "",
            isActive: true
          }
        ]
      },
      required: true
    }
  },
  computed: {
    list() {
      return this.navList;
    }
  },
  methods: {
    navClick(list, nv) {
      this.$emit("tabsNavClick", list, nv);
    }
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/public/gw-tabs.scss"></style>
