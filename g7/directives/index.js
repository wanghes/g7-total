import Vue from 'vue';
import { addClass, removeClass, getStyle } from 'g7s-element/lib/utils/dom';

const Directive = {};
let timer = null;

Directive.install = Vue => {
    Vue.directive('dom-sel', {
        bind: function(el, binding, vnode) {
            const isPull = vnode.context.isPull;
            const showPull = vnode.context.showPull;
            if (!!isPull && !!showPull) {
                el.setAttribute('class', 'select-form-pull');
            } else {
                el.setAttribute('class', 'select-form');
            }
        },
        inserted(el, binding, vnode) {
            if (el.scrollHeight > 75) {
                vnode.context.showPull = true;
            }

            window.onresize = () => {
                window.clearTimeout(timer);
                timer = null;
                timer = window.setTimeout(() => {
                    if (el.scrollHeight > 75) {
                        vnode.context.showPull = true;
                    } else {
                        vnode.context.showPull = false;
                    }
                }, 400);
            };
        },
        update: function(el, binding, vnode) {
            const isPull = vnode.context.isPull;
            const showPull = vnode.context.showPull;
            if (!!isPull && !!showPull) {
                el.setAttribute('class', 'select-form-pull');
            } else {
                el.setAttribute('class', 'select-form');
            }
        },
        unbind: function(el, binding) {
            window.clearTimeout(timer);
            timer = null;
        },
    });
};

export default Directive;
