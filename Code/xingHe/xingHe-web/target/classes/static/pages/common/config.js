var config = {};
//localhost
// config.domain = 'localhost';
//test
// config.domain='jgjadmin.shipxy.com';
//product
// config.domain='tttjgjadmin.shipxy.com';

// config.domain='admin.jgjing.cn';
// config.baseUrl = 'http://admin.jgjing.cn/';

config.version = "1.9.9.5";
//gateway url
// config.baseUrl = 'http://192.168.1.168:9082/';
// 订单详情地图地址
config.shipMapUrl = 'http://tttjgj.shipxy.com';
//test
config.baseUrl = 'http://tttjgjerpadmin.shipxy.com/';

//manage service url
// config.manageUrl = config.baseUrl + "apigateway/manage/";
config.manageUrl = 'http://localhost:6001/';
//user service url
// config.userUrl = config.baseUrl + "apigateway/user/";
config.userUrl = 'http://localhost:6001/';
//common service url
config.commonUrl = config.baseUrl + "apigateway/common/";
// config.commonUrl = "http://localhost:8088/";
//thirdparty service url
// config.thirdparty = config.baseUrl + 'apigateway/thirdparty/';
config.thirdparty = 'http://localhost:6001/';
//product service url
// config.productUrl = config.baseUrl + 'apigateway/product/';
config.productUrl = 'http://localhost:6001/';
//config.orderUrl = config.baseUrl + 'apigateway/order-jgj/';
config.orderUrl = 'http://localhost:6001/';

config.payUrl = 'http://localhost:6001/';
//config.payUrl = config.baseUrl + 'apigateway/pay/';

//download file url
// config.downLoadFileUrl = config.thirdparty + 'file/download';
config.downLoadFileUrl = 'http://localhost:6001/' + 'file/upload';
//upload file url
// config.uploadFileUrl = config.thirdparty + 'file/upload';
config.uploadFileUrl = 'http://localhost:6001/' + 'file/upload';
//delete file url
config.deleteFileUrl = config.thirdparty + 'file/remove';
//delete file url
config.deleteByPath = config.thirdparty + 'file/removeByPath';
//view file url
config.viewFileUrl = config.thirdparty + 'file/view';
//save file data url
config.saveFileDataUrl = config.thirdparty + 'file/save';
// config.saveFileDataUrl = 'http://localhost:8085/' + 'file/save';
config.erpCommonUrl = '';
// ERP add config
config.url_apigateway = config.baseUrl + './apigateway';
config.erp = {};
// config.erp.baseUrl='http://192.168.1.168:9082/';

config.erp.baseUrl='http://tttjgjadmin.shipxy.com/';
config.erp_domain='http://ttjgj.shipxy.com';
config.erp.v = '0.0.2';
config.erp.url_manage_html = 'http://192.168.1.45:9183';
config.erp.carUrl = config.erp.baseUrl + 'apigateway/erp/car/';
// config.erp.carUrl = 'http://192.168.1.27:8182/';
config.erp.activityUrl = config.erp.baseUrl + 'apigateway/erp/activiti/';
config.erp.shipUrl =config.erp.baseUrl + 'apigateway/erp/ship/';
// config.erp.shipUrl ='http://192.168.1.27:8183/';


