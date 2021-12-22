package com.xingHe.web.controller;

import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.newsInfo.EditNewsVo;
import com.xingHe.vo.newsInfo.NewsSearchVo;
import com.xingHe.web.service.INewsInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("apinews")
@CrossOrigin
public class APINewsInfoController {
    @Autowired
    INewsInfoService newsInfoService;



    /**
     * 获取新闻列表
     * @param searchVo
     * @return
     */
    @GetMapping("getList")
    public LayuiTable getList(NewsSearchVo searchVo){
        return  newsInfoService.getPageList(searchVo);
    }


    /**
     * 获取新闻列表
     * @param
     * @return
     */
    @GetMapping("msg")
    public String getmsg( ){
        return "it is suceess";
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


}
