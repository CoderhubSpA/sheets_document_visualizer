import components from '@/components';
console.log(components)
const DocumentVisualizer = {
    install(Vue) {
        Object.keys(components).forEach((name) => {
            Vue.component(components[name].name, components[name])
        })
    }
};

export default DocumentVisualizer;