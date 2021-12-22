package com.xingHe.web.service;

import com.alibaba.druid.support.spring.stat.annotation.Stat;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xingHe.entity.NewsInfo;
import com.xingHe.entity.Role;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.vo.newsInfo.EditNewsVo;
import com.xingHe.vo.newsInfo.ListNewsVo;
import com.xingHe.vo.newsInfo.NewsSearchVo;
import com.xingHe.web.dao.INewsInfoMapper;
import com.xingHe.web.handelRequest.MyAnnonation;
import com.xingHe.web.utils.Log;
import com.xingHe.web.utils.UUIDUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Service
public class NewsInfoServiceImpl implements  INewsInfoService {

    @Resource
    INewsInfoMapper iNewsInfoMapper;


    /**
     *   新增和修改新闻
     * @param editNewsVo
     * @param elaneUser
     * @return
     */
    @Override
    public ResultVO saveNews(EditNewsVo editNewsVo, ElaneUser elaneUser){
        ResultVO resultVO=new ResultVO();
        int resultFlag=0;

        try {
            if(StringUtils.isNotEmpty(editNewsVo.getId())){
               NewsInfo oldNewsInfo= iNewsInfoMapper.selectById(editNewsVo.getId());
               if(oldNewsInfo!=null){
                   BeanUtils.copyProperties(editNewsVo,oldNewsInfo,"id");
                   oldNewsInfo.setStatus(true);
                 resultFlag= iNewsInfoMapper.updateById(oldNewsInfo);

               }else{
                   Log.error("saveNews-修改：异常，dataId{}",editNewsVo.getId());
                   return  resultVO.result(StatusCode.STATUS_99,StatusCode.MSG_99);
               }
            }else{
                NewsInfo newsInfo=new NewsInfo();
                BeanUtils.copyProperties(editNewsVo,newsInfo,"id");
                newsInfo.setId(UUIDUtils.getUUID32());
                newsInfo.setCreator(elaneUser.getName());
                newsInfo.setCreatedby(elaneUser.getId());
                newsInfo.setCreatedTime(new Timestamp(System.currentTimeMillis()));
                newsInfo.setStatus(true);

                resultFlag=iNewsInfoMapper.insert(newsInfo);
            }
            if(resultFlag>0){
                resultVO.result(StatusCode.STATUS_1,StatusCode.MSG_1);
            }else{
                Log.error("saveNews2");
                resultVO.result(StatusCode.STATUS_99,StatusCode.MSG_99);
            }
        } catch (BeansException e) {
            e.printStackTrace();
            Log.error("saveNews-ex:{}",e);
            resultVO.result(StatusCode.STATUS_99,StatusCode.MSG_99);
        }

        return  resultVO;
    }


    /**
     * 获取新闻分列表
     * @param search
     * @return
     */
    @Override
    @MyAnnonation("获取新闻列表||| ")
    public LayuiTable getPageList(NewsSearchVo search){
        LayuiTable layuiTable = new LayuiTable();
        try {
            Page<ListNewsVo> page = new Page<>(search.getPage(), search.getLimit());
            // 根据条件获取用户列表
            IPage<ListNewsVo> listNews = iNewsInfoMapper.getList(page, search);
            String total = listNews == null ? "0" : new Long(listNews.getTotal()).toString();
            layuiTable.setSuccessData(new Integer(total), listNews.getRecords());
        }catch (Exception ex){
            Log.error("getPageList-ex:{}",ex);
        }
        return layuiTable;

    }

    /**
     * 根据Id获取新闻数据信息
     * @param dataId
     * @return
     */
    @Override
    public  ResultVO  getById(String dataId){
        ResultVO resultVO=new ResultVO();
        try{
            resultVO.result(StatusCode.STATUS_1,StatusCode.MSG_1,iNewsInfoMapper.selectById(dataId));
        }catch (Exception ex){
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
            Log.error("getById-ex:{}",ex);
        }

        return  resultVO;
    }

    /**
     * 根据Id删除新闻数据信息
     * @param dataId
     * @return
     */
    @Override
    public  ResultVO  deleById(String dataId){
        ResultVO resultVO=new ResultVO();
        try{
            UpdateWrapper<NewsInfo> updateWrapper=new UpdateWrapper<>();
            updateWrapper.eq("id",dataId);
             NewsInfo upNewsInfo=new NewsInfo();
             upNewsInfo.setStatus(false);

            resultVO.result(StatusCode.STATUS_1,StatusCode.MSG_1,iNewsInfoMapper.update(upNewsInfo,updateWrapper));
        }catch (Exception ex){
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
            Log.error("deleById-ex:{}",ex);
        }

        return  resultVO;
    }


}
