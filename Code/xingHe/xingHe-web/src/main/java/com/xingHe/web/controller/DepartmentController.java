package com.xingHe.web.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xingHe.web.BaseController;
import com.xingHe.entity.Department;
import com.xingHe.entity.UserInfo;

import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.vo.department.DepartmentSearchVo;
import com.xingHe.vo.department.DepartmentVo;
import com.xingHe.vo.department.DeptTreeVo;
import com.xingHe.web.service.IDepartmentService;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("department")
@RestController
public class DepartmentController extends BaseController {

    @Resource
    HttpServletRequest request;

    @Autowired
    private IDepartmentService iDepartmentService;
    private static final Logger Log = LoggerFactory.getLogger(DepartmentController.class);

    @RequestMapping("getList")
    public String getList(){
        Claims claims=(Claims) request.getAttribute("Constants.CLAIMS");
        String userId=  (String) claims.get("userId");

        UserInfo userInfo= getCurrentUser2();

        return  "it is List";
    }




    /**
     * 获取部门列表getAllByPage
     *
     * @return
     */
    @PostMapping("getAllByPage")
    public LayuiTable getAllByPage(DepartmentSearchVo search) {
        Log.info("DepartmentSearchVo:{}", JSON.toJSONString(search));

        LayuiTable layuiTable = new LayuiTable();
        Page<DepartmentVo> page = new Page<>(search.getPage(), search.getLimit());

        IPage<DepartmentVo> list = iDepartmentService.getAllByPage(page, search);


        layuiTable.setSuccessData(Long.valueOf(list.getTotal()).intValue(), list.getRecords());

        return layuiTable;
    }

    /**
     * 获取部门树形列表getAllByMapper
     *
     * @return
     */
    @PostMapping("getAllDepartment")
    public ResultVO getAllDepartment(DepartmentSearchVo search) {
        Log.info("DepartmentController:getAllDepartment");
        ResultVO vo = new ResultVO();


        List<DeptTreeVo> list = iDepartmentService.getAllDepartment(search);

        vo.setDatas(list);

        return vo;
    }

    /**
     * 获取部门树形下拉列表
     *
     * @return
     */
    @PostMapping("getAllDepartmentSelect")
    public ResultVO getAllDepartmentSelect(DepartmentSearchVo search) {
        Log.info("DepartmentController:getAllDepartmentSelect");
        ResultVO vo = new ResultVO();

        List<DeptTreeVo> list = iDepartmentService.getAllDepartmentSelect(search);

        vo.setDatas(list);

        return vo;
    }

    /**
     * 获取部门树形列表getAllByMapper
     *
     * @return
     */
    @GetMapping("get")
    public ResultVO get(String deptId) {
        Log.info("DepartmentController:get");
        ResultVO result = new ResultVO();


        Department vo = iDepartmentService.get(deptId);

        if (vo == null) {
            return result.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        } else {
            return result.result(StatusCode.STATUS_1, StatusCode.MSG_1, vo);
        }

    }

    /**
     * 新增/修改部门
     *
     * @return
     */
    @PostMapping("save")
    public ResultVO save(@RequestBody DepartmentVo dvo) {
        Log.info("DepartmentController:save");
        ResultVO vo = new ResultVO();

        int result = 0;

        ElaneUser currUser = getCurrentUser();
        if (currUser == null || StringUtils.isEmpty(currUser.getId())) {
            return vo.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        }

        if ("ADD".equals(dvo.getOptType())) {
            result = iDepartmentService.add(dvo, currUser);
        } else if ("EDIT".equals(dvo.getOptType())) {
            result = iDepartmentService.edit(dvo, currUser);
        }

        if (result == 1) {
            return vo.result(StatusCode.STATUS_1, StatusCode.MSG_1);
        } else if (result == 0) {
            return vo.result(StatusCode.STATUS_0, "部门名称已存在");
        } else {
            return vo.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        }
    }


    /**
     * 更新部门状态
     *
     * @return
     */
    @PostMapping("updateStatus")
    public ResultVO updateStatus(@RequestBody DepartmentVo dvo) {
        Log.info("DepartmentController:updateStatus");
        ResultVO vo = new ResultVO();

        ElaneUser currUser = getCurrentUser();

        if (currUser == null || StringUtils.isEmpty(currUser.getId())) {
            return vo.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        }
        if (dvo == null || StringUtils.isEmpty(dvo.getId())) {
            return vo.result(StatusCode.STATUS_1000, StatusCode.MSG_1000);
        }

        int result = iDepartmentService.updateStatus(dvo, currUser);

        if (result == 1) {
            return vo.result(StatusCode.STATUS_1, StatusCode.MSG_1);
        } else if (result == -1) {
            return vo.result(StatusCode.STATUS_0, "本部门下存在下级部门，无法停用");
        } else if (result == -2) {
            return vo.result(StatusCode.STATUS_0, "本部门下存在员工，无法停用");
        } else {
            return vo.result(StatusCode.STATUS_0, StatusCode.MSG_0);
        }
    }




}
