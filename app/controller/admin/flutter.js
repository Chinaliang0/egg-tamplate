/* eslint-disable jsdoc/check-param-names */
'use strict'
const Controller = require('egg').Controller

/*
    author: junup
    time: 2020-06-02 15-40-19
    function:
*/
class FlutterController extends Controller {
    async index() {
        const { ctx } = this
        // const rule = {
        //     page: { type: 'string', required: true, message: '分页' },
        //     limit: { type: 'string', required: true, message: '分页数量' },
        //     username: { type: 'string', required: true, message: '用户名' },
        // }
        // ctx.validate(rule, ctx.query)

        // String id;
        // String vid;
        // String title;
        // String tname;
        // String url;
        // String cover;
        // int pubdate;
        // String desc;
        // int view;
        // int duration;
        // Owner owner;
        // int reply;
        // int favorite;
        // int like;
        // int coin;
        // int share;
        // String createTime;
        // int size;
        const data = {
            categoryList: [
                { name: '测试', count: 1 },
                { name: '推荐', count: 1 },
                { name: '热门', count: 1 },
            ],
            bannerList: [],
            videoList: [
                {
                    vid: '123123123',
                    size: 33,
                    favorite: 12,
                    like: 1,
                    reply: 1,
                    share: 1,
                    owner: {
                        name: '啊啊',
                        face: 'http://cunw-edu-statics-test.oss-cn-hangzhou.aliyuncs.com/evaluation/medal/1619665914463.jpg',
                        fans: 1,
                    },
                    duration: 10,
                    view: 1,
                    coin: 1,
                    pubdate: 1620722317,
                    cover: 'http://cunw-edu-statics-test.oss-cn-hangzhou.aliyuncs.com/evaluation/medal/1619665914463.jpg',
                    id: '1',
                    title: '这是个视频',
                    tname: '123123',
                    createTime: '2021-5-11',
                    desc: 'asdasd',
                    url: 'http://vjs.zencdn.net/v/oceans.mp4',
                },
            ],
        }
        ctx.helper.success(ctx, data, '获取成功')
    }
}
module.exports = FlutterController
