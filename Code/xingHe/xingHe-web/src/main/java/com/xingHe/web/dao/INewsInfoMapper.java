package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xingHe.entity.NewsInfo;
import com.xingHe.entity.Role;
import com.xingHe.vo.newsInfo.ListNewsVo;
import com.xingHe.vo.newsInfo.NewsSearchVo;
import com.xingHe.vo.role.SearchRoleVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface INewsInfoMapper extends BaseMapper<NewsInfo> {
//     List<ListNewsVo> getList(@Param("search") NewsSearchVo search);

     IPage<ListNewsVo> getList(Page<ListNewsVo> page, @Param("search") NewsSearchVo search);
}
