/**
     * 判断变量是否空值undefined, null, '', false, 0, [], { } 均返回true，否则返回false
    *@param v
    *@returns { Boolean }
     */
    empty: function (v) {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (v === 'undefined') return true;
                if (v.length == 0) return true;
                break;
            case 'boolean':
                if (!v) return true;
                break;
            case 'number':
                if (0 === v) return true;
                break;
            case 'object':
                if (null === v) return true;
                if (undefined !== v.length && v.length == 0) return true;
                for (var k in v) {
                    return false;
                }
                return true;
                break;
        }
        return false;
    },
