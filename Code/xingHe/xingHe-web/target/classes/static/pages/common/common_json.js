//数据工具js
var ArrayUtils = $.extend({}, ArrayUtils);

/**
 * 状态
 * 1-启用 2-禁用
 */
ArrayUtils.STATUS = [{id: 1, text: '启用'}, {id: 2, text: '停用'}];

/**
 * 用户类型
 * 1-游客；2-企业用户；3-个人用户
 */
// ArrayUtils.USERTYPE=[{id: 1, text: '管理员'},{id: 2, text: '业务员'},{id: 3, text: '财务'},{id: 4, text: '运营'},{id: 9, text: '游客'}];
ArrayUtils.USERTYPE=[{id: 1, text: '管理员'},{id: 2, text: '业务员'},{id: 9, text: '游客'}];
/**
 * 运输类型
 * 1-港到港；2-门到港；3-港到门；4-门到门
 */
ArrayUtils.TRANSTYPE=[{id: 1, text: '港到港'},{id: 2, text: '门到港'},{id: 3, text: '港到门'},{id: 4, text: '门到门'}];

/**
 * 船期发布状态
 * 1-待提交、2-待审核、3-待发布、4-已发布、5-已停售、6-下架申请、7-已下架、99-已驳回
 */
ArrayUtils.AUDIT_STATUS = [{id: 1, text: '待提交'}, {id: 2, text: '待审核'}, {id: 3, text: '待发布'}, {id: 4, text: '已发布'}
    , {id: 5, text: '已停售'}, {id: 6, text: '下架申请'}, {id: 7, text: '已下架'}, {id: 99, text: '已驳回'}
];
/**
 * 船期运价：运输方式 1-干线  2-驳船   3-汽运
 * @type {Array}
 */
ArrayUtils.TRANS_METHOD = [{id: 1, text: '干线'}, {id: 2, text: '驳船'}, {id: 3, text: '汽运'}];


/**
 * 开票类型
 * 1-一票制（6%） 、2-两票制、3一票制（9%）、4不含税
 */
ArrayUtils.Invoice_Type = [{id: 1, text: '一票制（6%）'}, {id: 2, text: '两票制'}, {id: 3, text: '一票制（9%）'}, {id: 4, text: '不含税'}];

/**
 * 开票类型
 * 1-一票制（6%） 、2-两票制、3一票制（9%）、4不含税
 */
ArrayUtils.Flow_Type = [{id: 1, text: '正常'},{id: 2, text: '未达标'},{id: 3, text: '亏损'}];

/**
 * 开票类别
 * 1：专票，2：普票，3：电子票
 */
ArrayUtils.INVOICE_CATEGORY = [{id: 1, text: '专票'}, {id: 2, text: '普票'}, {id: 3, text: '电子票'}];


/**
 * 船舶动态
 * 0-无、1-未到港、2-到达起运港、3-装船中、4-装船完成、5-已离港、6-到达目的港、7-卸货中、8-卸货完成
 */
ArrayUtils.VESSEL_STATUS = [ {id: 1, text: '未到港'}, {id: 2, text: '到达起运港'}, {id: 3, text: '装船中'}, {id: 4, text: '装船完成'}
, {id: 5, text: '已离港'}, {id: 6, text: '到达目的港'}, {id: 7, text: '卸货中'}, {id: 8, text: '卸货完成'}
];

/**
 * 船舶时间
 * 0-无、1-未到港、2-到达起运港、3-装船中、4-装船完成、5-已离港、6-到达目的港、7-卸货中、8-卸货完成
 */
ArrayUtils.VESSEL_STATUS_TIME = [ {id: 1, text: '未到港'}, {id: 2, text: '起运港-到港'}, {id: 3, text: '起运港-靠泊'}, {id: 4, text: '起运港-装船完成'}
, {id: 5, text: '起运港-离港'}, {id: 6, text: '目的港-到港'}, {id: 7, text: '目的港-靠泊'}, {id: 8, text: '目的港-卸货完成'}
];

/**
 * 船舶动态
 * 0-无、1-未到港、2-到达起运港、3-装船中、4-装船完成、5-已离港、6-到达目的港、7-卸货中、8-卸货完成
 */
ArrayUtils.VESSEL_STATUS_EX = [{id: 2, text: '到达起运港'}, {id: 3, text: '装船中'}, {id: 4, text: '装船完成'}
, {id: 5, text: '已离港'}, {id: 6, text: '到达目的港'}, {id: 7, text: '卸货中'}
];
/**
 * 船舶动态
 * 0-无、1-未到港、2-到达起运港、3-装船中、4-装船完成、5-已离港、6-到达目的港、7-卸货中、8-卸货完成
 */
ArrayUtils.VESSEL_STATUS_BARGE = [{id: 1, text: '过驳中'}, {id: 2, text: '离开中转港'}, {id: 3, text: '到达目的港'}];


/**
 * 订单阶段状态
 * 1-委托待处理 2-执行中 3-待付款 4-已完成  8-已撤销 9-已关闭
 */
ArrayUtils.STAGE_STATUS=[{id: 1, text: '委托待处理'},{id: 2, text: '执行中'},{id: 3, text: '待付款'},{id: 4, text: '已完成'},{id:8, text: '已撤销'},{id:9, text: '已关闭'}];

/**
 * 航线审核状态
 * WaitComit(1,"待提交"), WaitAudit(2,"待审核")
 ,WaitPublish(3,"待发布"),Publish(4,"已发布"),ApplyInv(5,"申请下架"),Invalid(6,"已下架"),Regect(9,"已驳回");
 */
ArrayUtils.ROUTE_AUDIT_STATUS = [{id: 1, text: '待提交'}, {id: 2, text: '待审核'}, {id: 3, text: '待发布'}, {id: 4, text: '已发布'}
    , {id: 5, text: '下架申请'}, {id: 6, text: '已下架'},{id: 9, text: '已驳回'}];


/**
 * 订单状态
 * 1-待提交 2-待审核 3-待平台签约 4-待客户签约 5-待签约审核 6-已签约  90-已取消 91-不受理 92-已驳回 93-签约审核驳回 94-已作废 95-已失效
 */
ArrayUtils.ORDER_STATUS=[{id: 1, text: '待提交'},{id: 2, text: '待航线理审核'},{id: 22, text: '待商务审核'},{id: 21, text: '待总监审核'},{id: 29, text: '待签约'},{id: 23, text: '待总经理审核'},{id: 3, text: '待平台签约'},{id: 4, text: '待客户签约'},{id:5, text: '待审核签约'},{id:6, text: '已签约'}
,{id:90, text: '已取消'},{id:91, text: '不受理'},{id:92, text: '已驳回'},{id:93, text: '签约审核驳回'},{id:94, text: '已作废'},{id:95, text: '已失效'}];

ArrayUtils.ACCEPT_STATUS=[{id: 0, text: '待受理'},{id: 1, text: '已受理'},{id: 2, text: '不受理'}];
/**
 * 结算类型  1-卸货立即支付 2-卸货账期支付
 */
ArrayUtils.SETTLE_TYPE=[{id: 1, text: '卸货立即支付'},{id: 2, text: '卸货账期支付'}];
/**
*开票状态 1-待申请 2-申请中 3-待接收 4-已完成
 **/
ArrayUtils.INVOICE_STATUS=[{id: 1, text: '待申请'},{id: 4, text: '已完成'},{id: 2, text: '申请中'}];

/**
 * 收款状态 1-待收  2-已收
 **/
ArrayUtils.PAYMENT_STATUS=[{id: 1, text: '待收'},{id: 2, text: '已收'}];

/**
 *客户状态 1-待提交 2-待审核 3-待准入 4-已准入 9-已驳回
 **/
ArrayUtils.CUSTOMER_STATUS=[{id: 1, text: '待提交'},{id: 2, text: '待审核'},{id: 3, text: '待准入'},{id: 4, text: '已准入'},{id: 9, text: '已驳回'},{id: 91, text: '已撤销'}];
/**
 *运价状态 1-待提交 2-待审核 3-待准入 4-已准入 9-已驳回
 **/
ArrayUtils.SHIP_PRICE_STATUS=[{id: 1, text: '待提交'},{id: 2, text: '待审核'},{id: 3, text: '待发布'},{id: 4, text: '已发布'},{id: 8, text: '已下架'},{id: 9, text: '已驳回'}];
/**
 * 合同模板 1-平台模板 2-客户模板
 * @type {Array}
 */
ArrayUtils.CON_TEMPLATE = [{id: 1, text: '平台模板'},{id: 2, text: '客户模板'}];

/**
 * 签署方式：电子签章、纸质合同
 * @type {Array}
 */
ArrayUtils.SIGN_METHOD = [{id: 1, text: '电子签章'},{id: 2, text: '纸质合同'}];

/**
 * 集港情况：0-  否   1-是
 * @type {Array}
 */
ArrayUtils.IS_ARRIVEPORT = [{id: 0, text: '未集港'},{id: 1, text: '已集港'}];

/**
 * 开票方式 1-先票后款 2-先款后票
 * @type {Array}
 */
ArrayUtils.INVOICE_METHOD = [{id: 1, text: '先票后款'},{id: 2, text: '先款后票'}];

/**
 * 单件长度：12米（含）以内、12米（不含）~16米（含）、16米（不含）~20米（含）、20米（不含）以上
 * @type {Array}
 */
ArrayUtils.SINGLE_LENGTH = [{id: 1, text: '12米（含）以内'},{id: 2, text: '12米（不含）~16米（含）'},{id: 3, text: '16米（不含）~20米（含）'},{id: 4, text: '20米（不含）以上'}];

/**
 * 车型 1-汽车 2-火车 3-班轮火车
 * @type {Array}
 */
//ArrayUtils.VEHICLE_TYPE = [{id: 0, text: '汽车'},{id: 1, text: '火车'},{id: 2, text: '班轮火车'}];
ArrayUtils.VEHICLE_TYPE = [{id: 0, text: '火车'},{id: 1, text: '汽车'},{id: 2, text: '火车超重'},{id: 3, text: '汽车超重'},{id: 4, text: '汽车超长'}];
/**
 * 过驳时间 1-立刻过驳 2-码头停留
 * @type {Array}
 */
ArrayUtils.TRANS_TIME = [{id: 1, text: '立刻过驳'},{id: 2, text: '码头停留'}];

/**
 * 货损处理状态：1-待处理 2-处理中 3-已处理
 * @type {Array}
 */
ArrayUtils.GOODSDAMAGESTATUS = [{id: 1, text: '待处理'},{id: 2, text: '处理中'},{id: 3, text: '已处理'},{id: 4, text: '已确认'}];


/**
 * 集港状态 1-待集港  2-集港中 3- 集港完成
 * @type {Array}
 */
ArrayUtils.COLLECT_STATUS = [{id: 1, text: '集港中'},{id: 2, text: '集港完成'}];

/**
 *  对账单状态 1-未发送 2-已发送 3-已对账
 * @type {Array}
 */
ArrayUtils.VERIFY_ACC_STATUS= [{id: 1, text: '未对账'},{id: 2, text: '未对账'},{id: 3, text: '已对账'}];

/**
 * 船舶类别：1-自有 2-协议
 * @type {Array}
 */
ArrayUtils.VESSEL_TYPE= [{id: 1, text: '自有'},{id: 2, text: '协议'}];

ArrayUtils.GOODSDAMAGE_FILE_TYPE= [{id:101, text: '损货附件'},{id: 102, text: '处理附件'},{id: 105, text: '货损确认函'}];


/**
 * 订单签约顺序
 */
ArrayUtils.SIGN_ORDER=[{id: 1, text: '客户先签'},{id: 2, text: '平台先签'}];




/**
 *  物流节点
 * @type {Array}
 */
ArrayUtils.ORDERS_LOGISTICS_NODE= [{id: 'JGZ', text: '集港中'},{id: 'JGWC', text: '集港完成'}
    ,{id: 'ZCZ', text: '装船中'},{id: 'ZCWC', text: '装船完成'},{id: 'YLG', text: '已离港'}
    ,{id: 'DDMDDG', text: '到达目的港'},{id: 'XHZ', text: '卸货中'},{id: 'DDZZG', text: '到达中转港'}
    ,{id: 'BZCWC', text: '驳-装船完成'},{id: 'LKZZG', text: '离开中转港'},{id: 'CLLG', text: '车辆离港'}
    ,{id: 'DDMDD', text: '到达目的地'},{id: 'GBZ', text: '过驳中'},{id: 'WC', text: '完成'},{id: 'DDMDDGZ', text: '驳-到达目的港'}];

/**
 *  驳船时间表
 * @type {Array}
 */
ArrayUtils.BARGE_SHIP_NODE= [{id: 'BZCWC', text: '4'},{id: 'LKZZG', text: '5'},{id: 'GBZ', text: '2'},{id: 'WC', text: '8'},{id: 'DDMDDGZ', text: '6'}];

/**
 *  滞期设置
 * @type {*[]}
 */
ArrayUtils.PORT_TYPE=[{id:1, text: '通用'},{id: 2, text: '干线'},{id:3, text: '驳点'}];
ArrayUtils.DEMURRAGE_NODE=[{id:1, text: '到港'},{id: 2, text: '靠泊'},{id:3, text: '离港'}];

/**
 * 业务类型  1 电商业务 2招标 3锁价 4后结算 5其他
 * @type
 */
ArrayUtils.BUSINESS_TYPE=[{id:1, text: '电商业务'},{id: 2, text: '招标'},{id:3, text: '锁价'},{id:4, text: '后结算'},{id:5, text: '其他'}];
