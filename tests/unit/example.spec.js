import { createWrapper, shallowMount } from '@vue/test-utils'
import TextVisualizer from '@/components/TextVisualizer/TextVisualizer.vue'
import Vue from 'vue';

const str2blob = txt => new Blob([txt]);

describe('TextVisualizer.vue', () => {
  const msg = 'new message';
  
  const Constructor  = Vue.extend(TextVisualizer, {
    propsData: {
      blob: str2blob(msg)
    }
  })
  
  const vm = new Constructor().$mount();
  
  it('renderizar un texto', () => {
    const wrapper = createWrapper(vm);
    expect(wrapper.text()).toMatch(msg)
  })

});
