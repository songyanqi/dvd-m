/**
 * create by dony in 2017.03.13
 **/
// import { Group, Cell, CellBox } from 'vux';
import Cell from 'vux/src/components/cell/index.vue';
import Group from 'vux/src/components/group/index.vue';
import CellBox from 'vux/src/components/cell-box/index.vue';

const GoodsEvaluate = {
    components: {
        Group: Group,
        Cell: Cell,
        CellBox: CellBox,
    },
    data () {
        return {
        }
    },
    methods: {
        handleComment () {
            location.href = this.commentobj.commentUrl;
        }
    },
    props: ['commentobj'],
};
export default GoodsEvaluate;

