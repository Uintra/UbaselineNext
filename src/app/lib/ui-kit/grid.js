module.exports = {
    install: function(less, pluginManager, functions) {
        let grid;
        functions.add('grid', (params) => {
            grid = new Grid(params.value);

            return false;
        });
        
        functions.add('span', (params) => grid.span(params));
        functions.add('column-width', (params) => grid.columnWidth(params));
        functions.add('span-width', (params) => grid.spanWidth(params));
        functions.add('gutter-width', (params) => grid.gutterWidth(params));
        functions.add('container', (params) => grid.container(params));
        functions.add('offset', (params) => grid.offset(params));
    }
};
class Grid {
    constructor(config) {
        this.config = config;
    };

    span(options) {
        return `${this.calcSpanWidth(options)}%`
    }

    gutterWidth(options)
    {
        let parsed = this.parseOptions(options);
        if (parsed.last) return '0';

        return `${this.calc(options).gutter.toFixed(5)}%`; 
    }

    offset(options) {
        return `${this.calcSpanWidth(options) + this.calcGutterWidth(options)}%`;        
        
    }

    container(options) 
    {
        const size = parseInt(options.value);
        if (size) {
            return `${size}px`;
        }
        return this.config.container || '100%';
    }

    full()
    {
        return '100%';
    }

    calc(options)
    {
        const parsed = this.parseOptions(options);

        if (parsed.context)
        {
            let gutters = parsed.context - 1;
            let c = parsed.context + (gutters * this.config.gutter);
            let a = 100 / c;
            let b = a * this.config.gutter;
            
            return {column: a - b, gutter: b} 
        }

        let gutters = this.config.columns - 1;
        let c = this.config.columns + (gutters * this.config.gutter);
        let a = 100 / c;
        let b = a * this.config.gutter;
        
        return {column: a - b, gutter: b}
    }

    calcGutterWidth(options)
    {
        let parsed = this.parseOptions(options);
        if (parsed.last) return 0;

        return parseFloat(this.calc(options).gutter.toFixed(5));
    }

    calcSpanWidth(options)
    {
        let count = this.parseOptions(options).columns;
        let calculated = this.calc(options);
        let width = count * (calculated.column + calculated.gutter * 2) - calculated.gutter;

        return parseFloat(width.toFixed(5));
    }

    spanWidth(options)
    {
        return this.calcSpanWidth(options) + "%";
    }
    
    columnWidth(options)
    {
        let count = this.parseOptions(options).columns;
        let calculated = this.calc(options);
        let width = count * (calculated.column + calculated.gutter * 2);

        return `${parseFloat(width.toFixed(5))}%`;
    }

    parseOptions(options)
    {
        let _options = options.value;
        let parts = [];
        
        if (Array.isArray(_options))
        {
            parts = _options.map(node => node.value);
        } else {
            parts.push(_options)
        }
        
        let last = parts.indexOf('last') !== -1;
        let first = !last;
        let wide = parts.indexOf('wide') !== -1;
        let columns = parseInt(parts[0]);
        let context = this.config.columns;

        if (parts.indexOf('of') !== -1)
        {
            context = parts[2];
        }

        return {columns: columns, context: context, last: last, first: first, wide: wide }
    }
}
function log(str)
{
    console.log(`\n-----------------------------------------------------------------------\n`)
    console.log(str)
    console.log(`\n-----------------------------------------------------------------------\n`)
}