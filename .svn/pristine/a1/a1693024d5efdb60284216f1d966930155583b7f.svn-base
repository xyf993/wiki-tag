// 注：配置项值为对象数组类型的(比如 roadmap.path)，在使用 merge() 方法合入 FIS 配置时，可能产生不符合预期的结果(合并算法有问题)
fis.config.merge({
    namespace: 'wiki-tag',
    modules: {
        parser: {
            less: 'baike-less' // less 文件使用自定义解析器 baike-less 解析
        },
        postpackager: 'ext-map',
        packager: 'autopack' // 上线 common 插件第二天后开启使用    
    },
    roadmap: {
        domain: 'http://baike.bdimg.com' // 静态文件域名
    },
    settings: {
        spriter: {
            csssprites: {
                layout: 'matrix', // 按照“矩阵”方式排列图片，可使产出图片体积更小；要求：用于平铺的背景图不可以(MUST NOT)进行 css sprite 处理。
                margin: 5 // 图片间的间距。
            }
        },
        packager: {
            autopack: {
                'fid': 'baike' //为自动合并分配的产品线 FID
            }
        }
    },
    deploy: {
        local: {
            to: './output'
        }
    }
});

fis.config.set('pack', {
    'pkg/wiki-tag.css': [
        '/static/home/home.less',
        '/widget/**/**/*.less',
        '/widget/**/*.less'
    ]
});

// 部署配置
var deployTargets = {
    // RD 测试机
    test02: {
        host: 'cq01-wiki-test02.vm'
    },
    test01: {
        host: 'dbl-baike-test01.vm'
    },
    test03: {
        host: 'cp01-baike-epc017.epc'
    },
    // 沙盒
    sandbox: {
        host: 'yf-wiki-sandbox00.yf01'
    }
};

var deployConfig = [{
    from: '/template', // 模板
    to: '/home/wiki/odp'
}, {
    from: '/static', // 静态资源
    to: '/home/wiki/apache/htdocs'
}, {
    from: '/config', // config
    to: '/home/wiki/odp/data/smarty'
}, {
    from: '/plugin', // plugin
    to: '/home/wiki/odp/php/phplib/ext/smarty/baiduplugins',
    subOnly: true
}, {
    from: '/smarty_compile',
    to: '/home/wiki/odp/template/config/' + fis.config.get('namespace'),
    subOnly: true
}];

fis.util.map(deployTargets, function(serverName, serverConfig) {
    var _deployConfig = [];
    for (var i = 0; i < deployConfig.length; ++i) {
        var _configClone = fis.util.clone(deployConfig[i]);
        _deployConfig.push(fis.util.merge(_configClone, {
            receiver: 'http://' + serverConfig.host + '.baidu.com:' + (serverConfig.port || '8099') + '/receiver.php'
        }));
    }

    fis.config.set('deploy.' + serverName, _deployConfig);
});