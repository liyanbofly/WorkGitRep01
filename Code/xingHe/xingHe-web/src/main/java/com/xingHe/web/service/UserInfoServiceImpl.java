package com.xingHe.web.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.xingHe.entity.Role;
import com.xingHe.entity.UserInfo;
import com.xingHe.entity.UserRoleRelation;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.vo.userInfo.EditUserInfoVo;
import com.xingHe.vo.userInfo.LoginUser;
import com.xingHe.vo.userInfo.SearchConVo;
import com.xingHe.vo.userInfo.UserInfoListVo;
import com.xingHe.web.common.Audience;
import com.xingHe.web.dao.IRoleMapper;
import com.xingHe.web.dao.IUserInfoMapper;
import com.xingHe.web.dao.IUserRoleRelationMapper;

import com.xingHe.web.utils.JwtHelper;
import com.xingHe.web.utils.ObjectUtil;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserInfoServiceImpl implements  IUserInfoService {

    @Resource
    private IUserInfoMapper userInfoMapper;
    @Autowired
    Audience audience;


    private static final Logger logger = LoggerFactory.getLogger(UserInfoServiceImpl.class);

    @Resource
    private IUserInfoMapper userMapper;

    @Resource
    private IRoleMapper roleMapper;
    @Resource
    private IUserRoleRelationMapper roleRelationMapper;

//    @Autowired
//    ThirdpartyClient thirdpartyClient;
//    @Autowired
//    ActivitiClient activitiClient;
    @Value("${company}")
    private String jgjcompanyName;
    /**
     * 查询用户列表信息
     *
     * @param search
     * @return
     */
    public LayuiTable queryListByPage(SearchConVo search) {
        LayuiTable layuiTable = new LayuiTable();
        try {
            //设置起始行
            search.setOffsetV();
            // 自定义排序字段处理
            this.changeOrderColumn(search);
            // 根据条件获取用户列表
            List<UserInfoListVo> userList = userMapper.queryListByPage(search);
            /*if (userList != null && userList.size() > 0) {
                for (UserInfoListVo singleVo : userList) {
                    setUserRole(singleVo);
                }
            }*/

            // 查询列表总行数
            Integer rowCount = userMapper.queryCountByPage(search);

            layuiTable.setSuccessData(rowCount, userList);
        } catch (Exception ex) {
            logger.error("获取用户列表异常queryListByPage-ex:" + ex);
        }
        return layuiTable;
    }

    /**
     * 自定义排序字段处理
     *
     * @param search
     */
    public void changeOrderColumn(SearchConVo search) {
        String orderCol = search.getOrderCol();
        if (StringUtils.isEmpty(orderCol)) {
            return;
        }
        switch (orderCol) {
            case "userName":
                orderCol = "CONVERT (t1.userName USING gbk)";
                break;
            case "loginId":
                orderCol = "t1.loginId";
                break;
            case "deptName":
                orderCol = "CONVERT (t1.deptName USING gbk)";
                break;
            case "roleNames":
                orderCol = "CONVERT (t2.roleNames USING gbk)";
                break;
            case "userStatus":
                orderCol = "t1.userStatus";
                break;
            case "mobile":
                orderCol = "t1.mobile";
                break;
            case "creator":
                orderCol = "CONVERT (t1.creator USING gbk)";
                break;
            case "createdTime":
                orderCol = "t1.createdTime";
                break;
            default:
                orderCol = "";
                break;
        }
        search.setOrderCol(orderCol);
    }

    /**
     * 获取用户信息
     *
     * @param userId
     * @return
     */
    public UserInfoListVo getUserById(String userId) {
        UserInfoListVo singleUserVo = userMapper.getUserById(userId);
        if (singleUserVo != null)
            setUserRole(singleUserVo);
        return singleUserVo;
    }

    public UserInfo getUserByMobile(String mobile) {
        QueryWrapper<UserInfo> userInfoQueryWrapper = new QueryWrapper<>();
        userInfoQueryWrapper.eq("mobile", mobile);
        userInfoQueryWrapper.eq("status", 1);
        UserInfo userInfo = userMapper.selectOne(userInfoQueryWrapper);
        return userInfo;
    }

    /**
     * 获取用户角色
     *
     * @param singleVo
     */
    private void setUserRole(UserInfoListVo singleVo) {

        List<Role> listRole = roleMapper.getRoleByUserId(singleVo.getId());
        if (listRole != null && listRole.size() > 0) {
            List<String> roleNames = new ArrayList<>();
            List<String> roleIds = new ArrayList<>();

            listRole.forEach(x -> {
                roleNames.add(x.getRoleName());
                roleIds.add(x.getId());
            });
            singleVo.setRoleNames(String.join(",", roleNames));
            singleVo.setRoles(String.join(",", roleIds));

        }
    }


    /**
     * 新增和修改用户
     *
     * @param userInfoVo
     * @return
     */
    public ResultVO saveUserInfo(EditUserInfoVo userInfoVo, ElaneUser elaneUser) {
        ResultVO resultVO = new ResultVO();
        try {
            UserInfo userInfo = new UserInfo();
            int row = 0;// 影响行数
            BeanUtils.copyProperties(userInfoVo, userInfo);
            // 当前时间
            Timestamp now = new Timestamp(System.currentTimeMillis());
            String uid = ObjectUtil.isNullOrEmpty(userInfo.getId()) ? UUID.randomUUID().toString().replace("-", "") : userInfo.getId();
            if (StringUtils.isNotEmpty(userInfo.getId())) {
                saveUserRole(userInfoVo.getRoles(), userInfo.getId(), true);
                SimpleDateFormat sp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                userInfo.setUpdatedTime(sp.format(now));
                userInfo.setUpdatedby(elaneUser.getId());
                QueryWrapper<UserInfo> wrapper = new QueryWrapper<>();
                wrapper.eq("id", userInfoVo.getId());
                saveUserRole(userInfoVo.getRoles(), userInfo.getId(), true);
                row = userMapper.update(userInfo, wrapper);


            } else {
                //验证手机号是否已存在
                QueryWrapper<UserInfo> qyUInfo = new QueryWrapper<>();
                qyUInfo.eq("mobile", userInfo.getMobile()).eq("status", 1);
                if (!CollectionUtils.isEmpty(userMapper.selectList(qyUInfo))) {
                    resultVO.result(3, "手机号已存在！");
                    return resultVO;
                }

                userInfo.setId(uid);
                userInfo.setCreatedby(elaneUser.getId());
                userInfo.setCreator(elaneUser.getName());
                userInfo.setUpdatedby(elaneUser.getId());
                userInfo.setUserType(2);
                saveUserRole(userInfoVo.getRoles(), userInfo.getId(), false);
                row = userMapper.insert(userInfo);
            }

            if (row > 0) {
                try {
                    QueryWrapper<UserRoleRelation> wrapper = new QueryWrapper<>();
                    wrapper.eq("user_id", userInfo.getId());
                    wrapper.eq("status", true);
                    List<UserRoleRelation> urrlist = roleRelationMapper.selectList(wrapper);
                    String oldRoles = "";
                    for (UserRoleRelation item : urrlist) {
                        oldRoles += item.getRoleId() + ",";
                    }

                } catch (Exception ex) {
                    logger.error("添加、编辑用户同步工作流失败" + ex.getMessage());
                }
                resultVO.result(StatusCode.STATUS_1, StatusCode.MSG_1);
            } else
                resultVO.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        } catch (Exception ex) {
            logger.error("保存用户异常saveUserInfo-ex:" + ex);
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
        }
        return resultVO;
    }

    @Override
    public ResultVO editStatus(String userId, String status) {
        ResultVO resultVO = new ResultVO();
        try {
            UserInfo userInfo = new UserInfo();
            if ("1".equals(status)) {
                userInfo.setUserStatus(2);
            }
            if ("2".equals(status)) {
                userInfo.setUserStatus(1);
            }
            userInfo.setId(userId);
            int row = userMapper.updateById(userInfo);
            if (row > 0) {
                resultVO.result(StatusCode.STATUS_1, StatusCode.MSG_1);
            } else
                resultVO.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        } catch (Exception ex) {
            logger.error("更新用户信息 editStatus-ex:" + ex);
            ex.printStackTrace();
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
        }
        return resultVO;
    }

    /**
     * 保存用户所拥有的权限
     *
     * @param roles
     * @param userId
     * @param isEdit
     */
    private void saveUserRole(String roles, String userId, boolean isEdit) {
        if (StringUtils.isNotEmpty(roles)) {
            List<UserRoleRelation> listUR = new ArrayList<>();
            String[] roleArray = roles.split(",");
            for (String rId : roleArray) {
                UserRoleRelation singleR = new UserRoleRelation();
                singleR.setRoleId(rId);
                singleR.setUserId(userId);
                listUR.add(singleR);
            }
            if (isEdit) {
                UserRoleRelation rRelation = new UserRoleRelation();
                rRelation.setStatus(false);
                QueryWrapper<UserRoleRelation> wrapper = new QueryWrapper<>();
                wrapper.eq("user_id", userId);
                roleRelationMapper.update(rRelation, wrapper);
            }
            // 插入用户所拥有的权限
            roleRelationMapper.batchInsert(listUR);

        }
    }






















    @Override
    public  UserInfo getUserByLoginId(String userId){
        QueryWrapper<UserInfo> qWrapper=new QueryWrapper<>();
        qWrapper.eq("id",userId);
      return    userInfoMapper.selectOne(qWrapper);
    }

    /**
     * 登录验证
     * @param userName
     * @param password
     * @return
     */
    @Override
    public ResultVO loginUserByNamePwd(String userName, String password){
        ResultVO resultVO=new ResultVO();
        QueryWrapper<UserInfo> qWrapper=new QueryWrapper<>();
        qWrapper.eq("mobile",userName);
        UserInfo userInfo= userInfoMapper.selectOne(qWrapper);
        if(userInfo!=null){
            if(userInfo.getPassword().equals(password)){
                LoginUser loginUser=new LoginUser();
                BeanUtils.copyProperties(userInfo,loginUser);
                String jwtToken = JwtHelper.createJWT(userInfo.getCustId(),
                        userInfo.getId(),
                        userInfo.getUserName(),
                        userInfo.getUserName(),
                        audience.getName(),
                        audience.getExpiresSecond()*1000,
                        audience.getBase64Secret());
                String token_str = "bearer;" + jwtToken;
                System.out.println("result_str = " + token_str);
                loginUser.setToken(token_str);
                resultVO.result(1,"",loginUser);// 存放登录成功用户信息并返回前台
            }else{
                resultVO.result(2,"用户名或密码错误！");
            }
        }else{
            resultVO.result(2,"用户名或密码错误！");
        }
        return  resultVO;
    }



    public List<UserInfo> getUserInfo(){
//        QueryWrapper<UserInfo> qWrapper=new QueryWrapper<>();
//        qWrapper.last(" limit 100");
//      return    userInfoMapper.selectList(qWrapper);
            return  new ArrayList<>();
    }




}
