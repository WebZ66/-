# 盒模型

## margin负值问题

- margin-top为负值，那么自身和下方元素都会跟着上移
- margin-bottom为负值，自身不会动，但是供css读取的高度减少，会导致下方元素上移
- margin-left为负值，自身和右侧元素向左移
- margin-right为负值，自身不会动，右侧供css读取的宽度减少，右侧元素左移



# BFC&块级格式化上下文

BFC ： 全称为块级格式化上下文，`是一个独立的渲染区域`，可以让bfc`内部的元素与外界元素相互隔离`，不受外界的影响。

**触发条件：**

- position:absolute/fixed

- display:inline-block/flex

- float:不为none

- overflow不为visible

**作用：**

- 清除浮动带来的父元素高度塌陷问题，比如父元素没设置高度，子元素浮动，高度为0的问题，只需要让父元素成为bfc即可。这是因为BFC计算高度时，会把浮动元素给计算进去

- 解决margin重叠问题。如果上方元素margin-bottom:20px ，下方元素margin-top：10px,那么实际的margin只有20px。解决方案：让下方元素被包裹在一个bfc中即可
- 解决margin溢出问题，子元素被包裹在父元素内部，如果子元素margin-top:50px,父元素也会跟着margin。解决方案，让子元素外层包裹一层bfc

**外边距重叠结果遵循下列计算规则**：

- 两个相邻的外边距`都是正数`时，折叠结果是它们两者之间较大的值。
- 两个相邻的外边距`都是负数`时，折叠结果是两者绝对值的较大值。
- 两个外边距`一正一负`时，折叠结果是两者的相加的和。



# 水平垂直居中

- 父元素display:flex  justify-content align-items
- 父元素flex布局，子元素margin:auto
- 父元素display:grid   grid-template-columns和rows为宽高，然后设置justify-items:center align-items:center
- 父元素绝对定位，子元素相对定位





# flex

容器的flex属性：

- flex-direction：row|column 确定主轴方向  默认是row水平
- flex-wrap：nowrap|wrap  一行放不下是否换行
- flex-flow 是flex-direction和flex-wrap的简写
- justify-content ：弹性项目在主轴上的排列顺序
- align-items：在侧轴上的排列顺序
- align-contents：换行后生效



**弹性项目的属性**

- flex-grow:即弹性项目放大比例，默认为0，即使存在剩余空间，也不放大
- flex-shrink:即弹性项目缩小比例，默认为1 ，如果剩余空间不足，就会默认缩小(这也就是为啥开发时会有阴影)
- flex-basis：给项目分配空间时，项目默认占据的主轴剩余空间。默认是auto，即项目原来的大小

**flex:1 代表的是 1 1 0，即所有项目平分主轴剩余空间**





# 伪类和伪元素

伪类：通过伪类选择器可以选中一些元素

:hover :active  :last-child 

伪元素：创建一些不存在DOM树上的元素

::after  ::before ::first-letter  ::first-line





# display:inline-block

会为什么display:inline-block的元素会出现间隙，因为html代码中，回车换行符会被认为是空白符，当字体大小不为0的时候，空白符会占据一定的位置

如何消除：font-size：0





# CSS包含块

我们有个误区，像定位中的left:10% width:50% ,这种百分比计数，以为都是相对于父元素，其实并非如此，他们是相对于包含块的。

| 值       | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| absolute | 它的包含块是距离它**最近的父级元素position的值不为static**，或者父级元素设置了transform |
| fixed    | 它的包含块默认是viewport视口，但如果父元素设置了transform，那么包含块就是父级元素 |
| relative | 它的包含块默认是距离它最近的父级块级元素                     |



| **百分比单位计算基数属性** | **当前属性**                     |
| -------------------------- | -------------------------------- |
| 相对于包含块的width        | width,left,right,padding，margin |
| 相对于包含块的height       | height，top，bottom              |

实现一个高度是宽度三倍的自适应盒子：

```css
   <div class="box">
            <div class="contain-box">
                <div class="content">123</div>
            </div>
        </div>

 .box {
                width: 100px;
                margin: 100px auto;
               
            }
            /* 如果定位为relative的话，该元素的包含块就是其最近祖先块级元素 */
            .contain-box {
                width: 100%;
                padding-top: 300%;
                background-color: red;
                position: relative;
            }  
            /* 在定义一个绝对定位元素，存放内容 */
            .content{
                position: absolute;
                inset: 0;
            }


```





# CSS选择器的优先级

最初是以权重来表示的!important权重最大>id选择器>类选择器,伪类选择器,属性选择器 >标签伪元素选择器

但现在！是按照选择器的特定性来确认的，我们可以鼠标悬停在选择器上面，可以看到三个数字，第一个代表id选择器个数，第二个是类

选择器，属性选择器，伪类选择器，第三个才是元素选择器伪元素选择器





# 隐藏元素的方法

- display:none  不占据页面位置，不可交互
- visibility:hidden 占据页面位置，不可交互
- transform:scale(0)：不占据页面位置，不可交互
- opacity：0  ：占据页面位置， `可以交互`
- position:absolute  left一个很大的负值，不可交互





