### 本例基于nestjs官方sample修改
https://github.com/nestjs/nest/tree/master/sample/04-grpc

### 主要进行了以下几点验证
1. server和client分离情况下服务的创建
2. 修改server监听的端口
3. @GrpcMethod/@GrpcStreamMethod注解的生效条件

### 启动方式
打开两个shell, 分别进入server和client, npm install 再 npm run start

### 浏览器访问
http://localhost:3001/

http://localhost:3001/hero/1