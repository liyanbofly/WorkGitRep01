package com.xingHe.web.service;



import com.xingHe.entity.UserInfo;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.userInfo.EditUserInfoVo;
import com.xingHe.vo.userInfo.SearchConVo;
import com.xingHe.vo.userInfo.UserInfoListVo;

import java.util.List;


public interface IUserInfoService {
      List<UserInfo> getUserInfo();

      UserInfo getUserByLoginId(String userId);
      /**
       * 登录验证
       * @param userName
       * @param password
       * @return
       */
       ResultVO loginUserByNamePwd(String userName, String password);



    /**
     * 查询用户列表信息
     *
     * @param search
     * @return
     */
    LayuiTable queryListByPage(SearchConVo search);

    /**
     * 获取用户信息根据Id
     *
     * @param userId
     * @return
     * @throws Exception
     */
    UserInfoListVo getUserById(String userId) throws Exception;


    /**
     * 新增和修改用户
     *
     * @param userInfoVo
     * @return
     */
    ResultVO saveUserInfo(EditUserInfoVo userInfoVo, ElaneUser elaneUser);

//    /**
//     * 为用户设置所拥有权限
//     * @param userId
//     */
//     void setManageUserAuth(String userId);

    /**
     * 修改账户状态：启用，停用
     * @param userId
     * @return
     */
    ResultVO editStatus(String userId, String status);
    UserInfo getUserByMobile(String mobile);
}
