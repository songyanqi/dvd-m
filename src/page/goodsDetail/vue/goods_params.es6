/**
 *
 * create by dony in 2017.03.16
 */
// import { CellBox, Cell, Group } from 'vux';
import Cell from 'vux/src/components/cell/index.vue';
import Group from 'vux/src/components/group/index.vue';
import CellBox from 'vux/src/components/cell-box/index.vue';

const GoodsParams = {
    components: {
        CellBox: CellBox,
        Group: Group,
        Cell: Cell,
    },
    props: ['goodsparamobj','isprompt','isapp'],
    data () {
        return {
            windowHeight: 0,
        }
    },
    mounted () {
        this.windowHeight = window.screen.height;
    },
    methods: {

    }
};

export default GoodsParams;
