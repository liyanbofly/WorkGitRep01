package com.xingHe.web.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xingHe.entity.Department;
import com.xingHe.entity.UserInfo;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.department.DepartmentSearchVo;
import com.xingHe.vo.department.DepartmentVo;
import com.xingHe.vo.department.DeptTreeVo;
import com.xingHe.web.dao.IDepartmentMapper;
import com.xingHe.web.dao.IUserInfoMapper;

import com.xingHe.web.utils.ObjectUtil;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DepartmentServiceImpl implements IDepartmentService {

    @Resource
    private IDepartmentMapper iDepartmentMapper;

    @Resource
    private IUserInfoMapper iUserInfoMapper;


    @Override
    public IPage<DepartmentVo> getAllByPage(Page<DepartmentVo> page, DepartmentSearchVo search) {
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
//        wrapper.likeRight("user_name",parameter.get("name"));
//        if(StringUtils.isNotEmpty(search.getDeptName())){
//            wrapper.like("dept_name", search.getDeptName());
//        }

        IPage<DepartmentVo> userIPage = iDepartmentMapper.queryListByPage(page, search);

//        Invoice two = getTwo(1);
        return userIPage;
    }

//    public Invoice getTwo(long id) {
//        Invoice invoice = iInvoiceMapper.selectById(id);
//        Log.info("查询中间库数据：{}",JSON.toJSONString(invoice));
//        return  invoice;
//    }

    @Override
    public List<DeptTreeVo> getAllDepartment(DepartmentSearchVo search) {
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        wrapper.eq("status", "1");//未删除的

        List<DeptTreeVo> list = iDepartmentMapper.selectDeptList(wrapper);

        return list;
    }

    @Override
    public List<DeptTreeVo> getAllDepartmentSelect(DepartmentSearchVo search) {
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        wrapper.eq("status", "1").eq("dept_status", 1);//未删除的

        List<DeptTreeVo> list = iDepartmentMapper.selectDeptList(wrapper);
        List<DeptTreeVo> result = convertDeptSelectTreeData(list);
        return result;
    }

    @Override
    public int add(DepartmentVo dvo, ElaneUser currentUser) {
        Department dpt = new Department();
        BeanUtils.copyProperties(dvo, dpt);

        String userId = currentUser.getId();
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        wrapper.eq("dept_name", dvo.getDeptName());
        wrapper.ne("id", dvo.getId());
        List<Department> list = iDepartmentMapper.selectList(wrapper);
        if (list != null && list.size() > 0) {
            return 0;
        }
        dpt.setId(UUID.randomUUID().toString());
        dpt.setCreator(currentUser.getName());
        dpt.setCreatedby(userId);
        dpt.setUpdatedby(userId);
        dpt.setStatus(true);

        Department parentDept = iDepartmentMapper.selectById(dvo.getParentId());
        Integer plevel = parentDept != null ? parentDept.getLevel() : 0;
        dpt.setLevel(plevel + 1);
        return iDepartmentMapper.insert(dpt);
    }

    @Override
    public int edit(DepartmentVo dvo, ElaneUser currentUser) {
        Department dpt = new Department();
        BeanUtils.copyProperties(dvo, dpt);
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        wrapper.eq("dept_name", dvo.getDeptName());
        wrapper.ne("id", dvo.getId());
        List<Department> list = iDepartmentMapper.selectList(wrapper);
        if (list != null && list.size() > 0) {
            return 0;
        }
        String userId = currentUser.getId();

        dpt.setUpdatedby(userId);

        Department parentDept = iDepartmentMapper.selectById(dvo.getParentId());
        Integer plevel = parentDept != null ? parentDept.getLevel() : 0;
        dpt.setLevel(plevel + 1);

        return iDepartmentMapper.updateById(dpt);
    }

    /**
     * 获取部门信息
     *
     * @param deptId
     * @return
     */
    @Override
    public Department get(String deptId) {
        return iDepartmentMapper.selectById(deptId);
    }

    /**
     * 更新部门状态：禁用/启用
     *
     * @param dvo
     * @param currUser
     * @return
     */
    @Override
    public int updateStatus(DepartmentVo dvo, ElaneUser currUser) {
        Department dpt = new Department();
        BeanUtils.copyProperties(dvo, dpt);

        dpt.setUpdatedby(currUser.getId());
        if (dvo.getDeptStatus()==2) {
            QueryWrapper<Department> wrapper = new QueryWrapper<>();
            wrapper.eq("parent_id", dvo.getId());
            wrapper.eq("dept_status",1);
            wrapper.eq("status", 1);
            List<Department> list = iDepartmentMapper.selectList(wrapper);
            if(list!=null&& list.size()>0)
            {
                return -1;
            }
            QueryWrapper<UserInfo> userwrapper=new QueryWrapper<>();
            userwrapper.eq("depart_id",dvo.getId());
            userwrapper.eq("status",1);
            List<UserInfo> ulist=iUserInfoMapper.selectList(userwrapper);
            if(ulist!=null&&ulist.size()>0)
            {
                return -2;
            }
        }
        return iDepartmentMapper.updateById(dpt);
    }

    /**
     * 将部门数据整理成select下拉结构
     *
     * @param list
     * @return
     */
    private List<DeptTreeVo> convertDeptSelectTreeData(List<DeptTreeVo> list) {
        if (ObjectUtil.isNullOrEmpty(list)) {
            return new ArrayList<>();
        }
        List<DeptTreeVo> newList = new ArrayList<>();
        if (ObjectUtil.isNullOrEmpty(newList)) {
            DeptTreeVo vo = list.get(0);
            List<DeptTreeVo> temp = convertTrees(list, list.get(0).getId());
            vo.setChildren(temp);
            if (temp != null && temp.size() > 0) {
                vo.setLast(false);
            } else {
                vo.setLast(true);
            }
            newList.add(vo);
        }

        return Optional.ofNullable(newList).orElseGet(ArrayList::new);
    }

    /**
     * 递归整理列表为树形结构
     *
     * @param list
     * @param parentId
     * @return
     */
    public List<DeptTreeVo> convertTrees(List<DeptTreeVo> list, String parentId) {
        List<DeptTreeVo> treeList = new ArrayList<DeptTreeVo>();
        DeptTreeVo current = null;
        DeptTreeVo treeNode = null;

        for (int i = 0; i < list.size(); i++) {
            // 获取当前菜单对象
            current = list.get(i);
            // 比较当前对象的父级是否为传入的父级ID
            if (current.getParentId().equals(parentId)) {
                treeNode = new DeptTreeVo();
                treeNode.setId(current.getId());
                treeNode.setLevel(current.getLevel());
                treeNode.setTitle(current.getTitle());
                treeNode.setParentId(parentId);
                // 获取当前菜单的子项
                List<DeptTreeVo> temp = convertTrees(list, current.getId());
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
}
