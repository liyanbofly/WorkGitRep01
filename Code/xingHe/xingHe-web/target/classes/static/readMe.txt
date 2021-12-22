1、 ajax和SpringBoot Action 类型说明
    (1)ajax 请求
        contentType:'application/json',
        data: JSON.stringfy(data)
        Java 中 controller-action接收参数：@RequestBody  如 saveUser(@RequestBody User user);
        可关注 Reqest——Accpet是什么类型
    (2) ajax 请求
        contentType:'application/x-www-form-urlencoded',
        data: data
         Java 中 controller-action接收参数：没有没有@RequestBody  如 saveUser(User user);
         可关注 Reqest——Accpet是什么类型


     （3）
          ajax 请求
             contentType:'application/x-www-form-urlencoded', // 默认可不写
             data: data    // 如 {dataId:3333}
              Java 中 controller-action接收参数       @RequestParam("dataId") String dataId



  2、新闻 富文本编辑上传文件目录修改：
    savefilePath: C:\Users\elane\Desktop\xh\xingHe\xingHe-web\src\main\resources\static\uploadFile\ueimage\
    修改这一个目录就可以
