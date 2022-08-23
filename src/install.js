import components from '@/components';


export default {
    install(Vue) {
        Object.keys(components).forEach((name) => {
            Vue.component(components[name].name, components[name]);
        });
    },
};
