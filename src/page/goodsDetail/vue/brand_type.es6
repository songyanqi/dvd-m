// import { Group, Cell, Panel } from 'vux';
import Cell from 'vux/src/components/cell/index.vue';
import Group from 'vux/src/components/group/index.vue';
import Panel from 'vux/src/components/panel/index.vue';

const BrandType = {
    components: {
        Panel: Panel,
        Group: Group,
        Cell: Cell,
    },
    data () {
        return {
            brandType: '1',
        }
    },
    props: ['brandlist','visitorstatus'],
    methods: {
    }
};
export default BrandType;
