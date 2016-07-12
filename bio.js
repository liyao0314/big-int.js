/**
 * author: oldj
 * blog: http://oldj.net
 */
var BIO;
(function (BIO) {
    var version = "0.1.1";
    function err(msg) {
        var e = new Error();
        e.name = "BIO Error";
        e.message = msg;
        return e;
    }
    function __trans(bn) {
        if (!bn.match(/^\d+$/)) {
            throw err("'" + bn + "' is not an Integer.");
        }
        var a = bn.replace(/^0+/g, "").split("");
        var result;
        a.forEach(function (i) {
            result.push(parseInt(i));
        });
        return result;
    }
    /**
     * 比较两个数的大小
     * @param na
     * @param nb
     * @returns {number}
     * @private
     */
    function __cmp(na, nb) {
        if (na.length > nb.length)
            return 1;
        if (na.length < nb.length)
            return -1;
        var result = 0;
        var i;
        var ca, cb;
        for (i = 0; i < na.length; i++) {
            ca = na[i];
            cb = nb[i];
            if (ca != cb) {
                result = ca > cb ? 1 : -1;
                break;
            }
        }
        return result;
    }
    /**
     * 大于
     * @param a
     * @param b
     * @returns {boolean}
     */
    function gt(a, b) {
        return __cmp(__trans(a), __trans(b)) == 1;
    }
    /**
     * 大于等于
     * @param a
     * @param b
     * @returns {boolean}
     */
    function gte(a, b) {
        return __cmp(__trans(a), __trans(b)) >= 0;
    }
    /**
     * 小于
     * @param a
     * @param b
     * @returns {boolean}
     */
    function lt(a, b) {
        return __cmp(__trans(a), __trans(b)) == -1;
    }
    /**
     * 小于等于
     * @param a
     * @param b
     * @returns {boolean}
     */
    function lte(a, b) {
        return __cmp(__trans(a), __trans(b)) <= 0;
    }
    /**
     * 等于
     * @param a
     * @param b
     * @returns {boolean}
     */
    function eq(a, b) {
        return a.replace(/^0+/, "") == b.replace(/^0+/, "");
    }
    /**
     * 进位
     * @param na
     * @private
     */
    function __carry(na) {
        var i;
        var l = na.length;
        var s;
        for (i = 0; i < l; i++) {
            s = na[i];
            if (s > 9) {
                na[i] = s % 10;
                na[i + 1] += Math.floor(s / 10);
            }
        }
        return na;
    }
    function __add(na, nb) {
        var len = Math.max(na.length, nb.length);
        var result = [];
        var i;
        na = na.slice(0).reverse();
        nb = nb.slice(0).reverse();
        for (i = 0; i < len; i++) {
            result[i] = (na[i] || 0) + (nb[i] || 0);
        }
        result = __carry(result).reverse();
        // 丢掉首位的 0
        while (result[0] == 0) {
            result.shift();
        }
        return result;
    }
    /**
     * 加法
     * @param a
     * @param b
     * @returns {string}
     */
    function add(a, b) {
        var na = __trans(a);
        var nb = __trans(b);
        return __add(na, nb).join("");
    }
    function __minus(na, nb) {
        na = na.slice(0).reverse();
        nb = nb.slice(0).reverse();
        var len = Math.max(na.length, nb.length);
        var result = [];
        // 相减
        var i;
        for (i = 0; i < len; i++) {
            result[i] = (na[i] || 0) - (nb[i] || 0);
        }
        // 借位
        var s;
        for (i = 0; i < len - 1; i++) {
            s = result[i];
            if (s < 0) {
                result[i] += 10;
                result[i + 1] -= 1;
            }
        }
        result = result.reverse();
        // 丢掉首位的 0
        while (result[0] == 0) {
            result.shift();
        }
        return result;
    }
    /**
     * 减法
     * @param a
     * @param b
     */
    function minus(a, b) {
        var na = __trans(a);
        var nb = __trans(b);
        var result;
        switch (__cmp(na, nb)) {
            case -1:
                result = "-" + __minus(nb, na).join("");
                break;
            case 0:
                result = "0";
                break;
            case 1:
                result = __minus(na, nb).join("");
        }
        return result;
    }
})(BIO || (BIO = {}));
//# sourceMappingURL=bio.js.map