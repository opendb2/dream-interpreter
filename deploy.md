### 解压缩命令
tar -xf dist.zip
### 压缩命令
tar cf dist.zip dist
### 将 dist 覆盖到 nginx 前端静态文件目录
sudo rm -rf sudo /usr/share/nginx/html/dist
sudo mv /home/ec2-user/dream-interpreter/dist /usr/share/nginx/html
### 如果 nginx.conf 有修改，在服务器中更新后同步到 nginx 目录
sudo mv nginx.conf /etc/nginx
### 重新加载 nginx 
sudo nginx -s reload