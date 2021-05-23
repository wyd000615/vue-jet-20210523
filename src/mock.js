const Mock = require('mockjs')
const Random =Mock.Random
let Result={
    code:200,
    msg:'操作成功',
    data:null
}

Mock.mock('/captcha','get',()=>{
    Result.data={

        token:Random.string(32),
        captchaImg:Random.dataImage('120x40','p7n5')
    }
    return Result
})


Mock.mock('/login','post',()=>{
    //无法在header中传入数据
    Result.code=400
    Result.msg='验证码码错误'
    return Result
})
