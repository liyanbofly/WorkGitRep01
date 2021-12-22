package com.xingHe.web.service;


import com.xingHe.entity.BaseFiles;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;

import java.util.List;

public interface IBaseFileService {


    BaseFiles getFileById(String dataId);

    int updateFileById(BaseFiles baseFiles);

    int editFiles(BaseFiles file, ElaneUser currentUser) throws Exception;

    int editFilesByPath(String path, ElaneUser currentUser) throws Exception;


      List<BaseFiles> getFileByRecordId(String tableName, String recordId, Integer type);

    /**
     * 根据表名称以及多个数据ID获取文件列表
     * @param tableName
     * @param recordIds
     * @param type
     * @return
     */
      List<BaseFiles> getFileByRecordId(String tableName, String[] recordIds, Integer type);

    /**
     * 保存附件信息
     *
     * @param baseFiles
     * @return
     */
    ResultVO saveFileInfo(BaseFiles baseFiles, ElaneUser currentUser);


}
