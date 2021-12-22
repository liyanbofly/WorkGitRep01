package com.xingHe.web.controller;

import com.xingHe.entity.BaseFiles;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.web.AbstractController;
import com.xingHe.web.service.IBaseFileService;
import com.xingHe.web.utils.Log;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("file")
public class FileController extends AbstractController {


    Logger logger = LoggerFactory.getLogger(FileController.class);


    @Autowired
    IBaseFileService iBaseFileService;

    @Value("${savefilePath}")
    String SaveFilePath;

    /**
     * 文件上传
     *
     * @return
     */
    @PostMapping(value = "upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResultVO upload(MultipartFile file) {

        ResultVO result = new ResultVO();
        boolean fal = false;
        try {
            String fileName = file.getOriginalFilename();
            //先判断是否有上传图片
            if (file != null && file.getSize() > 0) {
                String type = request.getParameter("type");
                System.out.println("file.getSize() = " + file.getSize());
                System.out.println("file.getOriginalFilename() = " + file.getOriginalFilename());

              String filePath= saveFile(file.getInputStream(),file.getOriginalFilename(),"");
             return result.result(StatusCode.STATUS_1,StatusCode.MSG_1,"http://localhost:6001/uploadFile/"+file.getOriginalFilename());

//                String path =request.getServletPath();
//                System.out.println("01:" + path);
//                return  result;

            } else {
                return result.result(StatusCode.STATUS_0, "没有上传文件！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.info("上传文件出现错误......");
        }

        return result.result(StatusCode.STATUS_0, StatusCode.MSG_0);
    }


    /**
     * 保存文件
     * @param inputStream
     * @param fileName
     */
    private String  saveFile(InputStream inputStream, String fileName,String savePath2) {

        OutputStream os = null;
        String filePath="";

        try {
            String path="";

            if(StringUtils.isNotEmpty(savePath2)){
                  path=savePath2;
            }else{
                path=SaveFilePath;
            }

            // 2、保存到临时文件
            // 1K的数据缓冲
            byte[] bs = new byte[1024];
            // 读取到的数据长度
            int len;
            // 输出的文件流保存到本地文件

            File tempFile = new File(path);
            if (!tempFile.exists()) {
                tempFile.mkdirs();
            }
            filePath=tempFile.getPath() + File.separator + fileName;
            os = new FileOutputStream(filePath);
            // 开始读取
            while ((len = inputStream.read(bs)) != -1) {
                os.write(bs, 0, len);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 完毕，关闭所有链接
            try {
                os.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return  filePath;
    }


    /**
     * 保存文件
     *
     * @param
     * @return
     */
    @PostMapping("save")
    public ResultVO saveFileInfo(@RequestBody BaseFiles baseFiles) {
        return iBaseFileService.saveFileInfo(baseFiles, getCurrentUser());
    }


    /**
     * 删除文件
     *
     * @param json tn table标识  recordId 各表数据ID businessType 业务类型 dataType 资料类别
     * @return
     */
    @PostMapping("remove")
    public Map<String, Object> fileRemove(@RequestBody String json) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            logger.info("删除附件参数:" + json);
            if (StringUtils.isEmpty(json)) {
                result.put("error", "删除文件失败,参数为空！");
                return result;
            }
            String id = json.split("=")[1];
            BaseFiles file = new BaseFiles();
            file.setId(id);
            file.setEffective(0);
            int i = iBaseFileService.editFiles(file, getCurrentUser());
            if (i > 0) {
                result.put("success", "删除文件成功！");
            } else {
                result.put("error", "删除文件失败，请稍后重试！");
            }
        } catch (Exception e) {
            logger.error("删除附件异常:", e);
            result.put("error", "删除文件失败！");
        }

        return result;
    }

    /**
     * 删除文件
     *
     * @return
     */
    @GetMapping("removeByPath")
    public Map<String, Object> fileRemoveByPath(String path) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            logger.info("删除附件参数:" + path);
            if (StringUtils.isEmpty(path)) {
                result.put("error", "删除文件失败,参数为空！");
                return result;
            }
            int i = iBaseFileService.editFilesByPath(path, getCurrentUser());
            if (i > 0) {
                result.put("success", "删除文件成功！");
            } else {
                result.put("error", "删除文件失败，请稍后重试！");
            }
        } catch (Exception e) {
            logger.error("删除附件异常:", e);
            result.put("error", "删除文件失败！");
        }

        return result;
    }
    /**
     * 后台上传图片方法
     */
    @RequestMapping(value = "/ueImageUpload2")
    @ResponseBody
    public ResultVO goodsdImageUpload(@RequestParam("file") MultipartFile file) throws IOException {
        return  new ResultVO();

    }

    /**
     * 文件上传
     *
     * @return
     */
    @RequestMapping(value = "ueImageUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String,String>  goodsdImageUpload2(@RequestParam("undefined") MultipartFile file,@RequestParam("action") String action) {
        Map<String,String> mapv=new HashMap<>();
        try{
            String fileName=file.getOriginalFilename();
            //先判断是否有上传图片
            if (file != null && file.getSize() > 0) {
             String type=file.getOriginalFilename().substring(file.getOriginalFilename().indexOf(".")+1);
                System.out.println("file.getSize() = " + file.getSize());
                System.out.println("file.getOriginalFilename() = " + file.getOriginalFilename());
                File path = new File(ResourceUtils.getURL("classpath:").getPath());
                if(!path.exists()) {
                    path = new File("");
                }

                String filePath= saveFile(file.getInputStream(),file.getOriginalFilename(),SaveFilePath);
                mapv.put("url","/uploadFile/ueimage/"+file.getOriginalFilename());
                mapv.put("state","SUCCESS");
            }


        }catch (Exception e){
            Log.error("UE-上传图片失败：{}",e);
        }


        return mapv;
    }



    /**
     * 获取后台配置信息，相当于预请求，该方法可以正常返回上传图片功能才可使用。
     *
     * @return
     */
    @RequestMapping(value = "ueImageConfig")
    public String getUeConfig(@RequestParam("action") String action) {
        if("config".equals(action)){
            System.out.println("\"config\" = " + "config");

        }else{
            System.out.println("\"else\" = " + "else");
        }
      return "{\"theme\":\"default\"}";  // 需返回一个有效属性，否则解析不通过 就不可以上传图片
    }

}
