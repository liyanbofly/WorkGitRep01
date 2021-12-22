package com.xingHe.web.controller;

import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.newsInfo.EditNewsVo;
import com.xingHe.vo.newsInfo.NewsSearchVo;
import com.xingHe.web.BaseController;
import com.xingHe.web.service.INewsInfoService;
import com.xingHe.web.utils.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("news")
@Validated
public class NewsInfoController extends BaseController {

    @Autowired
    INewsInfoService  newsInfoService;

    /**
     *   新增和修改新闻
     * @param editNewsVo
     * @return
     */
    @PostMapping("save")
    public ResultVO saveNews(@Valid EditNewsVo editNewsVo) {
        return newsInfoService.saveNews(editNewsVo,getCurrentUser()) ;
    }

    /**
     * 获取新闻列表
     * @param searchVo
     * @return
     */
    @GetMapping("getList")
    public LayuiTable getList(NewsSearchVo searchVo){
        System.out.println("user.dir:" + System.getProperty("user.dir"));
        Log.info("getProperty:{}", System.getProperty("user.dir"));

        Log.info("NewsInfoController.class.getResource:{}", NewsInfoController.class.getResource("").getPath());
        Log.info("NewsInfoController.class.getResource(\"/\"):{}", NewsInfoController.class.getResource("/").getPath());

        return  newsInfoService.getPageList(searchVo);
    }

    /**
     * 根据Id获取新闻数据信息
     * @param dataId
     * @return
     */
    @PostMapping("getById")
    public  ResultVO  getById(@RequestParam("dataId") String dataId) {
      return  newsInfoService.getById(dataId);
    }


    /**
     * 根据Id删除新闻信息
     * @param dataId
     * @return
     */
    @PostMapping("deleteById")
    public ResultVO deleteById(@RequestParam("dataId") String dataId){
                return  newsInfoService.deleById(dataId);

    }


}

