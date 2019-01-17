import layout from "../layout.es6"
import tt_com_0 from './tt_com_0.vue'
import lazyload from 'dvd-service-js-img-lazyload';
import ua from 'dvd-base-js-ua';

export default {
  data(){
    return {
      msg: 'hello vue',
      lazyload,
      ua,
    }
  },
  props: ['data'],
  computed: {
    styleObject: function () {
      let scope = this;
      return layout.styleObject(scope.data);
    }
  },
  components: {
    tt_com_0: tt_com_0
  },
  methods: {
    imgObject: function (imgSrc) {
      return {
        src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
        error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
        loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
      }
    },
    clickAnalysis: function (item) {
      layout.clickAnalysis(item, this, 'body');
    }
  }
}
