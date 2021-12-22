package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;

import com.xingHe.entity.UserInfo;
import com.xingHe.vo.role.AuthTrreVo;
import com.xingHe.vo.userInfo.SearchConVo;
import com.xingHe.vo.userInfo.UserInfoListVo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface IUserInfoMapper extends BaseMapper<UserInfo> {

  /**
   * 查询用列表信息
   * @param search
   * @return
   */
  List<UserInfoListVo> queryListByPage(@Param("search") SearchConVo search);

  /**
   * 获取查询列表条数
   * @param search
   * @return
   */
  Integer queryCountByPage(@Param("search") SearchConVo search);

  /**
   * 获取用户用于分配角色权限
   * @return
   */
  List<AuthTrreVo> getAuthUserList();

  /**
   * 根据用户Id获取用户
   * @param id
   * @return
   */
  UserInfoListVo getUserById(@Param("id") String id);

  @Select("select GROUP_CONCAT(open_id) as open_id from weixin_user ${ew.customSqlSegment}")
  List<Map<String,String>> getOpenId(@Param(Constants.WRAPPER) QueryWrapper wrapper);
}
