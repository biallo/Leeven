Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
            break;
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
            break;
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
            break;
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            break;
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
            break;
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            break;
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
            break;
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            break;
        default:
            return options.inverse(this)
            break;
    }
    return options.inverse(this);
});

Handlebars.registerHelper("covertSize", function(value, options) {
    var sizes = ['KB', 'MB', 'GB', 'TB', 'PB'];
    if (value == 0) {
        return '0 KB';
    }

    var i = Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, Math.floor(i))).toFixed(2) + ' ' + sizes[i];

});
