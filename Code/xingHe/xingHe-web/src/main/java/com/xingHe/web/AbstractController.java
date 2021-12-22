package com.xingHe.web;


import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.web.utils.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Description: 统一异常处理, 将controller继承该类, 即可.
 */
@RestControllerAdvice
public abstract class AbstractController extends BaseController {
    private static final Logger logger_abs = LoggerFactory.getLogger(AbstractController.class);

    @ExceptionHandler({Exception.class})
    public Map<String, String> exceptionHandler(Exception e, WebRequest req) {
        logger_abs.error("req:",req);
        logger_abs.error(e.getMessage(),e);
        logger_abs.error("=================");
        logger_abs.error(req.toString());
        logger_abs.error(req.getRemoteUser());
        logger_abs.error(req.getContextPath());
        logger_abs.error("=============");
        Map<String, String> map = new HashMap<>();
        map.put("code", "0");
        map.put("msg", e.getMessage());

        return map;
    }


    /**
     * 适用于@Valid注解的表单提交形式的实体
     * @param e
     * @param req
     * @return
     */
    @ExceptionHandler({BindException.class})
    public ResultVO exceptionHandler(BindException e, WebRequest req){
        Log.error("req:",req);
        Log.error(e.getMessage(),e);
        Log.error("=================");
        Log.error(req.toString());
        Log.error(req.getRemoteUser());
        Log.error(req.getContextPath());
        Log.error("=============");

        ResultVO result = new ResultVO();
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        result.result(StatusCode.STATUS_1000,message);
        return result;

    }

    /**
     * 适用于@RequestBody@Valid注解的JSON提交形式的实体
     * @param e
     * @param req
     * @return
     */
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResultVO exceptionHandler(MethodArgumentNotValidException e, WebRequest req) {
        Log.error("req:",req);
        Log.error(e.getMessage(),e);
        Log.error("=================");
        Log.error(req.toString());
        Log.error(req.getRemoteUser());
        Log.error(req.getContextPath());
        Log.error("=============");
        ResultVO result = new ResultVO();
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        result.result(StatusCode.STATUS_1000,message);
        return result;
    }


    /**
     * 适用于@RequestParam@Valid注解的参数
     * @param e
     * @param req
     * @return
     */
    @ExceptionHandler({ConstraintViolationException.class})
    public ResultVO exceptionHandler(ConstraintViolationException e, WebRequest req) {
        Log.error("req:",req);
        Log.error(e.getMessage(),e);
        Log.error("=================");
        Log.error(req.toString());
        Log.error(req.getRemoteUser());
        Log.error(req.getContextPath());
        Log.error("=============");
        ResultVO result = new ResultVO();
        String message = e.getConstraintViolations().stream().map(ConstraintViolation::getMessage).collect(Collectors.joining());
        result.result(StatusCode.STATUS_1000,message);
        return result;
    }
















}
