/**
 * create by dony in 2017-03-28
 */

const NoFindGoods = require('../vue/nofind_goods.vue').default;

new Vue({
    el: "#noFindGoods",
    data: {
        eventHub: new Vue()
    },
    components: {
        NoFindGoods:NoFindGoods
    }
});
