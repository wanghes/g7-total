import './assets/iconfonts/iconfont';
import Svg from './components/Svg';
import Sidebar from './components/Sidebar';
import ChildSidebar from './components/ChildSidebar';
import Buttons from './components/buttons';
import Table from './components/table';
import SearchBox from './components/SearchBox';
import directives from './directives';
import Steps from './components/Steps'; // 步骤条

const components = [
    Svg,
    Sidebar,
    ChildSidebar,
    Buttons,
    Table,
    SearchBox,
    Steps,
];

const install = (Vue) => {
    for (const component of components) {
        Vue.component(component.name, component);
    }
    Vue.use(directives);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Svg,
};
