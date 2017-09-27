import SimpleTable from './components/simple-table';

export default {
    install(Vue) {
        Vue.component('simple-table', SimpleTable);
    }
};

export { SimpleTable };