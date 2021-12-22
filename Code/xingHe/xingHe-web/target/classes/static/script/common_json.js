//数据工具js
var ArrayUtils = $.extend({}, ArrayUtils);

/**
 * 是否必填
 * 1是，2否
 */
ArrayUtils.ISMUST = [{id: 1, text: '是'}, {id: 2, text: '否'}];
/**
 * 是否开票
 * 1是，0否
 */
ArrayUtils.ISKP = [{id: 1, text: '是'}, {id: 0, text: '否'}];
/**
 * 是否默认
 * 1是，2否
 */
ArrayUtils.ISDEFAULT = [{id: 1, text: '是'}, {id: 2, text: '否'}];
/**
 * 两港是否合计滞期费
 * 1是，2否
 */
ArrayUtils.ISPORTSTOTAL = [{id: 1, text: '是'}, {id: 2, text: '否'}];
/**
 * 是否需要垫资
 * 1是，2否
 */
ArrayUtils.ISADVANCE = [{id: 1, text: '是'}, {id: 2, text: '否'}];

/**
 * 是否含税
 * 1是，2否
 */
ArrayUtils.ISTAX = [{id: 1, text: '是'}, {id: 2, text: '否'}];
/**
 * 动作类型
 * 1装货动作，2卸货动作
 */
ArrayUtils.ACTIONTYPE = [{id: 1, text: '装货动作'}, {id: 2, text: '卸货动作'}];
/**
 * 国籍
 * 1中国，2外籍人士
 */
ArrayUtils.GJ = [{id: 1, text: '中国'}, {id: 2, text: '外籍人士'}];
/**
 * 合同状态
 * 0待生成合同、1待签约、2已作废、3已签约
 */
ArrayUtils.HTZT = [{id: 0, text: '待生成合同'}, {id: 1, text: '待签约'}, {id: 2, text: '已作废'}, {id: 3, text: '已签约'}];
/**
 * 字典数据类型
 * 1货物交付计重方式，2客户类型
 */
ArrayUtils.SJLX = [{id: 1, text: '货物交付计重方式'}, {id: 3, text: '客户类型'}];
/**
 * 是否有效
 * 1可用，2禁用
 */
ArrayUtils.SFYX = [{id: 1, text: '可用'}, {id: 2, text: '禁用'}];
/**
 * 是否中标
 * 1是，2否
 */
ArrayUtils.SFZB = [{id: 1, text: '是'}, {id: 2, text: '否'}];
/**
 * 航次作业总览状态
 * 1待执行，2执行中，3执行完成
 */
ArrayUtils.HCZLZT = [{id: 1, text: '待执行'}, {id: 2, text: '执行中'}, {id: 3, text: '执行完成'}];
/**
 * 航次订单状态
 * 1待执行，2执行中，3执行完成
 */
ArrayUtils.HCDDZT = [{id: 1, text: '待执行'}, {id: 2, text: '执行中'}, {id: 3, text: '已完成'}];
/**
 * 航次订单状态
 * 运输状态（对应航次状态：1执行中）：1到达装港，2离开装港，3到达卸港，4离开卸港
 */
ArrayUtils.HCDDYSZT = [{id: 1, text: '到达装港'}, {id: 2, text: '离开装港'}, {id: 3, text: '到达卸港'}, {id: 4, text: '离开卸港'}];







/**
 * 费用类型
 * 1运费，2其他 3 滞期
 */
ArrayUtils.costTypes = [{id: 1, text: '运费'}, {id: 2, text: '减免'}, {id: 9, text: '其他'}];


/**
 * 结算类型
 * 1收款，2付款
 */
ArrayUtils.settleTypes = [{id: 1, text: '收款'}, {id: 2, text: '付款'}];

/**
 * 结算单搜索状态
 * 1 全部，2 待审核 3 已通过 4 已拒绝
 */
ArrayUtils.JSDZT = [{id: 0, text: '全部'}, {id: 3, text: '待审核'}, {id: 4, text: '已通过'}, {id: -1, text: '已拒绝'}];

/**
 * 计费类型
 * 1计重方式，2滞期费用
 */
ArrayUtils.JFLXTypes = [{id: 1, text: '计重方式'}, {id: 2, text: '滞期费用'}];
/**
 * 是否管理员
 * 1是，0否
 */
ArrayUtils.ISADMIN = [{id: 1, text: '是'}, {id: 0, text: '否'}];



/**
 * 结算单审批流转状态
 * 1 全部，2 待审核 3 已通过 4 已拒绝
 */
ArrayUtils.JSDSPZT = [{id: 1, text: '待生成结算单'}, {id: 2, text: '待货主确认'}, {id: 3, text: '待审核'}, {id: 4, text: '已通过'},{id:9,text:'已拒绝'},{id:-1,text:'已作废'}];

/**
 * 结算单审批流转状态
 * 1 全部，2 待审核 3 已通过 4 已拒绝
 */
ArrayUtils.JSDFKSPZT = [{id: 1, text: '待生成结算单'}, {id: 2, text: '待船东确认'}, {id: 3, text: '待审核'}, {id: 4, text: '已通过'},{id:9,text:'已拒绝'},{id:-1,text:'已作废'}];


