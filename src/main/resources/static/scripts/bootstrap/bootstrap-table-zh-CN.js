/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            //return '正在努力地加载数据中，请稍候……';
            return '<div class="loading" >' +
                '<div class="loading-logo">' +
                '<img src="/images/loading201808131549.gif"/>'+
                // '  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAOpUlEQVRogeWae5QU1Z3HP7eq+jHT09PdM8wMw8zwGt5hecQXQQxoQJQQWViNLKtg8Hh0TVbWxY0eTTY5G5Osxngim+i6eAgkghJxNbAcdQOCiRtF0bggGo0PYBhQ5sUM3T3TXV11949+3a5+zECTzdmT3zlzuure3731+9bvd3+vKSGllPwZkfanFuD/moxyFtsdv4NoF8JIbiMBkfpNk3ovlPGzMivbRuou9MbZIPSz2QFRjknHn1tC/JXtaLUURyWUa7I8QqaGCr2FImtkGLQGqLgxcdaAy9Kw1jgH4d2OcJOvWoqMOaZLTiprhQA7DiIw6azBQrmAgxMRnpRwxbxBSsuCwiafM5jmSzNo2fGM8r0jyhG5PKclQpMRlYBFviZV85QKCHVOZlly1K2atDIuLRCB1nJELhOwfwzCVw0JsloqBEy5zzu3pZYUON9acHIZEpcbljQD4Z+ENJUx4filwJyqfScox0vKsEgQHtACk8oTuazVgPA1I20Ke+RCZuq8TvMXWJ9jNBYIL4jQxLLkLR+wO4QoZcZO/sHMXmT/ZJpXAgkQPj+iamRZ8pYP2DssqWGhmF9KNRlFKq45z0OrPHmbK6wmiMB00MoKLOcAcNWoTPiQaafk8K5JxtzrHM9cKNFA4REgE6AFyjNnOBeA07HYTg+QAZCXwykvIvNicjbLdVJ50/7R5Yp7DgDXTEFLx2J1XCazo9zBnJ/cG6fJq7wyKamoaChX3HMAuHI4BFuQ8dSAInjBZINc7WYcngI8Z1nKaQkNhLu6XHGzgGUsBvbZ1RFaYEpSw2pcVdSYl0mR5ZWlQhnZOeECUVleWglKLt15w1eIHHoZl+47g+UCS+pUX9JGxaVgd2YFdMibvSgCKO9eya+lDaICCI4/A9kKUwawMbyR/t+2YZcsYfLJlOA9BL5Fit8SijmnhU+VdySyayWp7MmXBJUhp5WYoIWak8enTMoArrz6ajzPPIgGCGFQuJR3UtKbWBET+7RMHhArZaaqqcrkuDbmIrTqcQjDl9zZPI3d/Ray411w5e+ekSAOonpKuVgBVcMtzWo1Rp5dFQ2uEjmgQdxC6MmKJmc5gA0yBp75T6D5x+TsYH34NANPXY0WIvclpaxECLBtEIFx5wRwxmnpLc24qltTOi2V+KokESQLc9mfqsuLdTwECE8I6/3HGdjYwMCmRqzjv0bz1iGcsUJZk66utNBnzhxdAco+Sgi858/Fyqnfipl0bkJsmwI7DugOduep0FzI6HHskyexOz5BxLqQuidXIvXsS8AG4QYRmHDm6ApQTmJaMXce7N5A0rNo5Jt0GkkWlRBgW2D3gF7nEFoFIUEYPrSxf4VrVltybcvlyN6PskmLWiWlH5NIeuhyC/+MxGoTz/q0g2OzGrClRBPquyh2hlPrJNR+yaRiAVgnlCVpECmnZUy9Ca1+Frh8SYbYKayjO0j84T+zrSJnH2sA9GAAz8puzkVXOUfDekMdnhEXEmnfh1Yy+881dYkg0Um2t+Zs0QhAh/j+9WCtz+TMUibNVfMrzk6NvySrJE9l4zkBCwWaeK4p07CP7UslwoNlXlnprI5kRZNx9U6SoFVl2HNitbSUF5ACKmTSrCu98HEkwYZf78YlTXQSWdNXPHl6r3A8RqM/wG2fmz80wEZTS2o/ZxvCCTR7LQCrWyCjMhmaEgpbGmDqXqbGpKPDkfaVmd/0uffAB1GNe1/bT63sweWsUhwiftLTyeUTpg0dsOfzl6BvBDBJZgOFQOc6MAEkwhp2r5XMmkxlulA5qPZuRFarzkcJAdjwiT6C+tBwxtsFDE+5F0IQtyyumjy9IFgocDC88+bi8TSkwlMRd+sYE0JimQKrE3BEGZFlywzkFBOFHpGzEA4zHJsip0zxE6aVYFhFJZeOKd7oy/cEmsAzdXYmHgs0LGliShNTJjJ/CZnuzWqp8yewTwFuhzwqAFXbZMelom1VY0Zq7FMRpEI5u84XktbDqVg/E2rqmVJfvKoq2CCquPwKet94BrCxpIW39i9wT5qGTJiARBgurK5O+n+/CyEkYCAR2OGkp84pHtRzrJzVQSsnCYaAqIR2rZ4qeyB3vwL7d/X3s2pG6RS0IGD3BRegA1JaJCQMu+YG/Hf9Qw6P1d7O0Yubk44ldQbtKFnHo1LaUSnhKG9euU57aIDjsoZ2glQSz30hBcxbIplc11gScMHgpje3oAkts58dCefxWJ2dyp1M8SnCF0nBMxoukaKrOE6IOnqED7daV6pMKe1ato3f7aGpOlR8Y4oBrh+Ge/hnswHAtvOZElbekNVBspQrlKOoGnH+4nhPInt/lAb68KCLAjIo1BcbYGJtPdMbW0ryFU1fvBfNybRd9dq6vHmjVc1tk7E4cUpHRsgelAKmm/HQjjOc8w6Udd1UY5UyB5F8+sn+CDMbW3Bppf+VWrSr7V2wEO3ZHyGA6O7nwKsjraRWhaZhHj2atEyReS5WRGD1gF5DsqlXoFTMJBxqvM1O5zm1XirRsUsmfVJKdGDOyMFbQMUBz5uLy/BhJSKED+2k79DOjLMRKU0ZIh2D7FShLrC7QB8BpI+9I/6mNSgU8HnaFVnTC4sKdLWMUvdMXUfMOGMCtVw0cuyggIuatPBV4GmdjQXowsAldNyagVtLXhvCIFOwpmSxZfIc530RoMZfoYAsEEvTY67UbydBPJi5PA4Kx2OMDNRQW1F19oABXGPHp7Sqka2PhXKtIEAmq6aO5LRQp4ZCKV511x40jlFLlYwVXyagNx6jJVgzpMeU/M+Ua2wrFmBluuylyZIQ/wAIg4yR24lUhSSlTDVBSZFULj4GDuou3PIUiZSWNbLdUQAhJSejp5k5iHdOU0nA3i8uonLTDxBSIoQXh2vJuzakQAskwBVDGwbObDCtPpECJFNJhjqfTUwkfWIGzdpIGuQpNBWm8vhYIsGoYC2Xjh3aP8oH/2zJTCBlukwZhNK+RRdDN+USm5m4sJFJL11kQ1tK3PrQv+op6zut/4/0J/n08ODb7xAOR854XWdXN5+e7Cjr2SXP8LqHH2XXiy/xy6c2IxwmLaWkp+cUq266lTvXrmHO7FmZudPhMK/ue52TnZ0IBHXDavH7/bQda6e3r49b19zB6pV/w/zL5lJfV4dpmhxpO0YwEGDZksVF5Xn70Lssv341L+3aycTxZ9eYLwl47pyLefKp/2Dr08+y/OqlOXNCCO7+1ndIWBbjx+W2UP9r1x7W3HEXd9x+GzXBAI9tfJwDbx9i7ZqvYpomP7zvXqp8PiKRKN94+LuEgkEWfOFSXIZBOBxm2zPbiQ4MUO33E6j209XVjWXbRCJRfL5Kbrzl77jpKyuxrKwjk1LS29fHlQvnM3li8R52HmApJQOxGEjJ9GlTefG57Rw+epT+gYFcwMDqVddx3szp6LpONNqPYei43W5isTjnzZzBZyZNwExYNA5v4OPDh2kdM5rOrm5mXXg+B99+B5fLRXV1NbW1NbSOHUMikSDa38/Gx5+go7MLQ9fp7jlFQ30dhqHj9Xq5ePYsurt7eHj9BlT3I23JkbY2RrY0nxngzq4uli1fRW9fH/4qH36/Hykl4XAYZxE6rLaGgViccDjM0bZ2li1ZzEMPfB+frxJd1/n9e3/gvgcfwjBcNDc1csWSa1h61WKCwQD79r/BQz95lAnjWvnww4/YsfN5bv/a33LlwvnsfWEHAC+9/Apfv/uf2PPCDiorvEVBqMpyHr1BAfv9fr519z9imgkMY+hfzESjUZqbmwAIh8PU1w3j1ptv5IXde6io8FLt9xMKBrngvJksuGweh48c5ZqlVxEKhZBS0n78BJfM+RyGEmIqK72paDi0QDIYWCgA2OvxMP+yeUN6QCnSDZ2fb/kFK1dcS+vY0fxq917WPfAvrL3rG8TjcXbveYkf/eB7vPraG4wa2UxXVzf33vdDXti+TZHFTSQSZf6ipXi9HmSRLxR6T59m5Ypr+fuv3TKoXOV99FSEPB4P7e0nmDwxwpGjbbz5Pwfo6Ojkx48+BkKwafNWRjQO59/W/5TOrm7MhMm8Sy5my8Z/z9knGh3A4/Fw21dvptqfLgzyezvf+f4D/Oa/Xzl7wCc7OtmydRuGrqMbBbIYR/Eej8fxuD1ct+LLVPl8GIaBZVnsenEvbrebGdOmUhMKEj4dob5uGI+s38AVC74AwIgRjZjxOOseWc9HHx/hnjvXZvYdiMVwu915EcJJu3bv5UjbsUHBFgXc1dXNhk2P4/a48bgL1Xq5CXA4HMbvr2LZXy6myufLOA+fr5KRI5tpHTsa00ygN+n09vXh9XgIhYK0NI0gkUjgdrv56PARtmx9mjvXrsn4Dk3TsG2bru4eamuK96rCkQgud4FPCIYKePKkCRx4/eUhbVCIhBAIIeg7HebE8U8ZVlNL3IwTDASIRKL09vUSi8Xo7umht6+P4Q0N1IRCVFR4icfNDODamhCJRALLyu+f5T1ziLL9Uc6wZVkIoTFh7Cje/+BDDh56B7fLxUAsxuEjbUwYN479b/yOuGkyqqWZ377yGp1d3UydMgmXKyvSq/v209nVTWVlRWkQhoFdqNFYiOQfgTZtflJ+cdnyvPH5i5bKr9/zbSmllBOnXSif/9VuaUtbjpowTb751oEc3gMHD0nDXyd/tvnJgs+wbVtali2llPLGW26TX75u9ZBky9Pwszt2ctc3/5mRLU1F4ppzLHmeB/pjCE1jz/O/JBQM0t5+nPsfXMfBd94l4PfT3XOKvb95mW1PbOT48RO8d+AttmzdxmM//TmRaJT7H1xHS3MT93/321i2zbLl17Pqur/m+hXXFlTU7Xfew+YnfsGYMaN5ff+b3HD9iiEpOA9wc9MIvrRoIbU1NUMK5GmKx02Eljy7F53/Wb551x1095yiafhwKisrCAaq+dljjxCorubYsXbWPfyvRCJRAJYsvpJ333ufmlAQKSWaEKx/ZB2fnzO76PMWLVxAS1MTgUA1N69excwZ04Yk559dPfy/SMZQOsrMRNQAAAAASUVORK5CYII=" >' +
                ' </div>' +
                '</div>';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页显示 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pagesize, totalRows) {
            return '共 ' + totalRows + ' 条,每页' + pagesize + ' 条';
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            return '没有找到匹配的记录';
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        },
        formatExport: function () {
            return '导出数据';
        },
        formatClearFilters: function () {
            return '清空过滤';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);
