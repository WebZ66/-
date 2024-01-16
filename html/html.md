# Radio

```
<input type='radio' name='' value=''>
```

原生的radio组件需要绑定name，具有相同的name的作为一组，value值则是选中的值。

可以 绑定`checked`设置默认的选中状态，可以通过onchange或者oninput事件，监听到当前选中状态。它会修改原生的e.target.checked的值。



在vue中应用：

```html
    <input
      v-model="radio"
      type="radio"
      :value="1"
      :class="{ isChecked: radio == 1 }"
    />123
    <input
      v-model="radio"
      type="radio"
      :value="2"
      :class="{ isChecked: radio == 2 }"
    />123
```

**在原生的表单组件上使用 `v-model`，本质上是 :name='radio' ，@input='radio.value==e.target.checked' **。因此可以通过 `响应式变量`的值来**判断哪个组件被选中了**。不然的话，你需要获取所有的input元素，然后遍历循环判断e.target.checked,判断哪个radio被选中。这也就是`受控组件的优势`