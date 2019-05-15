const toThousands = num => (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

const BaseUtil = {
    isNil(value) {
        return value === null || value === undefined;
    },
    isType(value, type) {
        return {}.toString.call(value) === '[object ' + type + ']';
    },
    isString(str) {
        return this.isType(str, 'String');
    },
    getStyle(dom, name, defaultValue) {
        try {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom, null)[name];
            }
            return dom.currentStyle[name];
        } catch (e) {
            if (!this.isNil(defaultValue)) {
                return defaultValue;
            }
            return null;
        }
    },
    getWidth(el, defaultValue) {
        let width = this.getStyle(el, 'width', defaultValue);
        if (width === 'auto') {
            width = el.offsetWidth;
        }
        return parseFloat(width);
    },
    getHeight(el, defaultValue) {
        let height = this.getStyle(el, 'height', defaultValue);
        if (height === 'auto') {
            height = el.offsetHeight;
        }
        return parseFloat(height);
    },
    modifyCSS(dom, css) {
        if (dom) {
            for (const key in css) {
                if (css.hasOwnProperty(key)) {
                    dom.style[key] = css[key];
                }
            }
        }
        return dom;
    },
    createDom(str) {
        const TABLE = document.createElement('table');
        const TABLE_TR = document.createElement('tr');
        const FRAGMENT_REG = /^\s*<(\w+|!)[^>]*>/;
        const CONTAINERS = {
            tr: document.createElement('tbody'),
            tbody: TABLE,
            thead: TABLE,
            tfoot: TABLE,
            td: TABLE_TR,
            th: TABLE_TR,
            '*': document.createElement('div')
        };
        let name = FRAGMENT_REG.test(str) && RegExp.$1;
        if (!(name in CONTAINERS)) {
            name = '*';
        }
        const container = CONTAINERS[name];
        str = str.replace(/(^\s*)|(\s*$)/g, '');
        container.innerHTML = '' + str;
        const dom = container.childNodes[0];
        container.removeChild(dom);
        return dom;
    }
};
const createDom = (str, css) => {
    let dom = str;
    if (BaseUtil.isString(str)) {
        dom = BaseUtil.createDom(str);
    } else {
        dom = str;
    }
    dom.bbox = dom.getBoundingClientRect();
    dom.hide = function() {
        dom.style.visibility = 'hidden';
        return dom;
    };
    dom.show = function() {
        dom.style.visibility = 'visible';
        return dom;
    };
    dom.css = function(obj) {
        BaseUtil.modifyCSS(dom, obj);
        return dom;
    };
    dom.width = function() {
        return BaseUtil.getWidth(dom);
    };
    dom.height = function() {
        return BaseUtil.getHeight(dom);
    };
    dom.destroy = function() {
        dom.parentNode && dom.parentNode.removeChild(dom);
    };
    dom.on = function(eventType, callback) {
        dom.addEventListener(eventType, callback);
    };
    dom.off = function(eventType, callback) {
        dom.removeEventListener(eventType, callback);
    };
    dom.css(css);
    return dom;
};

const convertRatio = val => (val && val !== 0 ? (val * 100).toFixed(1).toString() + '%' : val);

const percentConversion = val => (val ? (+val * 100).toFixed(1) + '%' : val);
const isUP = val => {
    if (val === 0 || val === '0') {
        return { propClass: null, value: val };
    }
    if (!val || val === '--' || val === '') {
        return { propClass: null, value: '--' };
    }
    const propClass = (val + '').indexOf('-') > -1 ? 'arrow-down' : 'arrow-up';
    const value = (val + '').indexOf('-') > -1 ? (val + '').replace('-', '') : val;
    return { propClass, value };
};
const isUpOrDown = (value, precisionFlag = false) => {
    // 处理 箭头
    let flag = 0; // 0:"--" 1: "升" 2："降"
    if (+value === 1) {
        return {
            value: '100%',
            flag: 1
        };
    }
    if (+value === 0) {
        return {
            value: '0',
            flag: 0
        };
    }
    if (value) {
        value = '' + value;
        if (value.indexOf('-') === -1 && value.indexOf('.') > -1) {
            value *= 100;
            value = `${precisionFlag ? value.toFixed(2) : value.toFixed(0)}%`;
            flag = 1;
        } else if (value.indexOf('-') > -1 && value.indexOf('.') > -1) {
            value = value.split('-')[1] * 100;
            value = `${precisionFlag ? value.toFixed(2) : value.toFixed(0)}%`;
            flag = 2;
        } else {
            // value = 0 => string
            value = +value === 0 ? '0%' : '--';
            flag = 0;
        }
    } else {
        // "" undefined null  0=>number
        value = typeof value === 'number' ? '0%' : '--';
        flag = 0;
    }
    return {
        value,
        flag
    };
};
const fontType = v => {
    let type;
    if (+v === 0) type = '持平';
    v += '';
    type = v.indexOf('-') > -1 ? '下降' : '增长';
    const value = v.indexOf('-') > -1 ? v.replace('-', '') : v;
    return { type, value };
};
const thousandSeparates = num => {
    const number = (num + '').indexOf('.') > -1 ? parseFloat(num).toFixed(1) : num;
    const res = number.toString().replace(/\d+/, n => {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
            return $1 + ',';
        });
    });
    return res;
};
export { toThousands, createDom, convertRatio, percentConversion, isUP, thousandSeparates, isUpOrDown, fontType };
