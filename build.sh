#!/bin/bash

# 设置模块名
MOD_NAME="wiki-tag"

# 设置打包产出文件名
TAR="$MOD_NAME.tar.gz"
STATIC_TAR="static-$MOD_NAME.tar.gz"

# 设置环境变量
export PATH=/home/fis/npm/bin:$PATH

# 打印fis-plus的版本信息
fisp --version --no-color

# 通过fis-plus release 命令进行模块编译 开启optimize、md5、打包功能，同时需开启-u 独立缓存编译方式，产出到同目录下output中
fisp release -cuompDd output

# 进入output目录
cd output

# 整理目录结构，清理不需要上线的文件
mkdir -p ./webroot
mkdir -p ./data/smarty
mkdir -p ./php/phplib/ext/smarty/baiduplugins
mkdir -p ./template/config/$MOD_NAME
mv ./static ./webroot/
mv ./config ./data/smarty/
mv ./plugin/* ./php/phplib/ext/smarty/baiduplugins/
mv ./smarty_compile/* ./template/config/$MOD_NAME/
rm -rf ./test
rm -rf ./server-conf
rm -rf ./plugin
rm -rf ./smarty_compile

# 打包
# 按照ORP的规范，文件必须打包，并且打包格式必须为.tar.gz
# 将output目录进行打包，用于ODP环境，部署路径为ODP的根路径，传统集群为/home/wiki/odp，ORP集群为/home/work/orp
tar czf $TAR ./*
mv $TAR ../
# 将static目录单独打包，用于ORP的静态集群
cd webroot
tar czf $STATIC_TAR ./static
mv $STATIC_TAR ../../
cd ..

# 清理中间文件，产出最终结果
cd ..
rm -rf output

mkdir output

mv $TAR output/
mv $STATIC_TAR output/

# 完成
echo "build end"

