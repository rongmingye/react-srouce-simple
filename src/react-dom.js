import { Component } from "./react.js"

const ReactDom = {
    render
}

function render(vnode, container) { 
    return container.appendChild(_render(vnode))
}

// jsx 转 dom
function _render(vnode) {
    if(vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = ''

    // 如果是字符串
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }

    // 如果是函数组件，渲染组件
    if (typeof vnode.tag === 'function') {
        // 1. 创建组件
        const comp = createComponent(vnode.tag, vnode.attrs)
        // 设置组件的属性
        setComponentProps(comp, vnode.attrs)

        return comp.base
    }

    const {tag, attrs, childrens} = vnode
    const dom = document.createElement(tag)
    if (attrs) {
        Object.keys(attrs).forEach(key =>  {
            const value = attrs[key]
            setAttribute(dom, key, value)
        })
    }

    // 子节点
    childrens.forEach(child => dom.appendChild(_render(child)))

    return dom
}


// 创建组件
function createComponent(comp, props) {
    let inst 

    if (comp.prototype && comp.prototype.render) {
        // 类组件
        inst = new comp(props)
    } else {
        // 函数组件扩展为类组件
        inst = new Component(props)
        inst.prototype.constructor = comp
        inst.render = function() {
            return this.constructor(this.props)
        }
    }

    return inst
}

// 设置组件属性
function setComponentProps(comp, props) {
    comp.props = props
    renderComponent(comp)
}

// 渲染组件
function renderComponent(comp) {
    let vnode = comp.render(comp.props) // 返回jsx
    comp.base = _render(vnode) // 渲染dom节点
}

function setAttribute(dom, key, value) {
    // className
    if (key === 'className') {
        key = 'class'
    }

    // event
    if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
    } else if (key === 'style') {
        // style 可以是字符串也可以是对象
        if(typeof value === 'string') { 
            dom.style.cssText = value
        } else if (value && typeof value === 'object') {
            for (k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px'
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        // 其他属性
        if (key in dom) {
            dom[key] = value || ''
        } 
        if (value) {
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }
    }

    dom.setAttribute(key, value)
}

export default ReactDom