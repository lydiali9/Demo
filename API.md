## Instruction

```javascript
{
    SUCCESS: 200,               // OK
    FALSE: 400,                 // bad request
    NO_EXIST: 401,              // validate if the date is exists
    NO_AUTHENTICATE: 402,       // Failed to authenticate token
    NO_TOKEN: 403,              // no token provided
    INTERNAL_SERVER_ERROR: 500, // internal server error
    NO_FOUND: 404,              // not found
    NEED_LOGIN: 102,            // 需要登录
    IMAGE_UPLOAD_FALSE: 103,    // 图片上传异常
    QUERY_MYSQL_FALSE: 104,     // 数据库查询异常
    OPERATE_MYSQL_FALSE: 105,   // 数据库操作异常
    OPERATE_REDIS_FALSE: 106,   // redis操作异常
    REPETITION: 107,            // 数据重复
    REQUEST_DATA_ERR:108,       // 请求数据错误
}
```

## Expressage

### 1、Query Expressage

#### Request URL：
```
http://192.168.9.36:8001/api/expressage/query
```

#### Request：
[http://192.168.9.36:8001/api/expressage/query?num=72509979849](http://192.168.9.36:8001/api/expressage/query?num=72509979849)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| num | Y  | int | 72509979849 | expressage id |

#### Response：
##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": {
        "context": [
            {
                "time": "1519446346",
                "desc": "订单已完成，感谢您在京东购物，欢迎您再次光临！"
            },
            {
                "time": "1519431909",
                "desc": "配送员开始配送，请您准备收货，配送员，李政远，手机号，18813988782"
            },
            {
                "time": "1519430886",
                "desc": "货物已到达【深圳南头中心站】"
            },
            {
                "time": "1519430885",
                "desc": "货物已分配，等待配送"
            },
            {
                "time": "1519389278",
                "desc": "货物已完成分拣，离开【佛山狮山分拣中心】"
            },
            {
                "time": "1519388584",
                "desc": "货物已交付京东物流"
            },
            {
                "time": "1519388584",
                "desc": "货物已到达【佛山狮山分拣中心】"
            }
        ],
        "company": {
            "url": "http://www.kuaidi100.com/all/jd.shtml?from=openv",
            "fullname": "京东物流",
            "shortname": "京东",
            "icon": {
                "id": "",
                "smallurl": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3682653099,2524883494&fm=58",
                "smallpos": "0,1504",
                "middleurl": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1078213688,3146076104&fm=58",
                "middlepos": "0,900",
                "normal": "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2992147315,359626353&fm=58"
            },
            "icon249": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=948459245,726398067&fm=58",
            "website": {
                "title": "www.jdwl.com",
                "url": "http://www.jdwl.com/"
            },
            "tel": "950616",
            "auxiliary": [
                {
                    "title": "京东供应链物流",
                    "url": "http://www.jdwl.com/logis?kuaidi100"
                },
                {
                    "title": "京东快递",
                    "url": "http://www.jdwl.com/express?kuaidi100"
                }
            ]
        }
    }
}
```

##### 400
```javascript
{
    "code": 400,
    "msg": "获取运单信息失败",
    "data": ""
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```


## Activity

### 1、Query Activities

#### Request URL：
```
http://192.168.9.36:8001/api/activity/query
```

#### Request：
[http://192.168.9.36:8001/api/activity/query?city=朝阳&pageIndex=1&province=北京&pageSize=10&startDate=2017-12-12&endDate=2018-05-08&src=inveno](http://192.168.9.36:8001/api/activity/query?city=朝阳&pageIndex=1&province=北京&pageSize=10&startDate=2017-12-12&endDate=2018-05-08&src=inveno)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|:-----|
| src | Y  | string | inveno | 来源，接入时会分配指定值 |
| pageIndex | Y  | int | 1 | 页码，默认pi=1 |
| pageSize | Y | int | 10 | 页容量，默认ps=10 |
| province | Y | string | 北京 | 省份 |
| city | Y | string | 朝阳 | 城市 |
| startDate | Y  | string | 2018-05-12 |活动开始时间大于等于，时间格式固定为：yyyy-MM-dd默认为服务器当前时间 |
| endDate | Y  | string | 2018-05-18 | 活动开始时间小于等于，时间格式固定为：yyyy-MM-dd |

#### Response：
##### 200
```javascript
{
    "code": 200,
    "msg": "获取活动信息成功",
    "content": {
        "pageindex": 1,
        "pagesize": 10,
        "itemcount": 162,
        "pagecount": 17,
        "list": [
            {
                "id": 2419112879600,
                "title": "“数据圣殿，骑士之夜”第二届首席数据官联盟年会",
                "startdate": "2018-01-25T06:30:00Z",
                "enddate": "2018-01-25T13:00:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201712/2419112879600/212910663298165_v2.jpg@!wmlogo",
                "address": "（北京朝阳）北小河公园百川汇",
                "url": "http://www.huodongxing.com/event/2419112879600?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 8420401161700,
                "title": "AICon｜AI 解决方案专场（免费报名）",
                "startdate": "2018-01-13T05:30:00Z",
                "enddate": "2018-01-13T09:30:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201712/8420401161700/582919455925468_v2.jpg@!wmlogo",
                "address": "（北京朝阳）国际会议中心第五会议室A一层",
                "url": "http://www.huodongxing.com/event/8420401161700?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 6422276193500,
                "title": "《魔琴之夜》|郎园大师课",
                "startdate": "2018-01-16T11:30:00Z",
                "enddate": "2018-01-16T13:30:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201801/6422276193500/772932659171651_v2.jpg@!wmlogo",
                "address": "（北京朝阳）郎园•虞社演艺空间",
                "url": "http://www.huodongxing.com/event/6422276193500?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 9422763333900,
                "title": "区块链很热。但是怎么才能帮到你?北京●线下读书会 1.19",
                "startdate": "2018-01-19T05:00:00Z",
                "enddate": "2018-01-19T08:30:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201801/9422763333900/852939571977150_v2.jpg@!wmlogo",
                "address": "（北京朝阳）北美国际来广营区A1座 今今乐道读书会",
                "url": "http://www.huodongxing.com/event/9422763333900?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 7435008407300,
                "title": "4月Lean In Beijing Mentor Brunch报名 | 探寻你的平衡术",
                "startdate": "2018-04-14T06:00:00Z",
                "enddate": "2018-04-14T08:30:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201804/7435008407300/783020914009420_v2.jpg@!wmlogo",
                "address": "（北京朝阳）北京朝阳区光华东里8号院中海广场北楼2层 Simply fresh 馥郁",
                "url": "http://www.huodongxing.com/event/7435008407300?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 9432545573500,
                "title": "浪荡江湖|GMGC面基酒会暨联盟出海分会成立大会",
                "startdate": "2018-04-02T11:00:00Z",
                "enddate": "2018-04-02T14:00:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201803/9432545573500/603008773628238_v2.jpg@!wmlogo",
                "address": "（北京朝阳）安立路78号马哥孛罗大酒店",
                "url": "http://www.huodongxing.com/event/9432545573500?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 3422308715700,
                "title": "Aha Moment ！绿色未来 | 绿光大咖分享会",
                "startdate": "2018-01-27T07:00:00Z",
                "enddate": "2018-01-27T09:00:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201801/3422308715700/462932711383213_v2.jpg@!wmlogo",
                "address": "（北京朝阳）三元桥凤凰商街N30山野朴食",
                "url": "http://www.huodongxing.com/event/3422308715700?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 4429191263400,
                "title": "GIIS 2018中国餐饮服务及零售化领袖峰会",
                "startdate": "2018-04-18T01:00:00Z",
                "enddate": "2018-04-18T09:00:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201802/4429191263400/112995806037865_v2.jpg@!wmlogo",
                "address": "（北京朝阳）富力万丽酒店",
                "url": "http://www.huodongxing.com/event/4429191263400?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 4422446863200,
                "title": "基因为什么与我们息息相关 ——《基因传》线下新书交流会",
                "startdate": "2018-01-20T06:00:00Z",
                "enddate": "2018-01-20T08:00:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201801/4422446863200/352933688601710_v2.jpg@!wmlogo",
                "address": "（北京朝阳）东大桥路9号北京侨福芳草地LG2中信书店",
                "url": "http://www.huodongxing.com/event/4422446863200?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            },
            {
                "id": 4415135067500,
                "title": "人力资源实战战略大会",
                "startdate": "2017-12-20T05:30:00Z",
                "enddate": "2017-12-20T09:30:00Z",
                "logo": "http://wimg.huodongxing.com/logo/201711/4415135067500/442882883558646_v2.jpg@!wmlogo",
                "address": "（北京朝阳）东三环中路16号京粮大厦掘金企服",
                "url": "http://www.huodongxing.com/event/4415135067500?qd=@inveno",
                "province": "北京",
                "city": "朝阳"
            }
        ]
    }
}
```
##### 400
```javascript
{
    "code": 400,
    "msg": "获取活动信息失败",
    "data": ""
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```

### 2、Get Activities

#### Request URL：
```
http://192.168.9.36:8001/api/activity/get/:eid/src
```

#### Request：
[http://192.168.9.36:8001/api/activity/get/2419112879600/inveno](http://192.168.9.36:8001/api/activity/get/2419112879600/inveno)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|:-----|
| src | Y  | string | inveno | 来源，接入时会分配指定值 |
| eid | Y  | string | 2419112879600 | 活动的ID |


#### Response：
##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": {
        "id": 2419112879600,
        "title": "“数据圣殿，骑士之夜”第二届首席数据官联盟年会",
        "startdate": "2018-01-25T06:30:00Z",
        "enddate": "2018-01-25T13:00:00Z",
        "logo": "http://wimg.huodongxing.com/logo/201712/2419112879600/212910663298165_v2.jpg@!wmlogo",
        "address": "（北京朝阳）北小河公园百川汇",
        "url": "http://www.huodongxing.com/event/2419112879600?qd=@inveno",
        "province": "北京",
        "city": "朝阳"
    }
}
```
##### 400
```javascript
{
    "code": 400,
    "msg": "获取活动信息失败",
    "data": ""
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```


## Vehicle

### 1、Get Vehicle Violation

#### Request URL：
```
http://192.168.9.36:8081/api/vehicle/get
```

#### Request：
[http://192.168.9.36:8081/api/vehicle/get?plate_no=粤AB14Y3&engine_no=492885&VIN=052240&vehicle_type=02](http://192.168.9.36:8081/api/vehicle/get?plate_no=粤AB14Y3&engine_no=492885&VIN=052240&vehicle_type=02)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| vehicle_type | Y  | string | "小型" | 车辆类型 |
| plate_no | Y  | string | "粤AB14Y3" | 车牌号码 |
| engine_no | Y  | string | "492885" | 发动机号码后六位 |
| VIN | Y  | string | "052240" | 车辆识别代码后6位 |
| uid | Y  | string | "507f1f77bcf86cd799439011" | 主外键关联，用于标识同一用户 |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": {
        "VIN": "052240",
        "engine_no": "492885",
        "vehicle_type": "02",
        "plate_no": "粤AB14Y3",
        "Records": [
            {
                "address": "富华路大北路路口",
                "occTime": "2018-05-19 12:56:30",
                "reason": "驾驶机动车违反道路交通信号灯通行的",
                "fine": "200",
                "point": "6",
                "violationCode": "1625"
            },
            {
                "address": "广州市番禺区汉溪大道路段",
                "occTime": "2018-05-11 21:18:10",
                "reason": "机动车违反禁令标志指示的",
                "fine": "200",
                "point": "3",
                "violationCode": "1344"
            },
            {
                "address": "德贤路福景路路口",
                "occTime": "2018-05-10 19:35:23",
                "reason": "机动车通过有灯控路口时，不按所需行进方向驶入导向车道的",
                "fine": "100",
                "point": "2",
                "violationCode": "1208"
            }
        ]
    }
}
```
##### 400
```javascript
{
    "code": 400,
    "msg": "获取车辆违章信息失败",
    "data": ""
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```


### 2、Create Vehicle

#### Request URL：
```
http://192.168.9.36:8081/api/vehicle/add
```

#### Request：
[http://192.168.9.36:8081/api/vehicle/add](http://192.168.9.36:8081/api/vehicle/add)

#### Request Method：
```
POST
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| vehicle_type | Y  | string | "小型" | 车辆类型 |
| plate_no | Y  | string | "粤AB14Y3" | 车牌号码 |
| engine_no | Y  | string | "492885" | 发动机号码后六位 |
| VIN | Y  | string | "052240" | 车辆识别代码后6位 |
| uid | Y  | string | "507f1f77bcf86cd799439011" | 主外键关联，用于标识同一用户 |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "添加车辆成功",
    "content": {
        "__v": 0,
        "uid": "507f1f77bcf86cd799439011",
        "_id": "5b19fc2a52adb903f3612cb2",
        "update_time": "2018-06-08T03:46:50.915Z",
        "is_insure": 0,
        "engine_no": "666666",
        "VIN": "666666",
        "vehicle_type": "88",
        "model": "",
        "city": "",
        "plate_no": "666666",
        "number": "",
        "username": ""
    }
}
```
##### 107
```javascript
{
    "code": 107,
    "errmsg": "此车辆已经添加",
    "data": ""
}
```

##### 104
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}

### 3、Update Vehicle

#### Request URL：
```
http://192.168.9.36:8081/api/vehicle/update
```

#### Request：
[http://192.168.9.36:8081/api/vehicle/update](http://192.168.9.36:8081/api/vehicle/update)

#### Request Method：
```
PUT
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| _id_ | Y  | string | "5b19fc2a52adb903f3612cb2" | 添加车辆成功后返回的_id|
| vehicle_type | Y  | string | "小型" | 车辆类型 |
| plate_no | Y  | string | "粤AB14Y3" | 车牌号码 |
| engine_no | Y  | string | "492885" | 发动机号码后六位 |
| VIN | Y  | string | "052240" | 车辆识别代码后6位 |
| uid | Y  | string | "507f1f77bcf86cd799439011" | 主外键关联，用于标识同一用户 |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "修改车辆成功",
    "content": {
        "ok": 1,
        "n": 1,
        "nModified": 1
    }
}
```
##### 401
```javascript
{
    "code": 401,
    "errmsg": "此车辆不存在或已被删除",
    "data": ""
}
```

##### 104
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}

### 4、Delete Vehicle

#### Request URL：
```
http://192.168.9.36:8081/api/vehicle/delete
```

#### Request：
[http://192.168.9.36:8081/api/vehicle/delete](http://192.168.9.36:8081/api/vehicle/delete)

#### Request Method：
```
DELETE
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| _id_ | Y  | string | "5b19fc2a52adb903f3612cb2" | 添加车辆成功后返回的_id|
| uid | Y  | string | "507f1f77bcf86cd799439011" | 主外键关联，用于标识同一用户 |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "删除车辆成功",
    "content": {
        "ok": 1,
        "n": 1
    }
}
```

##### 401
```javascript
{
    "code": 401,
    "errmsg": "此车辆不存在或已被删除",
    "data": ""
}
```

##### 104
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}

### 5、Get Vehicle

#### Request URL：
```
http://192.168.9.36:8081/api/vehicle/count
```

#### Request：
[http://192.168.9.36:8081/api/vehicle/count?uid=507f1f77bcf86cd799439011](http://192.168.9.36:8081/api/vehicle/count?uid=507f1f77bcf86cd799439011)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| uid | Y  | string | "507f1f77bcf86cd799439011" | 主外键关联，用于标识同一用户 |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "查询车辆违章信息成功",
    "content": [
        {
            "username": "",
            "number": "",
            "plate_no": "粤AB14Y3",
            "city": "",
            "model": "",
            "vehicle_type": "02",
            "VIN": "052240",
            "engine_no": "492885",
            "is_insure": 0,
            "update_time": "2018-06-08T03:38:55.542Z",
            "__v": 0,
            "uid": "507f1f77bcf86cd799439011",
            "_id": "5b1a6425f1e8a572f4701914",
            "fine": 500,
            "point": 11,
            "total": 3
        },
        {
            "username": "",
            "number": "",
            "plate_no": "粤AB14Y3",
            "city": "",
            "model": "",
            "vehicle_type": "02",
            "VIN": "052240",
            "engine_no": "492885",
            "is_insure": 0,
            "update_time": "2018-06-08T03:38:55.542Z",
            "__v": 0,
            "uid": "507f1f77bcf86cd799439011",
            "_id": "5b1a6425f1e8a572f4701914",
            "fine": 500,
            "point": 11,
            "total": 3
        }
    ]
}
```
##### 401
```javascript
{
    "code": 401,
    "msg": "该用户尚未添加车辆",
    "content": {}
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```

### 6、Get Vehicle By vehicle id

#### Request URL：
```
http://192.168.9.36:8081/api/vehicle/get/id
```

#### Request：
[http://192.168.9.36:8081/api/vehicle/get/id?id=5b1a6425f1e8a572f4701914](http://192.168.9.36:8081/api/vehicle/get/id?id=5b1a6425f1e8a572f4701914)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| id | Y  | string | "5b1a6425f1e8a572f4701914" | vehicle id |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "查询车辆信息成功",
    "content": {
        "_id": "5b1a6425f1e8a572f4701914",
        "uid": "507f1f77bcf86cd799439011",
        "__v": 0,
        "update_time": "2018-06-08T03:38:55.542Z",
        "is_insure": 0,
        "engine_no": "492885",
        "VIN": "052240",
        "vehicle_type": "02",
        "model": "",
        "city": "",
        "plate_no": "粤AB14Y3",
        "number": "",
        "username": ""
    }
}
```
##### 401
```javascript
{
    "code": 401,
    "msg": "The vehicle does not exists",
    "content": {}
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```

## Common

### 1、Query Area

#### Request URL：
```
http://192.168.9.36:8081/api/area/query
```

#### Request：
[http://192.168.9.36:8081/api/area/query](http://192.168.9.36:8081/api/area/query)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": {
        "86": {
            "110000": "北京市",
            "120000": "天津市",
            "130000": "河北省",
            "140000": "山西省",
            "150000": "内蒙古自治区",
            "210000": "辽宁省",
            "220000": "吉林省",
            "230000": "黑龙江省",
            "310000": "上海市",
            "320000": "江苏省",
            "330000": "浙江省",
            "340000": "安徽省",
            "350000": "福建省",
            "360000": "江西省",
            "370000": "山东省",
            "410000": "河南省",
            "420000": "湖北省",
            "430000": "湖南省",
            "440000": "广东省",
            "450000": "广西壮族自治区",
            "460000": "海南省",
            "500000": "重庆市",
            "510000": "四川省",
            "520000": "贵州省",
            "530000": "云南省",
            "540000": "西藏自治区",
            "610000": "陕西省",
            "620000": "甘肃省",
            "630000": "青海省",
            "640000": "宁夏回族自治区",
            "650000": "新疆维吾尔自治区",
            "710000": "台湾省",
            "810000": "香港特别行政区",
            "820000": "澳门特别行政区"
        },
        ...
    }
}
```

## Service Behavior

### 1、Get Service Behavior

#### Request URL：
```
http://192.168.9.36:8081/api/service_bebavior/get
```

#### Request：
[http://192.168.9.36:8081/api/service_bebavior/get?uid=5b21038729fb561ebdee96ff](http://192.168.9.36:8081/api/service_bebavior/get?uid=5b21038729fb561ebdee96ff)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": [
        {
            "name": "查快递",
            "behavior_type": 0,
            "create_time": "2018-06-14T04:22:08.650Z",
            "update_time": "2018-06-14T04:22:08.650Z",
            "__v": 0,
            "_id": "5b21ed703c8079653c36ba63",
            "uid": "5b21038729fb561ebdee96ff",
            "keyword": "{\"num\":\"72509979849\",\"uid\":\"5b21038729fb561ebdee96ff\"}",
            "service_id": "5b2105b4a1ef16e149c94038"
        },
        {
            "name": "查活动",
            "behavior_type": 0,
            "create_time": "2018-06-14T04:22:06.251Z",
            "update_time": "2018-06-14T04:22:06.251Z",
            "__v": 0,
            "_id": "5b21ed6e3c8079653c36ba62",
            "uid": "5b21038729fb561ebdee96ff",
            "keyword": "{\"city\":\"朝阳\",\"pageIndex\":\"1\",\"province\":\"北京\",\"pageSize\":\"10\",\"startDate\":\"2017-12-12\",\"endDate\":\"2018-05-08\",\"src\":\"inveno\",\"uid\":\"5b21038729fb561ebdee96ff\"}",
            "service_id": "5b20d3eca1ef16e149c94037"
        },
        {
            "name": "查车辆违章",
            "behavior_type": 0,
            "create_time": "2018-06-14T04:22:03.079Z",
            "update_time": "2018-06-14T04:22:03.079Z",
            "__v": 0,
            "_id": "5b21ed6b3c8079653c36ba61",
            "uid": "5b21038729fb561ebdee96ff",
            "keyword": "{\"plate_no\":\"粤AB14Y3\",\"engine_no\":\"492885\",\"VIN\":\"052240\",\"vehicle_type\":\"02\",\"uid\":\"5b21038729fb561ebdee96ff\"}",
            "service_id": "5b210e9fa1ef16e149c94039"
        }
    ]
}
```

##### 401
```javascript
{
    "code": 401,
    "msg": "The item does not exists",
    "content": {}
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```


## User

### 1、Get User By ID
 
#### Request URL：
```
http://192.168.9.36:8081/api/user/get
```

#### Request：
[http://192.168.9.36:8081/api/user/get?uid=5b21d86aeb4f0371ee59141f](http://192.168.9.36:8081/api/user/get?uid=5b21d86aeb4f0371ee59141f)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": {
        "name": "",
        "password": "",
        "type": 0,
        "group": [],
        "server_limit": [],
        "desc": "",
        "nickname": "",
        "sex": 0,
        "email": "",
        "id_crad": "",
        "home_address": "",
        "company_address": "",
        "update_time": "2018-06-14T02:52:26.442Z",
        "headphoto": "",
        "number": "13127972391",
        "wechat": "",
        "weibo": "",
        "QQ": "",
        "is_deleted": 0,
        "__v": 0,
        "_id": "5b21d86aeb4f0371ee59141f"
    }
}
```

##### 401
```javascript
{
    "code": 401,
    "msg": "The item does not exists",
    "content": {}
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```

### 2、Update user
 
#### Request URL：
```
http://192.168.9.36:8081/api/user/upload
```

#### Request：
[http://192.168.9.36:8081/api/user/update](http://192.168.9.36:8081/api/user/update)

#### Request Method：
```
POST
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|
| uid | Yes | string | "5b21d86aeb4f0371ee59141f" | user ID |
| headphoto | No | string| "http://imgs.inveno.com/v1/icon?id=12699900393899221512&quality=raw" | photo |
| nickname | No | string | "555" | nickname |
| sex | No | int | 2 |用户性别，三种：未知（0） 男（1） 女（2）|
| age | No | int | 26 | age |

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": {}
}
```

##### 401
```javascript
{
    "code": 401,
    "msg": "该用户不存在",
    "data": ""
}
```

##### 104
```javascript
{
    "code": 104,
    "msg": "请求信息不完整",
    "data": ""
}
```


## Service

### 1、Query Service
 
#### Request URL：
```
http://192.168.9.36:8081/api/service/query
```

#### Request：
[http://192.168.9.36:8081/api/service/query](http://192.168.9.36:8081/api/service/query)

#### Request Method：
```
GET
```

#### Parameters：

|  Params | Required | Type | Values | Description |
|:-----|:-------:|:-----|:-----|

#### Response：

##### 200
```javascript
{
    "code": 200,
    "msg": "success",
    "content": [
        {
            "name": "查活动",
            "behavior_type": 0,
            "create_time": "2018-05-19T04:56:30.000Z",
            "update_time": "2018-05-19T04:56:30.000Z",
            "is_open": 1,
            "desc": "查活动 ",
            "icon": "",
            "key": "IVN_ACTIVITY",
            "_id": "5b20d3eca1ef16e149c94037"
        },
        {
            "name": "查快递",
            "behavior_type": 0,
            "create_time": "2018-05-19T04:56:30.000Z",
            "update_time": "2018-05-19T04:56:30.000Z",
            "is_open": 1,
            "desc": "查快递",
            "icon": "",
            "key": "IVN_EXPRESS",
            "_id": "5b2105b4a1ef16e149c94038"
        },
        {
            "name": "查违章",
            "behavior_type": 0,
            "create_time": "2018-05-19T04:56:30.000Z",
            "update_time": "2018-05-19T04:56:30.000Z",
            "is_open": 1,
            "desc": "查违章 ",
            "icon": "",
            "key": "IVN_VOLATION",
            "_id": "5b210e9fa1ef16e149c94039"
        }
    ]
}
```