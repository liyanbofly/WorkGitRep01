package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xingHe.entity.BaseFiles;


import java.util.List;

public interface BaseFilesMapper extends BaseMapper<BaseFiles> {

    List<BaseFiles> selectByRecordIdAndTableName(String recordId, String tableName, Integer type);

    List<BaseFiles> selectByRecordIdsAndTableName(String[] recordIds, String tableName, Integer type);

    int updateByPrimaryKeySelective(BaseFiles record);

    int insertSelective(BaseFiles files);
}

