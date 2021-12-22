package com.xingHe.web.service;

import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.newsInfo.EditNewsVo;
import com.xingHe.vo.newsInfo.NewsSearchVo;
import org.springframework.stereotype.Service;


public interface INewsInfoService {
    /**
     *   新增和修改新闻
     * @param editNewsVo
     * @param elaneUser
     * @return
     */
      ResultVO saveNews(EditNewsVo editNewsVo, ElaneUser elaneUser);

    /**
     * 获取新闻分列表
     * @param search
     * @return
     */
      LayuiTable getPageList(NewsSearchVo search);


    /**
     * 根据Id获取新闻数据信息
     * @param dataId
     * @return
     */
       ResultVO  getById(String dataId);

    /**
     * 根据Id删除新闻数据信息
     * @param dataId
     * @return
     */
     ResultVO  deleById(String dataId);

}
