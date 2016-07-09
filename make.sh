#! /bin/sh
#测试机的地址
testDomain="wiki@cq01-wiki-test02.vm.baidu.com"
sh build.sh
cd output
tar xjvf *
cd ..
sed -i 's/http:\/\/baike.bdimg.com\//\//g' ./output/odp/data/smarty/config/common/common_resource_map.php
echo "============begin  file upload ==========="
scp -r output/* ${testDomain}:~/
echo "============end file upload ==========="

