<template>
  <div :class="{'ui-wx':isWx}" v-show="menuId==8 || menuId==null " class="we-chat-icon">
    <img src="https://9i.dvmama.com/free/2018/08/31/icon_wx_group_invite.png" @click="toInvitePage" width="40px"
         height="97px"/>
  </div>
</template>

<script>
  import tj from 'dvd-service-js-tj';
  import ua from 'dvd-base-js-ua';

  export default {
    name: "weChatTip",
    data() {
      return {
        menuId: this.getQuery('menuId') || 8,
        isWx: ua.isWeiXin()
      }
    },
    created() {
      var self = this;
      self.fetchData();
    },
    props: ['wechatdata'],
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.menuId = this.getQuery('menuId')
      },
      getQuery: function (name) {
        var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.match(reg)
        if (r != null) return decodeURIComponent(r[2]);
        return null
      },
      toInvitePage() {
        tj.send({
          production: 0,
          action: 1,
          action_type: 4
        });
        window.location.href = this.wechatdata.command.content;
      }
    },
  }
</script>

<style>
  .we-chat-icon {
    position: fixed;
    right: 0;
    bottom: 0.55rem;
    z-index: 1203;
  }

  .ui-wx {
    bottom: 1rem !important;
  }
</style>
