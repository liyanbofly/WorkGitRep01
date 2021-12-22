package com.xingHe.web.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xingHe.entity.AuthRelation;
import com.xingHe.entity.Department;
import com.xingHe.entity.Role;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.vo.dataEnum.AuthCategoryEnum;
import com.xingHe.vo.department.DeptTreeVo;
import com.xingHe.vo.role.AuthTrreVo;
import com.xingHe.vo.role.EditRoleVo;
import com.xingHe.vo.role.SearchRoleVo;
import com.xingHe.vo.role.SelectAuthVo;
import com.xingHe.web.dao.*;

import com.xingHe.web.utils.ObjectUtil;

import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class RoleServiceImpl implements IRoleService {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    @Resource
    private IRoleMapper roleMapper;

    @Resource
    IAuthoritiesMapper authoritiesMapper;
    @Resource
    IDepartmentMapper departmentMapper;

//    @Resource
//    IShipRoutingMapper routingMapper;
    @Resource
    IUserInfoMapper userInfoMapper;

    @Resource
    IAuthRelationMapper authRelationMapper;
//    @Autowired
//    ActivitiClient activitiClient;



    /**
     * 角色列表
     *
     * @param search
     * @return
     */
    public LayuiTable queryListByPage(SearchRoleVo search) {
        LayuiTable layuiTable = new LayuiTable();
        try {
            Page<Role> page = new Page<>(search.getPage(), search.getLimit());
            IPage<Role> roleIPage = roleMapper.queryListByPage(page, search);
            String total = roleIPage == null ? "0" : new Long(roleIPage.getTotal()).toString();
            layuiTable.setSuccessData(new Integer(total), roleIPage.getRecords());
        } catch (Exception ex) {
            logger.error("获取角色列表异常：getAllByPage-ex:" + ex);
        }

        return layuiTable;
    }


    /**
     * 保存角色权限信息
     *
     * @param roleVo
     * @return
     */
    public ResultVO saveRoleAuth(EditRoleVo roleVo) {
        ResultVO resultVO = new ResultVO();
        int row = 0;// 影响行数
        try {
            boolean isEdit;
            Role role = new Role();
            BeanUtils.copyProperties(roleVo, role);
            QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("role_name", roleVo.getRoleName());
            queryWrapper.ne("id", roleVo.getId());
            queryWrapper.eq("status", true);
            List<Role> roleList = roleMapper.selectList(queryWrapper);
            if (!ObjectUtil.isNullOrEmpty(roleList)) return resultVO.result(StatusCode.STATUS_0, "角色已存在");
//            for (Role role1 : roleList) {
//                if (role.getRoleName().equals(role1.getRoleName()))
//                    return resultVO.result(StatusCode.STATUS_0, "角色名已存在！");
//            }
            //角色对应权限
            List<SelectAuthVo> listAuthVo = new ArrayList<>();
            Type type = new TypeToken<List<SelectAuthVo>>() {
            }.getType();
            listAuthVo =  JSONArray.parseArray(roleVo.getSelectAuthVo(),SelectAuthVo.class);
            listAuthVo = JSONObject.parseArray(roleVo.getSelectAuthVo(),SelectAuthVo.class);
           // Gson gson=new Gson();
        //  listAuthVo = gson.fromJson(roleVo.getSelectAuthVo(), type);
            // 所选择的权限项
            // listAuthVo = (List <SelectAuthVo>) JsonUtil.fromJson(roleVo.getSelectAuthVo(), SelectAuthVo.class);
            String id = UUID.randomUUID().toString().replace("-", "");
            if (StringUtils.isNotEmpty(role.getId())) {
                // 保存角色要权关系
                saveSelectAuth(roleVo, role.getId(), true);
                // 当前时间
                Timestamp now = new Timestamp(System.currentTimeMillis());
                role.setUpdatedTime(now);
                QueryWrapper<Role> wrapper = new QueryWrapper<>();
                wrapper.eq("id", role.getId());
                row = roleMapper.update(role, wrapper);
            } else {
                role.setStatus(true);
                role.setId(id);
                // 保存角色要限关系
                saveSelectAuth(roleVo, role.getId(), false);
                row = roleMapper.insert(role);
            }
            if (row > 0) {
                resultVO.result(StatusCode.STATUS_1, StatusCode.MSG_1, role.getId());
                try {
//                    ResultVO actRole = activitiClient.addGroup(role.getId(), role.getRoleName(), "");
//                    logger.info("角色数据同步工作流code:" + actRole.getCode() + ",msg:" + actRole.getMsg());
                } catch (Exception ex) {
                    logger.error("角色数据同步工作流失败" + ex.getMessage());
                }
            } else {
                resultVO.result(StatusCode.STATUS_0, StatusCode.MSG_0);
            }

        } catch (Exception ex) {
            logger.error("保存角色异常saveRole-ex:" + ex);
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
        }

        return resultVO;
    }

    /**
     * 保存角色要限关系
     *
     * @param roleVo
     * @param roleId
     * @param isEdit
     */
    private int saveSelectAuth(EditRoleVo roleVo, String roleId, boolean isEdit) {
        int row = 0;// 影响行数
        // 所选择的权限项
        // List <SelectAuthVo> listAuthVo = (List <SelectAuthVo>) JsonUtil.fromJson(roleVo.getSelectAuthVo(), SelectAuthVo.class);
        Type type = new TypeToken<List<SelectAuthVo>>() {
        }.getType();
      //  List<SelectAuthVo> listAuthVo = JsonUtil.gson.fromJson(roleVo.getSelectAuthVo(), type);
        List<SelectAuthVo> listAuthVo = JSONObject.parseArray(roleVo.getSelectAuthVo(), SelectAuthVo.class);
        List<AuthRelation> listAuthR = new ArrayList<>();
        for (SelectAuthVo authVo : listAuthVo) {
            // 选择的权限项
            String sNodes = authVo.getSNodes();
            if (StringUtils.isNotEmpty(sNodes)) {
                String[] sNodeArr = sNodes.split(",");
                for (String singleId : sNodeArr) {
                    AuthRelation authR = new AuthRelation();
                    authR.setAuthCategory(authVo.getDataType());
                    if (singleId.equals("allroute")) {
                        authR.setIsAll(true);
                    } else {
                        authR.setAuthId(singleId);
                    }
                    authR.setRoleId(roleId);
                    listAuthR.add(authR);
                }
            }
        }

        if (isEdit) {
            AuthRelation editAuthR = new AuthRelation();
            // 当前时间 如果修改先删除
            Timestamp now = new Timestamp(System.currentTimeMillis());
            editAuthR.setUpdatedTime(now);
            editAuthR.setStatus(false);
            QueryWrapper<AuthRelation> wrapper = new QueryWrapper<>();
            wrapper.eq("role_id", roleId);
            authRelationMapper.update(editAuthR, wrapper);
        }
        row = authRelationMapper.batchInsert(listAuthR);
        return row;

    }


    /**
     * 获取所有 权限列表
     *
     * @param authName
     * @return
     */
    public List<AuthTrreVo> getAuthList(String authName, int dataType) {
        List<AuthTrreVo> listAuth = new ArrayList<>();
        List<AuthTrreVo> listAuth2 = new ArrayList<>();
        try {
            if (dataType == 1)
                listAuth = authoritiesMapper.getAuthList(authName); // 菜单按钮权限
            else if (dataType == 2) // 航线数据权限
            {
               // listAuth2 = routingMapper.getAuthRouteList();
            } else if (dataType == 3) {// 部门
                QueryWrapper<Department> wrapper = new QueryWrapper<>();
                wrapper.eq("status", "1");//未删除的
                listAuth = departmentMapper.getDeptList(wrapper);
            } else if (dataType == 4) { // 用户信息数据
                listAuth2 = userInfoMapper.getAuthUserList();
            }
            if (dataType == 1 || dataType == 3) { // 对菜单按钮和部门进行组装
                List<AuthTrreVo> firstlevel = listAuth.stream().filter(x -> x.getParentId() == null || x.getParentId().equals("0") || StringUtils.isEmpty(x.getParentId())).collect(Collectors.toList());
                for (AuthTrreVo sigleA : firstlevel) {
                    if (sigleA.getParentId() == null || sigleA.getParentId().equals("0") || StringUtils.isEmpty(sigleA.getParentId()))
                        listAuth2.addAll(setAuthTreeData(listAuth, sigleA, sigleA.getId()));
                }
            }
        } catch (Exception ex) {
            logger.error("获取权限异常getAuthList-ex:" + ex);
        }
        return listAuth2;
    }


    /**
     * 获取所有 权限列表
     *
     * @param authName
     * @return
     */
    public List<AuthTrreVo> getAuthList2(String authName) {
        List<DeptTreeVo> listAuth = new ArrayList<>();
        List<AuthTrreVo> listAuth2 = new ArrayList<>();
        try {
            QueryWrapper<Department> wrapper = new QueryWrapper<>();
            wrapper.eq("status", "1");//未删除的
            List<AuthTrreVo> listAvo = departmentMapper.getDeptList(wrapper);
            List<AuthTrreVo> firstlevel = listAvo.stream().filter(x -> x.getParentId() == null || x.getParentId().equals("0")).collect(Collectors.toList());
            for (AuthTrreVo sigleA : firstlevel) {
                if (sigleA.getParentId() == null || sigleA.getParentId().equals("0"))
                    listAuth2.addAll(setAuthTreeData(listAvo, sigleA, sigleA.getId()));
            }
        } catch (Exception ex) {
            logger.error("获取权限异常getAuthList-ex:" + ex);
        }
        return listAuth2;
    }

    /**
     * 将权限数据整理成select下拉结构
     *
     * @param list
     * @return
     */
    private List<AuthTrreVo> setAuthTreeData(List<AuthTrreVo> list, AuthTrreVo curt, String parentId) {
        if (list == null || list.size() == 0) {
            return null;
        }
        List<AuthTrreVo> newlist = new ArrayList<AuthTrreVo>();
        if (null != list && list.size() > 0) {
            // AuthTrreVo vo = list.get(0);
            List<AuthTrreVo> temp = convertTrees(list, parentId);
            curt.setChildren(temp);
            if (temp != null && temp.size() > 0) {
                curt.setLast(false);
            } else {
                curt.setLast(true);
            }
            newlist.add(curt);
        }
        Optional<List<AuthTrreVo>> result = Optional.ofNullable(newlist);

        return result.orElse(new ArrayList<>());
    }

    /**
     * 递归整理列表为树形结构
     *
     * @param list
     * @param parentId
     * @return
     */
    public List<AuthTrreVo> convertTrees(List<AuthTrreVo> list, String parentId) {
        List<AuthTrreVo> treeList = new ArrayList<AuthTrreVo>();
        AuthTrreVo current = null;
        AuthTrreVo treeNode = null;

        for (int i = 0; list.size() > i; i++) {
            // 获取当前菜单对象
            current = list.get(i);
            // 比较当前对象的父级是否为传入的父级ID
            if (current.getParentId() != null && current.getParentId().equals(parentId)) {
                treeNode = new AuthTrreVo();
                treeNode.setId(current.getId());
                treeNode.setLevel(current.getLevel());
                treeNode.setTitle(current.getTitle());
                treeNode.setParentId(parentId);
                // 获取当前菜单的子项
                List<AuthTrreVo> temp = convertTrees(list, current.getId());
                treeNode.setChildren(temp);
                if (temp != null && temp.size() > 0) {
                    treeNode.setLast(false);
                } else {
                    treeNode.setLast(true);
                }

                treeList.add(treeNode);
            }
        }
        return treeList;
    }


    /**
     * 获取角权限关系 根据角色Id和权限类别
     *
     * @param dataType
     * @param roleId
     * @return
     */
    public ResultVO getListAR(int dataType, String roleId) {
        ResultVO resultVO = new ResultVO();
        try {
            List<AuthRelation> listAR = new ArrayList<>();
            QueryWrapper<AuthRelation> wrapper = new QueryWrapper<>();
            wrapper.eq("status", 1).eq("role_id", roleId);
            listAR = authRelationMapper.selectList(wrapper);
            List<String> listFunId = new ArrayList<>();
            List<String> listRouteId = new ArrayList<>();
            List<String> listDeptId = new ArrayList<>();
            List<String> listUserId = new ArrayList<>();
            List<String> allRoute = new ArrayList<>();
            listAR.forEach(x -> {
                if (x.getAuthCategory() == AuthCategoryEnum.FunAuth.getValue().intValue())
                    listFunId.add(x.getAuthId());
                else if (x.getAuthCategory() == AuthCategoryEnum.Route.getValue().intValue()) {
                    if (x.getIsAll() != null && x.getIsAll()) {
                        allRoute.add("1");
                    } else {
                        listRouteId.add(x.getAuthId());
                    }
                } else if (x.getAuthCategory() == AuthCategoryEnum.Depar.getValue().intValue())
                    listDeptId.add(x.getAuthId());
                else if (x.getAuthCategory() == AuthCategoryEnum.UserI.getValue().intValue())
                    listUserId.add(x.getAuthId());
            });
            Map<String, String> mapAuth = new HashMap<>();
            mapAuth.put("funAuth", String.join(",", listFunId));
            mapAuth.put("routeAuth", String.join(",", listRouteId));
            mapAuth.put("deptAuth", String.join(",", listDeptId));
            mapAuth.put("userAuth", String.join(",", listUserId));
            mapAuth.put("allRoute", String.join(",", allRoute));
            resultVO.result(StatusCode.STATUS_1, "", mapAuth);
        } catch (Exception ex) {
            logger.error("获取角权限关系getListAR-ex:" + ex);
            resultVO.result(StatusCode.STATUS_99, "获取角权限关系出错了！");

        }
        return resultVO;
    }

    /**
     * 获取所有角色
     *
     * @return
     */
    public ResultVO getAllRole(String roleName) {
        ResultVO resultVO = new ResultVO();
        try {
            QueryWrapper<Role> wrapper = new QueryWrapper<>();
            wrapper.eq("status", true);
            if (StringUtils.isNotEmpty(roleName))
                wrapper.like("role_name", roleName);
            List<Role> listR = roleMapper.selectList(wrapper);
            resultVO.result(StatusCode.STATUS_1, "", listR);

        } catch (Exception ex) {
            logger.error("获取角getAllRole-ex:" + ex);
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
        }
        return resultVO;
    }


    /**
     * 删除角色
     *
     * @param roleId
     * @return
     */
    public ResultVO deleteRole(String roleId) {
        ResultVO resultVO = new ResultVO();
        try {
            int row = 0;
            UpdateWrapper<Role> wrapper = new UpdateWrapper<>();
            wrapper.eq("id", roleId);
            Role updateRole = new Role();
            updateRole.setStatus(false);
            row = roleMapper.update(updateRole, wrapper);

            if (row > 0)
                resultVO.result(StatusCode.STATUS_1, "角色删除成功！");
            else
                resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);


        } catch (Exception ex) {
            logger.error("deleteRole-ex:" + ex);
            resultVO.result(StatusCode.STATUS_99, StatusCode.MSG_99);
        }
        return resultVO;

    }

}
