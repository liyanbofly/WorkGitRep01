package com.xingHe.web.service;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;

import com.xingHe.web.dao.BaseFilesMapper;

import com.xingHe.vo.ResultVO;

import com.xingHe.entity.BaseFiles;

import com.xingHe.web.utils.Log;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.common.StatusCode;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.annotation.Resource;
import java.io.*;
import java.sql.Timestamp;
import java.util.List;

@Service
public class BaseFileServiceImpl implements IBaseFileService {

    private final Logger logger = LoggerFactory.getLogger(BaseFileServiceImpl.class);

    @Resource
    private BaseFilesMapper iBaseFilesMapper;




    @Override
     public  BaseFiles getFileById(String dataId)
     {
         return  iBaseFilesMapper.selectById(dataId);
     }

    @Override
    public  int updateFileById(BaseFiles baseFiles)
    {
        return  iBaseFilesMapper.updateById(baseFiles);
    }


//    @Value("${templatePath}")
//    private String templatePath;

    /**
     * 根据表名称以及数据ID获取文件列表
     * @param tableName 表名称
     * @param recordId 各表的数据ID
     * @param type 业务下资料种类
     * @return
     */
    @Override
    public List<BaseFiles> getFileByRecordId(String tableName, String recordId, Integer type) {
        try{
            return iBaseFilesMapper.selectByRecordIdAndTableName(recordId, tableName, type);
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 根据表名称以及多个数据ID获取文件列表
     * Error:(30, 8) java: com.xingHe.web.service.BaseFileServiceImpl不是抽象的, 并且未覆盖com.xingHe.web.service.IBaseFileService中的抽象方法getFileByRecordIdOrderId(java.lang.String,java.lang.String,java.lang.String,java.lang.Integer)
     * @param tableName
     * @param recordIds
     * @param type
     * @return
     */
    @Override
    public List<BaseFiles> getFileByRecordId(String tableName, String[] recordIds, Integer type) {
        try{
            return iBaseFilesMapper.selectByRecordIdsAndTableName(recordIds, tableName, type);
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 根据主键ID修改实体中存在的信息
     * @param record
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int editFiles(BaseFiles record,ElaneUser currentUser) {
        try{
            BaseFiles baseFiles=iBaseFilesMapper.selectById(record.getId());
            return iBaseFilesMapper.updateByPrimaryKeySelective(record);
        } catch(Exception e){
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
        return 0;
    }

    /**
     * 根据主键ID修改实体中存在的信息
     * @param path
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int editFilesByPath(String path,ElaneUser currentUser) {
        try{
            QueryWrapper wrapper=new QueryWrapper();
            wrapper.eq("file_url",path);
          //  BaseFiles baseFiles=iBaseFilesMapper.selectOne(wrapper);
            BaseFiles baseFiles=new BaseFiles();
            baseFiles.setEffective(0);
            return iBaseFilesMapper.update(baseFiles,wrapper);
        } catch(Exception e){
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
        return 0;
    }




    /**
     * 保存附件信息
     * @param baseFiles
     * @param currentUser
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public ResultVO saveFileInfo(BaseFiles baseFiles, ElaneUser currentUser) {
        ResultVO resultVO=new ResultVO();
        try {
            int addRow=iBaseFilesMapper.insert(baseFiles);
            if(addRow>0){
                resultVO.result(StatusCode.STATUS_1,StatusCode.MSG_1);
            }else{
                resultVO.result(StatusCode.STATUS_0,StatusCode.MSG_0);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
        }
        return  resultVO;
    }



}
