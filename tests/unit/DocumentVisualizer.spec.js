import { shallowMount } from '@vue/test-utils';
import DocumentVisualizer from '../../src/components/DocumentVisualizer'
describe('DocumentVisualizer.vue', () => {
    const url = "http://www.africau.edu/images/default/sample.pdf"
    const wrapper = shallowMount(DocumentVisualizer, {
        propsData: {
            src: url
        }
    })
    expect(wrapper.classes()).toContain('pdf-viewer');
});