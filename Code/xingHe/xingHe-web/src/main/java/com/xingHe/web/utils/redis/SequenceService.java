package com.xingHe.web.utils.redis;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 序号生成服务
 */
@Slf4j
@Service
public class SequenceService {

    @Resource
    private RedisUtil redisutil;

    /**
     * 获取唯一自增序号（keyyyMM0001）
     * @param key 自定义前缀字符串
     * @return
     */
    public synchronized String getSeqNoByDay(String key) {
        Calendar calendar = Calendar.getInstance();
        // 获取下月1号0时
        calendar.add(Calendar.MONTH, 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 00);
        calendar.set(Calendar.MINUTE, 00);
        calendar.set(Calendar.SECOND, 00);
        calendar.set(Calendar.MILLISECOND, 000);

        // 减去1S为当前月最后一天
        calendar.add(Calendar.SECOND, -1);
        //设置过期时间，这里设置为当天的23:59:59
        Date expireDate = calendar.getTime();
        //获取当月的日期，格式为yyyyMM
        String date = new SimpleDateFormat("yyMM").format(expireDate);
        String seqNo = key + date;
        //返回当前redis中的key的最大值
        Long seq = redisutil.incr(seqNo);
        if(seq==1){
            // 新增key，设置生命周期
            redisutil.expire(seqNo, Integer.valueOf(((expireDate.getTime() - System.currentTimeMillis()) / 1000)+""), 0);
        }
        //生成序列号，如果seq不够位，seq前面补0，
        String sequence = StringUtils.leftPad(seq.toString(), 4, "0");
        //拼接业务编号
        seqNo = seqNo + sequence;
        log.info("KEY:{}, 时间:{}, 序列号生成:{}", key, seqNo, String.format("%tF %tT ", expireDate, expireDate));
        return seqNo;
    }

    /**
     * 获取唯一自增序号（keyyyMMdd001）
     * @param key 自定义前缀字符串
     * @param length 年月日后缀数字，keyyyMMdd001 自增数字长度
     * @return
     */
    public synchronized String getSeqNoByDay(String key, int length) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        //设置过期时间，这里设置为当天的23:59:59
        Date expireDate = calendar.getTime();
        //获取当天的日期，格式为yyyyMMdd
        String date = new SimpleDateFormat("yyMMdd").format(expireDate);
        String seqNo = key + date;
        //返回当前redis中的key的最大值
        Long seq = redisutil.incr(seqNo);
        if(seq==1){
            // 新增key，设置生命周期
            redisutil.expire(seqNo, Integer.valueOf(((expireDate.getTime() - System.currentTimeMillis()) / 1000)+""), 0);
        }
        //生成序列号，如果seq不够位，seq前面补0，
        String sequence = StringUtils.leftPad(seq.toString(), length, "0");
        //拼接业务编号
        seqNo = seqNo + sequence;
        log.info("KEY:{}, 时间:{}, 序列号生成:{}", key, seqNo, String.format("%tF %tT ", expireDate, expireDate));
        return seqNo;
    }
}
